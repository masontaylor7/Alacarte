from app.models import db, Category

def seed_categories():
    most_recent = Category(
        name='Most Recent'
    )
    breakfast = Category(
        name='Breakfast'
    )
    lunch = Category(
        name='Lunch'
    )
    dinner = Category(
        name='Dinner'
    )
    dessert = Category(
        name='Dessert'
    )
    drinks = Category(
        name='Drinks'
    )
    snacks_apps = Category(
        name='Snacks & Appetizers'
    )
    holidays = Category(
        name='Holiday & Seasonal'
    )
    all_recipes = Category(
        name='All Recipes (A-Z)'
    )

    db.session.add_all([most_recent, breakfast, lunch, dinner, dessert, drinks, snacks_apps, holidays, all_recipes])
    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
