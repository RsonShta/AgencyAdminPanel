from sqlalchemy.orm import Session
from admin_app.models.users import User
from admin_app.models.userRoles import UserRole
from admin_app.models.roles import Role
from admin_app.database.auth import verify_password

def get_user_by_username(db: Session, username: str) -> User | None:
    return db.query(User).filter(User.username == username).first()

def authenticate_user(db: Session, username: str, password: str) -> User | None:
    user = get_user_by_username(db, username)
    if not user:
        return None

    if not verify_password(password, user.password_hash):
        return None

    # fetch role
    role_obj = (
        db.query(Role)
        .join(UserRole, Role.role_id == UserRole.role_id)
        .filter(UserRole.user_id == user.user_id)
        .first()
    )
    user.role = role_obj.name if role_obj else "user"  # attach role dynamically
    return user
