import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = () => {
    setLoading(true);
    setError(null);
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => {
        setError(err.message || 'Unable to load products.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout>
      <h1>Products</h1>
      {loading && <p>Loading…</p>}
      {error && (
        <div className="error-box">
          <p>{error}</p>
          <button type="button" className="btn" onClick={loadProducts}>
            Retry
          </button>
        </div>
      )}
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </Layout>
  );
}

