import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, Share2, ArrowLeft, Check, Truck, Shield, Award } from 'lucide-react';
import apiService from '../services/api';
import LoadingSpinner from '../Componemts/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const productData = await apiService.getProductById(id);
      setProduct(productData);
      
      // Load recommendations
      const recsData = await apiService.getRecommendations(id);
      setRecommendations(recsData);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const discountPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;

  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-lg"
              />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discount}% OFF
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg ${selectedImage === index ? 'ring-2 ring-purple-500' : ''}`}
                  >
                    <img 
                      src={image} 
                      alt={`View ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="border-b pb-6">
              <div className="flex items-center space-x-3">
                <span className="text-2xl sm:text-3xl font-bold text-purple-600">₹{Math.round(discountPrice)}</span>
                {product.discount && (
                  <span className="text-xl text-gray-500 line-through">₹{product.price}</span>
                )}
                <span className="text-sm text-gray-600">per sq ft</span>
              </div>
              {product.discount && (
                <p className="text-green-600 text-sm mt-1">You save ₹{Math.round(product.price - discountPrice)} ({product.discount}%)</p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">Size:</span>
                  <span>{product.size}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">Thickness:</span>
                  <span>{product.thickness}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">Finish:</span>
                  <span>{product.finish}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">Stock:</span>
                  <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                    {product.inStock ? `${product.stockQuantity} Available` : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <div className="grid grid-cols-1 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                  isLiked ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300 text-gray-700 hover:border-red-500'
                }`}
              >
                <Heart size={20} className={isLiked ? 'fill-current' : ''} />
              </button>
              
              <button className="px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-gray-400">
                <Share2 size={20} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="mx-auto mb-2 text-green-600" size={24} />
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-600">On orders above ₹5000</p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto mb-2 text-blue-600" size={24} />
                <p className="text-sm font-medium">Quality Assured</p>
                <p className="text-xs text-gray-600">Premium materials</p>
              </div>
              <div className="text-center">
                <Award className="mx-auto mb-2 text-purple-600" size={24} />
                <p className="text-sm font-medium">Warranty</p>
                <p className="text-xs text-gray-600">5 year guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recommendations.map((rec) => (
                <div key={rec._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={rec.image} 
                    alt={rec.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{rec.name}</h3>
                    <p className="text-purple-600 font-bold">₹{rec.price}/sq ft</p>
                    <button 
                      onClick={() => navigate(`/products/${rec._id}`)}
                      className="w-full mt-3 bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;