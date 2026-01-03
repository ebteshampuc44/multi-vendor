import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, Star, X, ArrowRight, AlertCircle } from "lucide-react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartMessage, setCartMessage] = useState("");
  const navigate = useNavigate();

  // লোকাল স্টোরেজ থেকে ডেটা লোড করার ফাংশন
  const loadWishlistData = () => {
    try {
      const savedWishlist = localStorage.getItem("shopickWishlist");
      console.log("Loading wishlist from localStorage:", savedWishlist);
      
      if (savedWishlist) {
        const parsedData = JSON.parse(savedWishlist);
        setWishlistItems(Array.isArray(parsedData) ? parsedData : []);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
      setWishlistItems([]);
    }
    setLoading(false);
  };

  // লোকাল স্টোরেজে সেভ
  const saveWishlistData = (items) => {
    try {
      localStorage.setItem("shopickWishlist", JSON.stringify(items));
      console.log("Saved wishlist to localStorage:", items);
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  };

  // লোকাল স্টোরেজ থেকে ডেটা লোড
  useEffect(() => {
    loadWishlistData();

    // লোকাল স্টোরেজ পরিবর্তনের জন্য ইভেন্ট লিসেনার
    const handleStorageChange = (e) => {
      if (e.key === "shopickWishlist") {
        console.log("Wishlist storage changed, reloading...");
        loadWishlistData();
      }
    };

    // কাস্টম ইভেন্টের জন্য লিসেনার
    const handleCustomEvent = () => {
      console.log("Custom wishlist event received");
      loadWishlistData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleCustomEvent);
    };
  }, []);

  // লোকাল স্টোরেজে সেভ যখন wishlistItems পরিবর্তন হয়
  useEffect(() => {
    if (!loading) {
      saveWishlistData(wishlistItems);
      // ইভেন্ট ডিসপ্যাচ করুন অন্য কম্পোনেন্টগুলো আপডেট করার জন্য
      window.dispatchEvent(new Event('wishlistUpdated'));
      window.dispatchEvent(new Event('storage'));
    }
  }, [wishlistItems, loading]);

  // আইটেম রিমুভ
  const removeItem = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    showMessage(`Item removed from wishlist`, "success");
  };

  // সিলেক্ট/আনসিলেক্ট
  const toggleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // সিলেক্ট অল
  const selectAllItems = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  // কার্টে যোগ
  const addToCart = (item) => {
    try {
      const cart = JSON.parse(localStorage.getItem("shopickCart")) || [];
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      
      if (!existingItem) {
        const cartItem = {
          ...item,
          quantity: 1,
          maxQuantity: 10,
          inStock: true
        };
        cart.push(cartItem);
        localStorage.setItem("shopickCart", JSON.stringify(cart));
        console.log("Added to cart:", cartItem);
        showMessage(`"${item.name}" added to cart!`, "success");
        
        // কার্ট আপডেট ইভেন্ট ট্রিগার
        window.dispatchEvent(new Event('cartUpdated'));
        window.dispatchEvent(new Event('storage'));
      } else {
        showMessage(`"${item.name}" is already in cart!`, "info");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showMessage("Failed to add item to cart", "error");
    }
  };

  // সিলেক্টেড আইটেম কার্টে যোগ
  const addSelectedToCart = () => {
    if (selectedItems.length === 0) {
      showMessage("Please select items to add to cart", "warning");
      return;
    }
    
    try {
      const cart = JSON.parse(localStorage.getItem("shopickCart")) || [];
      let addedCount = 0;
      
      selectedItems.forEach(itemId => {
        const item = wishlistItems.find(w => w.id === itemId);
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        
        if (item && !existingItem) {
          const cartItem = {
            ...item,
            quantity: 1,
            maxQuantity: 10,
            inStock: true
          };
          cart.push(cartItem);
          addedCount++;
        }
      });
      
      localStorage.setItem("shopickCart", JSON.stringify(cart));
      console.log("Added selected items to cart:", addedCount);
      
      if (addedCount > 0) {
        showMessage(`${addedCount} item(s) added to cart!`, "success");
        // কার্ট আপডেট ইভেন্ট ট্রিগার
        window.dispatchEvent(new Event('cartUpdated'));
        window.dispatchEvent(new Event('storage'));
      } else {
        showMessage("Selected items are already in cart", "info");
      }
    } catch (error) {
      console.error("Error adding selected to cart:", error);
      showMessage("Failed to add items to cart", "error");
    }
  };

  // সিলেক্টেড আইটেম ডিলিট
  const deleteSelectedItems = () => {
    if (selectedItems.length === 0) {
      showMessage("Please select items to remove", "warning");
      return;
    }
    
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    showMessage(`${selectedItems.length} item(s) removed from wishlist`, "success");
  };

  // সবকিছু ডিলিট
  const clearWishlist = () => {
    if (wishlistItems.length === 0) {
      showMessage("Wishlist is already empty", "info");
      return;
    }
    
    setWishlistItems([]);
    setSelectedItems([]);
    localStorage.removeItem("shopickWishlist");
    showMessage("Wishlist cleared successfully", "success");
    
    // ইভেন্ট ডিসপ্যাচ
    window.dispatchEvent(new Event('wishlistUpdated'));
    window.dispatchEvent(new Event('storage'));
  };

  // মেসেজ শো করার ফাংশন
  const showMessage = (message, type) => {
    setCartMessage(message);
    setTimeout(() => setCartMessage(""), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Heart className="text-pink-600 fill-pink-600" size={28} />
                My Wishlist
              </h1>
              <p className="text-gray-600 mt-2">
                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
              </p>
            </div>
            <Link
              to="/"
              className="text-pink-600 hover:text-pink-700 font-medium flex items-center gap-2"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Message */}
        {cartMessage && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
            cartMessage.includes("success") || cartMessage.includes("added") 
              ? "bg-green-50 border border-green-200 text-green-700"
              : cartMessage.includes("error") || cartMessage.includes("Failed")
              ? "bg-red-50 border border-red-200 text-red-700"
              : "bg-blue-50 border border-blue-200 text-blue-700"
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              cartMessage.includes("success") || cartMessage.includes("added") 
                ? "bg-green-100"
                : cartMessage.includes("error") || cartMessage.includes("Failed")
                ? "bg-red-100"
                : "bg-blue-100"
            }`}>
              {cartMessage.includes("success") || cartMessage.includes("added") ? (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
            </div>
            <span className="font-medium">{cartMessage}</span>
          </div>
        )}

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-pink-50 flex items-center justify-center">
              <Heart className="w-12 h-12 text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love to your wishlist. Review them anytime and easily add to cart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white font-semibold px-8 py-3.5 rounded-full hover:shadow-lg transition-all duration-300"
              >
                Start Shopping
                <ArrowRight size={20} />
              </Link>
              <button
                onClick={() => {
                  loadWishlistData();
                  showMessage("Refreshed wishlist data", "info");
                }}
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3.5 rounded-full transition-all duration-300"
              >
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Actions Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === wishlistItems.length && wishlistItems.length > 0}
                      onChange={selectAllItems}
                      className="w-5 h-5 text-pink-600 rounded border-gray-300 focus:ring-pink-500"
                    />
                    <span className="ml-2 text-gray-700 font-medium">
                      Select all ({selectedItems.length}/{wishlistItems.length})
                    </span>
                  </label>
                  
                  {selectedItems.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={addSelectedToCart}
                        className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-700 hover:bg-pink-100 rounded-lg font-medium transition-colors"
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                      <button
                        onClick={deleteSelectedItems}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={loadWishlistData}
                    className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Refresh wishlist"
                  >
                    ↻ Refresh
                  </button>
                  <button
                    onClick={clearWishlist}
                    className="text-gray-500 hover:text-red-600 font-medium flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl shadow-sm border ${
                    selectedItems.includes(item.id) ? 'border-pink-500 ring-2 ring-pink-100' : 'border-gray-200'
                  } overflow-hidden transition-all duration-300 hover:shadow-lg`}
                >
                  {/* Item Header */}
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                        className="w-5 h-5 text-pink-600 rounded border-gray-300 focus:ring-pink-500"
                      />
                    </label>
                    
                    <div className="flex items-center gap-2">
                      {item.addedDate && (
                        <span className="text-xs text-gray-500">
                          Added on {new Date(item.addedDate).toLocaleDateString()}
                        </span>
                      )}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Item Content */}
                  <div className="p-6">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer"
                           onClick={() => navigate(`/product/${item.id}`)}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h3 
                          className="font-bold text-gray-900 text-lg mb-1 hover:text-pink-600 cursor-pointer line-clamp-2"
                          onClick={() => navigate(`/product/${item.id}`)}
                        >
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(item.rating || 4)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{item.rating || 4.0}</span>
                        </div>

                        {/* Stock Status */}
                        <div className="mb-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            In Stock
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-xl text-gray-900">
                              ${(item.price || 0).toFixed(2)}
                            </div>
                            {item.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => addToCart(item)}
                              className="px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white hover:shadow-lg"
                            >
                              <ShoppingCart size={18} />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <div className="text-2xl font-bold text-pink-700">{wishlistItems.length}</div>
                  <div className="text-gray-600">Total Items</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-700">
                    ${wishlistItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}
                  </div>
                  <div className="text-gray-600">Total Value</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-700">
                    ${wishlistItems.reduce((sum, item) => 
                      sum + ((item.originalPrice || item.price || 0) - (item.price || 0)), 0).toFixed(2)}
                  </div>
                  <div className="text-gray-600">Total Savings</div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={addSelectedToCart}
                  disabled={selectedItems.length === 0}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                    selectedItems.length > 0
                      ? "bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart size={20} />
                  Add Selected to Cart ({selectedItems.length})
                </button>
                
                <Link
                  to="/cart"
                  className="px-8 py-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Go to Cart
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;