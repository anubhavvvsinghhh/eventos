import time
from datetime import datetime, timezone
from typing import Any

from fastapi import BackgroundTasks, UploadFile
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.event import Event
from app.models.face import Face
from app.models.photo import Photo
from app.schemas.photo import PhotoUploadResponse


def _update_photo_status(db: Session, photo_id: int, status: str) -> Photo | None:
    photo = db.query(Photo).filter(Photo.id == photo_id).first()
    if not photo:
        return None

    photo.processing_status = status
    if status == "processing" and photo.processing_started_at is None:
        photo.processing_started_at = datetime.now(timezone.utc)
    if status == "completed" and photo.processing_completed_at is None:
        photo.processing_completed_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(photo)
    return photo


def _detect_faces_from_bytes(image_bytes: bytes) -> list[dict[str, Any]]:
    return []


def _store_detected_faces(db: Session, photo_id: int, image_bytes: bytes) -> list[Face]:
    detected_faces = _detect_faces_from_bytes(image_bytes)
    db.query(Face).filter(Face.photo_id == photo_id).delete()
    for face_data in detected_faces:
        face = Face(
            photo_id=photo_id,
            bounding_box=face_data.get("bounding_box", "0,0,0,0"),
            confidence=float(face_data.get("confidence", 0.0)),
        )
        db.add(face)
    db.commit()
    return db.query(Face).filter(Face.photo_id == photo_id).all()


def _get_face_count(db: Session, photo_id: int) -> int:
    return db.query(Face).filter(Face.photo_id == photo_id).count()


def process_photo_pipeline(*args, delay_seconds: float = 0.7, db: Session | None = None, image_bytes: bytes | None = None) -> None:
    photo_id: int | None = None
    if args:
        first_arg = args[0]
        if isinstance(first_arg, Session):
            db = first_arg
            if len(args) > 1:
                photo_id = args[1]
            if len(args) > 2:
                image_bytes = args[2]
        else:
            photo_id = first_arg
            if len(args) > 1:
                image_bytes = args[1]

    if photo_id is None:
        return

    if db is None:
        db = SessionLocal()
        should_close = True
    else:
        should_close = False

    try:
        photo = _update_photo_status(db, photo_id, "queued")
        if not photo:
            return

        time.sleep(delay_seconds)
        _update_photo_status(db, photo_id, "processing")

        time.sleep(delay_seconds)
        if image_bytes is None:
            image_bytes = b""
        _store_detected_faces(db, photo_id, image_bytes)
        _update_photo_status(db, photo_id, "completed")
    except Exception:
        _update_photo_status(db, photo_id, "failed")
    finally:
        if should_close:
            db.close()


def get_event_photos(db: Session, event_id: int) -> list[Photo]:
    photos = db.query(Photo).filter(Photo.event_id == event_id).order_by(Photo.id.desc()).all()
    for photo in photos:
        photo.face_count = _get_face_count(db, photo.id)
    return photos


def upload_event_photos(
    db: Session,
    event_id: int,
    file: UploadFile,
    background_tasks: BackgroundTasks,
) -> PhotoUploadResponse:
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise ValueError("Event not found")

    photo = Photo(
        filename=file.filename,
        event_id=event_id,
        processing_status="uploaded",
    )
    db.add(photo)
    db.commit()
    db.refresh(photo)

    background_tasks.add_task(process_photo_pipeline, photo.id, image_bytes=file.file.read())

    return PhotoUploadResponse(
        id=photo.id,
        event_id=photo.event_id,
        filename=photo.filename,
        uploaded_at=photo.uploaded_at,
        processing_status=photo.processing_status,
        face_count=0,
        message="Photo uploaded successfully",
    )
