import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Sparkles, Grid, List, Filter, Eye, Palette, Award, Zap } from 'lucide-react';
import ProductCard from '../Componemts/ProductCard';
import apiService from '../services/api';
import ExtraContent from "./ExtraContent";

const Catalog = () => {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [catalogData, setCatalogData] = useState({ categories: [], featuredProducts: [] });
  const [catalogueImages, setCatalogueImages] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCatalogue, setSelectedCatalogue] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadCatalogue();
  }, []);

  useEffect(() => {
    if (category) {
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      setSelectedCategory(formattedCategory);
      loadCategoryProducts(formattedCategory);
    } else {
      loadAllProducts();
    }
  }, [category]);

  const loadCatalogue = async () => {
    try {
      const [catalogueData, imagesData] = await Promise.all([
        apiService.getCatalogue(),
        apiService.getCatalogueImages()
      ]);
      setCatalogData(catalogueData);
      setCatalogueImages(imagesData);
      if (!category) {
        setProducts(catalogueData.featuredProducts);
      }
    } catch (error) {
      console.error('Error loading catalogue:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProducts({ limit: 20 });
      setProducts(response.products || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryProducts = async (cat) => {
    try {
      setLoading(true);
      const response = await apiService.getProductsByCategory(cat);
      setProducts(response || []);
    } catch (error) {
      console.error('Error loading category products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...Object.keys(catalogueImages)];
  


  const handleCategoryChange = async (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      await loadAllProducts();
    } else {
      await loadCategoryProducts(cat);
    }
  };

  const displayProducts = products;

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
      {/* Hero Header */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Palette className="text-emerald-600 mr-4" size={40} />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Premium Catalogue
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover our <span className="font-semibold text-emerald-600">handcrafted collection</span> of premium tiles, 
            where artistry meets functionality
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Award className="text-emerald-500 mr-2" size={20} />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center">
              <Sparkles className="text-teal-500 mr-2" size={20} />
              <span>Unique Designs</span>
            </div>
            <div className="flex items-center">
              <Zap className="text-cyan-500 mr-2" size={20} />
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Category Filter */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-emerald-100">
            <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
              <div className="flex items-center mb-4 lg:mb-0">
                <Filter className="text-emerald-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-gray-800">Filter by Category</h3>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`group px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-200"
                      : "bg-white text-gray-700 hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-300"
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                      {displayProducts.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Category Showcase */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Explore Our Collections</h2>
            <p className="text-gray-600 text-lg">Each category tells a unique story of craftsmanship</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {Object.entries(catalogueImages).map(([categoryName, catalogueData]) => (
              <div
                key={categoryName}
                onClick={() => {
                  setSelectedCatalogue({
                    name: categoryName,
                    image: catalogueData.imageUrl,
                    catalogueNumber: catalogueData.catalogueNumber,
                    description: catalogueData.description || `Premium ${categoryName} collection with exceptional quality and design.`
                  });
                  setShowModal(true);
                }}
                className="group relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
              >
                <div className="absolute inset-0">
                  <img 
                    src={catalogueData.imageUrl} 
                    alt={categoryName}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                  />
                </div>
                <div className="relative p-8 text-center">
                  <h3 className="font-bold text-xl text-gray-800 group-hover:text-emerald-600 transition-colors mb-2">
                    {categoryName}
                  </h3>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="mx-auto text-emerald-600" size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      {displayProducts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {selectedCategory === "All" ? "All Products" : selectedCategory + " Tiles"} 
                <span className="text-gray-500 ml-2">({displayProducts.length} items)</span>
              </h2>
            </div>
          
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600"></div>
              <p className="mt-6 text-gray-600 text-lg">Curating perfect tiles for you...</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "space-y-4"
            }>
              {displayProducts.map((product) => (
                viewMode === 'grid' ? (
                  <ProductCard key={product._id || product.id} product={product} />
                ) : (
                  <div key={product._id || product.id} className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-6 hover:shadow-xl transition-shadow">
                    <img src={product.image || product.img} alt={product.name} className="w-24 h-24 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-2">{product.description?.slice(0, 100)}...</p>
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-600 font-bold text-lg">₹{product.price}/sq ft</span>
                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">{product.category}</span>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
          </div>
        </section>
      )}

      {/* Premium Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">The Anvi Advantage</h2>
            <p className="text-xl text-gray-600">What makes our tiles extraordinary</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🛡️', title: 'Lifetime Durability', desc: 'Engineered to last generations with premium materials', color: 'emerald' },
              { icon: '💧', title: 'Hydro-Shield', desc: 'Advanced water resistance technology for all environments', color: 'blue' },
              { icon: '🧽', title: 'Self-Clean Surface', desc: 'Nano-coating technology for effortless maintenance', color: 'purple' },
              { icon: '🎨', title: 'Designer Collection', desc: 'Curated by world-renowned interior designers', color: 'pink' }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`w-20 h-20 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Sparkles className="mx-auto mb-6 text-emerald-200" size={48} />
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-10 text-emerald-100 max-w-2xl mx-auto">
            Let our design experts help you create the perfect ambiance with our premium tile collection
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all duration-300 shadow-xl transform hover:scale-105">
              🎯 Get Free Design Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105">
              📱 Download Digital Catalogue
            </button>
          </div>
        </div>
      </section>
      {/* Catalogue Detail Modal */}
      {showModal && selectedCatalogue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
              >
                ✕
              </button>
              <img 
                src={selectedCatalogue.image} 
                alt={selectedCatalogue.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedCatalogue.catalogueNumber}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedCatalogue.name}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{selectedCatalogue.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Category</h4>
                  <p className="text-gray-600">{selectedCatalogue.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Catalogue ID</h4>
                  <p className="text-gray-600">{selectedCatalogue.catalogueNumber}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    handleCategoryChange(selectedCatalogue.name);
                  }}
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  View Products
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ExtraContent />
    </div>
  );
};

export default Catalog;