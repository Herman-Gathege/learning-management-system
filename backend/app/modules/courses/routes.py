# backend/app/modules/courses/routes.py

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity

from app.extensions import db
from app.models.course import Course
from app.services.mongo_service import courses_collection

course_bp = Blueprint("courses", __name__)

#create course (postgres)
@course_bp.route("", methods=["POST"])
@jwt_required()
def create_course():
    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()

    course = Course(
        title=data.get("title"),
        description=data.get("description"),
        created_by=int(get_jwt_identity()),
        organization_id=claims.get("organization_id")
    )

    db.session.add(course)
    db.session.commit()

    return jsonify(course.to_dict()), 201


#get all courses for organization (postgres)
@course_bp.route("", methods=["GET"])
@jwt_required()
def get_courses():
    claims = get_jwt()

    courses = Course.query.filter_by(
        organization_id=claims.get("organization_id")
    ).all()

    return jsonify([c.to_dict() for c in courses])

    

#add course content (mongodb)
@course_bp.route("/<int:course_id>/content", methods=["POST"])
@jwt_required()
def add_course_content(course_id):
    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()

    courses_collection.update_one(
        {"course_id": course_id},
        {"$set": {"modules": data.get("modules", [])}},
        upsert=True
    )

    return jsonify({"message": "Content saved"})


#get course details with content (postgres + mongodb)
@course_bp.route("/<int:course_id>", methods=["GET"])
@jwt_required()
def get_course(course_id):
    course = Course.query.get(course_id)

    if not course:
        return jsonify({"error": "Not found"}), 404

    content = courses_collection.find_one(
        {"course_id": course_id},
        {"_id": 0}
    )

    return jsonify({
        "course": course.to_dict(),
        "content": content or {}
    })


