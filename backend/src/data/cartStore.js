// In-memory cart: array of { productId, name, price, image, quantity }
let cart = [];

function getCart() {
  return cart;
}

function addItem(item) {
  const existing = cart.find((i) => i.productId === item.productId);
  if (existing) {
    existing.quantity += item.quantity || 1;
    return existing;
  }
  cart.push({
    productId: item.productId,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: item.quantity || 1,
  });
  return cart[cart.length - 1];
}

function updateItem(productId, quantity) {
  const item = cart.find((i) => i.productId === productId);
  if (!item) return null;
  if (quantity <= 0) {
    cart = cart.filter((i) => i.productId !== productId);
    return null;
  }
  item.quantity = quantity;
  return item;
}

function removeItem(productId) {
  const before = cart.length;
  cart = cart.filter((i) => i.productId !== productId);
  return before !== cart.length;
}

module.exports = { getCart, addItem, updateItem, removeItem };

