from utils.extensions import db
from datetime import datetime

class OrderDetail(db.Model):
    __tablename__ = "order_detail"

    orderDetailId = db.Column(db.Integer, primary_key=True) 
    quantity = db.Column(db.Integer, nullable=False)
    subTotal = db.Column(db.Numeric(10, 2), nullable=False)

    saleId = db.Column(db.Integer, db.ForeignKey('Sale.saleId'), nullable=False)
    
    productId = db.Column(db.Integer, db.ForeignKey('Product.productId'), nullable=False)

    sale = db.relationship("Sale", back_populates="order_details")
    product = db.relationship("Product", back_populates="order_details")

    def __repr__(self):
        return f'<OrderDetail {self.orderDetailId}>'