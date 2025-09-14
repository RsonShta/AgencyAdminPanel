from fastapi import APIRouter, Depends, HTTPException, status
from admin_app.database.auth import get_current_user, oauth2_scheme
from admin_app.core.token_blacklist import blacklisted_tokens

router = APIRouter(prefix="/api", tags=["auth"])

@router.post("/logout")
def logout(current_user: dict = Depends(get_current_user), token: str = Depends(oauth2_scheme)):
    """
    Invalidate the JWT token for the current user.
    """
    blacklisted_tokens.add(token)
    return {"status": "success", "message": "Logged out successfully"}
