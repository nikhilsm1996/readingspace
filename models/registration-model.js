const mongoose = require('mongoose');
const Schema = mongoose.Schema;



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
  confirmPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'], // Restricts values to admin, user, or guest
  },
  phone: {
    type: String,
    match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number'], // Validates phone number format
    unique: true, // Ensures email is unique in the collection
    required: true,
  },
});

// Define a pre-save hook to check if confirmPassword matches the password
userSchema.pre('save', function (next) {
  if (this.password !== this.confirmPassword) {
    return next(new Error('Password and confirm password must match'));
  }
  next();
});

// Create the User model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;