const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tierSchema = new Schema({
    name: {
      type: String,
      enum: ['standard', 'premium', 'supreme'],
      unique: true
    },
    price: {
      type: Number,
      required: true,
      default:0
    },
    deposit: {
      type: Number,
      default: 0
    }
  });
  
  const TierModel = mongoose.model('Tier', tierSchema);
  
  module.exports = TierModel;