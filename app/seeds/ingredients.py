from app.models import db, Ingredient

def seed_ingredients():
    ing1 = Ingredient(
        recipe_id='1', amount='5', measurement='cups', name='birria consome'
    )
    ing2 = Ingredient(
        recipe_id='1', amount='4', measurement='tablespoons', name='olive oil, divided'
    )
    ing3 = Ingredient(
        recipe_id='1', amount='16', measurement='', name='corn tortillas (4 - 5 inch)'
    )
    ing4 = Ingredient(
        recipe_id='1', amount='4', measurement='cups', name='birria meat'
    )
    ing5 = Ingredient(
        recipe_id='1', amount='12', measurement='ounces', name='freshly grated cheddar cheese'
    )
    ing6 = Ingredient(
        recipe_id='1', amount='1', measurement='', name='medium white onion, finely diced'
    )
    ing7 = Ingredient(
        recipe_id='1', amount='1', measurement='bunch', name='fresh cilantro, finely chopped'
    )
    ing8 = Ingredient(
        recipe_id='1', amount='4', measurement='', name='limes, cut in wedges'
    )
    ing9 = Ingredient(
        recipe_id='1', amount='4', measurement='', name='limes, cut in wedges'
    )
    ing10 = Ingredient(
        recipe_id='2', amount='1', measurement='(16-ounce) block', name='extra firm or firm tofu, drained'
    )
    ing11 = Ingredient(
        recipe_id='2', amount='1', measurement='tablespoon', name='soy sauce'
    )
    ing12 = Ingredient(
        recipe_id='2', amount='1', measurement='teaspoon', name='canola or vegetable oil'
    )
    ing13 = Ingredient(
        recipe_id='2', amount='1', measurement='teaspoon', name='sesame oil'
    )
    ing14 = Ingredient(
        recipe_id='2', amount='1', measurement='teaspoon', name='rice wine vinegar'
    )
    ing15 = Ingredient(
        recipe_id='2', amount='1/2', measurement='teaspoon', name='sugar'
    )
    ing16 = Ingredient(
        recipe_id='2', amount='2', measurement='tablespoons', name='cornstarch'
    )
    ing17 = Ingredient(
        recipe_id='2', amount='2', measurement='tablespoons', name='panko or plain breadcrumbs'
    )
    ing18 = Ingredient(
        recipe_id='2', amount='1/2', measurement='teaspoon', name='kosher salt'
    )
    ing19 = Ingredient(
        recipe_id='2', amount='1/4', measurement='teaspoon', name='freshly ground black pepper'
    )

    db.session.add_all([ing1, ing2, ing3, ing4, ing5, ing6, ing7, ing8, ing9, ing10, ing11, ing12, ing13, ing14, ing15, ing16, ing17, ing18, ing19])

    db.session.commit()

def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
