from utils.extensions import db
from datetime import datetime

class OrderDetail(db.Model):
    """
    Model untuk 'OrderDetail' (sebelumnya 'TransactionDetail').
    """
    __tablename__ = "order_detail" # Nama tabel baru

    orderDetailId = db.Column(db.Integer, primary_key=True) # PK baru
    quantity = db.Column(db.Integer, nullable=False)
    subTotal = db.Column(db.Numeric(10, 2), nullable=False)

    # Foreign Key ke tabel Sale (diperbarui)
    saleId = db.Column(db.Integer, db.ForeignKey('Sale.saleId'), nullable=False)
    
    # Foreign Key ke tabel Product (tidak berubah)
    productId = db.Column(db.Integer, db.ForeignKey('Product.productId'), nullable=False)

    # Relasi diperbarui
    sale = db.relationship("Sale", back_populates="order_details")
    product = db.relationship("Product", back_populates="order_details")

    def __repr__(self):
        return f'<OrderDetail {self.orderDetailId}>'