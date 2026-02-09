function validateAddToCart(req, res, next) {
  const { productId, quantity } = req.body;
  const errors = [];

  if (productId === undefined || productId === null || productId === '') {
    errors.push('productId is required');
  }

  if (quantity === undefined || quantity === null) {
    errors.push('quantity is required');
  } else if (typeof quantity !== 'number' || quantity < 1) {
    errors.push('quantity must be a positive number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors.join('; '),
    });
  }

  next();
}

module.exports = { validateAddToCart };

