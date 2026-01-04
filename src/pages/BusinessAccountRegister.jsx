import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Building, Phone, MapPin, Users, CreditCard, Briefcase, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";

const BusinessAccountRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    designation: "",
    email: "",
    phone: "",
    password: "",
    companyAddress: "",
    companyType: "",
    employeeCount: "",
    vatNumber: "",
    agreeTerms: false
  });

  const companyTypes = [
    "Private Limited", "Public Limited", "Partnership", "Sole Proprietorship",
    "NGO", "Government", "Educational Institution", "Other"
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
    console.log("Business Account Registration submitted:", formData);
    // Add registration logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center py-12 px-4">
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
          <h1 className="text-3xl font-bold text-gray-900">Business Account Registration</h1>
          <p className="text-gray-800 mt-2">Special solutions for corporate & business customers</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <Link to="/login" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700">
              <ArrowLeft size={18} />
              Back to Login
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Details */}
            <div className="bg-purple-50 p-6 rounded-xl mb-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-purple-600" />
                Company Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800">
                    Company Type *
                  </label>
                  <select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    required
                  >
                    <option value="">Select company type</option>
                    {companyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Company Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    placeholder="Enter complete company address"
                    rows="2"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800">
                    VAT/TIN Number *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="vatNumber"
                      value={formData.vatNumber}
                      onChange={handleChange}
                      placeholder="Enter VAT/TIN number"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800">
                    Number of Employees
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    >
                      <option value="">Select range</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">500+ employees</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Person Details */}
            <div className="bg-blue-50 p-6 rounded-xl mb-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Contact Person Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800">
                    Contact Person Name *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="Enter contact person name"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800">
                    Designation *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Enter designation"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Business Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter business email"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Business Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter business phone"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
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
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
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
                  className="w-5 h-5 mt-1 text-purple-600 rounded focus:ring-purple-500"
                  required
                />
                <span className="text-sm text-gray-800">
                  I agree to the{" "}
                  <Link to="/business-terms" className="text-purple-600 hover:text-purple-700 font-medium">
                    Business Account Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-purple-600 hover:text-purple-700 font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Create Business Account
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Business Account Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-800">Bulk order discounts</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-800">Dedicated account manager</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-800">Invoice & billing management</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-800">Multiple user accounts</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-800">Priority customer support</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-800">Custom delivery schedules</span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center mt-8 text-gray-800">
            Already have a business account?{" "}
            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessAccountRegister;