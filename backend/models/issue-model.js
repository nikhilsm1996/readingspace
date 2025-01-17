const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the Issue Schema
const issueSchema = new Schema({
  seatNumber: {
    type: String,
    required: true, // Seat number is required
  },
  title: {
    type: String,
    required: true, // Issue title is required
  },
  description: {
    type: String,
    required: true, // Description of the issue is required
  },
  resolved: {
    type: Boolean,
    default: false, // By default, the issue is unresolved
  },
  createdAt: {
    type: Date,
    default: Date.now, // Time when the issue was reported
  },
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
