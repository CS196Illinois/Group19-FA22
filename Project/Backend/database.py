from model import TweetObject
from config import settings

import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient(settings.ATLAS_URI)
database = client.test
collection = database.twitter


async def fetch_all_tweets():
    tweets = []
    cursor = collection.find({})

    async for document in cursor:
        tweets.append(TweetObject(**document))

    return tweets


async def post_tweet(tweet):
    document = tweet
    await collection.insert_one(document)
    return document
