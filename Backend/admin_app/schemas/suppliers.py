# admin_app/schemas/suppliers.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class SupplierBase(BaseModel):
    supplier_name: str
    supplier_type: str
    api_endpoint: str
    api_key: Optional[str] = None
    is_active: Optional[bool] = True
    supplier_address: Optional[str] = None
    supplier_contact_name: Optional[str] = None
    supplier_contact_number: Optional[str] = None
    supplier_email: Optional[EmailStr] = None

class SupplierCreate(SupplierBase):
    pass  # all fields already optional/required in base

class SupplierUpdate(BaseModel):
    supplier_name: Optional[str] = None
    supplier_type: Optional[str] = None
    api_endpoint: Optional[str] = None
    api_key: Optional[str] = None
    is_active: Optional[bool] = None
    supplier_address: Optional[str] = None
    supplier_contact_name: Optional[str] = None
    supplier_contact_number: Optional[str] = None
    supplier_email: Optional[EmailStr] = None

class SupplierRead(SupplierBase):
    supplier_id: int
    created_at: datetime
    updated_at: datetime
    created_by: Optional[str] = None
    updated_by: Optional[str] = None

    class Config:
        orm_mode = True
