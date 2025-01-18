const express = require('express');
const router = express.Router();
const SeatVacationRequest = require('../models/seatvacation-model'); // Import the SeatVacationRequest model
const isAuthenticated = require('../middlewares/auth'); // Middleware to check if the user is authenticated
const  isAdmin = require('../middlewares/adminAuth'); // Assuming you have an admin check middleware
const Seats = require('../models/seat-model'); // Import the Seat model
const User = require('../models/registration-model'); // Import the User model
const Notification = require('../models/notifications-model'); // Import Notification model

// User route to create a seat vacation request

router.post('/create', isAuthenticated, async (req, res) => {
    const { vacationDate } = req.body; // Vacation date provided by the user

    // Validate that the vacation date is not in the past
    if (new Date(vacationDate) < new Date()) {
        return res.status(400).json({ message: 'Vacation date cannot be in the past.' });
    }

    try {
        const user = req.user; // User details from the middleware
console.log("USER CREATE",user)
        // Check if the user already has an active vacation request
        const existingRequest = await SeatVacationRequest.findOne({
            user: user.id,
            status: { $ne: 'completed' }, // Exclude completed requests
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'You already have an active vacation request.' });
        }

        // Fetch the user details and populate the seat
        const populatedUser = await User.findById(user.id)
            .populate('seat')
            .select('-password'); // Exclude password for security

        // Check if the user has a seat assigned
        if (!populatedUser || !populatedUser.seatAssigned) {
            return res.status(400).json({ message: 'No seat assigned to this user.' });
        }

        // Create a new vacate seat request
        const newRequest = new SeatVacationRequest({
            user: populatedUser._id,
            seat: populatedUser.seat._id,
            vacationDate: new Date(vacationDate),
            status: 'pending', // Initial status is pending
        });

        // Save the request
        await newRequest.save();

        // Populate user and seat details in the response
        const populatedRequest = await SeatVacationRequest.findById(newRequest._id)
            .populate('user', '-password') // Exclude password
            .populate({
                path: 'seat',
                populate: { path: 'tier', select: 'name' }, // Populate the tier name
            });

        // Notify admins about the vacation request
        const admins = await User.find({ role: 'admin' });
        for (const admin of admins) {
            const notificationMessage = `User ${populatedUser.name} has requested to vacate seat ${populatedUser.seat.seatNumber} on ${vacationDate}.`;
            const notification = new Notification({
                user: admin._id,
                message: notificationMessage,
            });
            await notification.save();
        }

        // Respond with the populated request
        res.status(201).json({
            message: 'Vacate seat request created successfully.',
            vacateRequest: populatedRequest,
        });
    } catch (error) {
        console.error('Error creating vacate seat request:', error);
        res.status(500).json({ message: 'An error occurred while creating the request.' });
    }
});

  
 // Update route for vacating the seat
 router.put('/update', isAuthenticated, async (req, res) => {
    try {
      const user = req.user;
      console.log("User ID from Token: ", user.id); // Debugging step
  
      // Find vacation request with a matching user and status of 'pending' or 'approved'
      const existingRequest = await SeatVacationRequest.findOne({
        user: user.id,
        status: { $in: ['pending', 'approved'] },
      })
        .populate({
          path: 'seat',
          populate: {
            path: 'tier',
            select: 'name', // Only select the 'name' field from the tier model
          },
        });
  
      console.log("Existing Vacation Request: ", existingRequest); // Debugging step
  
      if (!existingRequest) {
        return res.status(404).json({ message: 'No active vacation request found for this user' });
      }
  
      // Update the vacation date if request exists
      const { vacationDate } = req.body;
      existingRequest.vacationDate = new Date(vacationDate);
  
      // Save the updated request
      await existingRequest.save();
  
      res.status(200).json({
        message: 'Vacate seat request updated successfully',
        vacateRequest: existingRequest,
      });
    } catch (error) {
      console.error('Error updating vacate request:', error);
      res.status(500).json({ message: 'An error occurred while updating the vacation request' });
    }
  });
  
  


  
  
  
//Admin Confirmation of the Seat Vacation Request 

router.post('/confirm/:requestId', isAdmin, async (req, res) => {
    const { requestId } = req.params;
    const { depositAdjustment, status } = req.body;

    // Validate status value
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status provided' });
    }

    try {
      // Find the vacation request and populate related fields
      const vacationRequest = await SeatVacationRequest.findById(requestId)
        .populate({
          path: 'seat',
          populate: { path: 'tier', select: 'name price deposit' }, // Populate tier fields
        })
        .populate('user');

      if (!vacationRequest) {
        return res.status(404).json({ message: 'Vacation request not found' });
      }

      // Update vacation request status
      vacationRequest.status = status;
      vacationRequest.depositAdjustment = depositAdjustment;

      // Handle actions for an approved request
      if (status === 'approved') {
        const seat = vacationRequest.seat;
        const user = vacationRequest.user;

        // Reset seat price and deposit to match tier values
        seat.price = seat.tier.price;
        seat.deposit = seat.tier.deposit;

        // Save seat and user changes
        await seat.save();
        await user.save();
      }

      // Handle actions for a rejected request
      if (status === 'rejected') {
        const user = vacationRequest.user;
        // Optionally notify the user that their request was rejected
        const notificationMessage = `Your vacation request for seat ${vacationRequest.seat.seatNumber} has been rejected.`;
        const notification = new Notification({
          user: user._id,
          message: notificationMessage,
        });
        await notification.save();
      }

      // Handle actions for a pending request (if needed, you can leave this for future use)
      if (status === 'pending') {
        // You might want to do something here, like notifying admins about the pending request.
      }

      // Save the updated vacation request
      await vacationRequest.save();

      // Notify the user about the vacation request status
      const notificationMessage = `Your seat vacation request for seat ${vacationRequest.seat.seatNumber} has been processed. Status: ${status}`;
      const notification = new Notification({
        user: vacationRequest.user._id,
        message: notificationMessage,
      });
      await notification.save();

      // Respond with success
      res.status(200).json({
        message: 'Vacation request processed successfully',
        vacationRequest,
      });
    } catch (error) {
      console.error('Error processing vacation request:', error);
      res.status(500).json({ message: 'An error occurred while processing the vacation request' });
    }
});


router.get('/all', isAdmin, async (req, res) => {
    try {
      // Fetch all seat vacation requests
      const vacationRequests = await SeatVacationRequest.find()
        .populate({
          path: 'seat',
          populate: { path: 'tier', select: 'name price deposit' }, // Populate tier fields
        })
        .populate('user'); // Populate the user field
      
      // Check if there are no requests
      if (!vacationRequests || vacationRequests.length === 0) {
        return res.status(404).json({ message: 'No vacation requests found' });
      }
  
      // Respond with all the seat vacation requests
      res.status(200).json({
        message: 'Vacation requests retrieved successfully',
        vacationRequests,
      });
    } catch (error) {
      console.error('Error fetching vacation requests:', error);
      res.status(500).json({ message: 'An error occurred while fetching vacation requests' });
    }
  });
  
  //Delete Seat Vacation Request by Seat Vacation Request ID
  router.delete('/delete/:requestId', isAdmin, async (req, res) => {
    const { requestId } = req.params;
  
    try {
      // Step 1: Find the vacation request and populate related fields (seat and user)
      const vacationRequest = await SeatVacationRequest.findById(requestId)
        .populate({
          path: 'seat',
          populate: { path: 'tier', select: 'name price deposit' },
        })
        .populate('user');
  
      if (!vacationRequest) {
        return res.status(404).json({ message: 'Vacation request not found' });
      }
  
      // Step 2: Get the seat and user from the populated data
      const seat = vacationRequest.seat;
      const user = vacationRequest.user;
  
      // Step 3: Vacate the seat (reset its details)
      seat.status = 'vacant';
      seat.user = null; // Remove user from seat
      seat.userEmail = null;
      seat.userName = null;
      seat.price = seat.tier.price; // Reset seat price based on the tier
      seat.deposit = seat.tier.deposit; // Reset seat deposit based on the tier
  
      // Step 4: Reset user's seat assignment
      user.seatAssigned = false;
      user.seat = null; // Remove the seat assignment from the user
  
      // Step 5: Save updated seat and user details
      await seat.save();
      await user.save();
  
      // Step 6: Delete the vacation request by its ID
      await SeatVacationRequest.deleteOne({ _id: requestId });
  
      // Step 7: Send success response
      res.status(200).json({
        message: 'Vacation request and associated seat successfully deleted',
        vacationRequest,
      });
    } catch (error) {
      console.error('Error deleting vacation request:', error);
      res.status(500).json({ message: 'An error occurred while deleting the vacation request' });
    }
  });
  
  

//BULK DELETE VACATE REQUESTS 
  router.delete('/bulkdelete', isAdmin, async (req, res) => {
    try {
      // Step 1: Find all vacation requests and populate their related data
      const vacationRequests = await SeatVacationRequest.find()
        .populate({
          path: 'seat',
          populate: { path: 'tier', select: 'name price deposit' },
        })
        .populate('user');
  
      if (vacationRequests.length === 0) {
        return res.status(404).json({ message: 'No vacation requests found' });
      }
  
      // Step 2: Loop through each vacation request and process the seat and user
      for (const vacationRequest of vacationRequests) {
        const seat = vacationRequest.seat;
        const user = vacationRequest.user;
  
        // Vacate the seat
        seat.status = 'vacant';
        seat.user = null;
        seat.userEmail = null;
        seat.userName = null;
        seat.price = seat.tier.price;
        seat.deposit = seat.tier.deposit;
  
        // Reset user's seat assignment
        user.seatAssigned = false;
        user.seat = null;
  
        // Save updates to seat and user
        await seat.save();
        await user.save();
  
        // Delete the vacation request
        await SeatVacationRequest.deleteOne({ _id: vacationRequest._id });
      }
  
      res.status(200).json({
        message: 'All vacation requests have been successfully deleted.',
      });
    } catch (error) {
      console.error('Error bulk deleting all vacation requests:', error);
      res.status(500).json({ message: 'An error occurred while bulk deleting vacation requests' });
    }
  });
  
  
  



module.exports = router;
