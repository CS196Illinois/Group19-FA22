import praw
from Project.Backend.config import settings

reddit = praw.Reddit(
    client_id=settings.REDDIT_ID,
    client_secret=settings.REDDIT_SECRET,
    user_agent="fastAPI:stock.sentiment.cs124H:v1"
)

print(reddit.read_only)

for submission in reddit.subreddit("stocks").hot(limit=10):
    print(submission.title)
    