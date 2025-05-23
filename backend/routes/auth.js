const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Dummy user for demonstration
// const users = [
//     { id: 1, email: 'test@example.com', password: bcrypt.hashSync('password123', 10) }
// ];

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Login route
router.post('/', async (req, res) => {
    console.log('Received request to login user:', req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Protected route example
router.get('/api/me', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) return res.sendStatus(404);
    res.json({ id: user.id, email: user.email });
});

module.exports = router;