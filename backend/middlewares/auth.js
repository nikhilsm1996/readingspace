const jwt = require('jsonwebtoken');
const User = require('../models/registration-model'); // Path to your User model

const JWT_SECRET = process.env.JWT_SECRET || '123456789ABCDEF'; // Replace fallback in production

const isAuthenticated = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Fetch the user from the database
        const user = await User.findById(decoded.userId).select('name email role seatAssigned');
        if (!user) {
            console.error(`User not found for ID: ${decoded.userId}`);
            return res.status(401).json({ error: 'Authentication failed.' });
        }

        // Attach limited user details to request object, including seatAssigned
        req.user = { 
            id: user._id, 
            name: user.name, 
            email: user.email, 
            role: user.role,
            seatAssigned: user.seatAssigned,
        };
        next();
    } catch (err) {
        console.error('Authentication error:', err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired. Please log in again.' });
        }
        res.status(401).json({ error: 'Invalid token or authentication failed.' });
    }
};

module.exports = isAuthenticated;
