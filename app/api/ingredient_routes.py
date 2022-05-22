from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Ingredient, db
from app.forms import IngredientForm
from app.api.auth_routes import validation_errors_to_error_messages


ingredient_routes = Blueprint('ingredients', __name__)

@ingredient_routes.route('/<int:id>', methods=['DELETE'])
def delete_ingredient(id):
    ingredient = Ingredient.query.get(id)
    db.session.delete(ingredient)
    db.session.commit()
    return {'message': 'success'}

@ingredient_routes.route('/recipes/<int:id>', methods=['GET'])
def get_ingredients(id):
    ingredients = Ingredient.query.filter(Ingredient.recipe_id == id).all()
    return jsonify([ingredient.to_dict() for ingredient in ingredients])

@ingredient_routes.route('/', methods=['GET'])
def all_ingredients():
    ingredients = Ingredient.query.all()
    return jsonify([ingredient.to_dict() for ingredient in ingredients])

@ingredient_routes.route('/<int:id>', methods=['PUT'])
def update_ingredient(id):
    update_ingredient = request.get_json(force=True)
    print(update_ingredient, '.......')
    existing_ingredient = Ingredient.query.get(id)
    existing_ingredient.amount = update_ingredient['amount']
    existing_ingredient.measurement = update_ingredient['measurement']
    existing_ingredient.title = update_ingredient['title']
    db.session.commit()
    return jsonify(existing_ingredient.to_dict())


@ingredient_routes.route('/new', methods=['POST'])
def new_recipe():
    form = IngredientForm()
    # print(form)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        ingredient = Ingredient(
            recipe_id = form.data['recipe_id'],
            amount = form.data['amount'],
            measurement = form.data['measurement'],
            title = form.data['title'],
        )
        print(ingredient)

        form.populate_obj(ingredient)
        db.session.add(ingredient)
        db.session.commit()
        return ingredient.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
