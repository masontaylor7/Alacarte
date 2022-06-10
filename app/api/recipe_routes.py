from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Recipe, db
from app.forms import RecipeForm, EditRecipeForm
from app.awsS3 import (upload_file_to_s3, allowed_file, get_unique_filename)

recipe_routes = Blueprint('recipes', __name__)


@recipe_routes.route('/<int:id>', methods=['GET'])
def one_recipe(id):
    recipe = Recipe.query.get(id)
    return recipe.to_dict()

@recipe_routes.route('/<int:id>', methods=['DELETE'])
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    db.session.delete(recipe)
    db.session.commit()
    # return {'response': recipe.to_dict() }
    return {'message': 'success'}
    # return {'hello': 'world'}

@recipe_routes.route('/', methods=['GET'])
def all_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.to_dict() for recipe in recipes])
    # return {"recipes": [recipe.to_dict() for recipe in recipes]}

@recipe_routes.route('/<int:id>', methods=['PUT'])
def update_recipe(id):
    existing_recipe = Recipe.query.get(id)
    form = EditRecipeForm()
    print('--------------', form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    url = ''

    if "image" in request.files:
        # return {"errors": "image required"}, 400

        image = request.files["image"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]

    if form.validate_on_submit():
        existing_recipe.title = form.data['title']
        existing_recipe.category_id = form.data['category_id']
        existing_recipe.prep_time = form.data['prep_time']
        existing_recipe.cook_time = form.data['cook_time']
        existing_recipe.total_time = form.data['total_time']
        existing_recipe.servings = form.data['servings']
        existing_recipe.directions = form.data['directions']
        if url != '':
            existing_recipe.image_url = url
        db.session.commit()
        return jsonify(existing_recipe.to_dict())


@recipe_routes.route('/new', methods=['POST'])
# @login_required
def new_recipe():
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]

    if form.validate_on_submit():
        recipe = Recipe(
            user_id = form.data['user_id'],
            image_url = url,
            title = form.data['title'],
            category_id = form.data['category_id'],
            prep_time = form.data['prep_time'],
            cook_time = form.data['cook_time'],
            total_time = form.data['total_time'],
            servings = form.data['servings'],
            directions = form.data['directions'],
        )

        form.populate_obj(recipe)
        db.session.add(recipe)
        db.session.commit()
        return recipe.to_dict()
