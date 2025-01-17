const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Notification schema
const notificationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user receiving the notification
    required: true,
  },
  message: {
    type: String,
    required: true, // The content of the notification
  },
  read: {
    type: Boolean,
    default: false, // Whether the notification has been read
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp of when the notification was created
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
