const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  id: {
    required: true,
    type: Number,
  },
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
  favFood: {
    required: true,
    type: String,
  },
  loves: {
    required: true,
    type: String,
  },
  imgName: {
    required: true,
    type: String,
  },
  wins: {
    required: true,
    type: Number,
  },
  defeats: {
    required: true,
    type: Number,
  },
  games: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('Data', dataSchema);
