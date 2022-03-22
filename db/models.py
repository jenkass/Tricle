from sqlalchemy import Column, Integer, String

from .database import Base


class DBUser(Base):
    __tablename__ = "Users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)
