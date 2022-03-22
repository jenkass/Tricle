from sqlalchemy.orm import Session

from db.models import DBUser
from router.schemas import UserBase


def create_user(db: Session, request: UserBase):
    new_user = DBUser(username=request.username,
                      email=request.email,
                      password=request.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
