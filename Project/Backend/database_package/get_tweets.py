import asyncio, os, tweepy
from dotenv import load_dotenv
from Project.Backend.database_package.database import post_tweet

load_dotenv()

auth = tweepy.OAuth2BearerHandler(os.getenv("BEARER_TOKEN"))
api = tweepy.API(auth)

tweets = api.search_tweets("$aapl -is:retweet", lang="en", result_type="recent", count=1)
tweet = tweets[0]._json
print(tweet.keys())

d = {"tweet_id": tweet["id_str"],
     "time": tweet["created_at"],
     "text": tweet["text"],
     "ticker": "aapl",
     "sentiment": 0.5}

print(d)
asyncio.run(post_tweet(d))