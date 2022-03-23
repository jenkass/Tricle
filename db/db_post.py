from datetime import datetime
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from db.models import DBPost
from router.schemas import PostBase


def create_post(db: Session, request: PostBase):
    new_post = DBPost(image_url=request.image_url,
                      image_url_type=request.image_url_type,
                      caption=request.caption,
                      timestamp=datetime.now(),
                      user_id=request.user_id)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_all_posts(db: Session):
    return db.query(DBPost).all()


def delete_post(db: Session, id: int, user_id: int):
    post = db.query(DBPost).filter(DBPost.id == id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post with id {id} not found")
    if post.user_id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Only post creator can delete post")
    db.delete(post)
    db.commit()
    return "ok"
