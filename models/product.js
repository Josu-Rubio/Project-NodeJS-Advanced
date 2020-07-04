'use strict';

const mongoose = require('mongoose');
const cote = require('cote');

const requester = new cote.Requester({ name: 'thumbnail creator' });

const productSchema = mongoose.Schema({
  name: { type: String, index: true },
  sell: { type: Boolean, index: true },
  price: { type: Number, index: true },
  photo: String,
  tags: { type: [String], index: true },
  message: mongoose.Schema.Types.Mixed,
});

productSchema.statics.list = function (filter, sort, skip, limit, fields) {
  const query = Product.find(filter);
  query.sort(sort);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  return query.exec();
};

productSchema.methods.resize = async function (photo) {
  if (!photo) return;

  requester.send(
    {
      type: 'thumbnail',
      photo: photo,
    },
    (response) => {
      console.log(`Creating thumbnail: ${response}`);
    }
  );
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
