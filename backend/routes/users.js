var express = require('express');
var router = express.Router();
const User = require('../models/registration-model'); 
const isAuthenticated = require('../middlewares/auth');
const isAdmin = require('../middlewares/adminAuth');
console.log("in user router")

//Get the List of all Users
// Get the List of all Users with populated seat details
router.get('/', isAdmin, async (req, res) => {
  try {
    // Fetch all users and populate the seat details
    const users = await User.find()
      .populate('seat')  // Populate the seat object, which should include its details
      .populate('seat.tier', 'name')  // Populate the tier name in the seat object

    // Return the list of users with populated seat details
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Get Single User by Email ID
router.get('/email/:email', isAdmin, async (req, res) => {
  const { email } = req.params; // Get the email from the request parameters

  try {
    // Find the user by email and exclude the password field
    const user = await User.findOne({ email }).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user details
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// CREATE A USER
router.post('/', async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  
  try {
    // Check if passwords match (additional validation)
    if (!password) {
     
      return res.status(400).json({ error: 'enter Password'  });
    }
    

    // Create a new User object
    const newUser = new User({
      name,
      email,
      password,
      role,
      phone,
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json(newUser); // Return the created user as a response
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
});

//// UPDATE user by email
router.put('/:email',isAuthenticated, async (req, res) => {
  const { email } = req.params;
  const { name, phone, password, role } = req.body;

  try {
   

    // Find the user by email and update
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Find user by email
      { name, phone, password, role }, // Fields to update
      { new: true, runValidators: true } // Return updated document and run schema validators
    );
    

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the updated user data (excluding password)
    updatedUser.password = undefined;
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user by MongoDB ObjectId
router.put('/id/:id',isAdmin, async (req, res) => {
  const { id } = req.params; // Get the MongoDB ObjectId from the URL
  const { name, email, phone, password, role } = req.body; // Get data from the request body

  try {
   
    

    // Find and update the user by ObjectId
    const updatedUser = await User.findByIdAndUpdate(
      id, // Query by ObjectId
      { name, email, phone, password, role }, // Fields to update
      { new: true, runValidators: true } // Return updated document and run schema validations
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the updated user data (excluding sensitive fields like password)
    updatedUser.password = undefined;
   

    res.status(200).json(updatedUser); // Send the updated user back as the response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Error response
  }
});

// Delete a user by MongoDB ObjectId
router.delete('/id/:id',isAdmin, async (req, res) => {
  const { id } = req.params; // Get the MongoDB ObjectId from the URL

  try {
    // Find and delete the user by ObjectId
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
});

// Delete a user by email
router.delete('/email/:email',isAdmin, async (req, res) => {
  const { email } = req.params; // Get the email from the URL

  try {
    // Find and delete the user by email
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Error response
  }
});
// Delete multiple users by a condition (e.g., role)
router.delete('/role/:role',isAdmin, async (req, res) => {
  const { role } = req.params; // Get the role from the URL

  try {
    // Delete users with the given role
    const result = await User.deleteMany({ role });

    res.status(200).json({
      message: `${result.deletedCount} user(s) deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Error response
  }
});




module.exports = router;
