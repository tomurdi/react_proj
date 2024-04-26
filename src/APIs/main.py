from fastapi import FastAPI, HTTPException
from typing import List
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware  # for allowing cross-origin requests

origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)


class Question(BaseModel):
    name: str
    age: int
    question: str

class Questions(BaseModel):
    questions: List[Question]

class Target(BaseModel):
    i: int

questions = []
JSON_FILE = "./questions.json"

def load_data_from_file():
    global questions
    try:
        with open(JSON_FILE, "r") as file:
            data = json.load(file)
            questions = [Question(**item_data) for item_data in data]  # Convert JSON data to Item objects
    except FileNotFoundError:
        questions = []

load_data_from_file()


@app.get("/questions")
def get_data():
    return questions

@app.post("/add")
def add(elem: Question):
    questions.append(elem)
    save_data_to_file()
    return "success"

@app.delete("/remove")
def remove(target: Target):
    try:
        removed_item = questions.pop(target.i)
        save_data_to_file()
        return {"message": f"Item '{removed_item.name}' removed successfully"}
    except IndexError:
        raise HTTPException(status_code=404, detail="Item index out of bounds")
    
@app.on_event("shutdown")
def save_data():
    save_data_to_file()

def save_data_to_file():
    global JSON_FILE
    with open(JSON_FILE, "w") as file:
        json.dump([item.dict() for item in questions], file, indent=4) 