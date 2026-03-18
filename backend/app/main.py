from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import items, suppliers, dashboard

app = FastAPI(title="Supply Tracking API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.router)
app.include_router(suppliers.router)
app.include_router(dashboard.router)


@app.get("/")
async def root():
    return {"message": "Supply Tracking API"}
