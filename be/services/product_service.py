from datetime import datetime
from decimal import Decimal, InvalidOperation
from utils.exceptions import ValidationError, FileSaveError
from werkzeug.utils import secure_filename
import os
import uuid
from config import Config


from repositories.product_repository import (
    get_all_product as repo_get_all_product,
    create_new_product as repo_create_product
)

def get_all_product_service(limit: int=10, offset: int=0, weight: int = 5):
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
            "productImg": unique_filename
        }
        
        new_product = repo_create_product(product_data)
        
        return new_product

    except Exception as e:
        if os.path.exists(save_path):
            os.remove(save_path)
        raise e


