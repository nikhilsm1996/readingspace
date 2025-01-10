const jwt = require('jsonwebtoken');
const User = require('../models/registration-model'); // Path to your User model

const JWT_SECRET = '123456789ABCDEF'; // Replace with a secure key in production

const isAdmin = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Fetch the user from the database
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'User not found. Authentication failed.' });
        }

        // Check if the user is an admin
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token or authentication failed.' });
    }
};

module.exports = isAdmin;