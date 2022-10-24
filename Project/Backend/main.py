from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Project.Backend.social_media_functions.tweets import get_volume_data, get_sentiment_data

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
def root():
    return {"message": "Hello World"}


@app.get("/api/twitter/sentiment/{ticker}")
def get_twitter_sentiment(ticker: str):
    return get_sentiment_data(ticker)


@app.get("/api/twitter/volume/{ticker}")
def get_twitter_volume(ticker: str):
    return get_volume_data(ticker)
