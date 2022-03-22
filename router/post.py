from fastapi import APIRouter, Depends, HTTPException, status
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
