from datetime import datetime

from pydantic import BaseModel


class EventBase(BaseModel):
    name: str
    venue: str
    date: str
    photographer: str | None = None
    description: str | None = None


class EventCreate(EventBase):
    pass


class EventResponse(EventBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
