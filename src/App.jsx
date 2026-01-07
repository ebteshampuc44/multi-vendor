// App.jsx - Complete with all restaurant and shop menus
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

// Restaurant Menus (নমুনা হিসেবে কয়েকটি - আপনি যেগুলো তৈরি করেছেন)
import SultansDineMenu from './pages/brands/SultansDineMenu';
import KacchiBhaiMenu from './pages/brands/KacchiBhaiMenu';
import ChilloxMenu from './pages/brands/ChilloxMenu';
import PizzaHutMenu from './pages/brands/PizzaHutMenu';

// Shop Pages (যেগুলো আপনি তৈরি করেছেন)
import AgoraShop from './pages/shops/AgoraShop';
import BengalMeatShop from './pages/shops/BengalMeatShop';
import FruitZoneShop from './pages/shops/FruitZoneShop';
import RFLPharmaShop from './pages/shops/RFLPharmaShop';
import UnimartShop from './pages/shops/UnimartShop';

// যদি AmanaBigBazarShop না থাকে তবে একটি সাধারণ কম্পোনেন্ট
const AmanaBigBazarShop = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-lg text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Amana Big Bazar - Mohakhali</h1>
      <p className="text-gray-600 mb-6">Departmental store with variety of products</p>
      <button 
        onClick={() => window.history.back()}
        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-shadow"
      >
        Go Back
      </button>
    </div>
  </div>
);

// Simple brand page component for other restaurants
const SimpleBrandPage = ({ brandName, description = "" }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{brandName}</h1>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      <p className="text-gray-500 mb-6">Menu Page Coming Soon!</p>
      <button 
        onClick={() => window.history.back()}
        className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
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
          
          {/* Restaurant Menu Routes - কয়েকটি নমুনা */}
          <Route path="restaurant/sultans-dine" element={<SultansDineMenu />} />
          <Route path="restaurant/kacchi-bhai" element={<KacchiBhaiMenu />} />
          <Route path="restaurant/chillox" element={<ChilloxMenu />} />
          <Route path="restaurant/pizza-hut" element={<PizzaHutMenu />} />
          
          {/* অন্যান্য রেস্তোরাঁর জন্য সাধারণ পেজ */}
          <Route path="restaurant/pizzaburg" element={<SimpleBrandPage brandName="PizzaBurg" description="Pizza & Burgers" />} />
          <Route path="restaurant/7days-restaurant" element={<SimpleBrandPage brandName="7 Days Restaurant" description="Open 7 days a week" />} />
          <Route path="restaurant/kacchi-dine" element={<SimpleBrandPage brandName="Kacchi Dine" description="Fast food chain" />} />
          <Route path="restaurant/sadias-kitchen" element={<SimpleBrandPage brandName="sadia's kitchen" description="Popular local brand" />} />
          <Route path="restaurant/dominos-pizza" element={<SimpleBrandPage brandName="Domino's Pizza" description="World famous pizza" />} />
          <Route path="restaurant/kfc" element={<SimpleBrandPage brandName="KFC" description="Finger lickin' good" />} />
          <Route path="restaurant/peyari-tehari" element={<SimpleBrandPage brandName="Peyari Tehari" description="Famous for Tehari" />} />
          
          {/* Shop Routes - Home.jsx এর Top Shops থেকে */}
          <Route path="shop/fruit-zone" element={<FruitZoneShop />} />
          <Route path="shop/bengal-meat-dhali" element={<BengalMeatShop />} />
          <Route path="shop/rfl-best-buy-pharma" element={<RFLPharmaShop />} />
          <Route path="shop/unimart-gulshan" element={<UnimartShop />} />
          <Route path="shop/amana-big-bazar" element={<AmanaBigBazarShop />} />
          <Route path="shop/agora-rm-center" element={<AgoraShop />} />
          
          {/* Simple brand routes for Top Brands */}
          <Route path="brand/sultans-dine" element={<SimpleBrandPage brandName="Sultan's Dine" description="Authentic Bengali cuisine" />} />
          <Route path="brand/kacchi-bhai" element={<SimpleBrandPage brandName="Kacchi Bhai" description="Best Kacchi in town" />} />
          <Route path="brand/7days-restaurant" element={<SimpleBrandPage brandName="7 Days Restaurant" description="Open 7 days a week" />} />
          <Route path="brand/chillox" element={<SimpleBrandPage brandName="Chillox" description="Famous for burgers" />} />
          <Route path="brand/pizzaburg" element={<SimpleBrandPage brandName="PizzaBurg" description="Pizza & Burgers" />} />
          <Route path="brand/kacchi-dine" element={<SimpleBrandPage brandName="Kacchi Dine" description="Fast food chain" />} />
          <Route path="brand/sadias-kitchen" element={<SimpleBrandPage brandName="sadia's kitchen" description="Popular local brand" />} />
          <Route path="brand/pizza-hut" element={<SimpleBrandPage brandName="Pizza Hut" description="International pizza chain" />} />
          <Route path="brand/dominos-pizza" element={<SimpleBrandPage brandName="Domino's Pizza" description="World famous pizza" />} />
          <Route path="brand/kfc" element={<SimpleBrandPage brandName="KFC" description="Finger lickin' good" />} />
          <Route path="brand/peyari-tehari" element={<SimpleBrandPage brandName="Peyari Tehari" description="Famous for Tehari" />} />
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