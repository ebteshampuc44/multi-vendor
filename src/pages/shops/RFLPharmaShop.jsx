import { useState } from "react";
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, Clock, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RFLPharmaShop = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  const medicalItems = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      price: 2.50,
      originalPrice: 3.00,
      unit: "strip",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      category: "Pain Relief",
      stock: 200,
      description: "For fever and pain relief"
    },
    {
      id: 2,
      name: "Vitamin C 1000mg",
      price: 15,
      originalPrice: 18,
      unit: "bottle",
      image: "https://images.unsplash.com/photo-1584308666742-9d27c5c27b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      category: "Vitamins",
      stock: 150,
      description: "Immune system support"
    },
    {
      id: 3,
      name: "Face Mask (N95)",
      price: 50,
      originalPrice: 60,
      unit: "pack of 5",
      image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.4,
      category: "Protective Gear",
      stock: 300,
      description: "N95 certified face masks"
    },
    {
      id: 4,
      name: "Hand Sanitizer",
      price: 120,
      originalPrice: 150,
      unit: "500ml",
      image: "https://images.unsplash.com/photo-1584467735871-8db9ac8c4c9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.3,
      category: "Hygiene",
      stock: 180,
      description: "Alcohol-based sanitizer"
    },
    {
      id: 5,
      name: "Thermometer Digital",
      price: 450,
      originalPrice: 500,
      unit: "piece",
      image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      category: "Medical Devices",
      stock: 80,
      description: "Digital forehead thermometer"
    },
    {
      id: 6,
      name: "Band Aid",
      price: 25,
      originalPrice: 30,
      unit: "box",
      image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.2,
      category: "First Aid",
      stock: 250,
      description: "Waterproof bandages"
    },
    {
      id: 7,
      name: "Digene Antacid",
      price: 85,
      originalPrice: 95,
      unit: "strip",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.3,
      category: "Digestive Care",
      stock: 120,
      description: "For acidity and heartburn"
    },
    {
      id: 8,
      name: "Multivitamin Syrup",
      price: 280,
      originalPrice: 320,
      unit: "200ml",
      image: "https://images.unsplash.com/photo-1584308666742-9d27c5c27b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      category: "Vitamins",
      stock: 90,
      description: "Complete multivitamin for all ages"
    },
    {
      id: 9,
      name: "Blood Pressure Monitor",
      price: 1200,
      originalPrice: 1400,
      unit: "piece",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      category: "Medical Devices",
      stock: 40,
      description: "Digital blood pressure monitor"
    },
    {
      id: 10,
      name: "Cough Syrup",
      price: 95,
      originalPrice: 110,
      unit: "bottle",
      image: "https://images.unsplash.com/photo-1584308666742-9d27c5c27b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.4,
      category: "Cough & Cold",
      stock: 110,
      description: "For dry and wet cough"
    },
    {
      id: 11,
      name: "Baby Diapers",
      price: 550,
      originalPrice: 600,
      unit: "pack",
      image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      category: "Baby Care",
      stock: 75,
      description: "Hypoallergenic baby diapers"
    },
    {
      id: 12,
      name: "First Aid Kit",
      price: 850,
      originalPrice: 950,
      unit: "kit",
      image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      category: "First Aid",
      stock: 60,
      description: "Complete first aid kit for home"
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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold">RFL Best Buy Pharma (Kalachandpur)</h1>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/cart')}
                className="relative hover:bg-blue-700 p-2 rounded-lg transition-colors"
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
            <p className="text-blue-100">Pharmacy and medical supplies - 24/7 service available</p>
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.6 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>30 Min Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Licensed Pharmacy</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Service</span>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Medical & Health Products</h2>
          <p className="text-gray-600">Trusted medicines and healthcare products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {medicalItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.originalPrice > item.price && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
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
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
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
          <h3 className="text-xl font-bold text-gray-800 mb-4">About RFL Best Buy Pharma</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Our Services</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">✓</span>
                  </div>
                  <span>24/7 Pharmacy Service</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">✓</span>
                  </div>
                  <span>Doctor Prescription Required</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">✓</span>
                  </div>
                  <span>Licensed Pharmacist Available</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">✓</span>
                  </div>
                  <span>Home Delivery Service</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">✓</span>
                  </div>
                  <span>Emergency Medicine Delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">✓</span>
                  </div>
                  <span>Free Medical Consultation</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Contact Information</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600">📍</span>
                  </div>
                  <span>Address: Kalachandpur, Dhaka</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600">🚚</span>
                  </div>
                  <span>Delivery Time: 30-60 Minutes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600">📞</span>
                  </div>
                  <span>Emergency: +880 1234-567892</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600">📱</span>
                  </div>
                  <span>WhatsApp: +880 1234-567893</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600">🕒</span>
                  </div>
                  <span>Open: 24 Hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600">🎯</span>
                  </div>
                  <span>Delivery Area: Dhaka City</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFLPharmaShop;