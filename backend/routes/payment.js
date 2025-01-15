const express = require('express');
const router = express.Router();
const PaymentModel = require('../models/payment-model');
const Seats = require('../models/seat-model');
const User = require('../models/registration-model'); // Assuming you have a User model
const Tier= require('../models/tier-model')

router.post('/start-payment', async (req, res) => {
  const { email, paymentMethod } = req.body;

  if (!email || !paymentMethod) {
    return res.status(400).json({ error: 'Email and payment method are required.' });
  }

  try {
    // Fetch user and their assigned seat, populate seat details
    const user = await User.findOne({ email }).populate({
      path: 'seat',
      populate: {
        path: 'tier', // Populate tier to get tier details
        select: 'name' // Only select tier name to avoid over-fetching data
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const seat = user.seat;
    if (!seat) {
      return res.status(400).json({ error: 'No seat assigned to this user.' });
    }

    // Find the last payment of the user
    const lastPayment = await PaymentModel.findOne({ user: user._id }).sort({ paymentDate: -1 });

    // Determine if this is the first payment
    const isFirstPayment = !lastPayment;
    const deposit = isFirstPayment ? seat.deposit : 0;
    const amount = seat.price + deposit;

    let nextPaymentDueDate;

    if (isFirstPayment) {
      // First payment logic: set the due date 30 days from now
      nextPaymentDueDate = new Date();
      nextPaymentDueDate.setDate(nextPaymentDueDate.getDate() + 30);
    } else {
      // Handle subsequent payments
      const dueDate = lastPayment.nextPaymentDueDate || new Date();
      const paymentDate = new Date();

      if (paymentDate > dueDate) {
        // If payment is past due, reset due date to 30 days from the previous due date
        nextPaymentDueDate = new Date(dueDate);
        nextPaymentDueDate.setDate(nextPaymentDueDate.getDate() + 30);
      } else {
        // If payment is within the current due period, set due date 30 days from today
        nextPaymentDueDate = new Date(paymentDate);
        nextPaymentDueDate.setDate(nextPaymentDueDate.getDate() + 30);
      }
    }

    // Create a new payment record
    const newPayment = new PaymentModel({
      user: user._id,
      seat: seat._id,
      paymentMethod,
      price: seat.price,
      deposit,
      totalAmount: amount,
      paymentDate: new Date(),
      paymentInitiated: true,
      paymentStatus: 'processing', // Set initial payment status as 'processing'
      transactionId: `TXN-${Date.now()}`,
      nextPaymentDueDate,
    });

    // Save the payment record
    await newPayment.save();

    // Response to client with populated seat and tier details
    res.status(200).json({
      message: 'Payment initiated successfully.',
      payment: {
        transactionId: newPayment.transactionId,
        price: newPayment.price,
        deposit: newPayment.deposit,
        totalAmount: newPayment.totalAmount,
        paymentMethod: newPayment.paymentMethod,
        paymentInitiated: newPayment.paymentInitiated,
        paymentDate: newPayment.paymentDate,
        nextPaymentDueDate: newPayment.nextPaymentDueDate,
        paymentStatus: newPayment.paymentStatus,
        seatNumber: seat.seatNumber, // Seat number from populated seat
        tier: seat.tier ? seat.tier.name : 'Unknown', // Tier name from populated tier
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
  
      // Optionally, update the associated seat as booked
      const seat = await Seats.findById(payment.seat);
      if (seat) {
        seat.status = 'booked'; // Mark the seat as booked
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
    //NOTE : ONLY NESTED POPULATE WORKS
    const payments = await PaymentModel.find(status ? { paymentStatus: status } : {})
      .populate({
        path: 'seat',
        populate: {
          path: 'tier',
          select: 'name', // Only select the tier name
        },
      })
      .populate('user');  // Populating the user information as well

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
        paymentDate: payment.paymentDate,
        tierName: payment.seat.tier ? payment.seat.tier.name : 'No Tier', // Ensure tier is included
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching payments.' });
  }
});




  


module.exports = router;
