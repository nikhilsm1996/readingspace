const express = require('express');
const router = express.Router();
const Tier = require('../models/tier-model');
const isAdmin = require('../middlewares/adminAuth')
const Seats = require('../models/seat-model')
//Create Tiers
router.post('/', isAdmin, async (req, res) => {
    const { name, price, deposit } = req.body;

    // Validate input
    if (!name || !['standard', 'premium', 'supreme'].includes(name)) {
        return res.status(400).json({ error: 'Invalid tier name. Valid values are standard, premium, supreme.' });
    }

    if (!price || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'Price must be a positive number.' });
    }

    try {
        // Check if the tier already exists
        const existingTier = await Tier.findOne({ name });

        if (existingTier) {
            return res.status(400).json({ error: `${name} tier already exists.` });
        }

        // Create the tier from the request body
        const tier = new Tier({
            name: name,
            price: price,
            deposit: deposit || 0 // Default deposit to 0 if not provided
        });

        // Save the tier to the database
        await tier.save();

        res.status(200).json({
            message: `${name} tier created successfully.`,
            tier: tier
        });
    } catch (err) {
        console.error('Error creating tier:', err);
        res.status(500).json({ error: 'An error occurred while creating the tier.' });
    }
});




// Route to update the price and deposit of a tier and associated seats
router.put('/:name', async (req, res) => {
  const { name } = req.params; // Extract tier name from URL params
  const { price, deposit } = req.body; // Extract price and deposit from request body

  // Validate input
  if (price == null || deposit == null) {
    return res.status(400).json({ error: 'Price and deposit are required in the request body.' });
  }

  try {
    // Update the tier
    const updatedTier = await Tier.findOneAndUpdate(
      { name }, // Search condition
      { price, deposit }, // Fields to update
      { new: true, runValidators: true } // Return updated document and run validators
    );

    if (!updatedTier) {
      return res.status(404).json({ error: `Tier with name "${name}" not found.` });
    }

    // Update the seats associated with the tier
    const updatedSeats = await Seats.updateMany(
      { tier: updatedTier._id }, // Match seats with the updated tier
      { price, deposit } // Update price and deposit
    );

    res.status(200).json({
      message: `Tier ${name} and associated seats successfully updated.`,
      tier: updatedTier,
      seatsUpdated: updatedSeats.modifiedCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the tier and seats.' });
  }
});

module.exports = router;

  
  
  module.exports = router;