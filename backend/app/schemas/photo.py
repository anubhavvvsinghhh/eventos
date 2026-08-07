from datetime import datetime

from pydantic import BaseModel


class FaceResponse(BaseModel):
    id: int
    photo_id: int
    bounding_box: str
    confidence: float

    class Config:
        orm_mode = True


class PhotoResponse(BaseModel):
    id: int
    event_id: int
    filename: str
    uploaded_at: datetime
    processing_status: str
    processing_started_at: datetime | None = None
    processing_completed_at: datetime | None = None
    face_count: int = 0
    faces: list[FaceResponse] | None = None

    class Config:
        orm_mode = True


class PhotoUploadResponse(PhotoResponse):
    message: str
