const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Notification schema
const notificationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  message: {
    type: String,
    required: true, 
  },
  read: {
    type: Boolean,
    default: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
