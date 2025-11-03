from repositories.product_repository import (
    get_all_product as repo_get_all_product
)

def get_all_product_service(limit: int=10, offset: int=0, weight: int = 5):
    return repo_get_all_product(limit, offset, weight)

