const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/registration-model'); // Replace with the correct path to the User model

const router = express.Router();
const JWT_SECRET = '123456789ABCDEF'; // Replace with a secure key in production

// Login route
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Send the token to the client
        res.status(200).json({
            message: 'Login successful',
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
                seatAssigned: user.seatAssigned, // Include the seatAssigned field
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
});

module.exports = router;