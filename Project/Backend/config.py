from pydantic import BaseSettings


class Settings(BaseSettings):
    BEARER_TOKEN: str
    REDDIT_ID: str
    REDDIT_SECRET: str

    class Config:
        env_file = ".env"


settings = Settings()
