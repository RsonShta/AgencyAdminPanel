from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Start: API Admin Portal is warming up...."}
