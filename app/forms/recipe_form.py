from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Recipe

class RecipeForm(FlaskForm):
    user_id = IntegerField('user id', validators=[DataRequired()])
    image_url = StringField('image url')
    title = StringField('title', validators=[DataRequired()])
    category_id = IntegerField('category_id', validators=[DataRequired()])
    prep_time = StringField('prep_time', validators=[DataRequired()])
    cook_time = StringField('cook_time', validators=[DataRequired()])
    total_time = StringField('total_time', validators=[DataRequired()])
    servings = StringField('servings', validators=[DataRequired()])
    directions = TextAreaField('directions', validators=[DataRequired()])
