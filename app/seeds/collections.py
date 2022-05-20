from app.models import db, Collection

def seed_collections():
    col1 = Collection(
        title='My Recipes', user_id='1'
    )
    col2 = Collection(
        title='Favorites', user_id='1'
    )
    col3 = Collection(
        title='Dinners', user_id='1'
    )
    col4 = Collection(
        title='Best Apps & Snacks', user_id='1'
    )
    col5 = Collection(
        title='Chicken', user_id='1'
    )
    col6 = Collection(
        title='Desserts & Sweets', user_id='1'
    )
    col7 = Collection(
        title='Cocktails', user_id='1'
    )
    col8 = Collection(
        title='Mocktails', user_id='1'
    )

    db.session.add_all([col1, col2, col3, col4, col5, col6, col7, col8])
    db.session.commit()

def undo_collections():
    db.session.execute('TRUNCATE collections RESTART IDENTITY CASCADE;')
    db.session.commit()
