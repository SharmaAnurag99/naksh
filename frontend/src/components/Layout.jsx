import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Layout({ children }) {
  const { getCartCount } = useCart();

  return (
    <>
      <header className="header">
        <div className="header-left">
          <Link to="/" className="brand">
            Naksh Jewels
          </Link>
        </div>
        <nav className="header-right">
          <Link to="/cart" className="cart-link">
            Cart ({getCartCount()})
          </Link>
        </nav>
      </header>
      <main className="main">{children}</main>
    </>
  );
}

