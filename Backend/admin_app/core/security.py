# admin_app/security.py
from fastapi.security import OAuth2PasswordBearer

# OAuth2 scheme for token extraction
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

# Token blacklist for logout
revoked_tokens = set()
