import { Routes, Route } from 'react-router-dom';
import ProductListing from './pages/ProductListing';
import Cart from './pages/Cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductListing />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;

