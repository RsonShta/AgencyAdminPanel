from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from admin_app.database.db import get_db
from admin_app.schemas.suppliers import SupplierResponse
from admin_app.services.getSuppliers import get_suppliers as get_suppliers_service
from typing import List

router = APIRouter(prefix="/api", tags=["suppliers"])

@router.get("/getSuppliers", response_model=List[SupplierResponse])
def get_suppliers_route(db: Session = Depends(get_db)):
    return get_suppliers_service(db)