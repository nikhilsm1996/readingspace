var express = require('express');
var router = express.Router();
const User = require('../models/registration-model'); // Import the User model from the models folder

/* GET All  users listing. */
router.get('/', async (req, res) => {
  try {
    // Use Mongoose's find method to fetch all users
    const users = await User.find();

    // Remove sensitive data (like password) from each user
    users.forEach((user) => {
      user.password = undefined;
      user.confirmPassword = undefined;
    });

    // Return the list of users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// CREATE A USER
router.post('/', async (req, res) => {
  const { name, email, password, confirmPassword, role, phone } = req.body;
  console.log("PWD",password)
      console.log("CON PWD",confirmPassword)
  try {
    // Check if passwords match (additional validation)
    if (password !== confirmPassword) {
      console.log("PWD",password)
      console.log("CON PWD",confirmPassword)
      return res.status(400).json({ error: 'Password and confirm password must match' });
    }
    console.log("PWD 2",password)
    console.log("CON PWD 2",confirmPassword)

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
router.put('/:email', async (req, res) => {
  const { email } = req.params;
  const { name, phone, password, role } = req.body;

  try {
    console.log("inside try")
    // Check if password and confirm password match
    
console.log("just before ops")
    // Find the user by email and update
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Find user by email
      { name, phone, password, role }, // Fields to update
      { new: true, runValidators: true } // Return updated document and run schema validators
    );
    console.log("updated user",User)

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
router.put('/id/:id', async (req, res) => {
  const { id } = req.params; // Get the MongoDB ObjectId from the URL
  const { name, email, phone, password, confirmPassword, role } = req.body; // Get data from the request body

  try {
    // Validate if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Password and confirm password must match' });
    }

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
    updatedUser.confirmPassword = undefined;

    res.status(200).json(updatedUser); // Send the updated user back as the response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Error response
  }
});

// Delete a user by MongoDB ObjectId
router.delete('/id/:id', async (req, res) => {
  const { id } = req.params; // Get the MongoDB ObjectId from the URL

  try {
    // Find and delete the user by ObjectId
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Error response
  }
});

// Delete a user by email
router.delete('/email/:email', async (req, res) => {
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
router.delete('/role/:role', async (req, res) => {
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
