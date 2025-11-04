# Product API Specification

## Get All Products

**Description:**  
Retrieve a list of all available products.

**Authorization:**  
Required (Bearer Token)

**Access:**
All Users

### Endpoint : `GET api/products?page=1&size=10&weight=5`

### Query Parameters (Optional)

| Parameter   | Type     | Description                                      |
|--------------|----------|--------------------------------------------------|
| `limit`       | `int`    | Page number for pagination (default: `10`).      |
| `offset`       | `int`    | Number of products per page (default: `0`).    |
| `weight`   | `int` | Filter products by weight.               |

### Response Body (Success):
```json 
{
    "msg": "Success",
    "productList": [
        {
            "productId": "10",
            "productName": "Beras A",
            "receivedDate": "2025-10-25T11:15:33Z",
            "weight": 20,
            "currentStock": 112,
            "status": "Aman",
            "price": "15000.00",
            "imgPath": "image.jpg"
        },
        {
            "productId": "10",
            "productName": "Beras A",
            "receivedDate": "2025-10-25T11:15:33Z",
            "weight": 20,
            "currentStock": 112,
            "status": "Aman",
            "price": "15500.00",
            "imgPath": "image.jpg"
        },
    ],
}
```

### Response Body (Failed):
```json 
{
    "msg": "Failed",
    "productList": []
}
```
---

## Get Product by Id

**Description:**  
Retrieve a product.

**Authorization:**  
Required (Bearer Token)

**Access:**
Staff

### Endpoint : `GET api/products/{productId}`

### Path Variable
| Parameter   | Type | Description |
|--------------|------|-------------|
| `productId`  | `int` | The ID of the product to fetch |

### Response Body (Success) :

``` json 
{
    "msg": "Success",
    "product": 
    {
        "productId": "10",
        "productName": "Beras A",
        "receivedDate": "2025-10-25T11:15:33Z",
        "weight": 20,
        "currentStock": 112,
        "status": "Aman",
        "price": "15500.00",
        "imgPath": "image.jpg"
    }
}
```

---

## Delete Product by Id

**Description:**  
Delete a product by Id

**Authorization:**  
Required (Bearer Token)

**Access:**
Staff

### Endpoint `DELETE api/products/{productId}`

### Path Variable
| Parameter   | Type | Description |
|--------------|------|-------------|
| `productId`  | `int` | The ID of the product to delete |


### Response body (Success):
```json 
{
    "msg": "Success to delete product"
}
```

### Response body (Failed)
```json 
{
    "msg": "Failed to delete product"
}
```

---

## Edit Product by Id

**Description:**  
Update partial or full data for a specific product

**Authorization:**  
Required (Bearer Token)

**Access:**
Staff

### Endpoint `PATCH api/products/{productId}`

### Path Variable

| Parameter | Type   | Required | Description                  |
|-----------|--------|----------|------------------------------|
| `productId`  | `Int` | Yes      | The ID of the product to edit |

#### Request Body (All fields below are optional. Send only the fields you want to update): 
```json
{
    "productName": "Beras A",
    "receivedDate": "2025-10-25T11:15:33Z",
    "weight": 10,
    "currentStock": 12,
    "status": "Aman",
    "sellPrice": "1800.00",
    "purchasePrice": "14000.00"
}
```

### Response body (Success):
``` json
{
    "msg": "Success to update product"
}
```

### Response body (Failed)
``` json
{
    "msg": "Product is not found"
}
```

---

## Create a new Product

**Description:**  
Create a new product.

**Authorization:**  
Required (Bearer Token)

**Access:**
Staff

### Endpoint : `POST api/products`

### Request Body: 
``` json
{
    "productName": "beras A",
    "receivedDate": "2025-10-25T11:15:33Z",
    "weight": 12,
    "currentStock": 13,
    "sellPrice": "15000.00",
    "purchasePrice": "10000.00",
    "imgPath": "image.jpg"
}
```

### Response body (Success):
```json
{
    "msg": "Success to create new product"
}
```

### Response body (Failed)
``` json
{
    "msg": "Failed to create new product"
}
```







