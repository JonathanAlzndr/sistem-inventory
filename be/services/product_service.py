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
    deactivate_product as repo_deactivate_product
)
#tambah weight supaya bisa filter kg beras
def get_all_product_service(limit: int=10, offset: int=0, weight: int=None):
    
    return repo_get_all_product(limit, offset, weight)

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
            "productImg": unique_filename,
        }
        
        new_product = repo_create_product(product_data)
        
        return new_product

    except Exception as e:
        if os.path.exists(save_path):
            os.remove(save_path)
        raise e

def get_product_by_id_service(productId):
    return repo_get_product_by_id(productId)

def deactivate_product_service(productId):
    try:
        result = repo_deactivate_product(productId)
        return result
    except ProductNotFound as e:
        raise e

def save_uploaded_file(file, product_name):
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
        
        return unique_filename
        
    except Exception as e:
        raise FileSaveError(msg=f"Gagal menyimpan file: {str(e)}")

def delete_file_from_disk(filename):
    try:
        upload_folder = Config.UPLOAD_FOLDER
        
        if not upload_folder:
            print("Peringatan: UPLOAD FOLDER tidak dikonfigurasi. Tidak dapat menghapus file.")
            return

        file_path = os.path.join(upload_folder, filename)
        
        if os.path.exists(file_path):
            os.remove(file_path)
        else:
            print(f"Peringatan: File tidak ditemukan di disk untuk dihapus: {file_path}")

    except Exception as e:
        print(f"Error saat mencoba menghapus file {filename}: {str(e)}")

def update_product_service(product_id, update_data, new_image_file):
    product = repo_get_product_by_id(product_id)

    if not product:
        raise ProductNotFound(msg="Product not found") 
    
    old_img_path = product.productImg
    new_img_path_in_db = None
    
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

        if new_image_file:
            new_img_path_in_db = save_uploaded_file(new_image_file, product.productName) 
            product.productImg = new_img_path_in_db
            
        db.session.commit()
        
        if new_img_path_in_db and old_img_path:
            delete_file_from_disk(old_img_path)
        
        return product 

    except (ValueError, TypeError, InvalidOperation, FileSaveError) as e:
        db.session.rollback()
        if new_img_path_in_db:
            delete_file_from_disk(new_img_path_in_db)
        if isinstance(e, FileSaveError):
            raise e
        else:
            raise ValidationError(msg=f"Invalid data type or value: {e}")
            
    except Exception as e:
        db.session.rollback()
        if new_img_path_in_db:
            delete_file_from_disk(new_img_path_in_db)
        raise e