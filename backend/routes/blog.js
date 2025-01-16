const express = require('express');
const Blog = require('../models/blog-model');
const User = require("../models/registration-model")
const isAdmin = require('../middlewares/adminAuth');
const upload = require('../multerConfig');

const router = express.Router();



// Route to create a new blog
router.post('/add', isAdmin, upload.single('image'), async (req, res) => {
    const { title, description, link } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
  
    if (!title || !description || !image) {
      return res.status(400).json({ error: 'Title, description, and image are required.' });
    }
  
    try {
      // Create a new blog entry
      const newBlog = new Blog({
        title,
        description,
        image,
        link,
        createdBy: req.user.id, // Store the user ID in the database
      });
  
      // Save the blog to the database
      await newBlog.save();
  
      // Fetch the user's name to include in the response
      const admin = await User.findById(req.user.id).select('name');
  
      res.status(201).json({
        message: 'Blog created successfully.',
        blog: {
          id: newBlog._id,
          title: newBlog.title,
          description: newBlog.description,
          image: newBlog.image,
          link: newBlog.link,
          postedDate: newBlog.postedDate,
          createdBy: {
            id: admin._id,
            name: admin.name, // Include the admin's name in the response
          },
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the blog.' });
    }
  });
  

// Route to get all blogs
router.get('/', async (req, res) => {
    try {
      // Fetch all blogs from the database, populating the createdBy field with the admin's name
      const blogs = await Blog.find()
        .populate({
          path: 'createdBy', // Populate the createdBy field
          select: 'name', // Only include the admin's name
        })
        .sort({ postedDate: -1 }); // Sort by posted date (newest first)
  
      if (blogs.length === 0) {
        return res.status(404).json({ message: 'No blogs found.' });
      }
  
      // Format the blogs to include only necessary details
      const formattedBlogs = blogs.map(blog => ({
        id: blog._id,
        title: blog.title,
        description: blog.description,
        image: blog.image,
        link: blog.link,
        postedDate: blog.postedDate,
        createdBy: {
          id: blog.createdBy?._id,
          name: blog.createdBy?.name || 'Admin', // Fallback if the admin is not found
        },
      }));
  
      res.status(200).json({
        message: 'Blogs fetched successfully.',
        blogs: formattedBlogs,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching blogs.' });
    }
  });
  



// Route to update a blog (admin only)
router.put('/update/:id', isAdmin, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { title, description, link } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
  
    try {
      // Find the blog by ID
      const blog = await Blog.findById(id);
  
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found.' });
      }
  
      // Ensure the logged-in admin created the blog
      if (blog.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized to update this blog.' });
      }
  
      // Update blog details
      blog.title = title || blog.title;
      blog.description = description || blog.description;
      blog.link = link || blog.link;
      blog.image = image || blog.image;
  
      // Save the updated blog
      await blog.save();
  
      // Fetch the admin's name
      const admin = await User.findById(req.user.id).select('name');
  
      res.status(200).json({
        message: 'Blog updated successfully.',
        blog: {
          id: blog._id,
          title: blog.title,
          description: blog.description,
          image: blog.image,
          link: blog.link,
          postedDate: blog.postedDate,
          createdBy: {
            id: admin._id,
            name: admin.name, // Include the admin's name in the response
          },
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the blog.' });
    }
  });
  

  

  // Route to delete a blog 
router.delete('/:id', isAdmin, async (req, res) => {
    const blogId = req.params.id;
  
    try {
      // Find and delete the blog by ID
      const blog = await Blog.findByIdAndDelete(blogId);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found.' });
      }
  
      res.status(200).json({
        message: 'Blog deleted successfully.',
        blog: {
          id: blog._id,
          title: blog.title,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the blog.' });
    }
  });
  


module.exports = router;
