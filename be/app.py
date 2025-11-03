import os 
from flask import Flask
from config import Config
from utils.extensions import db, bcrypt, jwt, migrate
from models.user import User
from models.product import Product
from models.order_detail import OrderDetail
from models.sale import Sale
from routes.auth.auth_routes import auth_bp
from routes.products.product_routes import product_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    bcrypt.init_app(app)
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth_bp)
    app.register_blueprint(product_bp)

    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)