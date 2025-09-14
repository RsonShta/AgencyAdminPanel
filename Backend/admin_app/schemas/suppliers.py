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
