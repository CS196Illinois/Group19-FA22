from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from Project.Backend.database_package.get_sentiment_data import get_sentiment_data
from Project.Backend.database_package.get_tweet_volume import get_volume_data

import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk
nltk.download("stopwords")
from nltk.corpus import stopwords

f = open('my_classifier.pickle', 'rb')
classifier = pickle.load(f)
f.close()
g = open('my_vectorizer.pickle', 'rb')
vectorizer = pickle.load(g)
g.close()


app = FastAPI()

# urls that can access the backend api
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# test request returns hello world
@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/api/twitter/sentiment/{ticker}")
def get_twitter_sentiment(ticker: str):
    return get_sentiment_data(ticker)


@app.get("/api/twitter/volume/{ticker}")
def get_twitter_volume(ticker: str):
    return get_volume_data(ticker)
