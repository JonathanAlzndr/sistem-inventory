class ValidationError(Exception):
    def __init__(self, msg="Validation Error"):
        self.msg = msg
        super().__init__(self.msg)

class FileSaveError(Exception):
    def __init__(self, msg="File Save Error"):
        self.msg = msg
        super().__init__(self.msg)

class DatabaseError(Exception):
    def __init__(self, msg="Database Error"):
        self.msg = msg
        super().__init__(self.msg)

class ProductNotFound(Exception):
    def __init__(self, msg="Product not found"):
        self.msg = msg
        super().__init__(self.msg)

class InsufficientStockError(Exception):
    def __init__(self, msg="Insufficient stock", detail=None):
        self.msg = msg
        self.detail = detail
        super().__init__(self.msg)

class TransactionNotFound(Exception):
    def __init__(self, msg="Transaction not found"):
        self.msg = msg
        super().__init__(self.msg)