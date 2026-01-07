import { useState } from "react";
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, Home, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UnimartShop = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  const groceryItems = [
    {
      id: 1,
      name: "Basmati Rice",
      price: 120,
      originalPrice: 140,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      category: "Grains",
      stock: 150,
      description: "Premium quality basmati rice"
    },
    {
      id: 2,
      name: "Fresh Milk",
      price: 75,
      originalPrice: 85,
      unit: "liter",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      category: "Dairy",
      stock: 200,
      description: "Fresh pasteurized milk"
    },
    {
      id: 3,
      name: "Olive Oil",
      price: 550,
      originalPrice: 600,
      unit: "liter",
      image: "https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      category: "Cooking Oil",
      stock: 80,
      description: "Extra virgin olive oil"
    },
    {
      id: 4,
      name: "Fresh Eggs",
      price: 150,
      originalPrice: 165,
      unit: "dozen",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      category: "Dairy",
      stock: 300,
      description: "Farm fresh eggs"
    },
    {
      id: 5,
      name: "Pasta",
      price: 180,
      originalPrice: 200,
      unit: "pack",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.3,
      category: "Pasta & Noodles",
      stock: 120,
      description: "Italian style pasta"
    },
    {
      id: 6,
      name: "Honey",
      price: 450,
      originalPrice: 500,
      unit: "500g",
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      category: "Sweeteners",
      stock: 90,
      description: "Pure organic honey"
    },
    {
      id: 7,
      name: "Coffee Beans",
      price: 650,
      originalPrice: 700,
      unit: "250g",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      category: "Beverages",
      stock: 75,
      description: "Arabica coffee beans"
    },
    {
      id: 8,
      name: "Bread",
      price: 45,
      originalPrice: 50,
      unit: "pack",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.2,
      category: "Bakery",
      stock: 250,
      description: "Fresh white bread"
    },
    {
      id: 9,
      name: "Cheddar Cheese",
      price: 320,
      originalPrice: 350,
      unit: "200g",
      image: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      category: "Dairy",
      stock: 110,
      description: "Aged cheddar cheese"
    },
    {
      id: 10,
      name: "Cereal",
      price: 280,
      originalPrice: 300,
      unit: "500g",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.4,
      category: "Breakfast",
      stock: 95,
      description: "Whole grain breakfast cereal"
    },
    {
      id: 11,
      name: "Butter",
      price: 220,
      originalPrice: 240,
      unit: "200g",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.3,
      category: "Dairy",
      stock: 130,
      description: "Unsalted butter"
    },
    {
      id: 12,
      name: "Yogurt",
      price: 90,
      originalPrice: 100,
      unit: "500g",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      category: "Dairy",
      stock: 180,
      description: "Greek style yogurt"
    }
  ];

  const increaseQuantity = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const decreaseQuantity = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0)
    }));
  };

  const addToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    const cartItem = {
      ...item,
      quantity,
      totalPrice: item.price * quantity
    };
    
    setCart([...cart, cartItem]);
    toast.success(`${item.name} (${quantity} ${item.unit}) added to cart! 🛒`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-purple-700 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold">Unimart - Gulshan 2</h1>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/cart')}
                className="relative hover:bg-purple-700 p-2 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-purple-100">Supermarket and grocery store - Everything you need</p>
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.7 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Free Delivery over ৳700</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Premium Supermarket</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Summary Banner */}
      {cart.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShoppingCart className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">
                  {cart.length} items in cart • Total: ৳{cartTotal}
                </span>
              </div>
              <button
                onClick={() => navigate('/cart')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-all hover:shadow-lg"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Supermarket Groceries</h2>
          <p className="text-gray-600">Premium quality groceries for your home</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {groceryItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.originalPrice > item.price && (
                  <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">
                    Save ৳{item.originalPrice - item.price}
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold">{item.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-800">৳{item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className="ml-2 text-gray-500 line-through text-sm">৳{item.originalPrice}</span>
                    )}
                    <span className="block text-gray-500 text-sm">per {item.unit}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Stock: {item.stock}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 text-sm">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold">
                        {quantities[item.id] || 1}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    Total: ৳{item.price * (quantities[item.id] || 1)}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Shop Info */}
        <div className="mt-12 bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">About Unimart</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Why Shop at Unimart?</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">✓</span>
                  </div>
                  <span>Wide Variety of Products</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">✓</span>
                  </div>
                  <span>Premium Quality Guarantee</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">✓</span>
                  </div>
                  <span>Competitive Prices</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">✓</span>
                  </div>
                  <span>Fresh Products Daily</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">✓</span>
                  </div>
                  <span>Hygienic Packaging</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">✓</span>
                  </div>
                  <span>Easy Return Policy</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Store Information</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600">📍</span>
                  </div>
                  <span>Gulshan-2, Dhaka</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600">🚚</span>
                  </div>
                  <span>Free Delivery: Orders above ৳700</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600">⏰</span>
                  </div>
                  <span>Delivery Time: 2-3 Hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600">📞</span>
                  </div>
                  <span>Phone: +880 1234-567894</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600">🕒</span>
                  </div>
                  <span>Open: 9:00 AM - 11:00 PM</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600">🏪</span>
                  </div>
                  <span>Parking Available</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnimartShop;