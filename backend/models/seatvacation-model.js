const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatVacationRequestSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seats',
    required: true,
  },
  vacationDate: {
    type: Date,
    required: true,
  },
  depositAdjustment: {
    type: Number,
    default: 0, // Amount to reduce or add to the deposit
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

const SeatVacationRequest = mongoose.model('SeatVacationRequest', seatVacationRequestSchema);

module.exports = SeatVacationRequest;
