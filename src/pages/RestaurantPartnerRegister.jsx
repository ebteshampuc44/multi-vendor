import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Building, Phone, MapPin, Users, CreditCard, Eye, EyeOff, ArrowLeft, CheckCircle, Utensils } from "lucide-react";

const RestaurantPartnerRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    cuisineType: "",
    seatingCapacity: "",
    businessLicense: "",
    agreeTerms: false
  });

  const cuisineTypes = [
    "Bangladeshi", "Indian", "Chinese", "Thai", "Italian", 
    "Mexican", "American", "Fast Food", "Desserts", "Beverages"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Restaurant Partner Registration submitted:", formData);
    // Add registration logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <div className="flex justify-center">
              <img 
                src="https://i.ibb.co.com/TMBDhPGq/Black-White-Minimal-Simple-Modern-Classic-Photography-Studio-Salt-Logo-2.png" 
                alt="Logo" 
                className="h-12 w-auto"
              />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Restaurant Partner Registration</h1>
          <p className="text-gray-800 mt-2">Grow your restaurant business with Shopick</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <Link to="/login" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700">
              <ArrowLeft size={18} />
              Back to Login
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Details */}
            <div className="bg-orange-50 p-6 rounded-xl mb-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-orange-600" />
                Restaurant Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800">
                    Restaurant Name *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleChange}
                      placeholder="Enter restaurant name"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800">
                    Owner/Manager Name *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="Enter owner/manager name"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Restaurant Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete restaurant address"
                    rows="2"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800">
                    Cuisine Type *
                  </label>
                  <select
                    name="cuisineType"
                    value={formData.cuisineType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    required
                  >
                    <option value="">Select cuisine type</option>
                    {cuisineTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800">
                    Seating Capacity
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      name="seatingCapacity"
                      value={formData.seatingCapacity}
                      onChange={handleChange}
                      placeholder="Number of seats"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter business email"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter business phone"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Business License */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Business License Number *
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="businessLicense"
                  value={formData.businessLicense}
                  onChange={handleChange}
                  placeholder="Enter business license/TIN number"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                Create Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-5 h-5 mt-1 text-orange-600 rounded focus:ring-orange-500"
                  required
                />
                <span className="text-sm text-gray-800">
                  I agree to the{" "}
                  <Link to="/partner-terms" className="text-orange-600 hover:text-orange-700 font-medium">
                    Restaurant Partner Agreement
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Apply as Restaurant Partner
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Benefits for Restaurant Partners</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-800">Access to thousands of customers</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-800">Marketing & promotional support</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-800">Real-time order management</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-800">Secure & timely payments</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-800">Analytics & business insights</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-800">Dedicated partner support</span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center mt-8 text-gray-800">
            Already have a partner account?{" "}
            <Link to="/login" className="text-orange-600 hover:text-orange-700 font-semibold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPartnerRegister;