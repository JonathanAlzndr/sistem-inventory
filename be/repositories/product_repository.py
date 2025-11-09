from utils.extensions import db
from models import Product
from utils.exceptions import ProductNotFound

def get_all_product(limit: int = 10, offset: int = 0, include_unavailable: bool = False):
    query = Product.query
    if not include_unavailable:
        query = query.filter_by(isAvailable=True)
    return query.offset(offset).limit(limit).all()


def create_new_product(data):
    try:
        new_product = Product(
            productName=data['productName'],
            receivedDate=data['receivedDate'],
            weight=data['weight'],
            currentStock=data['currentStock'],
            sellPrice=data['sellPrice'],
            purchasePrice=data['purchasePrice'],
            productImg=data['productImg']
        )
        
        db.session.add(new_product)
        db.session.commit()
        
        return new_product

    except Exception as e:
        db.session.rollback() 
        raise e
    
def get_product_by_id(productId):
    return Product.query.get(productId)

def deactivate_product(productId):
    product = Product.query.get(productId)

    if not product:
        raise ProductNotFound(f"Product with id {productId} not found") 
    
    if not product.isAvailable:
        return False 
    product.isAvailable = False
    db.session.commit()
    return True
