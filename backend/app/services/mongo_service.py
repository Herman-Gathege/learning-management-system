# backend/app/services/mongo_service.py
from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGO_URI"))
db = client["lms_db"]

courses_collection = db["course_contents"]