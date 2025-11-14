from flask import Blueprint, request, jsonify, url_for
from flask_jwt_extended import jwt_required
from services.product_service import (
    get_all_product_service, 
    create_product_service, 
    get_product_by_id_service, 
    deactivate_product_service, 
    update_product_service
)
from utils.decorators import roles_required
from utils.exceptions import ProductNotFound, ValidationError
from utils import file_extensions
# Tambahkan dua baris ini di atas,
# bersama import-an Anda yang lain
from utils.extensions import db
from models.product import Product

product_bp = Blueprint('product', __name__, url_prefix='/api/products')

def get_image_url(filename):
    if not filename:
        return None
    return url_for('serve_upload', filename=filename, _external=True)

@product_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_products():
    limit = request.args.get('limit', 10, type=int)
    offset = request.args.get('offset', 0, type=int)
    #tambah weight supaya bisa filter kg beras
    weight_filter = request.args.get('weight', type=int)

    
    products = get_all_product_service(
        limit=limit, 
        offset=offset, 
        weight=weight_filter 
    )
    
    result = [
        {

            "productId": p.productId,
            "productName": p.productName,
            "receivedDate": p.receivedDate,
            "weight": p.weight,
            "currentStock": p.currentStock,
            "status": p.status,
            "sellPrice": p.sellPrice,
            "purchasePrice":p.purchasePrice,
            "imgPath": get_image_url(p.productImg),
            "is_available": p.isAvailable
        }
        for p in products
    ]

    return jsonify({"msg": "Success", "productList": result}), 200


@product_bp.route('/weights/', methods=['GET'])
@jwt_required()
def get_unique_weights():
    """
    Endpoint ini mengambil semua nilai 'weight' yang unik 
    dari tabel produk untuk mengisi dropdown filter.
    """
    try:
        # 1. Query ke DB: Ambil 'weight' yang unik (distinct) dan urutkan
        query_result = db.session.query(Product.weight).distinct().order_by(Product.weight)

        # 2. Query_result akan terlihat seperti [(5,), (10,), (50,)]
        #    Kita ubah menjadi list biasa: [5, 10, 50]
        weights = [item[0] for item in query_result.all()]

        # 3. Kirim sebagai JSON
        return jsonify({"msg": "Success", "weights": weights}), 200

    except Exception as e:
        return jsonify(msg=f"Internal server error: {str(e)}"), 500



@product_bp.route('/', methods=['POST'])
@jwt_required()
@roles_required("Staff")
def create_product():
    if 'imgPath' not in request.files:
        return jsonify(msg='Image file is not found'), 400
    
    file = request.files['imgPath']

    if file.filename == '':
        return jsonify(msg='No file attached'), 400

    if not file or not file_extensions.allowed_file(file.filename):
        return jsonify(msg='File type not allowed'), 400
    
    form_data = request.form

    try:
        new_product = create_product_service(form_data=form_data, file=file)
        return jsonify(
            msg="Success to create new product",
            product={
                "productId": new_product.productId,
                "productName": new_product.productName,
                "imgPath": get_image_url(new_product.productImg)
            }
        ), 201
    except (ValidationError, Exception) as e:
        return jsonify(msg=f"Failed to create product: {str(e)}"), 400

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
                "productImg": get_image_url(product.productImg),
                "isAvailable": product.isAvailable
            }
        }), 200
    else:
        return jsonify({"msg": "Product not found"}), 404

@product_bp.route('/<int:productId>/deactivate', methods=['PATCH'])
@jwt_required()
@roles_required('Staff')
def deactivate_product(productId):
    try:
        result = deactivate_product_service(productId)

        if not result:
            return jsonify({"msg": "Product already inactive"}), 200

        return jsonify({"msg": "Product successfully deactivated"}), 200

    except ProductNotFound as e:
        return jsonify({"msg": str(e)}), 404
    except Exception as e:
        return jsonify({"msg": f"Failed to deactivate product: {str(e)}"}), 500

import os # Pastikan ini diimpor jika diperlukan untuk penyimpanan file

@product_bp.route('/<int:productId>', methods=['PATCH'])
@jwt_required()
@roles_required("Staff")
def update_product(productId):
    data = request.form.to_dict() 
    file = request.files.get('imgPath') 

    if not data and not file:
        return jsonify(msg="No data or file provided to update"), 400

    if file:
        if not file_extensions.allowed_file(file.filename):
            return jsonify(msg='File type not allowed'), 400
    
    try:
        updated_product = update_product_service(productId, data, file)
        
        return jsonify(
            msg="Success to update product",
            product={
                "productId": updated_product.productId,
                "productName": updated_product.productName,
                "currentStock": updated_product.currentStock,
                "sellPrice": updated_product.sellPrice,
                "imgPath": get_image_url(updated_product.productImg)
            }
        ), 200

    except ProductNotFound as e:
        return jsonify(msg=str(e)), 404
    except ValidationError as e:
        return jsonify(msg=str(e)), 400
    except Exception as e:
        return jsonify(msg=f"Internal server error: {str(e)}"), 500