const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  winnerId: {
    required: true,
    type: Number,
  },
  loserId: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('Match', matchSchema);
