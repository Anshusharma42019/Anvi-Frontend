import React, { useState, useEffect } from "react";
import apiService from '../services/api';

const Home = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  
  const backgrounds = [
    'https://images.unsplash.com/photo-1587202372775-98926b42a6a2',
    'https://images.unsplash.com/photo-1596079890748-5b0f45a0fbe6',
    'https://images.unsplash.com/photo-1616627455412-1b8f8a2dced3',
    'https://images.unsplash.com/photo-1556910103-1b3f5af5b8f9',
    'https://images.unsplash.com/photo-1626784372680-55ce49963cf0',
    'https://images.unsplash.com/photo-1615971677499-5467cbab01c0'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    
    loadFeaturedProducts();
    setIsVisible(true);
    
    return () => clearInterval(interval);
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const products = await apiService.getFeaturedProducts();
      setFeaturedProducts(products.slice(0, 4));
    } catch (error) {
      console.error('Error loading featured products:', error);
    }
  };

  const ParticleBackground = () => {
    return (
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 10 + 8}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="h-[90vh] flex items-center justify-center bg-cover bg-center relative transition-all duration-1000 overflow-hidden" style={{backgroundImage: `url(${backgrounds[currentBg]})`}}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/40 to-blue-900/60"></div>
        <ParticleBackground />
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-md animate-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className={`relative z-10 text-center text-white px-4 max-w-5xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 mb-4">
              ✨ India's Premier Tile Destination
            </span>
          </div>
          <h1 className="hero-text gradient-text-warm mb-6">
            Transform Your Space with
            <span className="block gradient-text-cool">Premium Tiles</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Discover our exquisite collection of handcrafted tiles that blend traditional artistry with modern innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/catalogue" className="btn-primary hover-lift neon-glow px-8 py-4 text-lg font-semibold">
              🎨 Explore Collection
            </a>
            <a href="/contact" className="glass px-8 py-4 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300">
              💬 Get Free Consultation
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-800 font-medium mb-4">
              ⭐ Why Choose Anvi Showroom
            </span>
            <h2 className="section-title gradient-text mb-4">Crafting Excellence in Every Tile</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Experience the perfect blend of quality, innovation, and artistry</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="modern-card hover-lift p-8 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">Meticulously crafted tiles using the finest materials and cutting-edge technology for unmatched durability</p>
            </div>
            
            <div className="modern-card hover-lift p-8 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text">Lightning Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">Express delivery network ensuring your tiles reach you safely and on time, anywhere in India</p>
            </div>
            
            <div className="modern-card hover-lift p-8 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text">Infinite Designs</h3>
              <p className="text-gray-600 leading-relaxed">Curated collection of over 1000+ unique designs from contemporary to classic styles</p>
            </div>
            
            <div className="modern-card hover-lift p-8 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text">Lifetime Warranty</h3>
              <p className="text-gray-600 leading-relaxed">Comprehensive warranty coverage with dedicated after-sales support for complete peace of mind</p>
            </div>
            
            <div className="modern-card hover-lift p-8 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text">Eco-Friendly</h3>
              <p className="text-gray-600 leading-relaxed">Sustainable manufacturing processes with zero harmful emissions, caring for our planet</p>
            </div>
            
            <div className="modern-card hover-lift p-8 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text">Expert Consultation</h3>
              <p className="text-gray-600 leading-relaxed">Free design consultation with certified interior experts to bring your vision to life</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section id="products" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-800 font-medium mb-4">
              🌟 Trending Collection
            </span>
            <h2 className="section-title gradient-text mb-4">Featured Masterpieces</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Handpicked tiles that define elegance and sophistication</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product._id || index} className="group relative">
                <div className="modern-card overflow-hidden hover-lift">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
                      New
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">{product.name}</h3>
                    {product.price && (
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold gradient-text">₹{product.price}</p>
                        <span className="text-sm text-gray-500">/sq ft</span>
                      </div>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">⭐</span>
                        ))}
                      </div>
                      <button className="text-purple-600 hover:text-purple-800 font-semibold text-sm">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="/products" className="btn-secondary hover-lift px-8 py-4 text-lg font-semibold">
              🔍 Explore All Products
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-pink-800 font-medium mb-4">
              💬 Customer Stories
            </span>
            <h2 className="section-title gradient-text mb-4">Loved by Thousands</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Real experiences from our satisfied customers across India</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="modern-card hover-lift p-8 text-left">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "Absolutely stunning tiles! The quality exceeded our expectations. Our living room looks like a luxury hotel now. The installation team was professional and efficient."
              </p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" alt="Customer" className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <h4 className="font-bold text-gray-800">Rajesh Kumar</h4>
                  <p className="text-sm text-gray-500">Mumbai, Maharashtra</p>
                </div>
              </div>
            </div>
            
            <div className="modern-card hover-lift p-8 text-left">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "Fast delivery and exceptional customer service. The design consultation helped us choose the perfect tiles for our kitchen. Highly recommend Anvi Showroom!"
              </p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786" alt="Customer" className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <h4 className="font-bold text-gray-800">Priya Sharma</h4>
                  <p className="text-sm text-gray-500">Delhi, NCR</p>
                </div>
              </div>
            </div>
            
            <div className="modern-card hover-lift p-8 text-left">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "The variety of designs is incredible! We found exactly what we were looking for. The tiles are durable and the colors haven't faded even after 2 years."
              </p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" alt="Customer" className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <h4 className="font-bold text-gray-800">Amit Patel</h4>
                  <p className="text-sm text-gray-500">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">50K+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">4.9/5</div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">25+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content */}
      <section id="catalogue" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-lg font-semibold mb-3">Free Design Consultation</h3>
              <p className="text-gray-600">Our design experts help you choose the perfect tiles for your space with personalized recommendations.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-semibold mb-3">Professional Installation</h3>
              <p className="text-gray-600">Certified installers ensure perfect fitting and finishing with industry-standard tools and techniques.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-semibold mb-3">After-Sales Support</h3>
              <p className="text-gray-600">Complete maintenance guidance and support to keep your tiles looking new for years to come.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 px-4 text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-lg mb-8">Get in touch with our experts for personalized recommendations</p>
          <a href="/contact" className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300">
            Contact Us Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;