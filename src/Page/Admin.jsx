import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import MessagingPanel from '../Componemts/MessagingPanel';
import AdminSidebar from '../Componemts/AdminSidebar';
import Toast from '../Componemts/Toast';
import MessageStatus from '../Componemts/MessageStatus';

const Admin = () => {
  const [stats, setStats] = useState({});
  const [contacts, setContacts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [catalogueImages, setCatalogueImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCatalogueForm, setShowCatalogueForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [catalogueForm, setCatalogueForm] = useState({ category: '', catalogueNumber: '', imageUrl: '', description: '' });
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
    size: '',
    thickness: '',
    finish: '',
    features: [],
    rating: 0,
    reviews: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load products first (this should work)
      const productsData = await apiService.getProducts({ limit: 20 });
      setProducts(productsData.products || []);
      
      // Try to load other data, but don't fail if they don't work
      try {
        const dashboardStats = await apiService.getDashboardStats();
        setStats(dashboardStats.stats || {});
      } catch (err) {
        console.log('Dashboard stats not available:', err);
        setStats({ totalProducts: productsData.products?.length || 0 });
      }
      

      
      try {
        const contactsData = await apiService.getAllContacts({ limit: 10 });
        setContacts(contactsData.contacts || []);
      } catch (err) {
        console.log('Contacts not available:', err);
      }
      
      try {
        const reviewsData = await apiService.getAllReviews({ limit: 10 });
        setReviews(reviewsData.reviews || []);
      } catch (err) {
        console.log('Reviews not available:', err);
      }
      
      try {
        const catalogueImagesData = await apiService.getCatalogueImages();
        setCatalogueImages(catalogueImagesData || {});
      } catch (err) {
        console.log('Catalogue images not available:', err);
      }
      
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleContactReply = async (contactId, message) => {
    try {
      const response = await apiService.replyToContact(contactId, message, 'Admin');
      if (response.messageSent) {
        setMessageStatus(response.messageSent);
        setTimeout(() => setMessageStatus(null), 5000);
      }
      loadDashboardData();
      showToast('🚀 Reply sent successfully!', 'success');
    } catch (error) {
      console.error('Error replying to contact:', error);
      showToast('Failed to send reply', 'error');
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (deletingProduct === contactId) {
      try {
        await apiService.deleteContact(contactId);
        loadDashboardData();
        setDeletingProduct(null);
        showToast('Contact message deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting contact:', error);
        showToast('Failed to delete contact message', 'error');
      }
    } else {
      setDeletingProduct(contactId);
      setTimeout(() => setDeletingProduct(null), 3000);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: productForm.name,
        description: productForm.description,
        category: productForm.category,
        price: 0,
        image: productForm.image,
        size: productForm.size || '30x30 cm',
        thickness: productForm.thickness || '8mm',
        finish: productForm.finish || 'Polished',
        features: Array.isArray(productForm.features) ? productForm.features : [],
        rating: parseFloat(productForm.rating) || 4.0,
        reviews: parseInt(productForm.reviews) || 0
      };

      console.log('Submitting product:', productData);

      if (editingProduct) {
        const result = await apiService.updateProduct(editingProduct._id, productData);
        console.log('Update result:', result);
        showToast('Product updated successfully!', 'success');
      } else {
        const result = await apiService.createProduct(productData);
        console.log('Create result:', result);
        showToast('Product created successfully!', 'success');
      }
      
      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: '', description: '', category: '', price: '', image: '',
        size: '', thickness: '', finish: '', features: [], rating: 0, reviews: 0
      });
      
      // Reload products
      const productsData = await apiService.getProducts({ limit: 20 });
      setProducts(productsData.products || []);
      
    } catch (error) {
      console.error('Error saving product:', error);
      showToast('Error saving product: ' + error.message, 'error');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      image: product.image,
      size: product.size,
      thickness: product.thickness,
      finish: product.finish,
      features: product.features || [],
      rating: product.rating,
      reviews: product.reviews
    });
    setShowProductForm(true);
  };

  const [deletingProduct, setDeletingProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [messageStatus, setMessageStatus] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleDeleteProduct = async (productId) => {
    if (deletingProduct === productId) {
      try {
        await apiService.deleteProduct(productId);
        loadDashboardData();
        setDeletingProduct(null);
        showToast('Product deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting product:', error);
        showToast('Failed to delete product', 'error');
      }
    } else {
      setDeletingProduct(productId);
      setTimeout(() => setDeletingProduct(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 lg:ml-64 relative z-10">
        {/* Enhanced Header - Always Visible */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white p-4 sm:p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Admin Dashboard
              </h1>
              <p className="text-purple-100 text-sm sm:text-base font-medium">Manage your tiles & decor business</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium">System Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">

        {/* Enhanced Content Area */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border-b border-white/20">
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent capitalize">
                {activeTab === 'messaging' ? '📱 Messaging' : activeTab}
              </h2>
              <div className="mt-2 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 sm:w-20"></div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
                  <div className="group bg-gradient-to-br from-blue-500 to-purple-600 p-3 sm:p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-white/20 rounded-lg lg:rounded-xl backdrop-blur-sm">
                        <span className="text-lg sm:text-xl lg:text-2xl">📦</span>
                      </div>
                      <div className="text-white/80 text-xs sm:text-sm font-medium">+12%</div>
                    </div>
                    <h3 className="text-white/90 font-semibold mb-1 text-sm sm:text-base">Products</h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{stats.totalProducts || 0}</p>
                  </div>
                  <div className="group bg-gradient-to-br from-green-500 to-teal-600 p-3 sm:p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-white/20 rounded-lg lg:rounded-xl backdrop-blur-sm">
                        <span className="text-lg sm:text-xl lg:text-2xl">👥</span>
                      </div>
                      <div className="text-white/80 text-xs sm:text-sm font-medium">+8%</div>
                    </div>
                    <h3 className="text-white/90 font-semibold mb-1 text-sm sm:text-base">Contacts</h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{contacts.length || 0}</p>
                  </div>
                  <div className="group bg-gradient-to-br from-orange-500 to-red-600 p-3 sm:p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-white/20 rounded-lg lg:rounded-xl backdrop-blur-sm">
                        <span className="text-lg sm:text-xl lg:text-2xl">⭐</span>
                      </div>
                      <div className="text-white/80 text-xs sm:text-sm font-medium">+15%</div>
                    </div>
                    <h3 className="text-white/90 font-semibold mb-1 text-sm sm:text-base">Reviews</h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{reviews.length || 0}</p>
                  </div>
                  <div className="group bg-gradient-to-br from-purple-500 to-pink-600 p-3 sm:p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-white/20 rounded-lg lg:rounded-xl backdrop-blur-sm">
                        <span className="text-lg sm:text-xl lg:text-2xl">🏷️</span>
                      </div>
                      <div className="text-white/80 text-xs sm:text-sm font-medium">+5%</div>
                    </div>
                    <h3 className="text-white/90 font-semibold mb-1 text-sm sm:text-base">Categories</h3>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">5</p>
                  </div>
                </div>
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    🎆 Dashboard Overview
                  </h2>
                  <p className="text-gray-700 mb-4">Welcome to your business control center. Monitor performance and manage your tiles & decor operations.</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1 text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span>All Systems Operational</span>
                    </span>
                    <span className="text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <span className="text-xl">📦</span>
                      </div>
                      <h3 className="font-bold text-gray-800">Quick Add Product</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Add new tiles and decor items to your inventory</p>
                    <button 
                      onClick={() => setActiveTab('products')}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                    >
                      Add Product →
                    </button>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <span className="text-xl">👥</span>
                      </div>
                      <h3 className="font-bold text-gray-800">Customer Messages</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">View and respond to customer inquiries</p>
                    <button 
                      onClick={() => setActiveTab('contacts')}
                      className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-lg text-sm font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300"
                    >
                      View Messages →
                    </button>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <span className="text-xl">🏷️</span>
                      </div>
                      <h3 className="font-bold text-gray-800">Manage Catalogue</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Organize product categories and showcase</p>
                    <button 
                      onClick={() => setActiveTab('catalogue')}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                      Manage Catalogue →
                    </button>
                  </div>
                </div>

                {/* Business Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                      <span>📈</span>
                      <span>Business Insights</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Total Products</span>
                        <span className="font-bold text-blue-600">{stats.totalProducts || 0}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Active Contacts</span>
                        <span className="font-bold text-green-600">{contacts.length || 0}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Customer Reviews</span>
                        <span className="font-bold text-orange-600">{reviews.length || 0}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Product Categories</span>
                        <span className="font-bold text-purple-600">5</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                      <span>🎯</span>
                      <span>Recent Activity</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">System started successfully</p>
                          <p className="text-xs text-gray-500">{new Date().toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">Dashboard loaded</p>
                          <p className="text-xs text-gray-500">All components active</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">Ready for business operations</p>
                          <p className="text-xs text-gray-500">All systems operational</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Products Management</h2>
                  <button
                    onClick={() => setShowProductForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold flex items-center space-x-2 text-sm sm:text-base"
                  >
                    <span>✨</span>
                    <span>Add Product</span>
                  </button>
                </div>
                
                {showProductForm && (
                  <div className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200/50 shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <form onSubmit={handleProductSubmit} className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Product Name"
                        value={productForm.name}
                        onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                        className="border rounded px-3 py-2"
                        required
                      />
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                        className="border rounded px-3 py-2"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Marble">Marble</option>
                        <option value="Granite">Granite</option>
                        <option value="Ceramic">Ceramic</option>
                        <option value="Wooden">Wooden</option>
                        <option value="Porcelain">Porcelain</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Size"
                        value={productForm.size}
                        onChange={(e) => setProductForm({...productForm, size: e.target.value})}
                        className="border rounded px-3 py-2"
                      />
                      <div className="col-span-2 space-y-2">
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={productForm.image}
                          onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                          className="border rounded px-3 py-2 w-full"
                        />
                        <div className="text-center text-gray-500 text-sm">OR</div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              try {
                                const result = await apiService.uploadImage(file);
                                setProductForm({...productForm, image: result.imageUrl});
                              } catch (error) {
                                alert('Upload failed: ' + error.message);
                              }
                            }
                          }}
                          className="border rounded px-3 py-2 w-full"
                        />
                        {productForm.image && (
                          <img 
                            src={productForm.image} 
                            alt="Preview" 
                            className="w-20 h-20 object-cover rounded border"
                          />
                        )}
                      </div>
                      <textarea
                        placeholder="Description"
                        value={productForm.description}
                        onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                        className="border rounded px-3 py-2 col-span-2"
                        rows="3"
                        required
                      />
                      <div className="col-span-2 flex gap-2">
                        <button type="submit" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold">
                          {editingProduct ? '✨ Update' : '✨ Create'} Product
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowProductForm(false);
                            setEditingProduct(null);
                            setProductForm({name: '', description: '', category: '', price: '', image: '', size: '', thickness: '', finish: '', features: [], rating: 0, reviews: 0});
                          }}
                          className="bg-gradient-to-r from-gray-600 to-slate-600 text-white px-6 py-3 rounded-xl hover:from-gray-700 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
                        >
                          ❌ Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {products.map((product) => (
                    <div key={product._id} className="group bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
                      <div className="relative overflow-hidden rounded-lg lg:rounded-xl mb-3 sm:mb-4">
                        <img src={product.image} alt={product.name} className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1">{product.name}</h3>
                      <p className="text-purple-600 font-medium mb-2 sm:mb-3 text-sm sm:text-base">{product.category}</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className={`flex-1 transition-all duration-300 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg ${
                            deletingProduct === product._id
                              ? 'bg-gradient-to-r from-red-600 to-red-800 text-white animate-pulse'
                              : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600'
                          }`}
                        >
                          {deletingProduct === product._id ? '⚠️ Confirm?' : '🗑️ Delete'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Orders Management</h2>
                <p className="text-gray-600 mb-4">View and manage customer orders. Orders are created by customers through the checkout process.</p>
                <div className="space-y-4">
                  {orders.length > 0 ? orders.map((order) => (
                    <div key={order._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                          <p className="text-gray-600">{order.customer?.name} - {order.customer?.email}</p>
                          <p className="text-sm text-gray-500">₹{order.totalAmount}</p>
                          <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <select
                          value={order.status}
                          onChange={(e) => handleOrderStatusUpdate(order._id, e.target.value)}
                          className="border rounded px-3 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No orders found. Orders will appear here when customers place them.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'catalogue' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Catalogue Management</h2>
                  <button
                    onClick={() => setShowCatalogueForm(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold flex items-center space-x-2 text-sm sm:text-base"
                  >
                    <span>🏷️</span>
                    <span>Add Category</span>
                  </button>
                </div>
                
                {showCatalogueForm && (
                  <div className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200/50 shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        await apiService.createCatalogueCategory(catalogueForm.category, catalogueForm.catalogueNumber, catalogueForm.imageUrl, catalogueForm.description);
                        const cataloguesData = await apiService.getCatalogueImages();
                        setCatalogueImages(cataloguesData);
                        setShowCatalogueForm(false);
                        setCatalogueForm({ category: '', catalogueNumber: '', imageUrl: '', description: '' });
                        showToast('Category created successfully!', 'success');
                      } catch (error) {
                        showToast('Error creating category: ' + error.message, 'error');
                      }
                    }} className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Category Name"
                        value={catalogueForm.category}
                        onChange={(e) => setCatalogueForm({...catalogueForm, category: e.target.value})}
                        className="border rounded px-3 py-2"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Catalogue Number (e.g., CAT-001)"
                        value={catalogueForm.catalogueNumber}
                        onChange={(e) => setCatalogueForm({...catalogueForm, catalogueNumber: e.target.value})}
                        className="border rounded px-3 py-2"
                        required
                      />
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={catalogueForm.imageUrl}
                          onChange={(e) => setCatalogueForm({...catalogueForm, imageUrl: e.target.value})}
                          className="border rounded px-3 py-2 w-full"
                        />
                        <div className="text-center text-gray-500">OR</div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              try {
                                const result = await apiService.uploadImage(file);
                                setCatalogueForm({...catalogueForm, imageUrl: result.imageUrl});
                              } catch (error) {
                                alert('Upload failed: ' + error.message);
                              }
                            }
                          }}
                          className="border rounded px-3 py-2 w-full"
                        />
                      </div>
                      <textarea
                        placeholder="Description (optional)"
                        value={catalogueForm.description}
                        onChange={(e) => setCatalogueForm({...catalogueForm, description: e.target.value})}
                        className="border rounded px-3 py-2 col-span-2"
                        rows="2"
                      />
                      <div className="col-span-2 flex gap-2">
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                          Create Category
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowCatalogueForm(false);
                            setCatalogueForm({ category: '', catalogueNumber: '', imageUrl: '', description: '' });
                          }}
                          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {Object.entries(catalogueImages).map(([category, catalogueData]) => (
                    <div key={category} className="bg-white border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className="font-semibold">{category}</h3>
                          <p className="text-xs text-gray-500">{catalogueData.catalogueNumber}</p>
                        </div>
                        <button
                          onClick={async () => {
                            const deleteKey = `delete-${category}`;
                            if (deletingProduct === deleteKey) {
                              try {
                                await apiService.deleteCatalogueCategory(category);
                                setCatalogueImages(prev => {
                                  const updated = { ...prev };
                                  delete updated[category];
                                  return updated;
                                });
                                setDeletingProduct(null);
                                showToast('Category deleted successfully!', 'success');
                              } catch (error) {
                                showToast('Error deleting category: ' + error.message, 'error');
                              }
                            } else {
                              setDeletingProduct(deleteKey);
                              setTimeout(() => setDeletingProduct(null), 3000);
                            }
                          }}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                            deletingProduct === `delete-${category}`
                              ? 'bg-gradient-to-r from-red-600 to-red-800 text-white animate-pulse'
                              : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600'
                          }`}
                        >
                          {deletingProduct === `delete-${category}` ? '⚠️ Sure?' : '🗑️ Delete'}
                        </button>
                      </div>
                      <img 
                        src={catalogueData.imageUrl} 
                        alt={category}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Catalogue Number"
                          defaultValue={catalogueData.catalogueNumber}
                          className="w-full border rounded px-3 py-2 mb-2"
                          onBlur={async (e) => {
                            if (e.target.value && e.target.value !== catalogueData.catalogueNumber) {
                              try {
                                await apiService.updateCatalogueImage(category, e.target.value, catalogueData.imageUrl, catalogueData.description);
                                const cataloguesData = await apiService.getCatalogueImages();
                                setCatalogueImages(cataloguesData);
                              } catch (error) {
                                alert('Error updating catalogue number: ' + error.message);
                              }
                            }
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Image URL"
                          defaultValue={catalogueData.imageUrl}
                          className="w-full border rounded px-3 py-2"
                          onBlur={async (e) => {
                            if (e.target.value && e.target.value !== catalogueData.imageUrl) {
                              try {
                                await apiService.updateCatalogueImage(category, catalogueData.catalogueNumber, e.target.value, catalogueData.description);
                                const cataloguesData = await apiService.getCatalogueImages();
                                setCatalogueImages(cataloguesData);
                              } catch (error) {
                                alert('Error updating image: ' + error.message);
                              }
                            }
                          }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              try {
                                const result = await apiService.uploadImage(file);
                                await apiService.updateCatalogueImage(category, catalogueData.catalogueNumber, result.imageUrl, catalogueData.description);
                                const cataloguesData = await apiService.getCatalogueImages();
                                setCatalogueImages(cataloguesData);
                              } catch (error) {
                                alert('Upload failed: ' + error.message);
                              }
                            }
                          }}
                          className="w-full border rounded px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Contacts</h2>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact._id} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg text-gray-800">{contact.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              contact.status === 'new' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' :
                              contact.status === 'replied' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                              'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
                            }`}>
                              {contact.status}
                            </span>
                          </div>
                          <p className="text-purple-600 font-medium mb-1">{contact.email}</p>
                          {contact.phone && <p className="text-blue-600 font-medium mb-2">📱 {contact.phone}</p>}
                          <p className="font-semibold text-gray-700 mb-2">{contact.subject}</p>
                          <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{contact.message}</p>
                        </div>
                        <div className="flex sm:flex-col gap-2">
                          <button
                            onClick={() => setReplyingTo(replyingTo === contact._id ? null : contact._id)}
                            className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            💬 Reply
                          </button>
                          <button
                            onClick={() => handleDeleteContact(contact._id)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                              deletingProduct === contact._id
                                ? 'bg-gradient-to-r from-red-600 to-red-800 text-white animate-pulse'
                                : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600'
                            }`}
                          >
                            {deletingProduct === contact._id ? '⚠️ Confirm?' : '🗑️ Delete'}
                          </button>
                        </div>
                      </div>
                      
                      {/* Reply Section */}
                      {replyingTo === contact._id && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                          <h4 className="font-semibold text-gray-800 mb-3">💬 Reply to {contact.name}</h4>
                          <div className="space-y-3">
                            <textarea
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              placeholder="Type your reply message..."
                              className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                              rows="3"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={async () => {
                                  if (replyMessage.trim()) {
                                    await handleContactReply(contact._id, replyMessage);
                                    setReplyMessage('');
                                    setReplyingTo(null);
                                  }
                                }}
                                disabled={!replyMessage.trim()}
                                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm"
                              >
                                ✨ Send Reply
                              </button>
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyMessage('');
                                }}
                                className="px-4 py-2 bg-gradient-to-r from-gray-500 to-slate-500 text-white rounded-lg hover:from-gray-600 hover:to-slate-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-sm"
                              >
                                ❌ Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messaging' && (
              <MessagingPanel showToast={showToast} setMessageStatus={setMessageStatus} />
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{review.title}</h3>
                          <p className="text-gray-600">{review.customer.name} - {review.rating}/5 stars</p>
                          <p className="text-sm text-gray-500">{review.comment}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          review.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {review.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
      
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      {/* Message Status */}
      {messageStatus && (
        <MessageStatus
          results={messageStatus}
          onClose={() => setMessageStatus(null)}
        />
      )}
    </div>
  );
};

export default Admin;