from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


class DBUser(Base):
    __tablename__ = "Users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)
    posts = relationship("DBPost", back_populates="user")


class DBPost(Base):
    __tablename__ = "Posts"
    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String)
    image_url_type = Column(String)
    caption = Column(String)
    timestamp = Column(DateTime)
    user_id = Column(Integer, ForeignKey("Users.id"))
    user = relationship("DBUser", back_populates="posts")
    comments = relationship("DBComment", back_populates="post")


class DBComment(Base):
    __tablename__ = "Comments"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    timestamp = Column(DateTime)
    username = Column(String)
    post_id = Column(Integer, ForeignKey("Posts.id"))
    post = relationship("DBPost", back_populates="comments")
    