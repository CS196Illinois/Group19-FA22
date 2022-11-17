from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import tweets, reddit

load_dotenv()

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


@app.get("/")  # test request returns hello world
def root():
    return {"message": "Hello World"}


@app.get("/api/twitter/sentiment/{ticker}")  # return list of tweet objects about ticker with time, text, and sentiment
def get_twitter_sentiment(ticker: str):
    return tweets.get_sentiment_data(ticker)


@app.get("/api/twitter/volume/{ticker}")  # return list of volume for ticker 24 hour timeframes
def get_twitter_volume(ticker: str):
    return tweets.get_volume_data(ticker)


@app.get("/api/reddit/sentiment/{ticker}")
def get_reddit_sentiment(ticker: str, company: str):
    return reddit.get_title_sentiment(ticker, company)

