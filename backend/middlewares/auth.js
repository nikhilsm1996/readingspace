const jwt = require('jsonwebtoken');

const JWT_SECRET = '123456789ABCDEF';  // Make sure to use a strong secret key

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // You can access user information (e.g., req.user.userId)
        next();
    } catch (err) {
        return res.status(400).json({ error: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;