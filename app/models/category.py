from .db import db
from .recipe import Recipe

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))

    recipes = db.relationship('Recipe', foreign_keys=[Recipe.category_id], back_populates='category')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
        }
