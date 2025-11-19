from fastapi import FastAPI
from backend.routers import books
from backend.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# This is responsible for creating a table if it did not exist
Base.metadata.create_all(bind=engine)

app.include_router(books.router)

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)