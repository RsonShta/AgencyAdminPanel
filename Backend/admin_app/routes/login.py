from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from admin_app.schemas.usersLogin import LoginRequest
from admin_app.database.db import get_db
from admin_app.services.userLogin import authenticate_user
from admin_app.core.jwt_handler import create_access_token
from admin_app.models.userRoles import UserRole
from admin_app.models.roles import Role

###################### USER LOGIN ROUTE ##########################################
router = APIRouter(prefix="/api", tags=["login"])

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    # Authenticate user
    user = authenticate_user(db, request.username, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    # Fetch the role of the authenticated user
    role_obj = (
        db.query(Role)
        .join(UserRole, Role.role_id == UserRole.role_id)
        .filter(UserRole.user_id == user.user_id)
        .first()
    )
    role_name = role_obj.name if role_obj else "superadmin"  # fallback role if none found

    # Create JWT token including user_id, username, and role
    access_token = create_access_token(
        user_id=user.user_id,
        username=user.username,
        role=role_name
    )

    return {
        "status": "success",
        "message": "Login successful",
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
        "role": role_name,
        "access_token": access_token,
        "token_type": "bearer"
    }
