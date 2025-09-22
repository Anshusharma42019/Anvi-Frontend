import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, Eye } from 'lucide-react';
import { formatPrice, calculateDiscount } from '../utils/productUtils';

const ProductCard = ({ product, className = '' }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  


  const discountInfo = product.discount 
    ? calculateDiscount(product.price, product.discount)
    : null;

  return (
    <div className={`group relative modern-card hover-lift overflow-hidden ${className}`}>
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {!imageLoaded && (
          <div className="w-full h-56 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'} 
          alt={product.name}
          className={`w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'block' : 'hidden'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              ✨ New
            </span>
          )}
          {discountInfo && (
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              🔥 {product.discount}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              🏆 Best Seller
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'}`}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
          </button>
          <button 
            onClick={() => navigate(`/products/${product._id}`)}
            className="w-10 h-10 bg-white/90 text-gray-700 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            <Eye size={16} />
          </button>
        </div>
        

      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Category */}
        {product.category && (
          <span className="text-xs text-purple-600 font-medium uppercase tracking-wide">
            {product.category}
          </span>
        )}
        
        {/* Title */}
        <h3 
          onClick={() => navigate(`/products/${product._id}`)}
          className="font-bold text-lg mb-2 text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2 cursor-pointer hover:underline"
        >
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description || 'Premium quality tile with exceptional durability and stunning finish.'}
        </p>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < (product.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">({product.reviews || Math.floor(Math.random() * 100) + 10})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {discountInfo ? (
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold gradient-text">
                  ₹{discountInfo.finalPrice}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{discountInfo.originalPrice}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold gradient-text">
                ₹{product.price || Math.floor(Math.random() * 500) + 100}
              </span>
            )}
            <p className="text-xs text-gray-500 mt-1">per sq ft</p>
          </div>
          

        </div>
        
        {/* Features */}
        {product.features && (
          <div className="mt-4 flex flex-wrap gap-1">
            {product.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;