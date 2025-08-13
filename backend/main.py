# Starting point for the Admin Panel API
# This file initializes the FastAPI application for the admin panel.

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Admin Panel API"}


print("Admin Panel API is running...")