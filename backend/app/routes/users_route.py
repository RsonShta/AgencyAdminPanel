from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.users import User
from backend.app.services import usersLoginServices as users_service
from app.schemas import users as users_schemas
from datetime import timedelta

router = APIRouter(prefix="/api")

ACCESS_TOKEN_EXPIRE_MINUTES = 30

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = await users_service.authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = users_service.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
