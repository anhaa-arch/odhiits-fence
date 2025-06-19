// server/models/Fence.js
const mongoose = require('mongoose');

const FenceSchema = new mongoose.Schema({
  optionId: Number,
  name: String,
  materials: {
    savx: {
      size: String,
      thickness: Number
    },
    dai: {
      size: String,
      thickness: Number
    },
    shon: {
      size: String,
      thickness: Number
    }
  },
  prices: {
    no_installation: Number,
    with_installation: Number
  },
  unit: String
});

module.exports = mongoose.model('Fence', FenceSchema);
