import { useNavigate } from "react-router-dom";

const SevenDaysRestaurant = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-10 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">7 Days Restaurant</h1>
                  <p className="text-lg opacity-90">Open 7 days a week, 24/7 service</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm p-4">
                    <img 
                      src="public/7days.jpg" 
                      alt="7 Days Restaurant Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="text-center py-16">
                <div className="inline-block p-8 bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg border border-purple-100">
                  <div className="text-6xl mb-6">🏪</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">7 Days Restaurant</h2>
                  <p className="text-gray-600 text-lg max-w-md mx-auto mb-6">
                    Your 24/7 food destination. Always open, always serving!
                  </p>
                  <div className="space-y-4">
                    <div className="text-sm text-purple-600 font-medium">
                      ⭐ Available: Breakfast, Lunch, Dinner, Late Night
                    </div>
                    <div className="text-sm text-gray-500">
                      🕒 Open: 24 hours, 7 days a week
                    </div>
                  </div>
                  <div className="mt-8">
                    <button 
                      onClick={() => navigate(-1)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
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

export default SevenDaysRestaurant;