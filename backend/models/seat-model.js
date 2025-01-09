const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User= require('../models/registration-model');


console.log("in seat model")
// Create the Seat  Schema
const seatsSchema = new Schema({
  seatNumber: {
    type: Number,
  },
  status: {
    type:String,
    enum: ['vacant', 'blocked'],
    default:'vacant'
    
  },
  tier: {
    type:String,
    enum: ['standard', 'premium'],
    default:'standard',
    
  },
  userEmail:{
    type:String,
    ref:User,
    default:null,
    unique: true, // Ensure email is unique across seats
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