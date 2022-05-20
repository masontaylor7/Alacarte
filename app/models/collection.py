from .db import db


class Collection(db.Model):
    __tablename__ = 'collections'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='collections')
    recipes = db.relationship('Recipe', secondary='collection_recipes', back_populates='collections')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'recipes': [Recipe.to_dict() for Recipe in self.recipes],
        }
