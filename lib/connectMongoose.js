'use strict';

const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to MongoDB on', db.name);
});

db.on('error', (err) => {
  console.error('Conection error on', err);
  process.exit(1);
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = db;
