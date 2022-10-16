from fastapi import FastAPI
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


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{input}")
async def say_hello(input: str):
    example = vectorizer.transform([input])
    return {"message": classifier.predict(example)}


