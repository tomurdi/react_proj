from fastapi import FastAPI, HTTPException
from typing import List
from pydantic import BaseModel
import json

app = FastAPI()

class Item(BaseModel):
    name: str
    weight: float
    expired: bool

class Groceries(BaseModel):
    groceries: List[Item]

class Target(BaseModel):
    i: int

groceries = []
JSON_FILE = "./groceries.json"

def load_data_from_file():
    global groceries
    try:
        with open(JSON_FILE, "r") as file:
            data = json.load(file)
            groceries = [Item(**item_data) for item_data in data]  # Convert JSON data to Item objects
    except FileNotFoundError:
        groceries = []

load_data_from_file()


@app.get("/grocerylist")
def get_data():
    return groceries

@app.post("/add")
def add(elem: Item):
    groceries.append(elem)
    save_data_to_file()
    return "success"

@app.delete("/checkedoff")
def remove(target: Target):
    try:
        removed_item = groceries.pop(target.i)
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
        json.dump([item.dict() for item in groceries], file, indent=4) 