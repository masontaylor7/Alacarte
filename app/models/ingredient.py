from .db import db

class Ingredient(db.Model):
    __tablename_ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    amount = db.Column(db.String(15), nullable=True)
    measurement = db.Column(db.String(30), nullable=True)
    name = db.Column(db.String(100), nullable=False)

    recipe = db.relationship('Recipe', foreign_keys=[recipe_id], back_populates='ingredients')

    def to_dict(self):
        return {
            'id': self.id,
            'recipe_id': self.recipe_id,
            'amount': self.amount,
            'measurement': self.measurement,
            'name': self.name
        }
