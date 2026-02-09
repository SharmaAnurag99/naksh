import productsFallback from '../data/products.json';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products`);
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const json = await res.json();
    return json.data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Using fallback products', err);
    return productsFallback;
  }
}

export async function addToCartApi(item) {
  const res = await fetch(`${API_URL}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: item.id, quantity: item.quantity || 1 }),
  });
  if (!res.ok) {
    throw new Error('Failed to add to cart');
  }
  return res.json();
}

