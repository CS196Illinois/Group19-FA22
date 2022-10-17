from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


@app.get("/api/twitter")
async def get_tweets():
    return 1