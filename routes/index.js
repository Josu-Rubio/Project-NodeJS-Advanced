'use strict';
const express = require('express');
const router = express.Router();
const axios = require('axios').default;

async function asyncCall(params) {
  return axios({
    method: 'GET',
    url: `http://localhost:3000/products${params}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return ['error', error];
    });
}

router.get('/', async function (req, res, next) {
  try {
    let query = '';
    const data = await asyncCall(query);
    res.render('index', {
      title: 'Nodepop API',
      db: data,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
