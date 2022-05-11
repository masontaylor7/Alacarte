from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marniezmunchies = User(
        username='marniezmunchies', email='mm@aa.io', password='password')
    bobbiebakes = User(
        username='bobbiebakes', email='bb@aa.io', password='password')
    richie_breadman = User(
        username='richie_breadman', email='rb@aa.io', password='password')
    sue_cooks = User(
        username='sue_cooks', email='sc@aa.io', password='password')
    SourdoughFam = User(
        username='SourdoughFam', email='sdf@aa.io', password='password')
    icedT = User(
        username='icedT', email='it@aa.io', password='password')
    goldenstatewarriorsfan = User(
        username='goldenstatewarriorsfan', email='gswf@aa.io', password='password')
    egg = User(
        username='egg', email='egg@aa.io', password='password')
    cuphalffull = User(
        username='cuphalffull', email='chf@aa.io', password='password')
    hp = User(
        username='hp', email='hp@aa.io', password='password')

    db.session.add_all([demo, marniezmunchies, bobbiebakes, richie_breadman, sue_cooks, SourdoughFam, icedT, goldenstatewarriorsfan, egg, cuphalffull, hp])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
