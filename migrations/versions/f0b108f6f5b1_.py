"""empty message

Revision ID: f0b108f6f5b1
Revises: 6ff6dd82a16a
Create Date: 2021-06-06 14:10:36.921145

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'f0b108f6f5b1'
down_revision = '6ff6dd82a16a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('comments', 'updated_at')
    op.drop_column('comments', 'created_at')
    op.drop_column('posts', 'comments')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('posts', sa.Column('comments', sa.TEXT(), autoincrement=False, nullable=True))
    op.add_column('comments', sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    op.add_column('comments', sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
