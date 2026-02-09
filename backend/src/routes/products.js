const express = require('express');
const { getAllProducts } = require('../data/products');

const router = express.Router();

router.get('/', (req, res) => {
  const products = getAllProducts();
  res.json({ success: true, data: products });
});

module.exports = router;

