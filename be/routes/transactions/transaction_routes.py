from utils.decorators import roles_required
from utils.exceptions import ProductNotFound, ValidationError, InsufficientStockError
from utils import file_extensions
from flask import Blueprint, request, jsonify, url_for
from flask_jwt_extended import jwt_required, get_jwt_identity
from decimal import Decimal
from datetime import datetime
from services.transaction_service import create_new_transaction

transaction_bp = Blueprint('transaction', __name__, url_prefix='/api/transaction')

@transaction_bp.route('/', methods=['POST'])
@jwt_required()
@roles_required('Cashier')
def create_transaction():
    cashier_id = get_jwt_identity()

    data = request.get_json()
    if not data or 'items' not in data or not isinstance(data['items'], list):
        return jsonify(msg="Invalid request: 'items' key (as a list) is required"), 400
    
    items_list = data['items']

    try:
        receipt = create_new_transaction(
            items_list=items_list,
            cashier_id=cashier_id
        )
        
        return jsonify(receipt), 201

    except InsufficientStockError as e:
        return jsonify(msg=e.msg, detail=e.detail), 409 
    except ValidationError as e:
        return jsonify(msg=str(e)), 400
    except Exception as e:
        return jsonify(msg=f"Internal server error: {str(e)}"), 500