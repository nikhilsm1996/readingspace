var express = require('express');
var router = express.Router();
const Seats= require('../models/seat-model'); 
const User= require('../models/registration-model');
const Notification= require('../models/notifications-model');
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
                    booked: {
                      $sum: { $cond: [{ $eq: ['$status', 'booked'] }, 1, 0] }
                  },
                    blocked: {
                        $sum: { $cond: [{ $eq: ['$status', 'blocked'] }, 1, 0] }
                    }
                }
            }
        ]);

        const countResult = {
            standard: { vacant: 0,booked:0, blocked: 0 },
            premium: { vacant: 0,booked:0, blocked: 0 },
            supreme: { vacant: 0,booked:0, blocked: 0 },
            total: { vacant: 0,booked:0, blocked: 0 }
        };

        // Populate counts by tier
        seatCounts.forEach(item => {
            if (item._id === 'standard') {
                countResult.standard.vacant = item.vacant;
                countResult.standard.booked = item.booked;
                countResult.standard.blocked = item.blocked;
            } else if (item._id === 'premium') {
                countResult.premium.vacant = item.vacant;
                countResult.premium.booked = item.booked;
                countResult.premium.blocked = item.blocked;
            } else if (item._id === 'supreme') {
                countResult.supreme.vacant = item.vacant;
                countResult.supreme.booked = item.booked;
                countResult.supreme.blocked = item.blocked;
            }
        });

        // Sum the total counts
        countResult.total.vacant = countResult.standard.vacant + countResult.premium.vacant + countResult.supreme.vacant;
        countResult.total.blocked = countResult.standard.blocked + countResult.premium.blocked + countResult.supreme.blocked;
        countResult.total.booked = countResult.standard.booked + countResult.premium.booked + countResult.supreme.booked;


        res.status(200).json(countResult);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching seat counts.' });
    }
});


// Get the total number of seats, price, and deposit for a specific tier (standard, premium, supreme)
//along with price and deposit
router.get('/totalcount/:tier', isAuthenticated, async (req, res) => {
  try {
      const { tier } = req.params;  // Get the tier from the URL parameter

      // Validate the tier parameter to make sure it's one of the valid values
      if (!['standard', 'premium', 'supreme'].includes(tier)) {
          return res.status(400).json({ error: 'Invalid tier. Please choose from standard, premium, or supreme.' });
      }

      const seatData = await Seats.aggregate([
          {
              $lookup: {
                  from: 'tiers',  // Name of the Tier collection in MongoDB
                  localField: 'tier',  // Reference to Tier's ObjectId in the Seats collection
                  foreignField: '_id',  // Tier's ObjectId field
                  as: 'tierDetails'  // Alias for the populated data
              }
          },
          {
              $unwind: {
                  path: '$tierDetails',  // Unwind the populated tier data
                  preserveNullAndEmptyArrays: true  // Prevent breaking if no tier is found
              }
          },
          {
              $match: {
                  'tierDetails.name': tier  // Match the provided tier in the URL parameter
              }
          },
          {
              $group: {
                  _id: null,  // Group all results together
                  totalSeats: { $sum: 1 },  // Count the total number of seats
                  price: { $first: '$price' },  // Get the price of the first seat (all should be the same price)
                  deposit: { $first: '$deposit' }  // Get the deposit of the first seat (all should be the same deposit)
              }
          }
      ]);

      // If no seats are found for the selected tier, seatData will be an empty array
      if (seatData.length === 0) {
          return res.status(404).json({ message: `No ${tier} seats found.` });
      }

      // Send the total number of seats, price, and deposit for the selected tier
      res.status(200).json({
          [`total${tier.charAt(0).toUpperCase() + tier.slice(1)}Seats`]: seatData[0].totalSeats,
          [`${tier}Price`]: seatData[0].price,
          [`${tier}Deposit`]: seatData[0].deposit
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching seat count and pricing.' });
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

// Endpoint to get all seats with their details
router.get('/', isAuthenticated, async (req, res) => {
  try {
    // Find all seats and populate the related tier and user details
    const seats = await Seats.find()
      .populate('tier', 'name') // Populate the tier field and fetch only the name
      .populate('user', 'name email phone'); // Populate the user field with specific fields

    if (seats.length === 0) {
      return res.status(404).json({ error: 'No seats found.' });
    }

    res.status(200).json(seats); // Send the populated seats data
  } catch (err) {
    console.error('Error retrieving seats:', err);
    res.status(500).json({ error: 'An error occurred while retrieving seats.' });
  }
});





// Assign seat to a user
router.post('/assign', isAuthenticated, async (req, res) => {
  const { seatNumber } = req.body;

  if (!seatNumber) {
    return res.status(400).json({ error: 'Seat number is required.' });
  }

  try {
    // Identify the user from the token (req.user is set by isAuthenticated middleware)
    const userId = req.user.id;

    // Check if the user exists
    const user = await User.findById(userId).populate('seat'); // Populate seat to ensure we have the seat data
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the user already has a seat assigned
    if (user.seatAssigned) {
      return res.status(400).json({ error: 'User already has a seat assigned.' });
    }

    // Check if the seat exists and is available
    const seat = await Seats.findOne({ seatNumber }).populate('tier', 'name'); // Populate tier name
    if (!seat) {
      return res.status(404).json({ error: 'Seat not found.' });
    }

    if (seat.status !== 'vacant') {
      return res.status(400).json({ error: 'Seat is already occupied or blocked.' });
    }

    // Assign the seat to the user
    seat.status = 'booked';
    seat.user = user._id;
    await seat.save();

    // Update the user's seatAssigned flag
    user.seatAssigned = true;
    user.seat = seat._id;
    await user.save();

    // Ensure the user has an admin role before sending a notification
    const adminUsers = await User.find({ role: 'admin' }); // Find all admin users
    if (adminUsers.length > 0) {
      // Send notifications to all admins
      const notificationMessage = `Seat ${seatNumber} has been successfully assigned to ${user.name}.`;
      
      // Create and save notification for each admin
      for (const admin of adminUsers) {
        const adminNotification = new Notification({
          user: admin._id,  // Admin user who will receive the notification
          message: notificationMessage,
        });
        await adminNotification.save();
      }
    }

    res.status(200).json({
      message: `Seat ${seatNumber} successfully assigned to ${user.name}.`,
      seat: {
        seatNumber: seat.seatNumber,
        status: seat.status,
        tier: seat.tier?.name, // Include the populated tier name
        price: seat.price,
        deposit: seat.deposit,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          seatAssigned: user.seatAssigned,
        },
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
    if (!status || !['blocked','booked', 'vacant'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Status must be "blocked", "booked" or "vacant".' });
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

      // If the seat is being booked, assign it to a user if available
      if (status === 'booked' && seat.userEmail) {
        // Optionally, check if the user already has a seat assigned
        const user = await User.findOne({ email: seat.userEmail });
        if (user) {
          user.seatAssigned = true; // Set seatAssigned to true when a seat is booked
          await user.save();
        }
      }
      
      // If the seat is being marked as vacant, reset seatAssigned and clear userEmail and userName
      if (status === 'vacant') {
        // Reset seatAssigned for the user if the seat is being made vacant
        if (seat.userEmail) {
          const user = await User.findOne({ email: seat.userEmail });
          if (user) {
            user.seatAssigned = false;
            await user.save();
          }
        }

        // Clear userEmail and userName in the seat when it becomes vacant
        seat.userEmail = " ";
        seat.userName = " ";
      }

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



// Switch Seats
// Switch Seat for the User
router.post('/switch', isAuthenticated, async (req, res) => {
  const { newSeatNumber } = req.body;

  if (!newSeatNumber) {
    return res.status(400).json({ error: 'New seat number is required.' });
  }

  try {
    // Get the userId from the authenticated token
    const userId = req.user.id;

    // Find the user and their currently assigned seat
    const user = await User.findById(userId).populate('seat');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user already has a seat assigned
    if (!user.seatAssigned) {
      return res.status(400).json({ error: 'User does not have a seat assigned.' });
    }

    // Find the user's current seat and mark it as vacant
    const oldSeat = user.seat;
    oldSeat.status = 'vacant';
    await oldSeat.save();

    // Find the new seat by seatNumber
    const newSeat = await Seats.findOne({ seatNumber: newSeatNumber }).populate('tier', 'name');
    if (!newSeat) {
      return res.status(404).json({ error: 'New seat not found.' });
    }

    // Check if the new seat is vacant
    if (newSeat.status !== 'vacant') {
      return res.status(400).json({ error: 'The new seat is not vacant.' });
    }

    // Assign the new seat to the user
    newSeat.status = 'booked';
    newSeat.user = user._id;
    await newSeat.save();

    // Update the user's seat reference and mark the seat as assigned
    user.seat = newSeat._id;
    user.seatAssigned = true;
    await user.save();

// Notify all admins about the seat change
const admins = await User.find({ role: 'admin' });
for (let admin of admins) {
  const notificationMessage = `${user.name} has switched their seat from ${oldSeat.seatNumber} to ${newSeatNumber}.`;

  // Create the notification for the admin
  const notification = new Notification({
    user: admin._id,
    message: notificationMessage,
  });
  await notification.save();
}

    // Respond with both old seat number and new seat details
    res.status(200).json({
      message: `Seat successfully switched from ${oldSeat.seatNumber} to ${newSeatNumber}`,
      oldSeat: {
        seatNumber: oldSeat.seatNumber
      },
      newSeat: {
        seatNumber: newSeat.seatNumber,
        status: newSeat.status,
        tier: newSeat.tier?.name, // Populated tier name
        price: newSeat.price,
        deposit: newSeat.deposit,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while switching the seat.' });
  }
});







//Delete all seats
router.delete('/deleteall', isAdmin, async (req, res) => {
    try {
      // Find all users with seat assigned and update their seatAssigned field to false
      const usersWithAssignedSeats = await User.updateMany(
        { seatAssigned: true }, // Find users who have assigned seats
        { $set: { seatAssigned: false, seat: null } } // Set seatAssigned to false and nullify seat
      );
  
      console.log('Updated Users:', usersWithAssignedSeats);
  
      // Delete all seats in the Seats collection
      const deletedSeats = await Seats.deleteMany({});
  
      console.log('Deleted Seats:', deletedSeats);
  
      // Return success response
      res.status(200).json({
        message: 'All seats deleted and seatAssigned flag updated for users.',
        deletedSeats: deletedSeats.deletedCount,
        updatedUsers: usersWithAssignedSeats.nModified,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the seats and updating users.' });
    }
  });
  


  // Route to update seatAssigned flag for a user
router.patch('/seatassigned', async (req, res) => {
    console.log("in update route 1")
    const { email, seatAssigned } = req.body; // Get the email and seatAssigned flag from request body
  console.log("in update route 2")
    if (email === undefined || seatAssigned === undefined) {
      return res.status(400).json({ error: 'Email and seatAssigned are required.' });
    }
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      console.log("USERRR", user)
  
      // Update the seatAssigned flag
      user.seatAssigned = seatAssigned;
      await user.save();
  
      res.status(200).json({
        message: `Seat assignment status updated for ${email}.`,
        user: {
          email: user.email,
          seatAssigned: user.seatAssigned, // Return the updated seatAssigned status
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the seatAssigned status.' });
    }
  });






module.exports = router;
