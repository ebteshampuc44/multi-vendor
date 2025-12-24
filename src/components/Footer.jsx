import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-8 pb-6">
            <div className="container mx-auto px-4">
                
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    
                    {/* Brand Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img 
                                src="https://i.ibb.co.com/FLHL89PT/Adobe-Express-file.png" 
                                alt="Shopick Logo" 
                                className="h-10 w-auto"
                            />
                            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                                Shopick
                            </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">
                            Your favorite online shopping destination.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <ShoppingBag size={18} />
                            Shop
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/products" className="text-gray-300 hover:text-pink-400 transition-colors">All Products</Link></li>
                            <li><Link to="/categories" className="text-gray-300 hover:text-pink-400 transition-colors">Categories</Link></li>
                            <li><Link to="/deals" className="text-gray-300 hover:text-pink-400 transition-colors">Deals</Link></li>
                            <li><Link to="/new" className="text-gray-300 hover:text-pink-400 transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h3 className="font-semibold mb-4">Help</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/faq" className="text-gray-300 hover:text-pink-400 transition-colors">FAQ</Link></li>
                            <li><Link to="/shipping" className="text-gray-300 hover:text-pink-400 transition-colors">Shipping</Link></li>
                            <li><Link to="/returns" className="text-gray-300 hover:text-pink-400 transition-colors">Returns</Link></li>
                            <li><Link to="/contact" className="text-gray-300 hover:text-pink-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-pink-400" />
                                <span className="text-gray-300">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-pink-400" />
                                <span className="text-gray-300">support@shopick.com</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin size={16} className="text-pink-400 mt-1" />
                                <span className="text-gray-300">123 Shopping St, DC 10001</span>
                            </div>
                        </div>
                    </div>

                </div>


                {/* Bottom Bar */}
                <div className="pt-6 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-gray-300 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} Shopick. All rights reserved.
                        </div>
                        <div className="flex gap-6 text-sm">
                            <Link to="/privacy" className="text-gray-300 hover:text-pink-400 transition-colors">Privacy</Link>
                            <Link to="/terms" className="text-gray-300 hover:text-pink-400 transition-colors">Terms</Link>
                            <Link to="/sitemap" className="text-gray-300 hover:text-pink-400 transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;