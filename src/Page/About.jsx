import React, { useState, useEffect } from "react";
import ExtraContent from "./ExtraContent";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ years: 0, customers: 0, designs: 0, cities: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    // Animate counters
    const animateCounters = () => {
      const targets = { years: 25, customers: 50000, designs: 500, cities: 100 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          years: Math.floor(targets.years * progress),
          customers: Math.floor(targets.customers * progress),
          designs: Math.floor(targets.designs * progress),
          cities: Math.floor(targets.cities * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, stepDuration);
    };
    
    const timer = setTimeout(animateCounters, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4 text-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className={`max-w-5xl mx-auto text-center relative z-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-800 font-semibold mb-6">
            🏢 Our Story
          </span>
          <h1 className="hero-text gradient-text mb-6">Crafting Dreams Since 1995</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From a small family business to India's most trusted tile destination, we've been transforming spaces with premium quality tiles and unmatched craftsmanship
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <div className="mb-8">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-800 font-medium mb-4">
                  📜 Our Journey
                </span>
                <h2 className="section-title gradient-text mb-6">A Legacy of Excellence</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">The Beginning (1995)</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Started as a small family business with a vision to bring premium quality tiles to Indian homes. Our founder's passion for craftsmanship laid the foundation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Innovation Era (2005)</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Introduced cutting-edge manufacturing technology and expanded our design portfolio to include contemporary and traditional styles.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">National Expansion (2015)</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Became India's leading tile manufacturer with showrooms across 100+ cities and a customer base of over 50,000 satisfied clients.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Digital Revolution (2020)</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Launched our digital platform and introduced eco-friendly manufacturing processes, setting new industry standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-in-right">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="modern-card hover-lift overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43" alt="Manufacturing" className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">State-of-the-art Manufacturing</h4>
                    </div>
                  </div>
                  <div className="modern-card hover-lift overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7" alt="Quality Check" className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Rigorous Quality Control</h4>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 mt-8">
                  <div className="modern-card hover-lift overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952" alt="Design Studio" className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Creative Design Studio</h4>
                    </div>
                  </div>
                  <div className="modern-card hover-lift overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43" alt="Showroom" className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Premium Showrooms</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-800 font-medium mb-4">
              ✨ Core Values
            </span>
            <h2 className="section-title gradient-text mb-4">What Drives Us Forward</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Our unwavering commitment to excellence in every aspect</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="modern-card hover-lift p-8 text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text">Quality First</h3>
              <p className="text-gray-600 leading-relaxed">Every tile undergoes 15+ quality checks ensuring perfection in every piece</p>
            </div>
            
            <div className="modern-card hover-lift p-8 text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text">Sustainability</h3>
              <p className="text-gray-600 leading-relaxed">100% eco-friendly processes with zero harmful emissions to protect our planet</p>
            </div>
            
            <div className="modern-card hover-lift p-8 text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                <span className="text-4xl">💡</span>
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">Cutting-edge technology and creative designs that set industry trends</p>
            </div>
            
            <div className="modern-card hover-lift p-8 text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-3 gradient-text">Trust</h3>
              <p className="text-gray-600 leading-relaxed">Building lasting relationships through transparency and exceptional service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium mb-4">
              📈 Our Impact
            </span>
            <h2 className="section-title text-white mb-4">Numbers That Speak</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">Milestones achieved through dedication and excellence</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center glass p-8 rounded-2xl hover-lift">
              <div className="text-4xl sm:text-5xl font-bold gradient-text-warm mb-3">{counters.years}+</div>
              <p className="text-gray-300 font-medium">Years of Excellence</p>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-3 rounded-full"></div>
            </div>
            
            <div className="text-center glass p-8 rounded-2xl hover-lift">
              <div className="text-4xl sm:text-5xl font-bold gradient-text-cool mb-3">{counters.customers.toLocaleString()}+</div>
              <p className="text-gray-300 font-medium">Happy Customers</p>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mt-3 rounded-full"></div>
            </div>
            
            <div className="text-center glass p-8 rounded-2xl hover-lift">
              <div className="text-4xl sm:text-5xl font-bold gradient-text-warm mb-3">{counters.designs}+</div>
              <p className="text-gray-300 font-medium">Unique Designs</p>
              <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mt-3 rounded-full"></div>
            </div>
            
            <div className="text-center glass p-8 rounded-2xl hover-lift">
              <div className="text-4xl sm:text-5xl font-bold gradient-text-cool mb-3">{counters.cities}+</div>
              <p className="text-gray-300 font-medium">Cities Served</p>
              <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto mt-3 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-gray-800">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" alt="CEO" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-1">Amit Sharma</h3>
              <p className="text-blue-600 mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">Leading the company with 25+ years of industry experience</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786" alt="Design Head" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-1">Priya Patel</h3>
              <p className="text-blue-600 mb-2">Head of Design</p>
              <p className="text-gray-600 text-sm">Creating innovative tile designs that inspire</p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" alt="Production Manager" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-1">Rajesh Kumar</h3>
              <p className="text-blue-600 mb-2">Production Manager</p>
              <p className="text-gray-600 text-sm">Ensuring quality in every tile we manufacture</p>
            </div>
          </div>
        </div>
      </section>
      <ExtraContent />
    </div>
  );
};

export default About;