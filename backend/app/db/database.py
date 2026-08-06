import os

from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./backend.db")

connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db() -> None:
    from app.db.base import Base

    Base.metadata.create_all(bind=engine)
    if engine.dialect.name == "sqlite":
        inspector = inspect(engine)
        if inspector.has_table("photos"):
            columns = [column["name"] for column in inspector.get_columns("photos")]
            if "filepath" not in columns:
                with engine.connect() as connection:
                    connection.execute(
                        "ALTER TABLE photos ADD COLUMN filepath VARCHAR(255) NOT NULL DEFAULT ''"
                    )
                    connection.commit()
