from utils.extensions import db
from models.user import User

def get_user_by_username(username):
    return User.query.filter(User.username==username).first()

def create_user(username, password_hash, role):
    user = User(username=username, password=password_hash, role=role)
    db.session.add(user)
    db.session.commit()
    return user