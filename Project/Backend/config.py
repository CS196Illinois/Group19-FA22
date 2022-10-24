from pydantic import BaseSettings


class Settings(BaseSettings):
    BEARER_TOKEN: str

    class Config:
        env_file = "Project/Backend/.env"


settings = Settings()
