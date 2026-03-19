from flask import Blueprint

debug_bp = Blueprint("debug", __name__)

@debug_bp.route("/test-db")
def test_db():
    from app.models.user import User
    count = User.query.count()
    return {"users": count}

@debug_bp.route("/test-mongo")
def test_mongo():
    from app.services.mongo_service import courses_collection

    courses_collection.insert_one({"test": "working"})
    doc = courses_collection.find_one({"test": "working"}, {"_id": 0})

    return {"mongo": doc}