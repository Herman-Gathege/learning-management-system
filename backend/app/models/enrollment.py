# backend/app/models/enrollment.py

from app.extensions import db
from datetime import datetime

class Enrollment(db.Model):
    __tablename__ = "enrollments"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"), nullable=False)

    enrolled_at = db.Column(db.DateTime, default=datetime.utcnow)