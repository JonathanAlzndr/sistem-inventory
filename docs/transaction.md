# Transaction API Spec

## Get All Transaction
- **Description:** Get All Transaction
- **Endpoint:** GET /api/transactions
- **Authorization**: Required

- **Query Parameters (Optional):**
  
| Parameter | Type | Description |
|---|---|---|
| `page` | `int` | Page number for pagination (default: 1). |
| `size` | `int` | Number of transaction per page (default: 10). |
| `transactionDate` | `TimeStamp` | Filter transaction by datename. |              


Response Body(Sucess): 
```json{
    "transactionList": [
        {
            "transactionId": 1,
            "transactionDate": "1/2/2025",
            "totalPayment": "15.000",
            "CustomerName": "AbC",
        },
        {
            "transactionId": 1,
            "transactionDate": "1/2/2025",
            "totalPayment": "15.000",
            "CustomerName": "AbC",
        },
    ]
}```


response body (Failed):
```json{
    "msg": "Failed to fetch transaction"
}```


## Create New Transaction

- **Description:** Get All Transaction
- **Endpoint:** GET /api/transactions
- **Authorization**: Required

Request body: 
```json{
    "transactionDate": "1/2/2025",
    "totalPayment": "15.000",
    "CustomerName": "AbC",
}```

Response body(Success):
```json{
    "msg": "Success to create new transaction"
}```

Response body(Failed): 
```json{
    "msg": "Failed to create new transaction"
}``

## Detail Transaction


## Delete Transaction by Id

- **Description:** Delete a transaction by Id
- **Endpoint:** DELETE api/transaction/{transactionId}
- **Authorization:** Required

- ** Request Parameters:**

| Parameter | Type   | Required | Description                  |
|-----------|--------|----------|------------------------------|
| `transactionId`  | `Int` | Yes      | The ID of the transaction to fetch  |


Response body (Success):
```json{
    "msg": "Success to delete transaction"
}```

Response body (Failed)
```json{
    "msg": "Failed to delete transaction"
}```


