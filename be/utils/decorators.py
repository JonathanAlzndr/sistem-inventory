from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt

def roles_required(*allowed_roles):
    """
    Decorator factory yang membatasi akses ke role tertentu.
    """
    def decorator(fn):
        @wraps(fn)
        # 
        # INI BAGIAN PENTING:
        # PASTIKAN TIDAK ADA 'fn' SEBAGAI ARGUMEN DI BARIS DI BAWAH INI
        #
        def wrapper(*args, **kwargs): 
            
            try:
                # Verifikasi token dulu
                # (Ini sebenarnya tidak perlu jika @jwt_required() sudah dipakai)
                # verify_jwt_in_request() 
                claims = get_jwt()
            except Exception as e:
                return jsonify(msg=f"Token tidak valid: {str(e)}"), 401
            
            # Ambil role pengguna
            user_role = claims.get("role") 
            
            # Cek jika role pengguna TIDAK ADA di daftar yang diizinkan
            if user_role not in allowed_roles:
                allowed = ", ".join(allowed_roles)
                return jsonify(msg=f"Akses ditolak! Role yang diizinkan: {allowed}"), 403
            
            # Jika lolos, jalankan fungsi aslinya ('fn' dari scope atas)
            return fn(*args, **kwargs) # <--- Ini baris yang error
        
        return wrapper
    return decorator