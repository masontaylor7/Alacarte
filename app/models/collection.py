from .db import db


class Collection(db.Model):
    __tablename__ = 'collections'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(5000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='collections')
    recipes = db.relationship('Recipe', secondary='collection_recipes', back_populates='collections')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'image_url': self.image_url
        }
