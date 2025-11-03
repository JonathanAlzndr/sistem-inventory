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