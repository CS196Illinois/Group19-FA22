import tweepy
from typing import List
from Project.Backend.config import settings


def get_volume_data(ticker: str) -> List[dict]:
    client = tweepy.Client(settings.BEARER_TOKEN)
    volume = client.get_recent_tweets_count(f"{ticker.upper()}", granularity="day").data
    return volume
