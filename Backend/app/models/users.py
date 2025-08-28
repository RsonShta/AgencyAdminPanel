# app/models/user.py

from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP
from sqlalchemy.sql import func
from app.database import Base  # Base = declarative_base()

class User(Base):
    __tablename__ = "users"  # Must match your table name

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    email = Column(String, nullable=False, unique=True)
    phone = Column(String, nullable=True)
    password_hash = Column(String, nullable=False)
    password_reset_token = Column(String, nullable=True)
    password_reset_expires = Column(TIMESTAMP(timezone=True), nullable=True)
    mfa_secret = Column(String, nullable=True)
    mfa_enabled = Column(Boolean, default=False)
    last_login = Column(TIMESTAMP(timezone=True), nullable=True)
    is_email_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    failed_login_attempts = Column(Integer, default=0)
    created_by = Column(Integer, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_by = Column(Integer, nullable=True)
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
