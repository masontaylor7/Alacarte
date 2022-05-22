from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Collection, db
from app.forms import CollectionForm
from app.api.auth_routes import validation_errors_to_error_messages

collection_routes = Blueprint('collections', __name__)

@collection_routes.route('/<int:id>', methods=['PUT'])
def update_collection(id):
    update_collection = request.get_json(force=True)
    existing_collection = Collection.query.get(id)
    existing_collection.title = update_collection['title']
    db.session.commit()
    return jsonify(existing_collection.to_dict())

@collection_routes.route('/users/<int:id>', methods=['GET'])
def get_user_collections(id):
    collections = Collection.query.filter(Collection.user_id == id).all()
    return jsonify([collection.to_dict() for collection in collections])

@collection_routes.route('/<int:id>/recipes', methods=['GET'])
def get_collections_recipes(id):
    collection = Collection.query.get(id)
    print(collection, '---------------------------------------')
    return collection.to_dict()

@collection_routes.route('/<int:id>', methods=['DELETE'])
def delete_collection(id):
    collection = Collection.query.get(id)
    db.session.delete(collection)
    db.session.commit()
    return {'message': 'success'}

@collection_routes.route('/new', methods=['POST'])
def new_collection():
    form = CollectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        collection = Collection(
            user_id = form.data['user_id'],
            title = form.data['title'],
        )

        form.populate_obj(collection)
        db.session.add(collection)
        db.session.commit()
        return collection.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
