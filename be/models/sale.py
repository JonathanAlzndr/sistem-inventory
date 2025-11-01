from datetime import datetime
from utils.extensions import db

class Sale(db.Model):

    __tablename__ = "Sale" 

    saleId = db.Column(db.Integer, primary_key=True) 
    saleDate = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow) 
    totalPrice = db.Column(db.Numeric(10, 2), nullable=False)

    userId = db.Column(db.Integer, db.ForeignKey('User.userId'), nullable=False)

    user = db.relationship("User", back_populates="sales")
    order_details = db.relationship("OrderDetail", 
                                    back_populates="sale", 
                                    cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Sale {self.saleId}>'