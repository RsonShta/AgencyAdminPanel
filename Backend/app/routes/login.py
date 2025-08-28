#all routing will be from here for user
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.users import LoginRequest
from app.database.db import get_db
from app.services.users_service import authenticate_superadmin
from app.core.security import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta

router = APIRouter(prefix="/api", tags=["login"])     # all routes starts with /api || tags is for auto-documentation
