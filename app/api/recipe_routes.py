from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Recipe, db
# from app.forms import PostForm

recipe_routes = Blueprint('recipes', __name__)

@recipe_routes.route('/<int:id>', methods=['GET'])
def one_recipe(id):
    recipe = Recipe.query.get(id)
    return recipe.to_dict()

@recipe_routes.route('/', methods=['GET'])
def all_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.to_dict() for recipe in recipes])
