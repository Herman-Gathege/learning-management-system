# backend/app/models/organization.py
from datetime import datetime, timedelta
from ..extensions import db


class Organization(db.Model):
    __tablename__ = "organizations"

    id = db.Column(db.Integer, primary_key=True)

    # 🏷 Core Info
    name = db.Column(db.String(255), nullable=False, unique=True)

    # Optional metadata (keep flexible)
    email = db.Column(db.String(100), nullable=True)
    phone = db.Column(db.String(50), nullable=True)

    # 🧠 LMS-friendly (instead of "business_type")
    type = db.Column(db.String(50), nullable=True)  
    # e.g. school | company | academy

    # -------------------------
    # Subscription (keep it — good for future SaaS)
    # -------------------------
    subscription_status = db.Column(
        db.String(20),
        default="trial"
    )
    # trial | active | suspended | expired

    plan = db.Column(db.String(20), default="starter")

    trial_ends_at = db.Column(
        db.DateTime,
        default=lambda: datetime.utcnow() + timedelta(days=14)
    )

    subscription_ends_at = db.Column(db.DateTime, nullable=True)

    # -------------------------
    # Status
    # -------------------------
    is_active = db.Column(db.Boolean, default=True)

    # -------------------------
    # Timestamps
    # -------------------------
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # -------------------------
    # Relationships
    # -------------------------
    users = db.relationship("User", back_populates="organization")

    # -------------------------
    # Helper Methods
    # -------------------------
    def is_trial_active(self):
        if self.subscription_status != "trial":
            return False
        if not self.trial_ends_at:
            return True
        return datetime.utcnow() < self.trial_ends_at

    def is_subscription_active(self):
        if self.subscription_status == "active":
            if not self.subscription_ends_at:
                return True
            return datetime.utcnow() < self.subscription_ends_at
        return False

    def is_access_allowed(self):
        if not self.is_active:
            return False

        if self.subscription_status == "trial":
            return self.is_trial_active()

        if self.subscription_status == "active":
            return self.is_subscription_active()

        return False  # suspended / expired

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "subscription_status": self.subscription_status,
            "plan": self.plan,
            "is_active": self.is_active,
        }