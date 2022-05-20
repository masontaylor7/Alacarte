from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Collection, db
# from app.forms import IngredientForm
from app.api.auth_routes import validation_errors_to_error_messages

collection_routes = Blueprint('collections', __name__)

@collection_routes.route('/users/<int:id>', methods=['GET'])
def get_user_collections(id):
    collections = Collection.query.filter(Collection.user_id == id).all()
    return jsonify([collection.to_dict() for collection in collections])

@collection_routes.route('/<int:id>/recipes', methods=['GET'])
def get_collections_recipes(id):
    collection = Collection.query.get(id)
    print(collection, '---------------------------------------')
    return collection.to_dict()
