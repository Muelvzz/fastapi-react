# This is responsible for creating the columns or specific data that the database is going to store
from sqlalchemy import Column, Integer, String
from .database import Base

class Books(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    description = Column(String, nullable=False)
    date = Column(Integer, nullable=False)
    image_url = Column(String, nullable=False)
