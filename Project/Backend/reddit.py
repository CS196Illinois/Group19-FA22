import praw
from config import settings
from datetime import datetime
from lexicon_based_model import calculate_score

reddit = praw.Reddit(
    client_id=settings.REDDIT_ID,
    client_secret=settings.REDDIT_SECRET,
    user_agent="fastAPI:stock.sentiment.cs124H:v1"
)


def get_title_sentiment(ticker: str, company_name: str):
    common_name = "".join(company_name.split(" ")[:-1])
    data = []
    query = f"(title:{ticker}) OR (title:{company_name})"
    for submission in reddit.subreddit("stocks").search(query, limit=25, time_filter="month"):
        data.append({
            "text": submission.title,
            "sentiment": calculate_score(submission.title),
            "time": str(datetime.fromtimestamp(submission.created_utc))
        })
    return data


if __name__ == '__main__':
    for submission in reddit.subreddit("stocks").search("(title:AAPL) OR (title:apple)", time_filter="month"):
        print(submission.title)
