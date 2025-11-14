from utils.extensions import db
from models import Sale, OrderDetail
from sqlalchemy.sql import func
from sqlalchemy.orm import joinedload, selectinload

def get_all_transaction(limit: int = 10, offset: int = 0):
    # return db.session.query(
    #         Sale.saleId,
    #         Sale.saleDate,
    #         Sale.totalPrice,
    #         func.count(OrderDetail.orderDetailId).label("totalItems")
    #     ) \
    #     .join(OrderDetail, Sale.saleId == OrderDetail.saleId) \
    #     .group_by(Sale.saleId) \
    #     .order_by(Sale.saleDate.desc()) \
    #     .offset(offset) \
    #     .limit(limit) \
    #     .all()
      return Sale.query.options(
        selectinload(Sale.order_details) # <-- Ini akan memuat relasi
    ).order_by(
        Sale.saleDate.desc()
    ).offset(offset).limit(limit).all()


def get_transaction_detail_by_id(sale_id: int):
    return Sale.query \
        .options(  
            joinedload(Sale.user),
            selectinload(Sale.order_details).joinedload(OrderDetail.product)
        ) \
        .filter(Sale.saleId == sale_id) \
        .first()