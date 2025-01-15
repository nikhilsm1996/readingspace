const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
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
  paymentMethod: {
    type: String,
    enum: ['Cash', 'UPI'],
    required: true,
  },
  paymentInitiated: {
    type: Boolean,
    default: false,
  },
  paymentCompleted: {
    type: Boolean,
    default: false,
  },
  paymentDate: {
    type: Date,
    default: null,
  },
  nextPaymentDueDate: {
    type: Date,
    default: null,
  },
  deposit: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing',
  },
  transactionId: {
    type: String,
    unique: true,
    required: true,
    default: () => `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;

