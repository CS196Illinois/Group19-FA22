import tweepy
from typing import List
from config import settings
from lexicon_based_model import calculate_score
from datetime import datetime
from datetime import timedelta


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

    now = datetime.now()
    current_date = datetime(year=now.year, month=now.month, day=now.day)

    data = []   # get all the most popular tweets about a ticker
    for i in range(7):
        current_date = current_date - timedelta(days=1)
        date_string = current_date.isoformat(" ").split()[0]
        count = 0
        scores = 0
        for status in tweepy.Cursor(api.search_tweets,
                                    f"${ticker}",
                                    count=10,
                                    lang="en",
                                    result_type="recent",
                                    tweet_mode="extended",
                                    until=date_string).items(10):

            # put the data into a dict
            count += 1
            scores += calculate_score(status.full_text)

        d = {"time": date_string,
             "sentiment": scores / count}  # placeholder sentiment function
        data.append(d)

    return data  # return list of tweet dicts
