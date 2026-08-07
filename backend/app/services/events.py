from sqlalchemy.orm import Session
from app.models.event import Event
from app.schemas.event import EventCreate


def get_events(db: Session) -> list[Event]:
    return db.query(Event).order_by(Event.created_at.desc()).all()


def create_event(db: Session, event_create: EventCreate) -> Event:
    event = Event(
        name=event_create.name,
        venue=event_create.venue,
        date=event_create.date,
        description=event_create.description,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


def get_event_by_id(db: Session, event_id: int) -> Event | None:
    return db.query(Event).filter(Event.id == event_id).first()
