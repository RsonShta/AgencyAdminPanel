from sqlalchemy.orm import Session
from admin_app.models.users import User
from admin_app.database.auth import verify_password

############################## USER LOGIN LOGIC ###################################################


def get_user_by_username(db: Session, username: str) -> User | None:
    return db.query(User).filter(User.username == username).first()

def authenticate_user(db: Session, username: str, password: str) -> User | None:
    user = get_user_by_username(db, username)
    if not user:
        return None

    if not verify_password(password, user.password_hash):
        return None

    return user
