# Transaction API Specification

## Create New Transaction

**Description:**  
Create new Transaction

**Authorization:**  
Required (Bearer Token)

**Access:**
Cashier

### Endpoint : `POST api/transaction`

### Request Body: 
```json 
{   
  "items": [
    {
        "productId": 12,
        "jumlah": 2
    },
    {
        "productId": 12,
        "jumlah": 2
    },
  ]
}
```

### Response Body (Success):
```json 
{
  "transactionId": 1,
  "transactionDate": "2025-10-25T11:15:33Z",
  "cashier": "Budi",
  "items": [
    { 
        "productName": "beras A", 
        "sellPrice": "3000.00", 
        "quantity": 2, 
        "subtotal": "6000.00"
    },
    { 
        "productName": "beras B",
        "sellPrice": 12000,
        "quantity": 1, 
        "subtotal": "12000.00"
    }
   ],
   "totalPrice": "18000.00"
}
```

### Response Body (Insufficent Stock):
```json 
{
  "msg": "Insufficient stock for one of the products",
  "detail": {
    "productId": 1,
    "productName": "Beras A",
    "currentStock": 10,
    "requested": 12
   }
}
```
### Response Body (Product Not Found)

``` json 
{
  "error": "Not Found",
  "message": "Produk dengan ID yang diberikan tidak ditemukan.",
  "detail": {
    "product_id": "P-999"
  }
}
```

---

## Get Transactions History

**Description:**  
Retrieve Transaction History

**Authorization:**  
Required (Bearer Token)

**Access:**
Cashier, Owner

### Endpoint: `GET api/transaction`

### Query Parameters (Optional)

| Parameter   | Type     | Description                                      |
|--------------|----------|--------------------------------------------------|
| `page`       | `int`    | Page number for pagination (default: `1`).      |
| `size`       | `int`    | Number of products per page (default: `10`).    |


### Response Body (Success):   
```json 
{  
    "transactionList": [
        {
            "transactionId": 1,
            "transactionDate": "2025-10-25T11:15:33Z",
            "totalItems": 3,
            "totalPrice": "15000.00"
        },
        {
            "transactionId": 1,
            "transactionDate": "2025-10-25T11:15:33Z",
            "totalItems": 3,
            "totalPrice": "15000.00"
        },
    ],
}
```

### Response Body (Failed):
```json 
{
  "msg": "You do not have permission to access this resource."
}
```

---

### Get Transaction Detail

**Description:**  
Get Detail of a Transaction

**Authorization:**  
Required (Bearer Token)

**Access:**
Cashier

### Endpoint: `GET api/transaction/{transactionId}

### Path Variable
| Parameter   | Type | Description |
|--------------|------|-------------|
| `transactionId`  | `int` | The ID of the transaction to fetch |

### Response Body (Success): 
```json 
{
    "transactionId": 1,
    "transactionDate": "2025-10-25T11:15:33Z",
    "cashier": "Budi",
    "items": [
        { 
            "productName": "beras A", 
            "sellPrice": "3000.00", 
            "quantity": 2, 
            "subtotal": "6000.00"
        },
        { 
            "productName": "beras B",
            "sellPrice": 12000,
            "quantity": 1, 
            "subtotal": "12000.00"
        }
    ],
    "totalPrice": "18000.00"
}
```

### Response Body (Failed):
```json 
{
  "msg": "You do not have permission to access this resource."
}
```

---

## Delete Transaction

**Description:**  
Delete a Transaction

**Authorization:**  
Required (Bearer Token)

**Access:**
Cashier

### Response Body (Success):
```json
{
    "msg": "Success to delete transaction"
}
```

### Response Body (Failed):
```json 
{
  "msg": "You do not have permission to access this resource."
}





