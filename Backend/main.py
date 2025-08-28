from fastapi import FastAPI
from admin_app.routes import login

app = FastAPI()

app.include_router(login.router)
@app.get("/")
def read_root():
    return {"Start: API Admin Portal is warming up...."}
