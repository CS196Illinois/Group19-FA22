import polygon.exceptions
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from polygon.rest import RESTClient
from dotenv import load_dotenv
import tweets, reddit, os

load_dotenv()

app = FastAPI()
polygon_client = RESTClient(os.getenv("POLYGON_API_KEY"))

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
    validate_ticker(ticker)
    return tweets.get_sentiment_data(ticker)


@app.get("/api/twitter/volume/{ticker}")  # return list of volume for ticker 24 hour timeframes
def get_twitter_volume(ticker: str):
    validate_ticker(ticker)
    return tweets.get_volume_data(ticker)


@app.get("/api/reddit/sentiment/{ticker}")
def get_reddit_sentiment(ticker: str):
    ticker_detail = validate_ticker(ticker)
    return reddit.get_title_sentiment(ticker, ticker_detail.name)


@app.get("/api/validate/{ticker}")
def validate_ticker(ticker: str):
    try:
        return polygon_client.get_ticker_details(ticker.upper())
    except polygon.exceptions.BadResponse:
        raise HTTPException(status_code=400, detail=f"{ticker} is not a valid ticker")


if __name__ == "__main__":
    validate_ticker("")
