from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.database import get_db
from app.models import Item
from app.schemas import ItemCreate, ItemUpdate, ItemOut

router = APIRouter(prefix="/api/items", tags=["items"])


@router.get("", response_model=List[ItemOut])
async def list_items(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Item).order_by(Item.id))
    return result.scalars().all()


@router.post("", response_model=ItemOut, status_code=201)
async def create_item(item: ItemCreate, db: AsyncSession = Depends(get_db)):
    db_item = Item(**item.model_dump())
    db.add(db_item)
    await db.commit()
    await db.refresh(db_item)
    return db_item


@router.get("/{item_id}", response_model=ItemOut)
async def get_item(item_id: int, db: AsyncSession = Depends(get_db)):
    db_item = await db.get(Item, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item


@router.put("/{item_id}", response_model=ItemOut)
async def update_item(item_id: int, item: ItemUpdate, db: AsyncSession = Depends(get_db)):
    db_item = await db.get(Item, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    await db.commit()
    await db.refresh(db_item)
    return db_item


@router.delete("/{item_id}", status_code=204)
async def delete_item(item_id: int, db: AsyncSession = Depends(get_db)):
    db_item = await db.get(Item, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    await db.delete(db_item)
    await db.commit()
