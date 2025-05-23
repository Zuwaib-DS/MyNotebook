const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: 'Please authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate using a valid token' + error.message });
    }
};

module.exports = authenticateUser;