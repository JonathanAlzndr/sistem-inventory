# Product API Specification

## Get All Products

**Description:**  
Retrieve a list of all available products.

**Authorization:**  
Required (Bearer Token)

### Endpoint : `GET api/products?page=1&size=10&weight=5`

### Query Parameters (Optional)

| Parameter   | Type     | Description                                      |
|--------------|----------|--------------------------------------------------|
| `page`       | `int`    | Page number for pagination (default: `1`).      |
| `size`       | `int`    | Number of products per page (default: `10`).    |
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
            "price": "15000.00"
        },
        {
            "productId": "10",
            "productName": "Beras A",
            "receivedDate": "2025-10-25T11:15:33Z",
            "weight": 20,
            "currentStock": 112,
            "status": "Aman",
            "price": "15500.00"
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
        "price": "15500.00"
    }
}
```

---

## Delete Product by Id

**Description:**  
Delete a product by Id

**Authorization:**  
Required (Bearer Token)

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







