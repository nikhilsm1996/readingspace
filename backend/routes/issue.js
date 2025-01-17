const express = require('express');
const router = express.Router();
const Issue = require('../models/issue-model'); // Import Issue model
const isAuthenticated  = require('../middlewares/auth'); // Authentication middleware
const isAdmin = require('../middlewares/adminAuth')
const User = require('../models/registration-model')

// Route for users to report an issue
// Route for users to report an issue
router.post('/report', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
  
    // Validate that title and description are provided
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }
  
    try {
      // Get the logged-in user (req.user is set by the isAuthenticated middleware)
      const user = await User.findById(req.user.id).populate('seat'); // Populate seat information for the user
  
      if (!user || !user.seat) {
        return res.status(400).json({ message: 'User does not have an assigned seat.' });
      }
  
      const seatNumber = user.seat.seatNumber; // Get seat number from the logged-in user’s seat
  
      // Create a new issue with the seat number from the logged-in user
      const newIssue = new Issue({
        seatNumber,
        title,
        description,
      });
  
      // Save the new issue to the database
      await newIssue.save();
  
      res.status(201).json({
        message: 'Issue reported successfully.',
        issue: newIssue,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while reporting the issue.' });
    }
  });
  


// Route for admin to get all issues
router.get('/', isAdmin, async (req, res) => {
    try {
      const issues = await Issue.find(); // Get all issues from the database
      res.status(200).json({
        message: 'Issues retrieved successfully.',
        issues: issues.map(issue => ({
          id: issue._id,
          seatNumber: issue.seatNumber,
          title: issue.title,
          description: issue.description,
          resolved: issue.resolved,
          createdAt: issue.createdAt,
        })),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while fetching issues.' });
    }
  });
  
  // Route for admin to mark an issue as resolved or unresolved
  router.put('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    const { resolved } = req.body; // true or false for resolved
  
    try {
      // Find the issue by ID and update the resolved status
      const issue = await Issue.findById(id);
  
      if (!issue) {
        return res.status(404).json({ message: 'Issue not found.' });
      }
  
      // Update the resolved status
      issue.resolved = resolved;
  
      // Save the updated issue
      await issue.save();
  
      res.status(200).json({
        message: 'Issue status updated successfully.',
        issue: {
          id: issue._id,
          seatNumber: issue.seatNumber,
          title: issue.title,
          description: issue.description,
          resolved: issue.resolved,
          createdAt: issue.createdAt,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while updating the issue.' });
    }
  });



  // Route for admin to delete an issue by its ID
router.delete('/:issueId', isAdmin, async (req, res) => {
  const { issueId } = req.params; // Get the issue ID from the URL

  try {
    // Find the issue by its ID and delete it
    const issue = await Issue.findByIdAndDelete(issueId);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found.' });
    }

    res.status(200).json({
      message: 'Issue deleted successfully.',
      issueId: issue._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while deleting the issue.' });
  }
});



module.exports = router;
