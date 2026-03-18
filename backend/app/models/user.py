from app.extensions import db
from flask_bcrypt import Bcrypt
from datetime import datetime

bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    full_name = db.Column(db.String(120), nullable=True)  # optional for now
    phone = db.Column(db.String(20), nullable=True)

    role = db.Column(db.String(20), default="learner")  # admin | learner

    # 🔑 Multi-tenant support
    organization_id = db.Column(
        db.Integer,
        db.ForeignKey("organizations.id"),
        nullable=True
    )



    # 🔐 Auth safety
    is_active = db.Column(db.Boolean, default=True)

    # 🕒 Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # 🔗 Relationship (optional but useful)
    organization = db.relationship("Organization", back_populates="users")

    # -------------------------
    # Password Methods
    # -------------------------
    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    # -------------------------
    # Helper (optional but nice)
    # -------------------------
    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "role": self.role,
            "organization_id": self.organization_id,
        }