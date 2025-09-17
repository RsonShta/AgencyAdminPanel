# admin_app/schemas/suppliers.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# ✅ Base schema (common fields)
class SupplierBase(BaseModel):
    supplier_id: int
    supplier_name: str
    supplier_type: str
    api_endpoint: str
    api_key: Optional[str] = None
    is_active: Optional[bool] = True
    supplier_address: Optional[str] = None
    supplier_contact_name: Optional[str] = None
    supplier_contact_number: Optional[str] = None
    supplier_email: Optional[EmailStr] = None

# ✅ For creating a supplier
class SupplierCreate(SupplierBase):
    created_by: Optional[str] = None

# ✅ For updating a supplier
class SupplierUpdate(SupplierBase):
    updated_by: Optional[str] = None

# ✅ For returning supplier details (response model)
class SupplierResponse(SupplierBase):
    created_by: Optional[str] = None
    updated_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True  # allow returning SQLAlchemy objects directly
