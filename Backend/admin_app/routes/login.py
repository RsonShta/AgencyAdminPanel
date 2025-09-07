from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from admin_app.schemas.users import LoginRequest
from admin_app.database.db import get_db
from admin_app.services.userLogin import authenticate_user


###################### USER LOGIN ROUTE ##########################################
router = APIRouter(prefix="/api", tags=["login"])

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, request.username, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return {
        "status": "success",
        "message": "Login successful",
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
    }
