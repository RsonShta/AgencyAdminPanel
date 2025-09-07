from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    #Database
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: int
    DB_NAME: str
    DB_SCHEMA: str

    # #JWT
    # SECRET_KEY: str
    # ALGORITHM: str
    # ACCESS_TOKEN_EXPIRE_MINUTES: int

    class Config:
        env_file = ".env"

settings = Settings()

# Those key and values .env file should be match in config file respectively