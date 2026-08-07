from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class Face(Base):
    __tablename__ = "faces"

    id = Column(Integer, primary_key=True, index=True)
    photo_id = Column(Integer, ForeignKey("photos.id", ondelete="CASCADE"), nullable=False)
    bounding_box = Column(String(255), nullable=False)
    confidence = Column(Float, nullable=False, default=0.0)

    photo = relationship("Photo", back_populates="faces")
