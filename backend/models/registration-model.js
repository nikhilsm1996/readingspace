const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcryptjs')

console.log("user model")
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

userSchema.pre('save', async function (next) {
  
  if (this.password !== this.confirmPassword) {
    return next(new Error('Password and confirm password must match'));
  }

  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


// Create the User model
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;