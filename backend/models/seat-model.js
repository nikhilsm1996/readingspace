const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/registration-model'); // Correct path for User model
const Tier = require('../models/tier-model');

// Create the Seat Schema
const seatsSchema = new Schema({
  seatNumber: {
    type: String,
    required: true, // Ensure that seat number is always provided
  },
  status: {
    type: String,
    enum: ['vacant', 'blocked'],
    default: 'vacant',
  },
  tier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Tier, // Reference to the Tier collection
    required: true,
  },
  price: {
    type: Number,
    required: true, // Ensure every seat has a price
  },
  deposit: {
    type: Number,
    default: 0, // Optional field for deposit
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User', // Correct reference to the User model
    default: null, // Default to null if no user is assigned
  },
  seatAssigned: {
    type: Boolean,
    default: false, // Default to false if no user is assigned
  }
});

// Create the Seats model
const SeatsModel = mongoose.model('Seats', seatsSchema);

module.exports = SeatsModel;
