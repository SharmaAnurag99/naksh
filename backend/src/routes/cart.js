const express = require('express');
const { getCart, addItem, updateItem, removeItem } = require('../data/cartStore');
const { getProductById } = require('../data/products');
const { validateAddToCart } = require('../middleware/validateCart');

const router = express.Router();

// GET /api/cart – return current cart
router.get('/', (req, res) => {
  const cart = getCart();
  res.json({ success: true, data: cart });
});

// POST /api/cart – add or update item
router.post('/', validateAddToCart, (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = getProductById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const item = addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: Number(quantity),
    });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/cart/:id – update quantity
router.patch('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updated = updateItem(id, Number(quantity));
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart/:id – remove item
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = removeItem(id);
    if (!removed) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

