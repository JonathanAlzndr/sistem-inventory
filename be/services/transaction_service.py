from datetime import datetime, timezone
from decimal import Decimal
from utils.exceptions import ValidationError, InsufficientStockError, TransactionNotFound
from utils.extensions import db
from repositories.auth_repository import get_user_by_id
from repositories.product_repository import get_product_by_id
from repositories.sale_repository import get_all_transaction, get_transaction_detail_by_id
from models import Sale, OrderDetail

def create_new_transaction_service(items_list, cashier_id):
    cashier = get_user_by_id(cashier_id)
    
    if not cashier:
        raise ValidationError(msg="Cashier user not found")
    
    if not items_list:
        raise ValidationError("Items list can not be empty")
    
    processed_items_for_response = []
    total_price = Decimal('0.00')

    try:
        new_sale = Sale(
            userId = cashier_id,
            saleDate=datetime.now(timezone.utc),
            totalPrice=Decimal('0.00') 
        )
        db.session.add(new_sale)
        
        for item in items_list:
            product_id = item.get('productId')
            try:
                requested_qty = int(item.get('jumlah'))
                if requested_qty <= 0:
                    raise ValueError()
            except (ValueError, TypeError):
                raise ValidationError(f"Invalid quantity for productId {product_id}")
            
            product = get_product_by_id(product_id)
            if not product:
                raise ValidationError(f"Product ID {product_id} not found")
            
            if product.currentStock < requested_qty:
                raise InsufficientStockError(
                    msg="Insufficient stock for one of the products",
                    detail={
                        "productId": product.productId,
                        "productName": product.productName,
                        "currentStock": product.currentStock,
                        "requested": requested_qty
                    }
                )
            
            product.currentStock -= requested_qty
            subtotal = product.sellPrice * Decimal(requested_qty)
            total_price += subtotal

            new_detail = OrderDetail(
                sale=new_sale,
                productId=product.productId,
                quantity=requested_qty,
                subTotal=subtotal
            )

            db.session.add(product)
            db.session.add(new_detail)

            processed_items_for_response.append({
                "productName": product.productName,
                "sellPrice": str(product.sellPrice),
                "quantity": requested_qty,
                "subtotal": str(subtotal)
            })

        new_sale.totalPrice = total_price
        db.session.commit()

        return {
            "transactionId": new_sale.saleId,
            "transactionDate": new_sale.saleDate.isoformat(),
            "cashier": cashier.username, 
            "items": processed_items_for_response,
            "totalPrice": str(total_price)
        }
    
    except (InsufficientStockError, ValidationError) as e:
        db.session.rollback()
        raise e
    except Exception as e:
        db.session.rollback()
        raise e
    
def get_all_transactions_service(limit: int=10, offset: int=0):
    return get_all_transaction(limit, offset)

def get_transaction_detail_service(sale_id: int):
    
    sale = get_transaction_detail_by_id(sale_id)
    
    if not sale:
        raise TransactionNotFound(msg="Transaction not found")
    
    items_list = []
    for detail in sale.order_details:
        items_list.append({
            "productName": detail.product.productName,
            "sellPrice": str(detail.product.sellPrice), 
            "quantity": detail.quantity,
            "subtotal": str(detail.subTotal) 
        })

    receipt = {
        "transactionId": sale.saleId,
        "transactionDate": sale.saleDate.isoformat(),
        "cashier": sale.user.username,
        "items": items_list,
        "totalPrice": str(sale.totalPrice)
    }
    
    return receipt

def delete_transaction_service(sale_id: int):
    sale_to_delete = get_transaction_detail_by_id(sale_id)

    if not sale_to_delete:
        raise TransactionNotFound(msg="Transaction not found, cannot delete")

    try:
        for detail in sale_to_delete.order_details:
            product = detail.product 
            if product:
                product.currentStock += detail.quantity
                db.session.add(product) 
        db.session.delete(sale_to_delete)
        db.session.commit()

    except Exception as e:
        db.session.rollback()
        raise e