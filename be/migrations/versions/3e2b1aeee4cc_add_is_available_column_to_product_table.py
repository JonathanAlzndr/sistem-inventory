"""Add is_available column to product table

Revision ID: 3e2b1aeee4cc
Revises: 668f5c2c7a6d
Create Date: 2025-11-09 19:56:30.380998
"""

from alembic import op
import sqlalchemy as sa

revision = '3e2b1aeee4cc'
down_revision = '668f5c2c7a6d'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.add_column(
            sa.Column('isAvailable', sa.Boolean(), nullable=False, server_default=sa.text('1'))
        )


def downgrade():
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.drop_column('isAvailable')
