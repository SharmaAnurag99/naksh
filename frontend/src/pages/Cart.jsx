import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, removeItem, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <Layout>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn">
          Continue shopping
        </Link>
      </Layout>
    );
  }

  const totalLabel = getCartTotal().toLocaleString();

  return (
    <Layout>
      <h1>Cart</h1>
      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-image" />
            <div className="cart-info">
              <span className="cart-name">{item.name}</span>
              <span className="cart-price">
                ₹{item.price.toLocaleString()} x {item.quantity}
              </span>
            </div>
            <div className="cart-actions">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value) || 1)
                }
              />
              <button
                type="button"
                className="btn danger"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="cart-total">Subtotal: ₹{totalLabel}</p>
    </Layout>
  );
}

