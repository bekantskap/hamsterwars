const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/routes');
const fs = require('fs');
const Hamster = require('./models/hamster');
const { db } = require('./models/hamster');

const jsonData = JSON.parse(fs.readFileSync('./files/hamsters.json', 'utf-8'));

const PORT = 4000;
const mongoUri = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use('/api', routes);

mongoose.connect(mongoUri);
const database = mongoose.connection;

const importData = async () => {
  try {
    await Hamster.deleteMany();
    await Hamster.create(jsonData);
    console.log('data successfully imported');
    // to exit the process
    process.exit();
  } catch (error) {
    console.log('error', error);
  }
};

database.on('error', error => {
  console.log(error);
});
database.once('connected', () => {
  console.log('Database Connected');
  importData();
});

app.listen(PORT, () => {
  console.log('server started at' + PORT);
});
