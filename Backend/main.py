from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from admin_app.routes import login

app = FastAPI()

origins = ["http://localhost", "http://localhost:5173"]  # remove "*" in production

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login.router)

@app.get("/")
def root():
    return {"Start: API Admin Portal is warming up...."}
