import datetime
from pydantic import BaseModel


class TweetSentiment(BaseModel):
    time: datetime.datetime
    text: str
    ticker: str
    sentiment: float
