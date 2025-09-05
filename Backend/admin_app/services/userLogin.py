from sqlalchemy.orm import Session
from admin_app.models.users import User
import bcrypt

"""
Fetch a user from the database by username.
Returns the User object or None if not found.
"""
def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()



    """
    Authenticate a user.
    - db: database session
    - username: username sent from frontend
    - password_hash: plain password sent from frontend (despite the name)
    """
def authenticate_user(db: Session, username: str, password_hash: str):
    # Get user object from DB by username
    user = get_user_by_username(db, username)
    if not user:
        # No user found
        return None

    # Compare plain password from frontend with hashed password in DB
    if not bcrypt.checkpw(password_hash.encode(), user.password_hash.encode()):
        # Password does not match
        return None

    # Credentials are valid, return user object
    return user
