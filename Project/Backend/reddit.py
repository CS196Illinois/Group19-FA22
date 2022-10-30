import praw
from config import settings
from lexicon_based_model import calculate_score

reddit = praw.Reddit(
    client_id=settings.REDDIT_ID,
    client_secret=settings.REDDIT_SECRET,
    user_agent="fastAPI:stock.sentiment.cs124H:v1"
)


def get_title_sentiment(ticker: str):
    for submission in reddit.subreddit("stocks").search(ticker, limit=10, time_filter="week"):
        print(submission.title, submission.created_utc)


if __name__ == "__main__":
    print(get_title_sentiment("twtr OR twitter"))
    