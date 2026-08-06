from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.event import Event
from app.models.photo import Photo
from app.schemas.photo import PhotoUploadResponse


def upload_event_photos(db: Session, event_id: int, file: UploadFile) -> PhotoUploadResponse:
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise ValueError("Event not found")

    photo = Photo(
        filename=file.filename,
        event_id=event_id,
    )
    db.add(photo)
    db.commit()
    db.refresh(photo)

    return PhotoUploadResponse(
        id=photo.id,
        event_id=photo.event_id,
        filename=photo.filename,
        uploaded_at=photo.uploaded_at,
        message="Photo uploaded successfully",
    )
