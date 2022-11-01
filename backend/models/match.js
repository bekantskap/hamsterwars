const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  id: {
    required: true,
    type: Number,
  },
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
