import os 
from flask import Flask, send_from_directory, current_app
from config import Config
from utils.extensions import db, bcrypt, jwt, migrate
from models.user import User
from models.product import Product
from models.order_detail import OrderDetail
from models.sale import Sale
from routes.auth.auth_routes import auth_bp
from routes.transactions.transaction_routes import transaction_bp
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
    app.register_blueprint(transaction_bp)

    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    @app.route('/uploads/<path:filename>')
    def serve_upload(filename):
        upload_dir = current_app.config.get('UPLOAD_FOLDER')
        
        if not upload_dir:
            upload_dir = os.path.join(current_app.root_path, 'uploads')
            
        return send_from_directory(upload_dir, filename)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)