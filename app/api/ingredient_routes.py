from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Ingredient, db

ingredient_routes = Blueprint('ingredients', __name__)

@ingredient_routes.route('/recipes/<int:id>', methods=['GET'])
def get_ingredients(id):
    ingredients = Ingredient.query.filter(Ingredient.recipe_id == id).all()
    return jsonify([ingredient.to_dict() for ingredient in ingredients])


