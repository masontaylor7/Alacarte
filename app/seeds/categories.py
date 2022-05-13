from app.models import db, Category

def seed_categories():
    breakfast = Category(
        title='Breakfast'
    )
    lunch = Category(
        title='Lunch'
    )
    dinner = Category(
        title='Dinner'
    )
    dessert = Category(
        title='Dessert'
    )
    drinks = Category(
        title='Drinks'
    )
    snacks_apps = Category(
        title='Snacks & Appetizers'
    )
    holidays = Category(
        title='Holiday & Seasonal'
    )
    vegan = Category(
        title='Vegan'
    )
    vegetarian = Category(
        title='Vegetarian'
    )
    other = Category(
        title='Other'
    )


    db.session.add_all([breakfast, lunch, dinner, dessert, drinks, snacks_apps, holidays, vegan, vegetarian, other])
    
    db.session.commit()

def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
