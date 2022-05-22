from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Collection, Recipe, Collection_Recipe, db
from app.forms import CollectionRecipeForm
from app.api.auth_routes import validation_errors_to_error_messages

collection_recipe_routes = Blueprint('collection_recipes', __name__)

@collection_recipe_routes.route('/<int:id>', methods=['DELETE'])
def delete_collection_recipes(id):
    entries = Collection_Recipe.query.filter(Collection_Recipe.collection_id == id).all()
    for entry in entries:
        db.session.delete(entry)
        db.session.commit()
        return {'message': 'success'}

@collection_recipe_routes.route('/recipe/<int:id>', methods=['DELETE'])
def delete_one_collection_entry(id):
    recipe = request.get_json(force=True)
    c_id = recipe['collectionId']
    r_id = recipe['recipeId']



    collection = Collection.query.filter(Collection.id == c_id).first()
    recipe = Recipe.query.filter(Recipe.id == r_id).first()

    collection.recipes.remove(recipe)
    db.session.commit()
    return collection.to_dict()


@collection_recipe_routes.route('/new', methods=['POST'])
def create_collection_recipe():
    form = CollectionRecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        entry = Collection_Recipe(
            recipe_id = form.data['recipe_id'],
            collection_id = form.data['collection_id'],
        )

        form.populate_obj(entry)
        db.session.add(entry)
        db.session.commit()
        return {'message': 'succesful'}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
