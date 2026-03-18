import asyncio
from app.database import AsyncSessionLocal as async_session
from app.models import Item, Supplier

suppliers = [
    Supplier(name="Acme Corp", contact_person="John Smith", email="john@acme.com", phone="555-1001", address="123 Main St, New York, NY"),
    Supplier(name="Global Supplies Ltd", contact_person="Sarah Lee", email="sarah@globalsupplies.com", phone="555-1002", address="456 Oak Ave, Chicago, IL"),
    Supplier(name="FastParts Inc", contact_person="Mike Johnson", email="mike@fastparts.com", phone="555-1003", address="789 Pine Rd, Houston, TX"),
]

items = [
    Item(name="Cardboard Boxes (Large)", category="Packaging", quantity=200, unit="pcs", description="Large cardboard boxes for shipping"),
    Item(name="Bubble Wrap", category="Packaging", quantity=50, unit="rolls", description="Protective bubble wrap"),
    Item(name="Packing Tape", category="Packaging", quantity=100, unit="rolls", description="Heavy duty packing tape"),
    Item(name="Printer Paper A4", category="Office", quantity=500, unit="reams", description="Standard A4 printer paper"),
    Item(name="Ballpoint Pens", category="Office", quantity=300, unit="pcs", description="Blue ballpoint pens"),
    Item(name="Staples", category="Office", quantity=40, unit="boxes", description="Standard staples for stapler"),
    Item(name="Latex Gloves", category="Safety", quantity=150, unit="boxes", description="Disposable latex gloves, medium size"),
    Item(name="Safety Helmets", category="Safety", quantity=25, unit="pcs", description="Hard hats for warehouse use"),
    Item(name="Hand Sanitizer", category="Safety", quantity=60, unit="bottles", description="500ml hand sanitizer bottles"),
    Item(name="AA Batteries", category="Electronics", quantity=80, unit="packs", description="AA batteries, 4-pack"),
]

async def seed():
    async with async_session() as session:
        session.add_all(suppliers)
        session.add_all(items)
        await session.commit()
    print(f"✅ Seeded {len(suppliers)} suppliers and {len(items)} items.")

asyncio.run(seed())
