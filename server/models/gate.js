const mongoose = require('mongoose');

const GateSchema = new mongoose.Schema({
  optionId: Number,
  type: String,
  size: String,
  materials: {
    frame: String,
    panel: String,
    support: String
  },
  prices: {
    no_installation: Number,
    with_installation: Number
  },
  description: String,
  image: String
});

module.exports = mongoose.model('Gate', GateSchema); 