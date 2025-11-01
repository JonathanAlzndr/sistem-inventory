from utils.extensions import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = "Product"

    productId = db.Column(db.Integer, primary_key=True)
    productName = db.Column(db.String(255), nullable=False)
    receivedDate = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow)
    weight = db.Column(db.Integer, nullable=True)
    currentStock = db.Column(db.Integer, nullable=False, default=0)
    status = db.Column(db.String(50), nullable=True)
    sellPrice = db.Column(db.Numeric(10, 2), nullable=False)
    purchasePrice = db.Column(db.Numeric(10, 2), nullable=False)
    productImg = db.Column(db.String(255), nullable=True)

    order_details = db.relationship("OrderDetail", back_populates="product")

    def __repr__(self):
        return f'<Product {self.productName}>'