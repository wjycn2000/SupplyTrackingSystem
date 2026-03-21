from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models import Item, Supplier
from app.schemas import DashboardOut

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("", response_model=DashboardOut)
async def get_dashboard(db: AsyncSession = Depends(get_db)):
    item_count_result = await db.execute(select(func.count(Item.id)))
    total_item_types = item_count_result.scalar() or 0

    supplier_count_result = await db.execute(select(func.count(Supplier.id)))
    total_suppliers = supplier_count_result.scalar() or 0

    quantity_result = await db.execute(select(func.coalesce(func.sum(Item.quantity), 0)))
    total_quantity = quantity_result.scalar() or 0

    low_stock_result = await db.execute(
        select(func.count(Item.id)).where(
            Item.min_quantity > 0,
            Item.quantity <= Item.min_quantity,
        )
    )
    low_stock_count = low_stock_result.scalar() or 0

    return DashboardOut(
        total_item_types=total_item_types,
        total_suppliers=total_suppliers,
        total_quantity=total_quantity,
        low_stock_count=low_stock_count,
    )
