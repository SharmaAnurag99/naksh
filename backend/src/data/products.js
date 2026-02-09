const products = [
  { id: '1', name: 'Gold Ring', price: 15000, image: '/placeholder-ring.jpg' },
  { id: '2', name: 'Silver Necklace', price: 8500, image: '/placeholder-necklace.jpg' },
  { id: '3', name: 'Diamond Earrings', price: 25000, image: '/placeholder-earrings.jpg' },
  { id: '4', name: 'Pearl Bracelet', price: 12000, image: '/placeholder-bracelet.jpg' },
  { id: '5', name: 'Emerald Pendant', price: 18000, image: '/placeholder-pendant.jpg' },
];

function getAllProducts() {
  return products;
}

function getProductById(id) {
  return products.find((p) => p.id === id);
}

module.exports = { getAllProducts, getProductById, products };

