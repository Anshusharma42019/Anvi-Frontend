import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="text-2xl font-bold gradient-text-warm">
                  Anvi Showroom
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                India's premier destination for premium tiles. Transforming spaces with quality, innovation, and unmatched craftsmanship since 1995.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover-lift neon-glow">
                  <span className="text-white font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl flex items-center justify-center hover-lift neon-glow">
                  <span className="text-white font-bold">i</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center hover-lift neon-glow">
                  <span className="text-white font-bold">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center hover-lift neon-glow">
                  <span className="text-white font-bold">y</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center hover-lift neon-glow">
                  <span className="text-white font-bold">w</span>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 gradient-text-cool">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center space-x-2"><span>🏠</span><span>Home</span></Link></li>
                <li><Link to="/catalogue" className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center space-x-2"><span>📋</span><span>Catalogue</span></Link></li>
                <li><Link to="/products" className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center space-x-2"><span>🎨</span><span>Products</span></Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center space-x-2"><span>🏢</span><span>About Us</span></Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center space-x-2"><span>📞</span><span>Contact</span></Link></li>
                <li><Link to="/search" className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center space-x-2"><span>🔍</span><span>Search</span></Link></li>
              </ul>
            </div>
            
            {/* Categories */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 gradient-text-cool">Categories</h3>
              <ul className="space-y-3">
                <li><Link to="/catalogue/ceramic" className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center space-x-2"><span>🏺</span><span>Ceramic Tiles</span></Link></li>
                <li><Link to="/catalogue/marble" className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center space-x-2"><span>💎</span><span>Marble Tiles</span></Link></li>
                <li><Link to="/catalogue/granite" className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center space-x-2"><span>🪨</span><span>Granite Tiles</span></Link></li>
                <li><Link to="/catalogue/porcelain" className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center space-x-2"><span>🏛️</span><span>Porcelain Tiles</span></Link></li>
                <li><Link to="/catalogue/wooden" className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center space-x-2"><span>🌳</span><span>Wooden Tiles</span></Link></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 gradient-text-cool">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-purple-400 mt-1">📍</span>
                  <div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Anvi Showroom, Design Plaza<br />
                      123 Tile Street, Luxury District<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-400">📞</span>
                  <p className="text-gray-300 text-sm">+91 98765 43210</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-400">✉️</span>
                  <p className="text-gray-300 text-sm">info@anvishowroom.com</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-400">🕒</span>
                  <p className="text-gray-300 text-sm">Mon-Sat: 9AM-8PM</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div className="glass p-8 rounded-2xl mb-12">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2 gradient-text-warm">Stay Updated</h3>
              <p className="text-gray-300">Subscribe to our newsletter for latest designs and exclusive offers</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
              />
              <button className="btn-primary px-6 py-3 font-semibold hover-lift">
                Subscribe 🚀
              </button>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Anvi Showroom. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Crafted with ❤️ for beautiful spaces
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">Warranty</a>
                <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">Shipping Info</a>
                <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors">Returns</a>
              </div>
            </div>
          </div>
          
          {/* Awards & Certifications */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">Trusted by industry leaders</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="text-xs text-gray-500">🏆 ISO 9001:2015</div>
                <div className="text-xs text-gray-500">🌟 Best Quality Award 2023</div>
                <div className="text-xs text-gray-500">🌱 Eco-Friendly Certified</div>
                <div className="text-xs text-gray-500">⭐ 4.9/5 Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
