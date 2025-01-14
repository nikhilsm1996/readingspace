const express = require('express');
const router = express.Router();
const PaymentModel = require('../models/payment-model');
const Seats = require('../models/seat-model');
const User = require('../models/registration-model'); // Assuming you have a User model

//payment route to start a payment
router.post('/start-payment', async (req, res) => {
    const { email, paymentMethod } = req.body;

    if (!email || !paymentMethod) {
      return res.status(400).json({ error: 'Email and payment method are required.' });
    }

    try {
      // Find the user by email
      const user = await User.findOne({ email }).populate('seat');
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Ensure the user has a seat assigned
      const seat = user.seat;
      if (!seat) {
        return res.status(400).json({ error: 'No seat assigned to this user.' });
      }

      // Calculate the payment amount (considering deposit for first payment)
      const isFirstPayment = !(await PaymentModel.findOne({ user: user._id }));
      const deposit = isFirstPayment ? seat.deposit : 0;
      const amount = seat.price + deposit;

      // Create a new payment record with the totalAmount
      const newPayment = new PaymentModel({
        user: user._id,
        seat: seat._id,
        paymentMethod,
        price: seat.price,
        deposit,
        totalAmount: amount, // Store the total amount
        paymentDate: new Date(), // Set the current date
        paymentInitiated: true, // Set paymentInitiated flag to true
        paymentStatus: 'processing', // Set paymentStatus to "processing"
        transactionId: `TXN-${Date.now()}`, // Unique transaction ID
      });

      await newPayment.save();

      res.status(200).json({
        message: 'Payment initiated successfully.',
        payment: {
          transactionId: newPayment.transactionId,
          price:newPayment.price,
          deposit:newPayment.deposit,
          totalAmount: newPayment.totalAmount, // Include totalAmount in the response
          paymentMethod: newPayment.paymentMethod,
          paymentInitiated: newPayment.paymentInitiated,
          paymentDate: newPayment.paymentDate,
          paymentStatus: newPayment.paymentStatus,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while initiating the payment.' });
    }
});




// Route for admin to confirm payment by transaction ID
router.put('/confirm-payment', async (req, res) => {
    const { transactionId, paymentCompleted, paymentStatus } = req.body;
  
    // Ensure that transactionId is provided
    if (!transactionId) {
      return res.status(400).json({ error: 'Transaction ID is required' });
    }
  
    // Ensure paymentCompleted and paymentStatus are set
    if (paymentCompleted === undefined || paymentStatus === undefined) {
      return res.status(400).json({ error: 'Both paymentCompleted and paymentStatus are required' });
    }
  
    try {
      // Find the payment using the transactionId
      const payment = await PaymentModel.findOne({ transactionId });
      
      // If no payment is found
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
  
      // If the payment is already completed, return an error
      if (payment.paymentStatus === 'completed') {
        return res.status(400).json({ error: 'Payment has already been completed' });
      }
  
      // Set the payment status and payment completed flag
      payment.paymentStatus = paymentStatus;
      payment.paymentCompleted = paymentCompleted;
      await payment.save();
  
      // Optionally, update the associated seat as occupied
      const seat = await Seats.findById(payment.seat);
      if (seat) {
        seat.status = 'blocked'; // Mark the seat as occupied
        seat.paymentStatus = 'completed'; // Set seat payment status as completed
        seat.seatAssigned = true; // The seat is now assigned
        await seat.save();
      }
  
      // Optionally, update user seatAssigned to true as well
      const user = await User.findById(payment.user);
      if (user) {
        user.seatAssigned = true;
        await user.save();
      }
  
      res.status(200).json({
        message: 'Payment successfully confirmed',
        payment: payment,
        seat: seat,
        user: user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while confirming the payment' });
    }
  });
  
  
  

// Route for admin to get payments by status
router.get('/', async (req, res) => {
    const { status } = req.query; // Get the payment status from query parameters (e.g., 'processing', 'completed', 'failed')
  
    // Check for invalid status
    if (status && !['processing', 'completed', 'failed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Allowed values: processing, completed, failed' });
    }
  
    try {
      // Find payments by the given status, or fetch all if no status is provided
      const payments = await PaymentModel.find(status ? { paymentStatus: status } : {})
        .populate('seat')
        .populate('user');
  
      if (payments.length === 0) {
        return res.status(404).json({ message: 'No payments found.' });
      }
  
      res.status(200).json({
        message: 'Payments retrieved successfully.',
        payments: payments.map(payment => ({
          transactionId: payment.transactionId,
          paymentStatus: payment.paymentStatus,
          totalAmount: payment.totalAmount,
          userEmail: payment.user.email,
          seatNumber: payment.seat.seatNumber,
        })),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching payments.' });
    }
  });
  


module.exports = router;
