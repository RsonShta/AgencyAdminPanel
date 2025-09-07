# admin_app/schemas/users.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class LoginRequest(BaseModel):
    username: str
    password: str