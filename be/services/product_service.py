from datetime import datetime
from decimal import Decimal, InvalidOperation
from utils.exceptions import ValidationError, FileSaveError, ProductNotFound
from werkzeug.utils import secure_filename
import os
from utils.extensions import db
import uuid
from config import Config


from repositories.product_repository import (
    get_all_product as repo_get_all_product,
    create_new_product as repo_create_product,
    get_product_by_id as repo_get_product_by_id,
    delete_product as repo_delete_product
)

def get_all_product_service(limit: int=10, offset: int=0):
    return repo_get_all_product(limit, offset)

def create_product_service(form_data, file):
    
    try:
        product_name = str(form_data['productName'])
        received_date = datetime.fromisoformat(form_data['receivedDate'].replace('Z', '+00:00'))
        weight = int(form_data['weight'])
        current_stock = int(form_data['currentStock'])
        sell_price = Decimal(form_data['sellPrice'])
        purchase_price = Decimal(form_data['purchasePrice'])

        if weight <= 0 or current_stock < 0 or sell_price < 0 or purchase_price < 0:
            raise ValidationError(msg="Nilai numerik tidak boleh negatif")
        
    except KeyError as e:
        raise ValidationError(msg=f"Field form '{e.args[0]}' tidak boleh kosong")
    except (ValueError, TypeError, InvalidOperation):
        raise ValidationError(msg="Tipe data salah untuk salah satu field")

    save_path = ""
    unique_filename = ""
    try:
        safe_name = secure_filename(product_name.replace(' ', '-').lower())
        ext = file.filename.rsplit('.', 1)[1].lower()
        unique_filename = f"{uuid.uuid4()}-{safe_name}.{ext}"

        upload_folder = Config.UPLOAD_FOLDER
        if not upload_folder:
            raise FileSaveError("UPLOAD FOLDER tidak dikonfigurasi")
        
        save_path = os.path.join(upload_folder, unique_filename)

        file.save(save_path)
    except Exception as e:
        raise FileSaveError(msg=str(e))
    
    try:
        product_data = {
            "productName": product_name,
            "receivedDate": received_date,
            "weight": weight,
            "currentStock": current_stock,
            "sellPrice": sell_price,
            "purchasePrice": purchase_price,
            "productImg": unique_filename
        }
        
        new_product = repo_create_product(product_data)
        
        return new_product

    except Exception as e:
        if os.path.exists(save_path):
            os.remove(save_path)
        raise e

def get_product_by_id_service(productId):
    return repo_get_product_by_id(productId)

def delete_product_service(productId):
    return repo_delete_product(productId)

def update_product_service(product_id, update_data):
    product = repo_get_product_by_id(product_id)

    if not product:
        raise ProductNotFound(msg="Product not found") 
    try:
        if "productName" in update_data:
            product.productName = str(update_data["productName"])
            
        if "receivedDate" in update_data:
            product.receivedDate = datetime.fromisoformat(
                update_data["receivedDate"].replace('Z', '+00:00')
            )
            
        if "weight" in update_data:
            weight = int(update_data["weight"])
            if weight <= 0:
                raise ValueError("Weight must be a positive number")
            product.weight = weight
            
        if "currentStock" in update_data:
            stock = int(update_data["currentStock"])
            if stock < 0:
                raise ValueError("Stock cannot be negative")
            product.currentStock = stock

        if "status" in update_data:
            product.status = str(update_data["status"])
            
        if "sellPrice" in update_data:
            price = Decimal(update_data["sellPrice"])
            if price < 0:
                raise ValueError("Selling price cannot be negative")
            product.sellPrice = price
            
        if "purchasePrice" in update_data:
            price = Decimal(update_data["purchasePrice"])
            if price < 0:
                raise ValueError("Purchase price cannot be negative")
            product.purchasePrice = price

        db.session.commit()
        
        return product 

    except (ValueError, TypeError, InvalidOperation) as e:
        db.session.rollback()
        raise ValidationError(msg=f"Invalid data type or value: {e}")
    except Exception as e:
        db.session.rollback()
        raise e