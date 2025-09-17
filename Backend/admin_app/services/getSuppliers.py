from admin_app.models.suppliers import Suppliers
from admin_app.database.db import get_db
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

def get_suppliers(db: Session):
    return db.query(Suppliers).all()

def get_supplier(db: Session, supplier_id: int):
    supplier = db.query(Suppliers).filter(Suppliers.supplier_id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier