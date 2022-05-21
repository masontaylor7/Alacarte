from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Collection_Recipe, db
from app.forms import CollectionRecipeForm
from app.api.auth_routes import validation_errors_to_error_messages

collection_recipe_routes = Blueprint('collection_recipes', __name__)

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
