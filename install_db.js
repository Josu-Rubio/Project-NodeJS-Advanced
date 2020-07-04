'use strict';

require('dotenv').config();

const db = require('./lib/connectMongoose');
const Product = require('./models/product.js');
const Tag = require('./models/tag.js');
const User = require('./models/user');

db.once('open', async () => {
  try {
    await initProducts();
    await initTags();
    await initUser();
    db.close();
  } catch (err) {
    console.log(`An error ocurred on ${err}`);
    process.exit(1);
  }
});

async function initProducts() {
  await Product.deleteMany();
  await Product.insertMany([
    {
      name: 'Motorbike',
      sell: true,
      price: 900.0,
      photo: 'motorbike.jpg',
      tags: ['lifestyle', 'motor'],
    },
    {
      name: 'Airpods',
      sell: false,
      price: 100.0,
      photo: 'airpods.jpg',
      tags: ['mobile'],
    },
    {
      name: 'Kite',
      sell: true,
      price: 50.0,
      photo: 'kite.jpg',
      tags: ['lifestyle'],
    },
    {
      name: 'Drawing pad',
      sell: false,
      price: 75.0,
      photo: 'drawpad.jpg',
      tags: ['work'],
    },
    {
      name: 'Phone',
      sell: true,
      price: 250.0,
      photo: 'phone.jpg',
      tags: ['work', 'mobile'],
    },
  ]);
}

async function initTags() {
  await Tag.deleteMany();
  await Tag.insertMany([
    { tag: 'lifestyle' },
    { tag: 'work' },
    { tag: 'motor' },
    { tag: 'mobile' },
  ]);
}

async function initUser() {
  await User.deleteMany();
  await User.insertMany([
    {
      email: 'user@example.es',
      password: await User.hashPassword('1234'),
    },
  ]);
}
