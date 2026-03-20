# backend/app/models/course.py
from app.extensions import db
from datetime import datetime

class Course(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)

    created_by = db.Column(db.Integer, db.ForeignKey("users.id"))
    organization_id = db.Column(db.Integer, db.ForeignKey("organizations.id"))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "created_by": self.created_by,
            "organization_id": self.organization_id,
        }