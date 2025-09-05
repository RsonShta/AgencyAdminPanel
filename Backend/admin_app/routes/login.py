from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from admin_app.schemas.users import LoginRequest
from admin_app.database.db import get_db
from admin_app.services.userLogin import authenticate_user

# Create a FastAPI router for login endpoints
router = APIRouter(prefix="/api", tags=["login"])


@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):    # -> Depends(get_db) -> it means get_db function is called before login route is called for db sessions


    # Call service to authenticate user
    user = authenticate_user(db, request.username, request.password_hash)

    # If authentication fails, raise HTTP 401 Unauthorized
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    # Authentication successful, return user details
    return {
        "status": "success",
        "message": "Login successful",
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
        "is_active": user.is_active,
        "is_verified": user.is_email_verified
    }
