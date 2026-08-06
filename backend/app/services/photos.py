from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.event import Event
from app.models.photo import Photo
from app.schemas.photo import PhotoUploadResponse

UPLOAD_ROOT = Path(__file__).resolve().parents[2] / "uploads"
UPLOAD_ROOT.mkdir(parents=True, exist_ok=True)
ALLOWED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".heic"}


def _get_event_upload_dir(event_id: int) -> Path:
    upload_dir = UPLOAD_ROOT / f"event_{event_id}"
    upload_dir.mkdir(parents=True, exist_ok=True)
    return upload_dir


def _validate_image_file(file: UploadFile) -> None:
    filename = file.filename or ""
    extension = Path(filename).suffix.lower()
    if not filename or extension not in ALLOWED_EXTENSIONS:
        raise ValueError("Unsupported file type. Allowed types: JPG, PNG, HEIC.")


def _make_unique_filename(filename: str) -> str:
    safe_name = Path(filename).name
    return f"{uuid4().hex}_{safe_name}"


def _save_file(file: UploadFile, event_id: int) -> str:
    _validate_image_file(file)
    upload_dir = _get_event_upload_dir(event_id)
    stored_filename = _make_unique_filename(file.filename)
    output_path = upload_dir / stored_filename

    with output_path.open("wb") as out_file:
        out_file.write(file.file.read())

    return f"event_{event_id}/{stored_filename}"


def get_event_photos(db: Session, event_id: int) -> list[Photo]:
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise ValueError("Event not found")
    return db.query(Photo).filter(Photo.event_id == event_id).order_by(Photo.uploaded_at.desc()).all()


def upload_event_photos(db: Session, event_id: int, files: list[UploadFile]) -> list[PhotoUploadResponse]:
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise ValueError("Event not found")

    if not files:
        raise ValueError("No files were provided for upload.")

    saved_photos: list[Photo] = []
    for upload_file in files:
        filepath = _save_file(upload_file, event_id)
        photo = Photo(
            filename=upload_file.filename,
            filepath=filepath,
            event_id=event_id,
        )
        db.add(photo)
        saved_photos.append(photo)

    db.commit()
    for photo in saved_photos:
        db.refresh(photo)

    return [
        PhotoUploadResponse(
            id=photo.id,
            event_id=photo.event_id,
            filename=photo.filename,
            uploaded_at=photo.uploaded_at,
            url=photo.url,
            message="Photo uploaded successfully",
        )
        for photo in saved_photos
    ]
