// App.jsx - Updated with all restaurant menus
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Root from './Root';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import UserRegister from './pages/UserRegister';
import RestaurantPartnerRegister from './pages/RestaurantPartnerRegister';
import BusinessAccountRegister from './pages/BusinessAccountRegister';
import SultansDineMenu from './pages/brands/SultansDineMenu';
import KacchiBhaiMenu from './pages/brands/KacchiBhaiMenu';
import ChilloxMenu from './pages/brands/ChilloxMenu';
import PizzaHutMenu from './pages/brands/PizzaHutMenu';


// Simple brand page component
const BrandPage = ({ brandName = "Brand" }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{brandName}</h1>
      <p className="text-gray-600">Coming Soon!</p>
      <button 
        onClick={() => window.history.back()}
        className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
      >
        Go Back
      </button>
    </div>
  </div>
);

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />

          {/* Registration Routes */}
          <Route path="register/user" element={<UserRegister />} />
          <Route path="register/restaurant-partner" element={<RestaurantPartnerRegister />} />
          <Route path="register/business-account" element={<BusinessAccountRegister />} />
          
          {/* Restaurant Menu Routes */}
          <Route path="restaurant/sultans-dine" element={<SultansDineMenu />} />
          <Route path="restaurant/kacchi-bhai" element={<KacchiBhaiMenu />} />
          <Route path="restaurant/chillox" element={<ChilloxMenu />} />
          <Route path="restaurant/pizza-hut" element={<PizzaHutMenu />} />
          
          {/* Simple brand routes */}
          <Route path="brand/sultans-dine" element={<BrandPage brandName="Sultan's Dine" />} />
          <Route path="brand/kacchi-bhai" element={<BrandPage brandName="Kacchi Bhai" />} />
          <Route path="brand/7days-restaurant" element={<BrandPage brandName="7 Days Restaurant" />} />
          <Route path="brand/chillox" element={<BrandPage brandName="Chillox" />} />
          <Route path="brand/pizzaburg" element={<BrandPage brandName="PizzaBurg" />} />
          <Route path="brand/kacchi-dine" element={<BrandPage brandName="Kacchi Dine" />} />
          <Route path="brand/sadias-kitchen" element={<BrandPage brandName="sadia's kitchen" />} />
          <Route path="brand/pizza-hut" element={<BrandPage brandName="Pizza Hut" />} />
          <Route path="brand/dominos-pizza" element={<BrandPage brandName="Domino's Pizza" />} />
          <Route path="brand/kfc" element={<BrandPage brandName="KFC" />} />
        </Route>
      </Routes>
      
      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;