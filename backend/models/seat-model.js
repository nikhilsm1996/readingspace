const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User= require('../models/registration-model');
const Tier= require('../models/tier-model');

console.log("in seat model")
// Create the Seat  Schema
const seatsSchema = new Schema({
  seatNumber: {
    type: String,
  },
  status: {
    type:String,
    enum: ['vacant', 'blocked'],
    default:'vacant'
    
  },
  tier: {
    type: mongoose.Schema.Types.ObjectId,
    ref:Tier, // Reference to the Tier collection
    required: true
  },
  price: {
    type: Number,
    required: true // Ensure every seat has a price
  },
  deposit: {
    type: Number,
    default: 0 // Optional field for deposit
  },
  userEmail:{
    type:String,
    ref:User,
    default:null,
  
        sparse: true  // Allows null values for unassigned seats
  },
  userName:{
    type:String,
    ref:User,
  }

});


// Create the Seats  model
const SeatsModel = mongoose.model('Seats', seatsSchema);

module.exports = SeatsModel;