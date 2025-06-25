const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  type: {
    type: String,
    required: true,
    enum: ['public', 'product'],
  },
  productModel: {
    type: String,
    required: function() { return this.type === 'product'; },
    enum: ['Fence', 'Gate']
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: function() { return this.type === 'product'; },
    refPath: 'productModel'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema); 