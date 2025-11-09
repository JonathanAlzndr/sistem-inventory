from utils.decorators import roles_required
from utils.exceptions import ValidationError, InsufficientStockError, TransactionNotFound
from utils import file_extensions
from flask import Blueprint, request, jsonify, url_for
from flask_jwt_extended import jwt_required, get_jwt_identity
from decimal import Decimal
from datetime import datetime
from services.transaction_service import create_new_transaction_service, get_all_transactions_service, get_transaction_detail_service, delete_transaction_service

transaction_bp = Blueprint('transaction', __name__, url_prefix='/api/transaction')

@transaction_bp.route('/', methods=['POST'])
@jwt_required()
@roles_required('Cashier')
def create_transaction():
    cashier_id = get_jwt_identity()

    data = request.get_json()
    if not data or 'items' not in data or not isinstance(data['items'], list):
        return jsonify(msg="Invalid request: 'items' key (as a list) is required"), 400
    customer_name = data.get('customerName','').strip()
    
    if not customer_name:
        return jsonify(msg='Customer name is required'), 400
    
    items_list = data['items']

    try:
        receipt = create_new_transaction_service(
            items_list=items_list,
            cashier_id=cashier_id,
            customer_name=customer_name
        )
        
        return jsonify(receipt), 201

    except InsufficientStockError as e:
        return jsonify(msg=e.msg, detail=e.detail), 409 
    except ValidationError as e:
        return jsonify(msg=str(e)), 400
    except Exception as e:
        return jsonify(msg=f"Internal server error: {str(e)}"), 500
    

@transaction_bp.route('/', methods=['GET'])
@jwt_required()
@roles_required('Cashier', 'Owner')
def get_all_transaction():
    limit = request.args.get('limit', 10, type=int)
    offset = request.args.get('offset', 0, type=int)

    transactions = get_all_transactions_service(limit, offset)

    result = [
        {
            "transactionId": t.saleId, 
            "transactionDate": t.saleDate.isoformat(),
            "totalItems": t.totalItems, 
            "totalPrice": str(t.totalPrice)
        }
        for t in transactions
    ]
    
    return jsonify({"transactionList": result}), 200

@transaction_bp.route('/<int:transactionId>', methods=['GET'])
@jwt_required()
@roles_required("Cashier")
def get_transaction_detail(transactionId):
    
    try:
        receipt = get_transaction_detail_service(transactionId)
        return jsonify(receipt), 200

    except TransactionNotFound as e:
        return jsonify(msg=str(e)), 404
    except Exception as e:
        return jsonify(msg=f"Internal server error: {str(e)}"), 500
    
@transaction_bp.route('/<int:transactionId>', methods=['DELETE'])
@jwt_required()
@roles_required("Cashier")
def delete_transaction(transactionId):

    try:
        delete_transaction_service(transactionId)
        return jsonify(msg="Success to delete transaction"), 200

    except TransactionNotFound as e:
        return jsonify(msg=str(e)), 404
    except Exception as e:
        return jsonify(msg=f"Internal server error: {str(e)}"), 500