from admin_app.db.database import Base
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, Text, Numeric
from sqlalchemy.sql import func


class Agents(Base):
    __tablename__ = "agents"

    agent_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    phone = Column(String, nullable=True)
    address = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    credit_limit = Column(Numeric, default=0)
    current_balance = Column(Numeric, default=0)
    agent_username = Column(String, nullable=False, unique=True)
    agent_password_hash = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    created_by = Column(String, nullable=True)
    updated_by = Column(String, nullable=True)