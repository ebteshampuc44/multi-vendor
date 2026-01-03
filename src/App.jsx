// App.jsx - Updated with Wishlist and Cart pages
import { Routes, Route } from 'react-router-dom';
import Root from './Root';
import Home from './pages/Home';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist'; // Add this import
import Cart from './pages/Cart'; // Add this import

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="wishlist" element={<Wishlist />} /> {/* Add this route */}
        <Route path="cart" element={<Cart />} /> {/* Add this route */}
      </Route>
    </Routes>
  );
}

export default App;