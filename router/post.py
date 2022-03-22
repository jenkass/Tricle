import random
import shutil
import string

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session

from db import db_post
from db.database import get_db
from router.schemas import PostDisplay, PostBase

router = APIRouter(prefix="/posts", tags=["posts"])

image_url_types = ["absolute", "relative"]


@router.post("/create", response_model=PostDisplay)
def create_post(request: PostBase, db: Session = Depends(get_db)):
    if request.image_url_type not in image_url_types:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                            detail="Parameter `image_url_types` can only takes values `absolute` or `relative`.")
    return db_post.create_post(db, request)


@router.get("/all", response_model=list[PostDisplay])
def get_all_posts(db: Session = Depends(get_db)):
    return db_post.get_all_posts(db)


@router.post("/add_image")
def upload_image(image: UploadFile = File(...)):
    letters = string.ascii_letters
    rand_str = ''.join(random.choice(letters) for i in range(6))
    new = f"_{rand_str}."
    filename = new.join(image.filename.rsplit('.', 1))
    path = f"images/{filename}"
    
    with open(path, "w+b") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return {"filename": path}

