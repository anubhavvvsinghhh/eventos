from datetime import datetime

from pydantic import BaseModel


class PhotoBase(BaseModel):
    id: int
    event_id: int
    filename: str
    uploaded_at: datetime
    url: str

    class Config:
        from_attributes = True


class PhotoResponse(PhotoBase):
    pass


class PhotoUploadResponse(PhotoBase):
    message: str
