const express = require('express');
const router = express.Router();
const path = require('path');
const Tag = require('../../models/tag');
const { check, validationResult } = require('express-validator');
const Product = require('./../../models/product');
const multer = require('./../../lib/multerDb');

router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    const limit = parseInt(req.query.limit) || 100;
    const skip = parseInt(req.query.skip) || null;
    const sort = req.query.sort || '_id';
    const fields = req.query.fields;
    if (req.query.name !== undefined) {
      filter.name = new RegExp('^' + req.query.name, 'i');
    }
    if (req.query.sell !== undefined) {
      filter.sell = req.query.sell;
    }
    if (typeof req.query.price !== 'undefined' && req.query.price !== '-') {
      if (req.query.price.indexOf('-') !== -1) {
        filter.price = {};
        let rango = req.query.price.split('-');
        if (rango[0] !== '') {
          filter.price.$gte = rango[0];
        }

        if (rango[1] !== '') {
          filter.price.$lte = rango[1];
        }
      } else {
        filter.price = req.query.price;
      }
    }
    if (req.query.tag !== undefined) {
      filter.tags = req.query.tag;
    }

    const docs = await Product.list(filter, sort, skip, limit, fields);
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

router.post('/', multer.single('photo'), async (req, res, next) => {
  try {
    const productData = req.body;
    const product = new Product(productData);
    await product.resize(req.file);
    const productSaved = await product.save();
    res.status(201).json({ ok: true, result: productSaved });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    await Product.update({ _id: _id });
    res.json();
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    await Product.deleteOne({ _id: _id });
    res.json();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
