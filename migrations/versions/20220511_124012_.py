"""empty message

Revision ID: 6e735c42d6cb
Revises: c4020387b41b
Create Date: 2022-05-11 12:40:12.302221

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6e735c42d6cb'
down_revision = 'c4020387b41b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ingredient',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.String(length=15), nullable=False),
    sa.Column('measurement', sa.String(length=30), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ingredient')
    # ### end Alembic commands ###
