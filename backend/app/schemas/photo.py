from datetime import datetime

from pydantic import BaseModel


class PhotoUploadResponse(BaseModel):
    id: int
    event_id: int
    filename: str
    uploaded_at: datetime
    message: str

    class Config:
        orm_mode = True
