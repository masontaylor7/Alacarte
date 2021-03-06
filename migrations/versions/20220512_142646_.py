"""empty message

Revision ID: 697acdd5917f
Revises: 43f8af2f1148
Create Date: 2022-05-12 14:26:46.610494

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '697acdd5917f'
down_revision = '43f8af2f1148'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('ingredient', 'amount',
               existing_type=sa.VARCHAR(length=15),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('ingredient', 'amount',
               existing_type=sa.VARCHAR(length=15),
               nullable=False)
    # ### end Alembic commands ###
