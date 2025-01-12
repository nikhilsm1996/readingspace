var express = require('express');
var router = express.Router();
const Seats= require('../models/seat-model'); 
const User= require('../models/registration-model');
const isAuthenticated = require('../middlewares/auth');
const isAdmin = require('../middlewares/adminAuth');
const Tier = require('../models/tier-model')

console.log("in seats router")

// Create Total Number of Cabins
// Route to bulk create Standard Seats
router.post('/standard', isAdmin, async (req, res) => {
    const { totalStandardSeats } = req.body;

    if (!totalStandardSeats || !Number.isInteger(totalStandardSeats) || totalStandardSeats <= 0) {
        return res.status(400).json({ error: 'Total number of standard seats must be a positive integer.' });
    }

    try {
        // Fetch the 'standard' tier from the database
        const tier = await Tier.findOne({ name: 'standard' });
        if (!tier) {
            return res.status(404).json({ error: 'Standard tier not found.' });
        }

        // Calculate the price and deposit from the tier
        const price = tier.price;
        const deposit = tier.deposit;

        // Find the last seat number in the 'standard' tier to continue numbering from there
        const lastSeat = await Seats.findOne({ tier: tier._id }).sort({ seatNumber: -1 }).limit(1);
        let startingNumber = lastSeat ? parseInt(lastSeat.seatNumber.replace('SD', '')) + 1 : 1;

        // Create an array of standard seats
        const standardSeats = Array.from({ length: totalStandardSeats }, (_, i) => ({
            seatNumber: `SD${startingNumber + i}`,  // Generate seat numbers like SD1, SD2, etc.
            tier: tier._id,  // Reference to the 'standard' tier
            status: 'vacant',  // Initially set as 'vacant'
            price: price,  // Set price from the tier
            deposit: deposit  // Set deposit from the tier
        }));

        // Insert the seats into the database
        await Seats.insertMany(standardSeats);

        // Populate the 'tier' field to replace the ObjectId with the 'name' field
        const populatedSeats = await Seats.find({ tier: tier._id }).populate('tier', 'name');

        res.status(200).json({
            message: `Successfully created ${totalStandardSeats} standard seats.`,
            seats: populatedSeats
        });
    } catch (err) {
        console.error('Error creating standard seats:', err);
        res.status(500).json({ error: 'An error occurred while creating standard seats.' });
    }
});

// Route to bulk create Premium Seats
router.post('/premium', isAdmin, async (req, res) => {
    const { totalPremiumSeats } = req.body;

    if (!totalPremiumSeats || !Number.isInteger(totalPremiumSeats) || totalPremiumSeats <= 0) {
        return res.status(400).json({ error: 'Total number of premium seats must be a positive integer.' });
    }

    try {
        // Fetch the 'premium' tier from the database
        const tier = await Tier.findOne({ name: 'premium' });
        if (!tier) {
            return res.status(404).json({ error: 'Premium tier not found.' });
        }

        // Calculate the price and deposit from the tier
        const price = tier.price;
        const deposit = tier.deposit;

        // Find the last seat number in the 'premium' tier to continue numbering from there
        const lastSeat = await Seats.findOne({ tier: tier._id }).sort({ seatNumber: -1 }).limit(1);
        let startingNumber = lastSeat ? parseInt(lastSeat.seatNumber.replace('PR', '')) + 1 : 1;

        // Create an array of premium seats
        const premiumSeats = Array.from({ length: totalPremiumSeats }, (_, i) => ({
            seatNumber: `PR${startingNumber + i}`,  // Generate seat numbers like PR1, PR2, etc.
            tier: tier._id,  // Reference to the 'premium' tier
            status: 'vacant',  // Initially set as 'vacant'
            price: price,  // Set price from the tier
            deposit: deposit  // Set deposit from the tier
        }));

        // Insert the seats into the database
        await Seats.insertMany(premiumSeats);

        // Populate the 'tier' field to replace the ObjectId with the 'name' field
        const populatedSeats = await Seats.find({ tier: tier._id }).populate('tier', 'name');

        res.status(200).json({
            message: `Successfully created ${totalPremiumSeats} premium seats.`,
            seats: populatedSeats
        });
    } catch (err) {
        console.error('Error creating premium seats:', err);
        res.status(500).json({ error: 'An error occurred while creating premium seats.' });
    }
});

// Route to bulk create Supreme Seats
router.post('/supreme', isAdmin, async (req, res) => {
    const { totalSupremeSeats } = req.body;

    if (!totalSupremeSeats || !Number.isInteger(totalSupremeSeats) || totalSupremeSeats <= 0) {
        return res.status(400).json({ error: 'Total number of supreme seats must be a positive integer.' });
    }

    try {
        // Fetch the 'supreme' tier from the database
        const tier = await Tier.findOne({ name: 'supreme' });
        if (!tier) {
            return res.status(404).json({ error: 'Supreme tier not found.' });
        }

        // Calculate the price and deposit from the tier
        const price = tier.price;
        const deposit = tier.deposit;

        // Find the last seat number in the 'supreme' tier to continue numbering from there
        const lastSeat = await Seats.findOne({ tier: tier._id }).sort({ seatNumber: -1 }).limit(1);
        let startingNumber = lastSeat ? parseInt(lastSeat.seatNumber.replace('SP', '')) + 1 : 1;

        // Create an array of supreme seats
        const supremeSeats = Array.from({ length: totalSupremeSeats }, (_, i) => ({
            seatNumber: `SP${startingNumber + i}`,  // Generate seat numbers like SP1, SP2, etc.
            tier: tier._id,  // Reference to the 'supreme' tier
            status: 'vacant',  // Initially set as 'vacant'
            price: price,  // Set price from the tier
            deposit: deposit  // Set deposit from the tier
        }));

        // Insert the seats into the database
        await Seats.insertMany(supremeSeats);

        // Populate the 'tier' field to replace the ObjectId with the 'name' field
        const populatedSeats = await Seats.find({ tier: tier._id }).populate('tier', 'name');

        res.status(200).json({
            message: `Successfully created ${totalSupremeSeats} supreme seats.`,
            seats: populatedSeats
        });
    } catch (err) {
        console.error('Error creating supreme seats:', err);
        res.status(500).json({ error: 'An error occurred while creating supreme seats.' });
    }
});




// Route to add more seats for a given tier (after bulk creation)
router.post('/add/:tierName',isAdmin, async (req, res) => {
    const { tierName } = req.params;
    const { additionalSeats } = req.body;

    // Validate tier and number of seats
    if (!['standard', 'premium', 'supreme'].includes(tierName)) {
        return res.status(400).json({ error: 'Invalid tier specified.' });
    }

    if (!additionalSeats || !Number.isInteger(additionalSeats) || additionalSeats <= 0) {
        return res.status(400).json({ error: 'Additional number of seats must be a positive integer.' });
    }

    try {
        // Find the tier data
        const tierData = await Tier.findOne({ name: tierName });
        if (!tierData) {
            return res.status(404).json({ error: `Tier '${tierName}' not found.` });
        }

        // Find the current number of seats for the tier
        const existingSeatsCount = await Seats.countDocuments({ tier: tierData._id });

//choose prefix for seat number
let prefix=''

if(req.params.tierName ==='standard'){
   
    prefix = 'SD'
}
else if(req.params.tierName==='premium'){
    prefix='PR'
}
else {
    prefix='SP'
}

        // create new seats with unique seat numbers
        const newSeats = Array.from({ length: additionalSeats }, (_, i) => ({
            seatNumber: `${prefix}${existingSeatsCount + i + 1}`, // Increment seat number based on existing seats
            tier: tierData._id,
            price: tierData.price,  // Add price from the tier
            deposit: tierData.deposit,  // Add deposit from the tier
            status: 'vacant'
        }));

        // Insert new seats into the database
        await Seats.insertMany(newSeats);

        res.status(200).json({
            message: `Successfully added ${additionalSeats} more seats to the '${tierName}' tier.`,
            newSeatsCreated: additionalSeats
        });
    } catch (err) {
        console.error('Error adding more seats:', err);
        res.status(500).json({ error: 'An error occurred while adding more seats.' });
    }
});


///GET COUNT OF VACANT,OCCUPIED,TOTAL SEATS
router.get('/count', isAuthenticated, async (req, res) => {
    try {
        // Get the count of available and occupied seats, while populating the tier name
        const seatCounts = await Seats.aggregate([
            {
                $lookup: {
                    from: 'tiers',  // This is the name of your Tier collection in MongoDB
                    localField: 'tier',  // Reference to Tier's ObjectId
                    foreignField: '_id',  // Tier's ObjectId field
                    as: 'tierDetails'  // Alias for the populated data
                }
            },
            {
                $unwind: '$tierDetails'  // Unwind the populated tier data
            },
            {
                $group: {
                    _id: '$tierDetails.name',  // Group by tier name
                    vacant: {
                        $sum: { $cond: [{ $eq: ['$status', 'vacant'] }, 1, 0] }
                    },
                    blocked: {
                        $sum: { $cond: [{ $eq: ['$status', 'blocked'] }, 1, 0] }
                    }
                }
            }
        ]);

        const countResult = {
            standard: { vacant: 0, blocked: 0 },
            premium: { vacant: 0, blocked: 0 },
            supreme: { vacant: 0, blocked: 0 },
            total: { vacant: 0, blocked: 0 }
        };

        // Populate counts by tier
        seatCounts.forEach(item => {
            if (item._id === 'standard') {
                countResult.standard.vacant = item.vacant;
                countResult.standard.blocked = item.blocked;
            } else if (item._id === 'premium') {
                countResult.premium.vacant = item.vacant;
                countResult.premium.blocked = item.blocked;
            } else if (item._id === 'supreme') {
                countResult.supreme.vacant = item.vacant;
                countResult.supreme.blocked = item.blocked;
            }
        });

        // Sum the total counts
        countResult.total.vacant = countResult.standard.vacant + countResult.premium.vacant + countResult.supreme.vacant;
        countResult.total.blocked = countResult.standard.blocked + countResult.premium.blocked + countResult.supreme.blocked;

        res.status(200).json(countResult);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching seat counts.' });
    }
});

  






// Endpoint to get seat details by seat number
router.get('/:seatNumber', isAdmin, async (req, res) => {
    const { seatNumber } = req.params;

    // Validate seat number (ensure it's a non-empty alphanumeric string)
    if (!seatNumber || typeof seatNumber !== 'string' || !/^[A-Za-z0-9]+$/.test(seatNumber)) {
        return res.status(400).json({ error: 'Invalid seat number. Seat number must be an alphanumeric value.' });
    }

    try {
        // Find the seat and populate the tier details
        const seat = await Seats.findOne({ seatNumber }).populate('tier', 'name'); // Populate tier name

        if (!seat) {
            return res.status(404).json({ error: 'Seat not found.' });
        }

        // Include the tier name in the response
        res.json({
            seatNumber: seat.seatNumber,
            status: seat.status,
            tier: seat.tier ? seat.tier.name : 'Unknown', // Include the tier name
            price: seat.price,
            deposit: seat.deposit,
            userEmail: seat.userEmail,
            userName: seat.userName
        });
    } catch (err) {
        console.error('Error retrieving seat:', err);
        res.status(500).json({ error: 'An error occurred while retrieving the seat.' });
    }
});


//Assign seat to a user
router.post('/assign', isAuthenticated, async (req, res) => {
    const { email, seatNumber } = req.body;
  
    if (!email || !seatNumber) {
      return res.status(400).json({ error: 'Email and seat number are required.' });
    }
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      console.log("EMAIL", email);
  
      // Check if the user already has a seat assigned
      const existingSeat = await Seats.findOne({ userEmail: email });
      if (existingSeat) {
        console.log("EXISTING USER", existingSeat);
        return res.status(400).json({ error: 'User already has a seat assigned.' });
      }
  
      // Check if the seat exists and is available
      const seat = await Seats.findOne({ seatNumber }).populate('tier', 'name'); // Populate tierName
      console.log('Populated Seat:', seat);
      if (!seat) {
        return res.status(404).json({ error: 'Seat not found.' });
      }
  
      if (seat.status !== 'vacant') {
        return res.status(400).json({ error: 'Seat is already occupied or blocked.' });
      }
  
      // Update the seat's status and assign it to the user
      seat.status = 'blocked';
      seat.userEmail = user.email;
      seat.userName = user.name;
  
      await seat.save();
  
      res.status(200).json({
        message: `Seat ${seatNumber} successfully assigned to ${email}.`,
        seat: {
          seatNumber: seat.seatNumber,
          status: seat.status,
          userEmail: seat.userEmail,
          userName: seat.userName,
          tier: seat.tier?.name, // Include the populated tier name
          price: seat.price,
          deposit: seat.deposit,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while assigning the seat.' });
    }
  });
  

// Route to change the status of a seat based on seatNumber and new status
router.put('/status/:seatNumber', async (req, res) => {
    const { seatNumber } = req.params; // Extract seatNumber from URL params
    const { status } = req.body; // Extract new status from the request body
  
    // Validate status input
    if (!status || !['blocked', 'vacant'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Status must be "blocked" or "vacant".' });
    }
  
    try {
      // Find the seat by seatNumber and populate the tier field with the tier name
      const seat = await Seats.findOne({ seatNumber }).populate('tier', 'name');
  
      if (!seat) {
        return res.status(404).json({ error: 'Seat not found.' });
      }
  
      // If the status is already the same, no update is necessary
      if (seat.status === status) {
        return res.status(400).json({ error: `Seat is already ${status}.` });
      }
  
      // Update the seat status
      seat.status = status;
  
      // Save the updated seat
      await seat.save();
  
      res.status(200).json({
        message: `Seat ${seatNumber} status successfully changed to ${status}.`,
        seat: seat, // The populated seat object will include the tier name
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the seat status.' });
    }
  });
  







module.exports = router;
