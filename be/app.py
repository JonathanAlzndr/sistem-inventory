from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from utils.extensions import db
from models.user import User
from models.product import Product
from routes.auth.auth_routes import auth_bp
from routes.products.product_routes import product_bp
from utils.extensions import bcrypt, jwt, migrate
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    bcrypt.init_app(app)
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth_bp)
    app.register_blueprint(product_bp)

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)