# User API Specification

## Login

**Description:**
User login to the system

**Access:**
All Users

### Endpoint : `POST /api/auth/login`

#### Request Body :
```json
{
    "username": "John Doe",
    "password": "secret",
} 
```

#### Response Body (Success) :
```json
{
    "msg": "success",
    "token": "jwt"
}
```

#### Response Body (Failed) :
```json 
{
    "msg": "Invalid username or password"
}
```


