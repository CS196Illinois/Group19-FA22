from fastapi import FastAPI, Request
from pymongo import MongoClient     # MongoDB
from config import settings         # import env variables
from model import TweetObject       # import tweet object model

app = FastAPI()

# connect to MongoDB on application startup
@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(settings.ATLAS_URI)
    app.database = app.mongodb_client["test"]
    print("Connected to MongoDB database!")


# close connection when app is shutdown
@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()
    print("Disconnected from MongoDB")


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.get("/api/test", response_model=TweetObject)
async def test(request: Request):
    tweet = request.app.database["test"].find(limit=1)
    return tweet

