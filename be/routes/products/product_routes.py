from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from services.product_service import get_all_product_service
from utils.decorators import cashier_required

product_bp = Blueprint('product', __name__, url_prefix='/api/products')

@product_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_products():

    limit = request.args.get('limit', 10, type=int)
    offset = request.args.get('offset', 0, type=int)
    weight = request.args.get('weight', 5, type=int)

    products = get_all_product_service(limit, offset, weight)

    result = [
        {
            "productId": p.productId,
            "productName": p.productName,
            "receivedDate": p.receivedDate,
            "weight": p.weight,
            "currentStock": p.currentStock,
            "status": p.status,
            "price": p.price,
            "imgPath": p.productImg
        }
        for p in products
    ]

    return jsonify({"msg": "Success", "productList": result}), 200