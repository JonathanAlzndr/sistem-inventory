# Product API Spec

## Get All Products
- **Description:** Get All Products
- **Endpoint:** GET /api/products
- **Authorization**: Required

- **Query Parameters (Optional):**
  
| Parameter | Type | Description |
|---|---|---|
| `page` | `int` | Page number for pagination (default: 1). |
| `size` | `int` | Number of products per page (default: 10). |
| `category` | `string` | Filter products by category name. |                  |

### Response Body (Success):
```json {
    "productList": [
        {
            "productName": "abc",
            "receivedDate": "12/10/2025",
            "category": "10kg",
            "currentStock": "20",
            "status": "Aman"
        },
        {
            "productName": "abcd",
            "receivedDate": "12/10/2025",
            "category": "20kg",
            "currentStock": "25",
            "status": "Menipis"
        },
    ]
}```

### Response Body (Failed): 
```json{
    "msg": "Failed to fetch products"
}```


## Delete Product by Id

- **Description:** Delete a product by Id
- **Endpoint:** DELETE api/products/{productId}
- **Authorization:** Required

- ** Request Parameters:**

| Parameter | Type   | Required | Description                  |
|-----------|--------|----------|------------------------------|
| `productId`  | `Int` | Yes      | The ID of the product to fetch  |


Response body (Success):
```json{
    "msg": "Success to delete product"
}```

Response body (Failed)
```json{
    "msg": "Failed to delete product"
}```


## Edit Product 

- **Description:** Delete a product by Id
- **Endpoint:** PATCH api/products/{productId}
- **Authorization:** Required

- ** Request Parameters:**

| Parameter | Type   | Required | Description                  |
|-----------|--------|----------|------------------------------|
| `productId`  | `Int` | Yes      | The ID of the product to edit |

Request Body: 
```json{
    "productName": "Beras A",
    "status": "Aman",
    "category": "10kg",
    "stok": 10,
}```

Response body (Success):
```json{
    "msg": "Success to update product"
}```

Response body (Failed)
```json{
    "msg": "Failed to update product"
}```

## Create Product

- **Description:** Create new product
- **Endpoint:** POST api/products/
- **Authorization:** Required

Request Body: 
```json{
    "productName": "Beras A",
    "status": "Aman",
    "category": "10kg",
    "stok": 10,
}```

Response body (Success):
```json{
    "msg": "Success to create new product"
}```

Response body (Failed)
```json{
    "msg": "Failed to create new product"
}```









