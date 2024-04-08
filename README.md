### Technologies Used
- Node.js
- Express.js

### Setup Guide

#### 1. Clone the Repository
```sh
git clone https://github.com/your-username/user-management-api.git
cd user-management-api
```

#### 2. Install Dependencies
```sh
npm install
```

#### 3. Start the Server
```sh
npm start
```
The server will start at `http://localhost:3000`.

### API Endpoints

- **GET /api/users:** Get all users.
- **POST /api/users:** Add a new user.
  - Example Request Body:
    ```json
    {
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com",
        "orders": [
            {
                "id": 101,
                "product": "Product A",
                "quantity": 2
            }
        ]
    }
    ```
- **DELETE /api/users/:userId/orders/:orderId:** Delete an order for a specific user.
- **PATCH /api/users/:id:** Update a user's details.
- **PUT /api/users/:id:** Replace a user's details.

### Testing the API

You can use tools like Postman or curl to test the API endpoints. Here are some sample requests:

- **GET /api/users:** Get all users.
- **POST /api/users:** Add a new user.
- **DELETE /api/users/:userId/orders/:orderId:** Delete an order.
- **PATCH /api/users/:id:** Update a user.
- **PUT /api/users/:id:** Replace a user.

### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
