from fastapi import FastAPI

from db import models
from db.database import engine
from router import user

app = FastAPI()


app.include_router(user.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}

models.Base.metadata.create_all(engine)
