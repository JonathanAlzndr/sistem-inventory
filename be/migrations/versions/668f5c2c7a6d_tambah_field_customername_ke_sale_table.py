"""Tambah field customerName ke Sale table

Revision ID: 668f5c2c7a6d
Revises: 
Create Date: 2025-11-09 18:51:41.583210
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '668f5c2c7a6d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Tambahkan kolom customerName ke tabel Sale
    op.add_column('sale', sa.Column('customerName', sa.String(length=255), nullable=True))


def downgrade():
    # Hapus kolom customerName kalau rollback
    op.drop_column('sale', 'customerName')
