const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory data storage
let users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        orders: [
            { id: 101, product: 'Product A', quantity: 2 },
            { id: 102, product: 'Product B', quantity: 1 }
        ]
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        orders: [
            { id: 201, product: 'Product C', quantity: 3 },
            { id: 202, product: 'Product D', quantity: 1 }
        ]
    }
];

// GET endpoint to fetch all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET endpoint to fetch a user by ID
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// POST endpoint to add a new user with or without orders
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    
    if (Array.isArray(newUser.orders)) {
        // Add user with orders
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        // Add user without orders
        newUser.orders = [];
        users.push(newUser);
        res.status(201).json(newUser);
    }
});

// POST endpoint to add a new user with or without orders
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    
    if (!Array.isArray(newUser.orders)) {
        newUser.orders = [];
    }

    users.push(newUser);
    res.status(201).json(newUser);
});



// PUT endpoint to replace a user by ID
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateUser = req.body;
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    updateUser.id = id;
    updateUser.orders = users[index].orders;
    users[index] = updateUser;
    res.json(updateUser);
});

// PATCH endpoint to update a user by ID
app.patch('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateUser = req.body;
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users[index] = { ...users[index], ...updateUser };
    res.json(users[index]);
});

// DELETE endpoint to delete a user by ID
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(index, 1);
    res.sendStatus(204);
});

// POST endpoint to add a new order for a user
app.post('/api/users/:userId/orders', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const newOrder = req.body;
    newOrder.id = user.orders.length + 1;
    user.orders.push(newOrder);
    res.status(201).json(newOrder);
});

// PUT endpoint to replace an order for a user by ID
app.put('/api/users/:userId/orders/:orderId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const orderId = parseInt(req.params.orderId);
    const user = users.find(user => user.id === userId);
    if (!user || !Array.isArray(user.orders)) {
        return res.status(404).json({ error: 'User or orders array not found' });
    }
    const index = user.orders.findIndex(order => order.id === orderId);
    if (index === -1) {
        return res.status(404).json({ error: 'Order not found' });
    }
    const updatedOrder = req.body;
    updatedOrder.id = orderId;
    user.orders[index] = updatedOrder;
    res.json(updatedOrder);
});

// PATCH endpoint to update an order for a user by ID
app.patch('/api/users/:userId/orders/:orderId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const orderId = parseInt(req.params.orderId);
    const user = users.find(user => user.id === userId);
    if (!user || !Array.isArray(user.orders)) {
        return res.status(404).json({ error: 'User or orders array not found' });
    }
    const index = user.orders.findIndex(order => order.id === orderId);
    if (index === -1) {
        return res.status(404).json({ error: 'Order not found' });
    }
    user.orders[index] = { ...user.orders[index], ...req.body };
    res.json(user.orders[index]);
});

// DELETE endpoint to delete an order for a user by ID
app.delete('/api/users/:userId/orders/:orderId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const orderId = parseInt(req.params.orderId);
    const user = users.find(user => user.id === userId);
    if (!user || !Array.isArray(user.orders)) {
        return res.status(404).json({ error: 'User or orders array not found' });
    }
    const index = user.orders.findIndex(order => order.id === orderId);
    if (index === -1) {
        return res.status(404).json({ error: 'Order not found' });
    }
    user.orders.splice(index, 1);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
