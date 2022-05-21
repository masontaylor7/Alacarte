from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Collection_Recipe

class CollectionRecipeForm(FlaskForm):
    recipe_id = IntegerField('recipe_id', validators=[DataRequired()])
    collection_id = IntegerField('collection_id', validators=[DataRequired()])

    def to_dict(self):
        return {
            'id': self.id,
            'recipe_id': self.recipe_id,
            'collection_id': self.collection_id
        }
