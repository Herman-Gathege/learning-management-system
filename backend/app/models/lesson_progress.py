# backend/app/models/lesson_progress.py

from app.extensions import db

class LessonProgress(db.Model):
    __tablename__ = "lesson_progress"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, nullable=False)
    course_id = db.Column(db.Integer, nullable=False)

    module_index = db.Column(db.Integer, nullable=False)
    lesson_index = db.Column(db.Integer, nullable=False)

    completed = db.Column(db.Boolean, default=False)