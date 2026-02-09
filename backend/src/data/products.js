const products = [
  {
    id: '1',
    name: 'Gold Ring',
    price: 15000,
    image: '/ring.jpg',
  },
  {
    id: '2',
    name: 'Silver Necklace',
    price: 8500,
    image: '/silver.webp',
  },
  {
    id: '3',
    name: 'Diamond Earrings',
    price: 25000,
    image: '/dimond.jpg',
  },
  {
    id: '4',
    name: 'Pearl Bracelet',
    price: 12000,
    image: '/pearl.webp',
  },
  {
    id: '5',
    name: 'Emerald Pendant',
    price: 18000,
    image: '/emerald.webp',
  },
];

function getAllProducts() {
  return products;
}

function getProductById(id) {
  return products.find((p) => p.id === id);
}

module.exports = { getAllProducts, getProductById, products };

