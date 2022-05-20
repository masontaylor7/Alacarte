from app.models import db, Collection_Recipe

def seed_collection_recipes():
    cr1 = Collection_Recipe(
        recipe_id='1', collection_id='1'
    )
    cr2 = Collection_Recipe(
        recipe_id='2', collection_id='1'
    )
    cr3 = Collection_Recipe(
        recipe_id='3', collection_id='1'
    )
    cr4 = Collection_Recipe(
        recipe_id='4', collection_id='1'
    )
    cr5 = Collection_Recipe(
        recipe_id='5', collection_id='1'
    )
    cr6 = Collection_Recipe(
        recipe_id='6', collection_id='1'
    )
    cr7 = Collection_Recipe(
        recipe_id='1', collection_id='2'
    )
    cr8 = Collection_Recipe(
        recipe_id='3', collection_id='2'
    )
    cr9 = Collection_Recipe(
        recipe_id='5', collection_id='2'
    )
    cr10 = Collection_Recipe(
        recipe_id='3', collection_id='3'
    )
    cr11 = Collection_Recipe(
        recipe_id='1', collection_id='3'
    )
    cr12 = Collection_Recipe(
        recipe_id='5', collection_id='6'
    )
    cr13 = Collection_Recipe(
        recipe_id='6', collection_id='7'
    )

    db.session.add_all([cr1, cr2, cr3, cr4, cr5, cr6, cr7, cr8, cr9, cr10, cr11, cr12, cr13])
    db.session.commit()

def undo_collection_recipes():
    db.session.execute('TRUNCATE collection_recipes RESTART IDENTITY CASCADE;')
    db.session.commit()
