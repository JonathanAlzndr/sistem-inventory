from datetime import datetime
from utils.extensions import db

class Sale(db.Model):
    """
    Model untuk 'Sale' (sebelumnya 'Transaction').
    """
    __tablename__ = "Sale" # Nama tabel baru

    saleId = db.Column(db.Integer, primary_key=True) # PK baru
    saleDate = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow) # Kolom baru
    totalPrice = db.Column(db.Numeric(10, 2), nullable=False)
    
    # Foreign Key ke tabel User (tidak berubah)
    userId = db.Column(db.Integer, db.ForeignKey('User.userId'), nullable=False)

    # Relasi diperbarui
    user = db.relationship("User", back_populates="sales")
    order_details = db.relationship("OrderDetail", 
                                    back_populates="sale", 
                                    cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Sale {self.saleId}>'