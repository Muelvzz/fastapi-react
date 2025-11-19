# This is responsible for creating the database using PostgresSQL
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_HOSTNAME=os.getenv("DATABASE_HOSTNAME")
DATABASE_PASSWORD=os.getenv("DATABASE_PASSWORD")
DATABASE_NAME=os.getenv("DATABASE_NAME")

DATABASE_URL = f"postgresql://postgres:{DATABASE_PASSWORD}@{DATABASE_HOSTNAME}:5432/{DATABASE_NAME}"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# starting/creating the database
def get_db():
    db = SessionLocal()
    try:
        yield db
        print("Database connected successfully!")
    finally:
        db.close()
        print("Database closed...")