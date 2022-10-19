import tweepy, random
from typing import List
from Project.Backend.config import settings


def get_sentiment_data(ticker: str) -> List[dict]:

    auth = tweepy.OAuth2BearerHandler(settings.BEARER_TOKEN)
    api = tweepy.API(auth)

    data = []
    for status in tweepy.Cursor(api.search_tweets, f"${ticker}", count=100, lang="en", result_type="popular").items(300):
        d = {"time": status.created_at,
             "text": status.text,
             "sentiment": random.random()}
        data.append(d)

    return data
