from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.database import get_db
from app.models import Supplier
from app.schemas import SupplierCreate, SupplierUpdate, SupplierOut

router = APIRouter(prefix="/api/suppliers", tags=["suppliers"])


@router.get("", response_model=List[SupplierOut])
async def list_suppliers(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Supplier).order_by(Supplier.id))
    return result.scalars().all()


@router.post("", response_model=SupplierOut, status_code=201)
async def create_supplier(supplier: SupplierCreate, db: AsyncSession = Depends(get_db)):
    db_supplier = Supplier(**supplier.model_dump())
    db.add(db_supplier)
    await db.commit()
    await db.refresh(db_supplier)
    return db_supplier


@router.get("/{supplier_id}", response_model=SupplierOut)
async def get_supplier(supplier_id: int, db: AsyncSession = Depends(get_db)):
    db_supplier = await db.get(Supplier, supplier_id)
    if not db_supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return db_supplier


@router.put("/{supplier_id}", response_model=SupplierOut)
async def update_supplier(supplier_id: int, supplier: SupplierUpdate, db: AsyncSession = Depends(get_db)):
    db_supplier = await db.get(Supplier, supplier_id)
    if not db_supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    for key, value in supplier.model_dump().items():
        setattr(db_supplier, key, value)
    await db.commit()
    await db.refresh(db_supplier)
    return db_supplier


@router.delete("/{supplier_id}", status_code=204)
async def delete_supplier(supplier_id: int, db: AsyncSession = Depends(get_db)):
    db_supplier = await db.get(Supplier, supplier_id)
    if not db_supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    await db.delete(db_supplier)
    await db.commit()
