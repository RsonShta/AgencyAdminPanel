import uuid
from datetime import datetime, timezone, timedelta
from jose import jwt
from admin_app.core.config import settings

def create_access_token(user_id: int, username: str,role: str, expires_delta: int = None):
    payload = {
        "user_id": user_id,     # subject = user id
        "username": username,
        "role": role,
        "jti":str(uuid.uuid4()),
        "exp": datetime.now(timezone.utc) + timedelta(
            minutes=expires_delta or settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
