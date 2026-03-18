# Supply Tracking System

A full-stack supply tracking system built with FastAPI, React, and PostgreSQL.

## Stack

- **Backend**: Python 3.12 · FastAPI · SQLAlchemy (async) · Alembic · asyncpg
- **Frontend**: React 18 · Vite · Axios · React Router
- **Database**: PostgreSQL 16

---

## Running with Docker Compose (recommended)

### Prerequisites
- Docker & Docker Compose installed

### Steps

```bash
# 1. Clone / enter the project directory
cd supply-tracking

# 2. Start all services (db + backend + frontend)
docker compose up --build

# Services will be available at:
#   Frontend:  http://localhost:5173
#   Backend:   http://localhost:8000
#   API docs:  http://localhost:8000/docs
```

To stop:
```bash
docker compose down
```

To stop and remove the database volume:
```bash
docker compose down -v
```

---

## Running Locally

### Prerequisites
- Python 3.12+
- Node.js 20+
- PostgreSQL running locally

### Backend

```bash
cd backend

# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and set your DATABASE_URL

# Run migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload --port 8000
```

API docs available at: http://localhost:8000/docs

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Frontend available at: http://localhost:5173

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/dashboard | Dashboard stats |
| GET | /api/items | List all items |
| POST | /api/items | Create item |
| GET | /api/items/{id} | Get item |
| PUT | /api/items/{id} | Update item |
| DELETE | /api/items/{id} | Delete item |
| GET | /api/suppliers | List all suppliers |
| POST | /api/suppliers | Create supplier |
| GET | /api/suppliers/{id} | Get supplier |
| PUT | /api/suppliers/{id} | Update supplier |
| DELETE | /api/suppliers/{id} | Delete supplier |

## Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app + CORS
│   │   ├── config.py        # Settings / env vars
│   │   ├── database.py      # Async engine + session
│   │   ├── models.py        # SQLAlchemy models
│   │   ├── schemas.py       # Pydantic schemas
│   │   └── routers/
│   │       ├── items.py
│   │       ├── suppliers.py
│   │       └── dashboard.py
│   ├── alembic/             # DB migrations
│   ├── requirements.txt
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/client.js    # Axios instance
│   │   ├── pages/           # Dashboard, Items, Suppliers
│   │   ├── components/      # ItemModal, SupplierModal
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```
