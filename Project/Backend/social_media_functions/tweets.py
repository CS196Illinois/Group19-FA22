import tweepy, random
from typing import List
from Project.Backend.config import settings


def get_volume_data(ticker: str) -> List[dict]:
    client = tweepy.Client(settings.BEARER_TOKEN)
    volume = client.get_recent_tweets_count(f"{ticker.upper()}", granularity="day").data
    return volume


def get_sentiment_data(ticker: str) -> List[dict]:

    auth = tweepy.OAuth2BearerHandler(settings.BEARER_TOKEN)
    api = tweepy.API(auth)

    data = []
    for status in tweepy.Cursor(api.search_tweets,
                                f"${ticker}", count=100,
                                lang="en",
                                result_type="popular",
                                tweet_mode="extended").items(300):

        d = {"time": status.created_at,
             "text": status.full_text,
             "sentiment": random.random() * 2 - 1}

        data.append(d)

    return data
