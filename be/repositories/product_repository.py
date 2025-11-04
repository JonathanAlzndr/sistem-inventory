from utils.extensions import db
from models import Product

def get_all_product(limit: int = 10, offset: int = 0, weight=5):
    return Product.query.filter_by(weight=weight).offset(offset=offset).limit(limit=limit)

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

def delete_product(productId):
    product = Product.query.get(productId)

    if not product:
        return False
    
    db.session.delete(product)
    db.session.commit()

    return True