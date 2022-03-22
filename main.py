from fastapi import FastAPI

from db import models
from db.database import engine
from router import user, post

app = FastAPI()


app.include_router(user.router)
app.include_router(post.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}

models.Base.metadata.create_all(engine)
