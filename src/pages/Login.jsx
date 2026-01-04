// Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Facebook, Twitter, Github, AlertCircle, CheckCircle } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    console.log("Login submitted:", formData);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes - successful login
      // In real app, you would check account type here
      
      // Example logic to determine account type
      let redirectPath = "/";
      
      // Check email pattern for different account types
      if (formData.email.includes('partner') || formData.email.includes('restaurant')) {
        redirectPath = "/partner-dashboard"; // Restaurant partner
      } else if (formData.email.includes('business') || formData.email.includes('company')) {
        redirectPath = "/business-dashboard"; // Business account
      } else {
        redirectPath = "/"; // Regular user
      }
      
      // Save login state to localStorage
      localStorage.setItem("shopickUser", JSON.stringify({
        email: formData.email,
        loggedIn: true,
        timestamp: new Date().toISOString()
      }));
      
      setLoading(false);
      navigate(redirectPath);
    }, 1500);
  };

  // Demo login credentials
  const handleDemoLogin = (accountType) => {
    let demoEmail = "";
    let demoPassword = "demo123";
    
    switch(accountType) {
      case 'user':
        demoEmail = "user@shopick.com";
        break;
      case 'restaurant':
        demoEmail = "partner@restaurant.com";
        break;
      case 'business':
        demoEmail = "business@company.com";
        break;
      default:
        demoEmail = "demo@shopick.com";
    }
    
    setFormData({
      email: demoEmail,
      password: demoPassword,
      rememberMe: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="flex justify-center">
              <img 
                src="https://i.ibb.co.com/TMBDhPGq/Black-White-Minimal-Simple-Modern-Classic-Photography-Studio-Salt-Logo-2.png" 
                alt="Logo" 
                className="h-12 w-auto"
              />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Welcome Back</h1>
          <p className="text-gray-800 mt-2">One login for all account types</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Login Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8">
            {/* Quick Demo Buttons */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Demo Login</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleDemoLogin('user')}
                  className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl hover:bg-green-50 hover:border-green-300 transition text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">👤</span>
                  </span>
                  <span className="font-medium text-gray-800">User Account</span>
                </button>
                <button
                  onClick={() => handleDemoLogin('restaurant')}
                  className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-600 text-xs">🍽️</span>
                  </span>
                  <span className="font-medium text-gray-800">Restaurant Partner</span>
                </button>
                <button
                  onClick={() => handleDemoLogin('business')}
                  className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-xs">🏢</span>
                  </span>
                  <span className="font-medium text-gray-800">Business Account</span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800 font-medium">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                  />
                  <span className="ml-2 text-sm text-gray-800">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-pink-600 hover:text-pink-700 font-medium">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-4 text-sm text-gray-800">Or continue with</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                <Facebook className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-800">Facebook</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                <Twitter className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-800">Twitter</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                <Github className="w-5 h-5 text-gray-900" />
                <span className="text-sm font-medium text-gray-800">GitHub</span>
              </button>
            </div>

            {/* Registration Links */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">Don't have an account?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  to="/register/user"
                  className="flex items-center gap-3 p-3 border border-gray-300 rounded-xl hover:bg-green-50 hover:border-green-300 transition group"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600">👤</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 group-hover:text-green-700">User Account</div>
                    <div className="text-xs text-gray-800">For shopping</div>
                  </div>
                </Link>
                
                <Link
                  to="/register/restaurant-partner"
                  className="flex items-center gap-3 p-3 border border-gray-300 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition group"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-600">🍽️</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 group-hover:text-orange-700">Restaurant Partner</div>
                    <div className="text-xs text-gray-800">List your restaurant</div>
                  </div>
                </Link>
                
                <Link
                  to="/register/business-account"
                  className="flex items-center gap-3 p-3 border border-gray-300 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition group"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600">🏢</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 group-hover:text-purple-700">Business Account</div>
                    <div className="text-xs text-gray-800">For companies</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Info Panel */}
          <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-2xl shadow-xl p-8 text-white">
            <div className="h-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-6">One Login, Multiple Accounts</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-2.5 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Single Sign-On</h4>
                    <p className="text-white/90 text-sm">Use one email & password for all account types</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-2.5 rounded-lg">
                    <div className="w-5 h-5">🔒</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Secure & Unified</h4>
                    <p className="text-white/90 text-sm">Enhanced security with unified authentication</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-2.5 rounded-lg">
                    <div className="w-5 h-5">🔄</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Easy Switching</h4>
                    <p className="text-white/90 text-sm">Switch between account types seamlessly</p>
                  </div>
                </div>
              </div>

              {/* Account Types Info */}
              <div className="bg-white/10 rounded-xl p-4 mb-6">
                <h4 className="font-bold mb-3">Supported Account Types</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-white/90">Regular Users - Shopping & Orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <span className="text-sm text-white/90">Restaurant Partners - Food Business</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <span className="text-sm text-white/90">Business Accounts - Corporate Clients</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="pt-6 border-t border-white/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">50K+</div>
                    <div className="text-white/90 text-xs">Active Users</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">1K+</div>
                    <div className="text-white/90 text-xs">Restaurant Partners</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">500+</div>
                    <div className="text-white/90 text-xs">Business Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-800 hover:text-pink-600 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;