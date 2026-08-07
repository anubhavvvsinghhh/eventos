from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import relationship

from app.db.base import Base


class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    uploaded_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    processing_status = Column(String(50), nullable=False, server_default="uploaded")
    processing_started_at = Column(DateTime(timezone=True), nullable=True)
    processing_completed_at = Column(DateTime(timezone=True), nullable=True)

    event = relationship("Event", back_populates="photos")
    faces = relationship("Face", back_populates="photo", cascade="all, delete-orphan")
