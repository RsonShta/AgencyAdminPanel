# admin_app/routes/login.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from admin_app.schemas.users import LoginRequest
from admin_app.database.db import get_db
from admin_app.models.users import User

router = APIRouter(prefix="/api", tags=["login"])

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == request.username).first()
    if not user:
        return {"status": "fail", "message": "User not found in DB"}

    # just return user info for now (no password check yet)
    return {
        "status": "success",
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
        "is_active": user.is_active,
        "is_verified": user.is_email_verified
    }
