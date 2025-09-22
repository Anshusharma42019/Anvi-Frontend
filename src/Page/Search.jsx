import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, Filter, X, Sparkles, TrendingUp, Clock, Star } from 'lucide-react';
import ProductCard from '../Componemts/ProductCard';
import apiService from '../services/api';

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: "All",
    size: "All"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches] = useState(['Marble Tiles', 'Granite Flooring', 'Ceramic Bathroom', 'Wooden Texture']);
  const searchRef = useRef(null);

  const categories = ["All", "Marble", "Granite", "Ceramic", "Wooden", "Porcelain"];
  const priceRanges = ["All", "Under ₹75", "₹75-₹100", "₹100-₹125", "Above ₹125"];
  const sizes = ["All", "30x30", "30x60", "60x60", "60x120", "15x90", "20x120"];

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      const timer = setTimeout(() => {
        loadSuggestions();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const loadSuggestions = async () => {
    try {
      const response = await apiService.autocomplete(query);
      setSuggestions(response.slice(0, 5));
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error loading suggestions:', error);
    }
  };

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setShowSuggestions(false);
    
    // Save to recent searches
    const newRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    
    try {
      const searchParams = {
        q: searchQuery,
        category: filters.category !== "All" ? filters.category : undefined,
        size: filters.size !== "All" ? filters.size : undefined
      };

      if (filters.priceRange !== "All") {
        if (filters.priceRange === "Under ₹75") {
          searchParams.maxPrice = 75;
        } else if (filters.priceRange === "₹75-₹100") {
          searchParams.minPrice = 75;
          searchParams.maxPrice = 100;
        } else if (filters.priceRange === "₹100-₹125") {
          searchParams.minPrice = 100;
          searchParams.maxPrice = 125;
        } else if (filters.priceRange === "Above ₹125") {
          searchParams.minPrice = 125;
        }
      }

      const response = await apiService.searchProducts(searchParams);
      setResults(response.products || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "All",
      priceRange: "All",
      size: "All"
    });
    setQuery("");
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Search Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-purple-600 mr-3" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Discover Perfect Tiles
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-12">AI-powered search to find your dream tiles instantly</p>
          
          {/* Advanced Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
                placeholder="Search for marble, granite, ceramic tiles..."
                className="w-full pl-12 pr-20 py-4 text-lg border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 shadow-lg"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-purple-100'}`}
                >
                  <Filter size={18} />
                </button>
                <button 
                  onClick={() => handleSearch()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg"
                >
                  Search
                </button>
              </div>
            </div>
            
            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(suggestion);
                      handleSearch(suggestion);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-purple-50 first:rounded-t-xl last:rounded-b-xl transition-colors"
                  >
                    <SearchIcon className="inline mr-3 text-gray-400" size={16} />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Advanced Filters */}
      {showFilters && (
        <section className="px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Advanced Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  >
                    {priceRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <select
                    value={filters.size}
                    onChange={(e) => handleFilterChange("size", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  >
                    {sizes.map(size => (
                      <option key={size} value={size}>{size === "All" ? "All Sizes" : size + " cm"}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={clearFilters}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => {
                    handleSearch();
                    setShowFilters(false);
                  }}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search Results */}
      {(query || results.length > 0) && (
        <section className="px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
                <p className="mt-4 text-gray-600 text-lg">Searching for perfect tiles...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Found {results.length} perfect {results.length === 1 ? 'match' : 'matches'}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {results.map((product) => (
                    <ProductCard key={product._id || product.id} product={product} />
                  ))}
                </div>
              </>
            ) : query && (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No tiles found</h3>
                <p className="text-gray-600 mb-8 text-lg">Try different keywords or adjust your filters</p>
                <button 
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Quick Search Options */}
      {!query && results.length === 0 && (
        <section className="px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Trending Searches */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <TrendingUp className="text-orange-500 mr-2" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Trending Searches</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {trendingSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(term);
                      handleSearch(term);
                    }}
                    className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-6 py-3 rounded-full border border-orange-200 hover:from-orange-200 hover:to-red-200 transition-all duration-300 font-medium shadow-sm"
                  >
                    <Star className="inline mr-2" size={16} />
                    {term}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-center mb-6">
                  <Clock className="text-blue-500 mr-2" size={24} />
                  <h2 className="text-2xl font-bold text-gray-800">Recent Searches</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(term);
                        handleSearch(term);
                      }}
                      className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors font-medium"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quick Categories */}
            <div>
              <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.slice(1).map((category, index) => {
                  const icons = ['🏛️', '🪨', '🏺', '🌳', '✨'];
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setQuery(category);
                        handleSearch(category);
                      }}
                      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group border border-gray-100 hover:border-purple-200"
                    >
                      <div className="text-4xl mb-3">{icons[index]}</div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">{category}</h3>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Search;