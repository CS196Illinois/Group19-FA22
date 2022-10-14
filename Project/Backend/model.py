from pydantic import BaseModel


class TweetObject(BaseModel):
    id: str
    time: str
    text: str
    sentiment: float
