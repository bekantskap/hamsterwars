const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/routes');

const Hamster = require('./models/hamster');
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', routes);

mongoose.connect(mongoUri);
const database = mongoose.connection;

database.on('error', error => {
  console.log(error);
});
database.once('connected', () => {
  console.log('Database Connected');
});

app.listen(PORT, () => {
  console.log('server started at' + PORT);
});
