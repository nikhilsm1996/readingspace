const express = require('express');
const Notification = require('../models/notifications-model'); // Notification model
const User = require('../models/registration-model'); // User model
const isAuthenticated = require('../middlewares/auth'); // Authentication middleware
const isAdmin = require('../middlewares/adminAuth'); // Admin middleware
const router = express.Router();

// Route to send notification to all users (excluding admins)
router.post('/send', isAdmin, async (req, res) => {
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }
  
    try {
      // Fetch all users with role 'user'
      const users = await User.find({ role: 'user' }).select('_id'); // Only fetch user IDs
  
      if (!users.length) {
        return res.status(404).json({ error: 'No users found to send notifications.' });
      }
  
      // Create notification documents for each user
      const notifications = users.map((user) => ({
        user: user._id,
        message,
      }));
  
      // Insert notifications into the database
      await Notification.insertMany(notifications);
  
      res.status(200).json({
        message: 'Notifications sent successfully to all users.',
        totalUsersNotified: users.length,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while sending notifications.' });
    }
  });




// Route to get notifications for the logged-in user
// Get all notifications
router.get('/self', isAuthenticated, async (req, res) => {
    try {
      // Fetch notifications and populate the user's name and email
      const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .populate('user', 'name email'); // Populate user details (name and email)
  
      res.status(200).json({
        message: 'Notifications fetched successfully.',
        notifications,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching notifications.' });
    }
  });


// Update a notification by ID
router.put('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ error: 'Message is required for updating the notification.' });
    }
  
    try {
      // Find and update the notification
      const notification = await Notification.findByIdAndUpdate(
        id,
        { message },
        { new: true } // Return the updated document
      );
  
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found.' });
      }
  
      res.status(200).json({
        message: 'Notification updated successfully.',
        notification,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the notification.' });
    }
  });


  // Delete a notification by ID
router.delete('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find and delete the notification
      const notification = await Notification.findByIdAndDelete(id);
  
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found.' });
      }
  
      res.status(200).json({
        message: 'Notification deleted successfully.',
        notification,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the notification.' });
    }
  });
  


  // Route to fetch all notifications sent to the admin
router.get('/admin', isAdmin, async (req, res) => {
  try {
    // Fetch notifications for the logged-in admin
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate('user', 'name email'); // Populate user details (optional)
    
    // If no notifications are found
    if (!notifications.length) {
      return res.status(404).json({
        message: 'No notifications found for the admin.',
      });
    }

    res.status(200).json({
      message: 'Admin notifications fetched successfully.',
      notifications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'An error occurred while fetching admin notifications.',
    });
  }
});





module.exports = router;
