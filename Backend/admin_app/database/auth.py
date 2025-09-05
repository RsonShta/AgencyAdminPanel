import os

from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette.authentication import requires
from starlette import status
from jose import jwt, JWTError
from passlib.context import CryptContext
from models import users

router = APIRouter()

SECRET_KEY = os.getenv( "SECRET_KEY")
ALGORITHM = os.getenv( "ALGORITHM")

bcrypt_context = CryptContext( schemes=["bcrypt"], deprecated="auto")
