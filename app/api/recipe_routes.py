from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Recipe, db
from app.forms import RecipeForm

recipe_routes = Blueprint('recipes', __name__)

@recipe_routes.route('/<int:id>', methods=['GET'])
def one_recipe(id):
    recipe = Recipe.query.get(id)
    return recipe.to_dict()

@recipe_routes.route('/', methods=['GET'])
def all_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.to_dict() for recipe in recipes])
    # return {"recipes": [recipe.to_dict() for recipe in recipes]}

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
