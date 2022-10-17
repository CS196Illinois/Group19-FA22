from .model import TweetObject

import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb+srv://group19:test@cs124h-group19.albxwcm.mongodb.net/test")
database = client.test
collection = database.twitter


async def fetch_all_tweets():
    tweets = []
    cursor = collection.find({})

    async for document in cursor:
        tweets.append(TweetObject(**document))

    return tweets


async def fetch_tweets_by_ticker(ticker):
    tweets = []
    cursor = collection.find({"ticker": ticker})

    async for document in cursor:
        tweets.append(TweetObject(**document))

    return tweets


async def post_tweet(tweet):
    document = tweet
    await collection.insert_one(document)
    return document
