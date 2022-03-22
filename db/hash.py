from passlib.context import CryptContext


pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated='auto')


class Hash:

    @staticmethod
    def bcrypt(password: str):
        return pwd_cxt.encrypt(password)

    @staticmethod
    def verify_password(hashed_password: str, plain_password: str):
        return pwd_cxt.verify(plain_password, hashed_password)
