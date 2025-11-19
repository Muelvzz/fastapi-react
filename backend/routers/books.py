# this is responsible for creating all the endpoints of our api
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend import models
from backend.schemas import UserCreate, UserOut

from typing import List

router = APIRouter(
    prefix="/books",
    tags=["Users"]
)

@router.get("/", response_model=List[UserOut])
def view_books(db: Session = Depends(get_db)):
    try:
        books = db.query(models.Books).all()
        if not books:
            raise HTTPException(status_code=404, detail="No items to be found")
        return books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=UserOut)
def add_book(user: UserCreate, db: Session = Depends(get_db)):
    try:
        book = models.Books(
            title=user.title,
            author=user.author,
            description=user.description,
            date=user.date,
            image_url=user.image_url,
        )

        db.add(book)
        db.commit()
        db.refresh(book)

        return book

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{book_id}", response_model=UserOut)
def update_book(book_id: int, user: UserCreate, db: Session = Depends(get_db)):
    db_book = db.query(models.Books).filter(models.Books.id == book_id).first()

    if not db_book:
        raise HTTPException(status_code=404, detail="item not found")
    
    db_book.title = user.title
    db_book.author = user.author
    db_book.description = user.description
    db_book.date = user.date
    db_book.image_url = user.image_url
    
    db.commit()
    db.refresh(db_book)
    return db_book

@router.delete("/{book_id}", response_model=UserOut)
def delete_book(book_id: int, db: Session = Depends(get_db)):
    db_book = db.query(models.Books).filter(models.Books.id == book_id).first()

    if not db_book:
        raise HTTPException(status_code=404, detail="item not found")
    
    db.delete(db_book)
    db.commit()
    return db_book