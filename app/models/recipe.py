from .db import db


class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.String(5000), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    directions = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False,server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    user = db.relationship('User', back_populates='recipes')
    # ingredients = db.relationship('Ingredient', back_populates='recipe')
    category = db.relationship('Category', foreign_keys=[category_id], back_populates='recipes')
    collections = db.relationship('Collection', secondary='collection_recipes', back_populates='recipes')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_url': self.image_url,
            'title': self.title,
            'category_id': self.category_id,
            'directions': self.directions,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
