import { useNavigate } from "react-router-dom";

const SadiasKitchen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-600 to-rose-500 px-8 py-10 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">sadia's kitchen</h1>
                  <p className="text-lg opacity-90">Popular local home-style cooking</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm p-4">
                    <img 
                      src="public/sadia's_kitchen.jpg" 
                      alt="sadia's kitchen Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="text-center py-16">
                <div className="inline-block p-8 bg-gradient-to-br from-pink-50 to-white rounded-2xl shadow-lg border border-pink-100">
                  <div className="text-6xl mb-6">👩‍🍳</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">sadia's kitchen</h2>
                  <p className="text-gray-600 text-lg max-w-md mx-auto mb-6">
                    Taste of homemade goodness. Authentic local recipes with love.
                  </p>
                  <div className="space-y-4">
                    <div className="text-sm text-pink-600 font-medium">
                      ⭐ Home-style: Traditional Bangladeshi dishes
                    </div>
                    <div className="text-sm text-gray-500">
                      ❤️ Family recipes passed down through generations
                    </div>
                  </div>
                  <div className="mt-8">
                    <button 
                      onClick={() => navigate(-1)}
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      ← Back to Brands
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SadiasKitchen;