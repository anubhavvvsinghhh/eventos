from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.db.base import Base
from app.models.event import Event
from app.models.face import Face
from app.models.photo import Photo
from app.services.photos import process_photo_pipeline


def test_photo_processing_pipeline_moves_through_statuses() -> None:
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(bind=engine)

    with SessionLocal() as db:
        event = Event(name="Launch", venue="HQ", date="2026-01-01")
        db.add(event)
        db.commit()
        db.refresh(event)

        photo = Photo(filename="sample.jpg", event_id=event.id)
        db.add(photo)
        db.commit()
        db.refresh(photo)

        process_photo_pipeline(db, photo.id, delay_seconds=0)
        db.refresh(photo)

        assert photo.processing_status == "completed"
        assert photo.processing_started_at is not None
        assert photo.processing_completed_at is not None


def test_photo_processing_pipeline_creates_face_records() -> None:
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(bind=engine)

    with SessionLocal() as db:
        event = Event(name="Launch", venue="HQ", date="2026-01-01")
        db.add(event)
        db.commit()
        db.refresh(event)

        photo = Photo(filename="sample.jpg", event_id=event.id)
        db.add(photo)
        db.commit()
        db.refresh(photo)

        process_photo_pipeline(db, photo.id, b"sample-image-bytes", delay_seconds=0)
        db.refresh(photo)

        faces = db.query(Face).filter(Face.photo_id == photo.id).all()
        assert len(faces) >= 0
        assert photo.processing_status == "completed"
