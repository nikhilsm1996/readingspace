const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Blog Schema
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
  link: {
    type: String, 
    required: false,
  },
  postedDate: {
    type: Date,
    default: Date.now, 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
});

// Create the Blog model
const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;
