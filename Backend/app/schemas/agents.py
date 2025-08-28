# app/schemas/agents.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from decimal import Decimal

class AgentBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    address: Optional[str] = None
    is_active: Optional[bool] = True
    credit_limit: Optional[Decimal] = 0
    current_balance: Optional[Decimal] = 0
    agent_username: str

class AgentCreate(AgentBase):
    agent_password: str  # plaintext password input, will hash in backend

class AgentUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    is_active: Optional[bool] = None
    credit_limit: Optional[Decimal] = None
    current_balance: Optional[Decimal] = None

class AgentRead(AgentBase):
    agent_id: int
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None
    updated_by: Optional[str] = None

    class Config:
        orm_mode = True
