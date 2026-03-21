"""add supplier_id FK to items

Revision ID: 0002
Revises: 0001
Create Date: 2026-03-21 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

revision = "0002"
down_revision = "0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("items", sa.Column("supplier_id", sa.Integer(), nullable=True))
    op.create_foreign_key(
        "fk_items_supplier_id",
        "items",
        "suppliers",
        ["supplier_id"],
        ["id"],
        ondelete="SET NULL",
    )


def downgrade() -> None:
    op.drop_constraint("fk_items_supplier_id", "items", type_="foreignkey")
    op.drop_column("items", "supplier_id")
