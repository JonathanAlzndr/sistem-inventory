from utils.extensions import db
from datetime import datetime

class User(db.Model):
    __tablename__ = "User"

    userId = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)

    # Relasi diperbarui: menunjuk ke 'Sale' dan 'back_populates'
    sales = db.relationship("Sale", back_populates="user")

    def __repr__(self):
        return f'<User {self.username}>'