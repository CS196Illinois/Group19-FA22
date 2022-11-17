from pydantic import BaseSettings


class Settings(BaseSettings):
    BEARER_TOKEN: str
    REDDIT_ID: str
    REDDIT_SECRET: str
    POLYGON_API_KEY: str
    FINNHUB_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()
