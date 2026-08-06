"""
Revision ID: 2169ac07f776
Revises: 
Create Date: 2026-08-05 11:19:28.406391
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2169ac07f776'
down_revision = None
branch_labels = None
depend_on = None


def upgrade() -> None:
    op.create_table(
        'events',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('venue', sa.String(length=255), nullable=False),
        sa.Column('date', sa.String(length=50), nullable=False),
        sa.Column('photographer', sa.String(length=255), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
    )
    op.create_table(
        'photos',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('filename', sa.String(length=255), nullable=False),
        sa.Column('filepath', sa.String(length=255), nullable=False),
        sa.Column('event_id', sa.Integer(), sa.ForeignKey('events.id', ondelete='CASCADE'), nullable=False),
        sa.Column('uploaded_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('photos')
    op.drop_table('events')
