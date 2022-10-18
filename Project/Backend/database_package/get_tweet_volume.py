import tweepy, os, pprint
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

client = tweepy.Client(os.getenv("BEARER_TOKEN"))

volume = client.get_recent_tweets_count("aapl")
df = pd.DataFrame(volume.data)
print(df)
df.plot.bar(x="end", y="tweet_count")
