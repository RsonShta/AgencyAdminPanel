from fastapi import Depends, APIRouter
from admin_app.database.auth import get_current_user

router = APIRouter(prefix="/api", tags=["protected"])
@router.get("/protected")
def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": f"Hello {current_user['username']}! This route is protected."}
