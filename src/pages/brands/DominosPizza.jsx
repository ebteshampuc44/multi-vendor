import { useNavigate } from "react-router-dom";

const DominosPizza = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-10 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Domino's Pizza Bangladesh</h1>
                  <p className="text-lg opacity-90">World famous pizza, 30-minute delivery</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm p-4">
                    <img 
                      src="Dominos_pizza.png" 
                      alt="Domino's Pizza Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="text-center py-16">
                <div className="inline-block p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg border border-blue-100">
                  <div className="text-6xl mb-6">⏱️</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Domino's Pizza</h2>
                  <p className="text-gray-600 text-lg max-w-md mx-auto mb-6">
                    "30 minutes or free" guarantee coming soon to Shopick!
                  </p>
                  <div className="space-y-4">
                    <div className="text-sm text-blue-600 font-medium">
                      ⭐ Fast Delivery: 30-minute guarantee
                    </div>
                    <div className="text-sm text-gray-500">
                      🚚 Over 100 delivery riders in Dhaka
                    </div>
                  </div>
                  <div className="mt-8">
                    <button 
                      onClick={() => navigate(-1)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
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

export default DominosPizza;