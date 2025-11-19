# this is responsible for a request/response into the frontend

from pydantic import BaseModel

class UserCreate(BaseModel):
    title: str
    author: str
    description: str
    date: int
    image_url: str

    class Config:
        from_attributes: True

class UserOut(BaseModel):
    id: int
    title: str
    author: str
    description: str
    date: int
    image_url: str

    class Config:
        from_attributes: True