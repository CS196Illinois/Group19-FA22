from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Project.Backend.database_package.database import fetch_all_tweets, fetch_tweets_by_ticker

app = FastAPI()

# urls that can access the backend api
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# test request returns hello world
@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/api/twitter")
async def get_tweets():
    return await fetch_all_tweets()


@app.get("/api/twitter{ticker}")
async def get_tweets_ticker(ticker: str):
    return await fetch_tweets_by_ticker(ticker)
