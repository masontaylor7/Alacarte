
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .ingredients import seed_ingredients, undo_ingredients
from .recipes import seed_recipes, undo_recipes
from .collections import seed_collections, undo_collections
from .collection_recipes import seed_collection_recipes, undo_collection_recipes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_recipes()
    seed_ingredients()
    seed_collections()
    seed_collection_recipes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_categories()
    undo_recipes()
    undo_ingredients()
    undo_collections()
    undo_collection_recipes()
    # Add other undo functions here
