from pydantic import BaseModel


class TweetObject(BaseModel):
    tweet_id: str
    time: str
    text: str
    ticker: str
    sentiment: float
