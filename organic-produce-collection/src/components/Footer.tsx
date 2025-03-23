
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-harvest-50 border-t border-harvest-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="fade-up-1">
            <h3 className="font-bold text-lg mb-4 text-harvest-800">Fresh Harvest</h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Connecting local farmers with customers who prioritize fresh, organic, 
              and sustainably sourced produce.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-harvest-600 hover:text-harvest-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-harvest-600 hover:text-harvest-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-harvest-600 hover:text-harvest-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="fade-up-2">
            <h3 className="font-bold text-lg mb-4 text-harvest-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-harvest-600 transition-colors text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-harvest-600 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-harvest-600 transition-colors text-sm">
                  Farmers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-harvest-600 transition-colors text-sm">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-harvest-600 transition-colors text-sm">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="fade-up-3">
            <h3 className="font-bold text-lg mb-4 text-harvest-800">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=fruits" className="text-gray-600 hover:text-harvest-600 transition-colors text-sm">
                  Fruits
                </Link>
              </li>
              <li>
                <Link to="/shop?category=vegetables" className="text-gray-600 hover:text-harvest-600 transition-colors text-sm">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/shop?category=dairy" className="text-gray-600 hover:text-harvest-600 transition-colors text-sm">
                  Dairy
                </Link>
              </li>
              <li>
                <Link to="/shop?category=herbs" className="text-gray-600 hover:text-harvest-600 transition-colors text-sm">
                  Herbs
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="fade-up-4">
            <h3 className="font-bold text-lg mb-4 text-harvest-800">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-harvest-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm">N1/154, Near Baramunda Fire Station, Baramunda, Bhubaneswar, Odisha 751003</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-harvest-600 flex-shrink-0" />
                <span className="text-gray-600 text-sm">+91 9337385677</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-harvest-600 flex-shrink-0" />
                <span className="text-gray-600 text-sm">hello@freshharvest.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="py-6 border-t border-harvest-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Fresh Harvest Hub. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-harvest-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-harvest-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
