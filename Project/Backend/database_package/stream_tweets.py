import tweepy, os
from Project.Backend.database_package.database import post_tweet
from dotenv import load_dotenv

load_dotenv()


class TweetStream(tweepy.StreamingClient):

    def on_connect(self):
        print("connected")

    def on_tweet(self, tweet):
        print(tweet.id)
        print(tweet.text)
        print(tweet.created_at)


if __name__ == "__main__":
    stream_client = TweetStream(os.getenv("BEARER_TOKEN"))
    stream_client.add_rules(tweepy.StreamRule("$MSFT"))
    stream_client.filter(tweet_fields=["created_at"])
