from datetime import datetime
from pydantic import BaseModel
from typing import Optional


# Item schemas
class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    quantity: int = 0
    unit: Optional[str] = None


class ItemCreate(ItemBase):
    pass


class ItemUpdate(ItemBase):
    pass


class ItemOut(ItemBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Supplier schemas
class SupplierBase(BaseModel):
    name: str
    contact_person: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None


class SupplierCreate(SupplierBase):
    pass


class SupplierUpdate(SupplierBase):
    pass


class SupplierOut(SupplierBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Dashboard schema
class DashboardOut(BaseModel):
    total_item_types: int
    total_suppliers: int
    total_quantity: int
