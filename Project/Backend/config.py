from pydantic import BaseSettings

# Settings class that holds env variables
class Settings(BaseSettings):
    ATLAS_URI: str

    # reads from .env file
    class Config:
        env_file = ".env"


settings = Settings()