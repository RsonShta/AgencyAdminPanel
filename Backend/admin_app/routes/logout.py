from fastapi import Depends, HTTPException, status, APIRouter
from jose import jwt
from admin_app.database.db import get_db
from sqlalchemy.orm import Session
from admin_app.core.config import settings
from admin_app.core.security import oauth2_scheme
from admin_app.core.security import revoked_tokens

router = APIRouter(prefix="/api", tags=["logout"])

@router.post("/logout")
def logout(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        jti = payload.get("jti")
        revoked_tokens.add(jti)
        return {"status": "success", "message": "Logged out successfully"}
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
