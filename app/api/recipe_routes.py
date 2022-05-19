from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Recipe, db
from app.forms import RecipeForm

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
    update_recipe = request.get_json(force=True)
    existing_recipe = Recipe.query.get(id)
    existing_recipe.image_url = update_recipe['image_url']
    existing_recipe.title = update_recipe['title']
    existing_recipe.category_id = update_recipe['category_id']
    existing_recipe.prep_time = update_recipe['prep_time']
    existing_recipe.cook_time = update_recipe['cook_time']
    existing_recipe.total_time = update_recipe['total_time']
    existing_recipe.servings = update_recipe['servings']
    existing_recipe.directions = update_recipe['directions']
    db.session.commit()
    return jsonify(existing_recipe.to_dict())

@recipe_routes.route('/new', methods=['POST'])
# @login_required
def new_recipe():
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        recipe = Recipe(
            user_id = form.data['user_id'],
            image_url = form.data['image_url'],
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
