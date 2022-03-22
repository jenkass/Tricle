from datetime import datetime

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
