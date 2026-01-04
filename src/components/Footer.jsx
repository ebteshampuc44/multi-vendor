import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-900 pt-8 pb-6 border-t">
            <div className="container mx-auto px-4">
                
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    
                    {/* Brand Logo - Left Side */}
                    <div className="mb-4 md:mb-0">
                        <img 
                            src="https://i.ibb.co.com/TMBDhPGq/Black-White-Minimal-Simple-Modern-Classic-Photography-Studio-Salt-Logo-2.png" 
                            alt="Shopick Logo" 
                            className="h-10 w-auto"
                        />
                    </div>

                    {/* Social Icons - Right Side */}
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                            <Facebook size={24} />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                            <Instagram size={24} />
                        </a>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-gray-200">
                    <div className="text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} Shopick. All rights reserved.
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;