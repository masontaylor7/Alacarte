from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Ingredient

class IngredientForm(FlaskForm):
    recipe_id = IntegerField('recipe_id', validators=[DataRequired()])
    amount = StringField('amount')
    measurement = StringField('measurement')
    title = StringField('title', validators=[DataRequired()])
