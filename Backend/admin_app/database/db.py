from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker, declarative_base
from admin_app.core.config import settings
from urllib.parse import quote_plus

password = quote_plus(settings.DB_PASSWORD)  # encodes special chars

DATABASE_URL = (
    f"postgresql+psycopg2://{settings.DB_USER}:{password}"
    f"@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"
)


# Metadata with schema
metadata_obj = MetaData(schema=settings.DB_SCHEMA)

# Engine
engine = create_engine(DATABASE_URL, echo=True)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for ORM models (all models must inherit this)
Base = declarative_base(metadata=metadata_obj)

# Dependency for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
