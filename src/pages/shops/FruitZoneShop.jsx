import { useState } from "react";
import { ArrowLeft, ShoppingCart, Star, Package, Truck, Shield, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FruitZoneShop = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  const groceryItems = [
    {
      id: 1,
      name: "Fresh Apple - Washington",
      price: 220,
      originalPrice: 250,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      category: "Fresh Fruits",
      stock: 50,
      description: "Imported from USA, crispy and sweet"
    },
    {
      id: 2,
      name: "Banana - Local",
      price: 80,
      originalPrice: 90,
      unit: "dozen",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.2,
      category: "Fresh Fruits",
      stock: 100,
      description: "Fresh local bananas, perfect for breakfast"
    },
    {
      id: 3,
      name: "Mango - Himsagar",
      price: 180,
      originalPrice: 200,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      category: "Fresh Fruits",
      stock: 30,
      description: "Seasonal Himsagar mango, sweet and juicy"
    },
    {
      id: 4,
      name: "Orange - Imported",
      price: 280,
      originalPrice: 300,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.3,
      category: "Fresh Fruits",
      stock: 40,
      description: "Juicy imported oranges, rich in Vitamin C"
    },
    {
      id: 5,
      name: "Grapes - Black",
      price: 350,
      originalPrice: 400,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      category: "Fresh Fruits",
      stock: 25,
      description: "Seedless black grapes, perfect for desserts"
    },
    {
      id: 6,
      name: "Pomegranate",
      price: 320,
      originalPrice: 350,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1541344999736-83eca272f2f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.4,
      category: "Fresh Fruits",
      stock: 35,
      description: "Fresh pomegranate, rich in antioxidants"
    },
    {
      id: 7,
      name: "Watermelon",
      price: 60,
      originalPrice: 70,
      unit: "piece",
      image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.1,
      category: "Fresh Fruits",
      stock: 60,
      description: "Sweet watermelon, perfect for summer"
    },
    {
      id: 8,
      name: "Pineapple",
      price: 120,
      originalPrice: 140,
      unit: "piece",
      image: "https://images.unsplash.com/photo-1550269835-0c4cbb5d24e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.0,
      category: "Fresh Fruits",
      stock: 45,
      description: "Fresh pineapple, sweet and tangy"
    },
    {
      id: 9,
      name: "Strawberry",
      price: 400,
      originalPrice: 450,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      category: "Fresh Fruits",
      stock: 20,
      description: "Fresh strawberries, perfect for desserts"
    },
    {
      id: 10,
      name: "Kiwi - Imported",
      price: 300,
      originalPrice: 350,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1550253006-4e6e9a07aa2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      category: "Fresh Fruits",
      stock: 25,
      description: "New Zealand kiwi, rich in Vitamin C"
    },
    {
      id: 11,
      name: "Lemon",
      price: 50,
      originalPrice: 60,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1580052614034-c55d4bfc5caa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.2,
      category: "Fresh Fruits",
      stock: 80,
      description: "Fresh lemon, perfect for juice and cooking"
    },
    {
      id: 12,
      name: "Guava",
      price: 90,
      originalPrice: 100,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1582063289852-62ea5b4d6c9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.3,
      category: "Fresh Fruits",
      stock: 55,
      description: "Local guava, rich in fiber and vitamins"
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
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-green-700 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold">Fruit Zone</h1>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/cart')}
                className="relative hover:bg-green-700 p-2 rounded-lg transition-colors"
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
            <p className="text-green-100">Premium fresh fruits shop with international quality</p>
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.7 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Free Delivery over ৳500</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>100% Fresh</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Quality Guarantee</span>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Fresh Fruits Collection</h2>
          <p className="text-gray-600">Handpicked fresh fruits from around the world</p>
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
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
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
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
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
          <h3 className="text-xl font-bold text-gray-800 mb-4">About Fruit Zone</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Why Choose Us?</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span>100% Fresh and Organic Fruits</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span>Direct from Farm to Your Doorstep</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span>Hygienic Packaging</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span>Competitive Prices</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span>Same Day Delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span>Money Back Guarantee</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Delivery Information</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">📍</span>
                  </div>
                  <span>Delivery Areas: Dhaka City</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">🚚</span>
                  </div>
                  <span>Free Delivery: Orders above ৳500</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">⏰</span>
                  </div>
                  <span>Delivery Time: 2-4 Hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">📞</span>
                  </div>
                  <span>Contact: +880 1234-567890</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">🏪</span>
                  </div>
                  <span>Store Location: Gulshan-2, Dhaka</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">⏰</span>
                  </div>
                  <span>Open: 8:00 AM - 10:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FruitZoneShop;