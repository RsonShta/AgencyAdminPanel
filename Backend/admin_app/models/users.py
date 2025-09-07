from sqlalchemy import Boolean, TIMESTAMP, String, Integer
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from admin_app.database.db import Base  # declarative_base()

class User(Base):
    __tablename__ = "users"

    user_id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    first_name: Mapped[str | None] = mapped_column(String, nullable=True)
    last_name: Mapped[str | None] = mapped_column(String, nullable=True)
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    phone: Mapped[str | None] = mapped_column(String, nullable=True)
    password_hash: Mapped[str] = mapped_column(String, nullable=False)
    password_reset_token: Mapped[str | None] = mapped_column(String, nullable=True)
    password_reset_expires: Mapped[TIMESTAMP | None] = mapped_column(TIMESTAMP(timezone=True), nullable=True)
    mfa_secret: Mapped[str | None] = mapped_column(String, nullable=True)
    mfa_enabled: Mapped[bool] = mapped_column(Boolean, default=False)
    last_login: Mapped[TIMESTAMP | None] = mapped_column(TIMESTAMP(timezone=True), nullable=True)
    is_email_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    failed_login_attempts: Mapped[int] = mapped_column(Integer, default=0)
    created_by: Mapped[int | None] = mapped_column(Integer, nullable=True)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_by: Mapped[int | None] = mapped_column(Integer, nullable=True)
    updated_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
