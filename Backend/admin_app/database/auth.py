from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from jose.exceptions import ExpiredSignatureError
from passlib.context import CryptContext
from admin_app.core.config import settings
from admin_app.core.security import revoked_tokens  # import blacklist set
from admin_app.core.security import oauth2_scheme

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash a plain password before storing in DB"""
    return pwd_context.hash(password)

def verify_password(password: str, password_hash: str) -> bool:
    """Verify a plain password against the hashed password"""
    return pwd_context.verify(password, password_hash)

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("user_id")
        username = payload.get("username")
        role = payload.get("role")
        jti = payload.get("jti")

        if not user_id or not username:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )

        # Check blacklist
        if jti in revoked_tokens:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has been revoked"
            )

        return {"user_id": user_id, "username": username, "role": role}

    except ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
