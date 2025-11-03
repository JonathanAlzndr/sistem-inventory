from utils.extensions import db
from models import Product

def get_all_product(limit: int = 10, offset: int = 0, weight=5):
    return Product.query.filter_by(weight=weight).offset(offset=offset).limit(limit=limit)

