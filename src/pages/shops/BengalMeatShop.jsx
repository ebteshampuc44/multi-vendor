import { useState } from "react";
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, Check, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BengalMeatShop = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  const meatItems = [
    {
      id: 1,
      name: "Beef - Premium Cut",
      price: 750,
      originalPrice: 800,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      category: "Red Meat",
      stock: 20,
      description: "Premium quality beef, perfect for steak"
    },
    {
      id: 2,
      name: "Chicken Breast",
      price: 320,
      originalPrice: 350,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      category: "Poultry",
      stock: 50,
      description: "Boneless chicken breast, lean protein"
    },
    {
      id: 3,
      name: "Mutton - Leg Piece",
      price: 950,
      originalPrice: 1000,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1603048297172-c6094b697c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      category: "Red Meat",
      stock: 15,
      description: "Tender mutton leg piece, ideal for curry"
    },
    {
      id: 4,
      name: "Chicken Thigh",
      price: 280,
      originalPrice: 300,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.3,
      category: "Poultry",
      stock: 40,
      description: "Juicy chicken thighs with bone"
    },
    {
      id: 5,
      name: "Beef Keema",
      price: 700,
      originalPrice: 750,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.4,
      category: "Minced Meat",
      stock: 25,
      description: "Freshly minced beef, ready to cook"
    },
    {
      id: 6,
      name: "Chicken Whole",
      price: 350,
      originalPrice: 380,
      unit: "piece",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.2,
      category: "Poultry",
      stock: 30,
      description: "Whole chicken, cleaned and ready to cook"
    },
    {
      id: 7,
      name: "Beef Bones",
      price: 200,
      originalPrice: 220,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.1,
      category: "Bones",
      stock: 60,
      description: "Beef bones for soup and broth"
    },
    {
      id: 8,
      name: "Chicken Liver",
      price: 180,
      originalPrice: 200,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1573141078736-5e10705a4268?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.0,
      category: "Offal",
      stock: 35,
      description: "Fresh chicken liver, rich in iron"
    },
    {
      id: 9,
      name: "Chicken Wings",
      price: 250,
      originalPrice: 280,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.3,
      category: "Poultry",
      stock: 45,
      description: "Chicken wings, perfect for grilling"
    },
    {
      id: 10,
      name: "Beef Ribs",
      price: 850,
      originalPrice: 900,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      category: "Red Meat",
      stock: 18,
      description: "Beef ribs for BBQ and slow cooking"
    },
    {
      id: 11,
      name: "Duck Meat",
      price: 550,
      originalPrice: 600,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.4,
      category: "Poultry",
      stock: 25,
      description: "Fresh duck meat, great for curry"
    },
    {
      id: 12,
      name: "Chicken Drumsticks",
      price: 300,
      originalPrice: 320,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.3,
      category: "Poultry",
      stock: 38,
      description: "Chicken drumsticks, perfect for frying"
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
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-red-700 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold">Bengal Meat - Dhali (DCC Market)</h1>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/cart')}
                className="relative hover:bg-red-700 p-2 rounded-lg transition-colors"
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
            <p className="text-red-100">Fresh meat and poultry shop - Halal certified</p>
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.8 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Free Delivery over ৳800</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Halal Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Fresh Daily</span>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Fresh Meat Collection</h2>
          <p className="text-gray-600">Premium quality halal meat from trusted sources</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meatItems.map((item) => (
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
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
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
          <h3 className="text-xl font-bold text-gray-800 mb-4">About Bengal Meat</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Our Quality Promise</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600">✓</span>
                  </div>
                  <span>100% Halal Certified</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600">✓</span>
                  </div>
                  <span>Antibiotic Free</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600">✓</span>
                  </div>
                  <span>No Artificial Preservatives</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600">✓</span>
                  </div>
                  <span>Hygienic Processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600">✓</span>
                  </div>
                  <span>Fresh Daily Delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600">✓</span>
                  </div>
                  <span>Temperature Controlled Storage</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Delivery & Contact</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">📍</span>
                  </div>
                  <span>Location: DCC Market, Dhaka</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">🚚</span>
                  </div>
                  <span>Free Delivery: Orders above ৳800</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">⏰</span>
                  </div>
                  <span>Delivery Time: 3-5 Hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">📞</span>
                  </div>
                  <span>Phone: +880 1234-567891</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">🕒</span>
                  </div>
                  <span>Open: 6:00 AM - 10:00 PM</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">🎯</span>
                  </div>
                  <span>Service Area: Dhaka Metropolitan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BengalMeatShop;