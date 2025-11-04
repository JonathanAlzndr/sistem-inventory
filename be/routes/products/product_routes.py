from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from services.product_service import get_all_product_service, create_product_service, get_product_by_id_service, delete_product_service
from utils.decorators import roles_required
from utils import file_extensions

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
            "sellPrice": p.sellPrice,
            "imgPath": p.productImg

        }
        for p in products
    ]

    return jsonify({"msg": "Success", "productList": result}), 200


@product_bp.route('/', methods=['POST'])
@jwt_required()
@roles_required("Cashier")
def create_product():

    if 'imgPath' not in request.files:
        return jsonify(msg='Image file is not found'), 400
    
    file = request.files['imgPath']

    if file.filename == '':
        return jsonify(msg='No file attached')

    if not file or not file_extensions.allowed_file(file.filename):
        return jsonify(msg='File type not allowed'), 400
    
    form_data = request.form

    create_product_service(form_data=form_data, file=file)

    return jsonify(
        msg="Success to create new product"
    ), 201

@product_bp.route('/<int:productId>', methods=['GET'])
@jwt_required()
@roles_required('Staff')
def get_product_by_id(productId):
    product = get_product_by_id_service(productId)
    
    if product:
        return jsonify({
            "msg": "Success",
            "product": {
                "productId": product.productId,
                "productName": product.productName,
                "receivedDate": product.receivedDate,
                "weight": product.weight,
                "currentStock": product.currentStock,
                "status": product.status,
                "sellPrice": product.sellPrice,
                "purchasePrice": product.purchasePrice,
                "productImg": product.productImg
            }
        }), 200
    else:
        return jsonify({"msg": "Product not found"}), 404

@product_bp.route('/<int:productId>', methods=['DELETE'])
@jwt_required()
@roles_required('Staff')
def delete_product(productId):
    result = delete_product_service(productId)

    if result == True:
        return jsonify({"msg": "Success to delete product"}), 200
    else:
        return jsonify({"msg": "Failed to delete product"}), 404


