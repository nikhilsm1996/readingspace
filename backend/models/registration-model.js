const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Seats = require('../models/seat-model'); // Import the Seats model for reference

console.log("User model");

// Create the User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Optional: Trims any extra spaces around the name
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique in the collection
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Basic regex for email validation
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'], // Restricts values to admin or user
  },
  phone: {
    type: String,
    match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number'], // Validates phone number format
    unique: true, // Ensures phone number is unique in the collection
    default: null, // Default to null if no phone number provided
    required: true,
  },
  seat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seats', // Reference to the Seats model
    default: null, // By default, no seat assigned
  },
  seatAssigned: {
    type: Boolean,
    default: false, // Default to false if no seat is assigned
  },
});

// Pre-save hook for password encryption
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create the User model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
