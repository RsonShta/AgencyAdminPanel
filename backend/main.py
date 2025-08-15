from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi import FastAPI
from backend.app.db import SessionLocal, engine, Base
from backend.app.routes import auth_routes, users_route, 

# Initialize FastAPI
app = FastAPI(title="Admin Panel API")

# Create tables in DB if they don't exist
Base.metadata.create_all(bind=engine)

# Include API routers
app.include_router(auth_routes.router)

# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to Admin Panel API"}