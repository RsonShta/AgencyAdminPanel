from pydantic import BaseModel, EmailStr

class User(BaseModel):
    user_id: int
    username: str
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr
    phone: str | None = None
