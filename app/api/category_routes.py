from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Category, db

category_routes = Blueprint('categories', __name__)

@category_routes.route('/', methods=['GET'])
def all_categories():
    categories = Category.query.all()
    print(categories)
    return jsonify([category.to_dict() for category in categories])
    # return {"categories": [category.to_dict() for category in categories]}
