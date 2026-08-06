# Eventos Backend

This backend is built with FastAPI, SQLAlchemy, and Alembic.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create the database:
   ```bash
   export DATABASE_URL=sqlite:///./backend.db
   python -c "from app.db.database import init_db; init_db()"
   ```
4. Run the app:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## Alembic

- `alembic revision --autogenerate -m "create events table"`
- `alembic upgrade head`
