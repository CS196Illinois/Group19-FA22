import tweepy
from typing import List
from config import settings
from lexicon_based_model import calculate_score


def get_volume_data(ticker: str) -> List[dict]:
    # initialize twitter v2 api
    client = tweepy.Client(settings.BEARER_TOKEN)

    # retrieve volume data about ticker in 24 hour timeframes from the past week
    volume = client.get_recent_tweets_count(f"{ticker.upper()}", granularity="day").data  # type: ignore
    return volume[1:]


def get_sentiment_data(ticker: str) -> List[dict]:

    # initialize twitter v1 api
    auth = tweepy.OAuth2BearerHandler(settings.BEARER_TOKEN)
    api = tweepy.API(auth)

    data = []   # get all the most popular tweets about a ticker
    for status in tweepy.Cursor(api.search_tweets,
                                f"${ticker}",
                                count=100,
                                lang="en",
                                result_type="popular",
                                tweet_mode="extended").items(300):

        # put the data into a dict
        
        d = {"time": status.created_at,
             "text": status.full_text,
             "sentiment": calculate_score(status.full_text)}  # placeholder sentiment function
        data.append(d)

    return data  # return list of tweet dicts
