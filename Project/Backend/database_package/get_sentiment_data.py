import asyncio, os, tweepy
from dotenv import load_dotenv

load_dotenv()

async def get_sentiment_data(ticker: str) -> dict:
    auth = tweepy.OAuth2BearerHandler(os.getenv("BEARER_TOKEN"))
    api = tweepy.API(auth)
    tweets = api.search_tweets(f"${ticker}", lang="en", result_type="recent", count=1)
    tweet = tweets[0]._json

    d = {"tweet_id": tweet["id_str"],
         "time": tweet["created_at"],
         "text": tweet["text"],
         "ticker": ticker,
         "sentiment": 0.5}

    return d
