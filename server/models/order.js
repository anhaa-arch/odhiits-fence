const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  itemType: { type: String, enum: ['fence', 'gate'], required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'itemType' },
  length: Number,
  width: Number,
  gateLength: Number,
  height: Number,
  perimeter: Number,
  totalSqm: Number,
  unitPrice: Number,
  totalPrice: Number,
  install: { type: String, enum: ['yes', 'no'] },
  comment: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema); 