var express = require('express');
var router = express.Router();
const Seats= require('../models/seat-model'); 
const User= require('../models/registration-model');
console.log("in seats router")

// Create Total Number of Cabins

router.post('/', async (req, res) => {
  const { totalStandardSeats, totalPremiumSeats } = req.body;

    if (!totalStandardSeats || !totalPremiumSeats) {
        return res.status(400).json({ error: 'Total number of standard and premium seats are required.' });
    }

  try {
    //Delete all previous seats
    await Seats.deleteMany({});
    

      // Create Standard Seats
      let standardSeats = [];
      for (let i = 1; i <= totalStandardSeats; i++) {
          standardSeats.push({
              seatNumber: i,
              tier: 'standard',
              status: 'vacant',  // Initial status is vacant
          });
      }

      // Create Premium Seats (starting from the next available seat number)
      let premiumSeats = [];
      const startPremiumSeatNumber = totalStandardSeats + 1;
      for (let i = startPremiumSeatNumber; i < startPremiumSeatNumber + totalPremiumSeats; i++) {
          premiumSeats.push({
              seatNumber: i,
              tier: 'premium',
              status: 'vacant',  // Initial status is vacant
          });
      }

      // Insert all seats into the database
      await Seats.insertMany([...standardSeats, ...premiumSeats]);

      res.status(200).json({
          message: `Successfully created ${totalStandardSeats} standard seats and ${totalPremiumSeats} premium seats.`,
          standardSeatsCreated: totalStandardSeats,
          premiumSeatsCreated: totalPremiumSeats,
          totalSeatsCreated:parseInt(totalStandardSeats+totalPremiumSeats)
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the seats.' });
  }
});

///GET COUNT OF VACANT,OCCUPIED,TOTAL SEATS
router.get('/count', async (req, res) => {
  try {
      // Standard seat counts
      const standardAvailableCount = await Seats.countDocuments({ tier: 'standard', status: 'vacant' });
      const standardOccupiedCount = await Seats.countDocuments({ tier: 'standard', status: 'blocked' });

      // Premium seat counts
      const premiumAvailableCount = await Seats.countDocuments({ tier: 'premium', status: 'vacant' });
      const premiumOccupiedCount = await Seats.countDocuments({ tier: 'premium', status: 'blocked' });

      // Total counts
      const totalAvailableSeats = standardAvailableCount + premiumAvailableCount;
      const totalOccupiedSeats = standardOccupiedCount + premiumOccupiedCount;

      res.status(200).json({
          standard: {
              vacant: standardAvailableCount,
              blocked: standardOccupiedCount,
          },
          premium: {
              vacant: premiumAvailableCount,
              blocked: premiumOccupiedCount,
          },
          total: {
              vacant: totalAvailableSeats,
              blocked: totalOccupiedSeats,
          },
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching seat counts.' });
  }
});






// Endpoint to get seat details by seat number
router.get('/:seatNumber', async (req, res) => {
  const seatNumber = parseInt(req.params.seatNumber, 10);

  // Validate seat number
  if (isNaN(seatNumber) || seatNumber <= 0) {
      return res.status(400).json({ error: 'Invalid seat number. Seat number must be a positive integer.' });
  }

  try {
      // Find the seat
      const seat = await Seats.findOne({ seatNumber });

      if (!seat) {
          return res.status(404).json({ error: 'Seat not found.' });
      }

      res.json(seat);
  } catch (err) {
      res.status(500).json({ error: 'An error occurred while retrieving the seat.' });
  }
});


router.post('/assign', async (req, res) => {
  const { email, seatNumber } = req.body;

  if (!email || !seatNumber ) {
      return res.status(400).json({ error: 'Email,seat number are required.' });
  }

  try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }

      console.log("EMAIL",email)
 // Check if the user already has a seat assigned
 const existingSeat =  await Seats.findOne({ userEmail:email });
 if (existingSeat) {
  console.log("EXISTING USER new",existingSeat)
     return res.status(400).json({ error: 'User already has a seat assigned.' });
 }
 console.log("EXISTING USER new",existingSeat)

      // Check if the seat exists and is available
      const seat = await Seats.findOne({ seatNumber });
      if (!seat) {
          return res.status(404).json({ error: 'Seat not found.' });
      }

      if (seat.status !== 'vacant') {
          return res.status(400).json({ error: 'Seat is already occupied or blocked.' });
      }

      // Update the seat's status and assign it to the user
      seat.status = 'blocked'; 
      seat.userEmail = user.email;
      seat.userName=user.name
      // seat.tier = tier

      await seat.save();

      res.status(200).json({
          message: `Seat ${seatNumber} successfully assigned to ${email}.`,
          seat: seat
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while assigning the seat.' });
  }
});








module.exports = router;
