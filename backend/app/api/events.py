from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.schemas.event import EventCreate, EventResponse
from app.schemas.photo import PhotoUploadResponse
from app.services.events import create_event, get_event_by_id, get_events
from app.services.photos import upload_event_photos
from app.db.session import get_db

router = APIRouter()


@router.get("/", response_model=list[EventResponse])
def list_events(db: Session = Depends(get_db)) -> list[EventResponse]:
    return get_events(db)


@router.post("/", response_model=EventResponse, status_code=201)
def create_new_event(event_create: EventCreate, db: Session = Depends(get_db)) -> EventResponse:
    return create_event(db, event_create)


@router.get("/{event_id}", response_model=EventResponse)
def read_event(event_id: int, db: Session = Depends(get_db)) -> EventResponse:
    event = get_event_by_id(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.post("/{event_id}/photos", response_model=PhotoUploadResponse)
def upload_photos(event_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)) -> PhotoUploadResponse:
    try:
        return upload_event_photos(db, event_id, file)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
