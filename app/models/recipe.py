from .db import db


class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.String(5000), nullable=True)
    title = db.Column(db.String(100), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    prep_time = db.Column(db.String, nullable=False)
    cook_time = db.Column(db.String, nullable=False)
    total_time = db.Column(db.String, nullable=False)
    servings = db.Column(db.String, nullable=False)
    directions = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    user = db.relationship('User', back_populates='recipes')
    # ingredients = db.relationship('Ingredient', back_populates='recipe')
    category = db.relationship('Category', foreign_keys=[category_id], back_populates='recipes')
    collections = db.relationship('Collection', secondary='collection_recipes', back_populates='recipes')
    ingredients = db.relationship('Ingredient', back_populates='recipe')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_url': self.image_url,
            'title': self.title,
            'category_id': self.category_id,
            'prep_time': self.prep_time,
            'cook_time': self.cook_time,
            'total_time': self.total_time,
            'directions': self.directions,
            'servings': self.servings,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict(),
            'category': self.category.to_dict(),
            'ingredients': [Ingredient.to_dict() for Ingredient in self.ingredients],

        }
