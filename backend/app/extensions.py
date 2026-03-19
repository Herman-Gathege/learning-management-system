# backend/app/extensions.py
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

from pymongo import MongoClient
import os

mongo_client = None
mongo_db = None

def init_mongo(app):
    global mongo_client, mongo_db

    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        raise RuntimeError("MONGO_URI is not set")

    mongo_client = MongoClient(mongo_uri)
    mongo_db = mongo_client.get_default_database()