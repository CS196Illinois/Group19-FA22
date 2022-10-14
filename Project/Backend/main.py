from fastapi import FastAPI

# MongoDB
from pymongo import MongoClient

# import env variables
from config import settings

app = FastAPI()


# connect to MongoDB on application startup
@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(settings.ATLAS_URI)
    app.database = app.mongodb_client[settings.DB_NAME]
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


