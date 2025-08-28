from app.db.database import Base
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP
from sqlalchemy.sql import func

class Suppliers(Base):
    __tablename__ = "suppliers"

    supplier_id = Column(Integer, primary_key=True, index=True)
    supplier_name = Column(String, nullable=False)
    supplier_type = Column(String, nullable=False)
    api_endpoint = Column(String, nullable=False)
    api_key = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    supplier_address = Column(String, nullable=True)
    supplier_contact_name = Column(String, nullable=True)
    supplier_contact_number = Column(String, nullable=True)
    supplier_email = Column(String, nullable=True, unique=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    created_by = Column(String, nullable=True)
    updated_by = Column(String, nullable=True)