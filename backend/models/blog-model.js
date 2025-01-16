const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Blog Schema
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true, // To remove any extra spaces
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Will store the URL or file path of the image
    required: true,
  },
  link: {
    type: String, // URL or link for the blog
    required: false, // Optional field for the link
  },
  postedDate: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model, assuming each blog is created by a user
    required: true,
  },
});

// Create the Blog model
const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;
