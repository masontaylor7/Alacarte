from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, FileField
from wtforms.validators import DataRequired, ValidationError
from app.models import Recipe

class RecipeForm(FlaskForm):
    user_id = IntegerField('user id', validators=[DataRequired()])
    image = StringField('image', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    category_id = IntegerField('category_id', validators=[DataRequired()])
    prep_time = StringField('prep_time', validators=[DataRequired()])
    cook_time = StringField('cook_time', validators=[DataRequired()])
    total_time = StringField('total_time', validators=[DataRequired()])
    servings = StringField('servings', validators=[DataRequired()])
    directions = TextAreaField('directions', validators=[DataRequired()])
