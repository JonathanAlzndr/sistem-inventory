import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    UPLOAD_FOLDER=os.path.join(os.path.abspath(os.path.dirname(__file__)), 'uploads')