from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Collection_Recipe, db
from app.api.auth_routes import validation_errors_to_error_messages

collection_recipe_routes = Blueprint('collection_recipes', __name__)

@collection_recipe_routes.route('/new', methods=['POST'])
def create_collection_recipe():
    # new_entry = request.get_json(force=True)
    # print(new_entry, '-----------------------------')

    # entry = Collection_Recipe(
    #     recipe_id = new_entry.recipe_id
    #     collection_id = new_entry.collection_id
    # )

    # print(entry, '++++++++++++++++++')
    # # db.session.add(entry)
    # # db.session.commit()
    # # return entry
