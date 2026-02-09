import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const priceLabel =
    typeof product.price === 'number'
      ? product.price.toLocaleString()
      : product.price;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₹{priceLabel}</p>
      <button
        type="button"
        className="btn primary"
        onClick={() => addItem(product, 1)}
      >
        Add to Cart
      </button>
    </div>
  );
}

