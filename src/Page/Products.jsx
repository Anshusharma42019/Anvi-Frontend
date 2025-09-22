import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Layers, Filter, SortAsc, Grid3X3, LayoutGrid, Search, Sparkles, TrendingUp, Award, Zap } from 'lucide-react';
import ProductCard from '../Componemts/ProductCard';
import apiService from '../services/api';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, activeFilter, sortBy, searchTerm]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProducts({ limit: 50 });
      setProducts(response.products || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];
    
    // Filter by category
    if (activeFilter !== 'All') {
      filtered = filtered.filter(product => product.category === activeFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
    
    setFilteredProducts(filtered);
  };

  const loadCategories = async () => {
    try {
      const categoriesData = await apiService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };



  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100">
      {/* Premium Hero Section */}
      <section className="py-10 sm:py-20 px-2 sm:px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Layers className="text-indigo-600 mr-4" size={48} />
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Premium Collection
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            Discover our <span className="font-semibold text-indigo-600">meticulously crafted</span> tile collection with 
            <span className="font-semibold text-purple-600"> detailed specifications</span> and premium quality
          </p>
          
          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-12 text-sm text-gray-600 mb-6 sm:mb-8">
            <div className="flex items-center">
              <Award className="text-indigo-500 mr-2" size={20} />
              <span className="font-medium">{products.length}+ Premium Tiles</span>
            </div>
            <div className="flex items-center">
              <Sparkles className="text-purple-500 mr-2" size={20} />
              <span className="font-medium">5 Categories</span>
            </div>
            <div className="flex items-center">
              <Zap className="text-pink-500 mr-2" size={20} />
              <span className="font-medium">Expert Curated</span>
            </div>
          </div>
          
          {/* Quick Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tiles by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* Advanced Filters & Controls */}
      <section className="px-2 sm:px-4 pb-6 sm:pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-4 sm:p-6 border border-indigo-100">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
              {/* Category Filters */}
              <div className="flex items-center space-x-4">
                <Filter className="text-indigo-600" size={20} />
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {['All', 'Marble', 'Granite', 'Ceramic', 'Wooden', 'Porcelain'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`px-2 sm:px-4 py-1 sm:py-2 rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm ${
                        activeFilter === category
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                      }`}
                    >
                      {category}
                      {category !== 'All' && (
                        <span className="ml-2 text-xs opacity-75">
                          ({products.filter(p => p.category === category).length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort & View Controls */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <SortAsc className="text-gray-600" size={18} />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 bg-white"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'compact' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="px-2 sm:px-4 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {activeFilter === 'All' ? 'All Products' : `${activeFilter} Collection`}
              <span className="text-gray-500 ml-3 font-normal text-lg">
                ({filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'})
              </span>
            </h2>
            
            {filteredProducts.length > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="mr-2" size={16} />
                <span>Showing premium quality tiles</span>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
              <p className="mt-6 text-gray-600 text-lg">Loading premium collection...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" 
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
            }>
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  className={viewMode === 'compact' ? 'compact-view' : ''}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No products found</h3>
              <p className="text-gray-600 mb-8 text-lg">
                {searchTerm ? `No results for "${searchTerm}"` : `No ${activeFilter.toLowerCase()} tiles available`}
              </p>
              <button
                onClick={() => {
                  setActiveFilter('All');
                  setSearchTerm('');
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Premium Categories Showcase */}
      <section className="py-12 sm:py-20 px-2 sm:px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">Explore Our Premium Categories</h2>
            <p className="text-lg sm:text-xl text-indigo-100 px-2">Each category represents years of craftsmanship and innovation</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {categories.map((category, index) => {
              const icons = ['🏛️', '🪨', '🏺', '🌳', '✨'];
              const colors = ['from-gray-400 to-gray-600', 'from-stone-400 to-stone-600', 'from-orange-400 to-red-500', 'from-amber-400 to-orange-500', 'from-purple-400 to-pink-500'];
              return (
                <div key={index} className="group relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 border border-white/20">
                    <div className={`w-20 h-20 bg-gradient-to-br ${colors[index % colors.length]} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-3xl">{icons[index % icons.length]}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center">{category._id} Collection</h3>
                    <p className="text-indigo-100 text-center mb-4">{category.count} Premium Options</p>
                    <div className="text-center">
                      <button 
                        onClick={() => setActiveFilter(category._id)}
                        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-white/30"
                      >
                        Explore Collection
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Services */}
      <section className="py-12 sm:py-20 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">Complete Premium Experience</h2>
            <p className="text-lg sm:text-xl text-gray-600 px-2">From selection to installation, we ensure perfection</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: '🎯', title: 'Expert Consultation', desc: 'Our design experts help you choose the perfect tiles for your space with 3D visualization' },
              { icon: '🛠️', title: 'Professional Installation', desc: 'Certified master craftsmen ensure flawless installation with lifetime warranty' },
              { icon: '✨', title: 'Premium Care Kit', desc: 'Complimentary maintenance kit with specialized cleaners and care instructions' }
            ].map((service, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-indigo-600 transition-colors text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Premium CTA */}
      <section className="py-12 sm:py-20 px-2 sm:px-4 bg-gradient-to-br from-gray-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Sparkles className="mx-auto mb-4 sm:mb-6 text-indigo-300" size={36} />
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">Ready to Create Something Beautiful?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-10 text-indigo-100 max-w-2xl mx-auto px-2">
            Transform your vision into reality with our premium tile collection and expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-xl transform hover:scale-105">
              📞 Get Premium Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
              📱 Request Custom Quote
            </button>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Products;