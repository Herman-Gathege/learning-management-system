# backend/app/modules/learner/routes.py

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

from app.models.course import Course
from app.models.enrollment import Enrollment
from app.models.lesson_progress import LessonProgress
from app.services.mongo_service import courses_collection
from app.extensions import db

learner_bp = Blueprint("learner", __name__)

@learner_bp.route("/courses", methods=["GET"])
@jwt_required()
def get_courses():
    claims = get_jwt()
    org_id = claims.get("organization_id")

    courses = Course.query.filter_by(
        organization_id=org_id
    ).all()

    return jsonify([c.to_dict() for c in courses])


@learner_bp.route("/courses/<int:course_id>", methods=["GET"])
@jwt_required()
def get_course(course_id):
    claims = get_jwt()
    org_id = claims.get("organization_id")

    course = Course.query.filter_by(
        id=course_id,
        organization_id=org_id
    ).first()

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


@learner_bp.route("/courses/<int:course_id>/enroll", methods=["POST"])
@jwt_required()
def enroll(course_id):
    claims = get_jwt()
    user_id = int(get_jwt_identity())
    org_id = claims.get("organization_id")

    # ✅ ensure course belongs to org
    course = Course.query.filter_by(
        id=course_id,
        organization_id=org_id
    ).first()

    if not course:
        return jsonify({"error": "Invalid course"}), 404

    existing = Enrollment.query.filter_by(
        user_id=user_id,
        course_id=course_id
    ).first()

    if existing:
        return jsonify({"message": "Already enrolled"})

    enrollment = Enrollment(
        user_id=user_id,
        course_id=course_id
    )

    db.session.add(enrollment)
    db.session.commit()

    return jsonify({"message": "Enrolled successfully"})


@learner_bp.route("/my-courses", methods=["GET"])
@jwt_required()
def my_courses():
    claims = get_jwt()
    user_id = int(get_jwt_identity())
    org_id = claims.get("organization_id")

    enrollments = Enrollment.query.filter_by(user_id=user_id).all()

    courses = []
    for e in enrollments:
        course = Course.query.filter_by(
            id=e.course_id,
            organization_id=org_id
        ).first()

        if course:
            courses.append(course.to_dict())

    return jsonify(courses)

@learner_bp.route("/courses/<int:course_id>/content", methods=["GET"])
@jwt_required()
def get_course_content(course_id):
    claims = get_jwt()
    user_id = int(get_jwt_identity())
    org_id = claims.get("organization_id")

    # ✅ Ensure course belongs to user's org
    course = Course.query.filter_by(
        id=course_id,
        organization_id=org_id
    ).first()

    if not course:
        return jsonify({"error": "Not found"}), 404

    # ✅ Check enrollment
    enrolled = Enrollment.query.filter_by(
        user_id=user_id,
        course_id=course_id
    ).first()

    if not enrolled:
        return jsonify({"error": "Not enrolled"}), 403

    content = courses_collection.find_one(
        {"course_id": course_id},
        {"_id": 0}
    )

    return jsonify(content or {})

@learner_bp.route("/progress", methods=["POST"])
@jwt_required()
def mark_progress():
    claims = get_jwt()
    user_id = int(get_jwt_identity())
    org_id = claims.get("organization_id")

    data = request.get_json()

    # ✅ Validate course ownership
    course = Course.query.filter_by(
        id=data["course_id"],
        organization_id=org_id
    ).first()

    if not course:
        return jsonify({"error": "Invalid course"}), 404

    # ✅ Ensure user is enrolled
    enrolled = Enrollment.query.filter_by(
        user_id=user_id,
        course_id=data["course_id"]
    ).first()

    if not enrolled:
        return jsonify({"error": "Not enrolled"}), 403

    progress = LessonProgress.query.filter_by(
        user_id=user_id,
        course_id=data["course_id"],
        module_index=data["module_index"],
        lesson_index=data["lesson_index"]
    ).first()

    if not progress:
        progress = LessonProgress(
            user_id=user_id,
            course_id=data["course_id"],
            module_index=data["module_index"],
            lesson_index=data["lesson_index"],
            completed=True
        )
        db.session.add(progress)
    else:
        progress.completed = True

    db.session.commit()

    return jsonify({"message": "Progress saved"})


@learner_bp.route("/progress/<int:course_id>", methods=["GET"])
@jwt_required()
def get_progress(course_id):
    claims = get_jwt()
    user_id = int(get_jwt_identity())
    org_id = claims.get("organization_id")

    # ✅ Validate course
    course = Course.query.filter_by(
        id=course_id,
        organization_id=org_id
    ).first()

    if not course:
        return jsonify({"error": "Not found"}), 404

    progress = LessonProgress.query.filter_by(
        user_id=user_id,
        course_id=course_id
    ).all()

    return jsonify([
        {
            "module_index": p.module_index,
            "lesson_index": p.lesson_index,
            "completed": p.completed
        }
        for p in progress
    ])