# User API Spec

## Login

Endpoint : POST /api/auth/login

Request Body :
``` json {
    "username": "John Doe",
    "password": "secret123",
}
```

Response Body (Success) :
```json {
    "msg": "success",
    "token": "asdf98rq-we0ruweqjfi"
}```


Response Body (Failed) :
```json {
    "errors": "Invalid username or password"
}```


