from fastapi import Depends
from admin_app.services.auth import get_current_user

@router.get("/protected")
def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": f"Hello {current_user['username']}! This route is protected."}
