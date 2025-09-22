const API_BASE_URL = 'https://anvi-backend-iota.vercel.app/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/products?${query}`);
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async getProductById(id) {
    return this.request(`/products/${id}`);
  }

  async getFeaturedProducts() {
    return this.request('/products/featured');
  }

  async getProductsByCategory(category) {
    return this.request(`/products/category/${category}`);
  }

  async getRecommendations(id) {
    return this.request(`/products/${id}/recommendations`);
  }

  // Search
  async searchProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/search?${query}`);
  }

  async getPopularSearches() {
    return this.request('/search/popular');
  }

  async autocomplete(query) {
    return this.request(`/search/autocomplete?q=${encodeURIComponent(query)}`);
  }

  // Categories
  async getCategories() {
    return this.request('/categories');
  }

  async getCategoryDetails(category) {
    return this.request(`/categories/${category}`);
  }

  // Catalogue
  async getCatalogue() {
    return this.request('/catalogue');
  }

  async getCategoryShowcase(category) {
    return this.request(`/catalogue/${category}`);
  }

  async getCatalogueImages() {
    return this.request('/catalogue/images');
  }

  async createCatalogueCategory(category, catalogueNumber, imageUrl, description) {
    return this.request('/catalogue/images', {
      method: 'POST',
      body: JSON.stringify({ category, catalogueNumber, imageUrl, description }),
    });
  }

  async updateCatalogueImage(category, catalogueNumber, imageUrl, description) {
    return this.request(`/catalogue/images/${category}`, {
      method: 'PUT',
      body: JSON.stringify({ catalogueNumber, imageUrl, description }),
    });
  }

  async deleteCatalogueCategory(category) {
    return this.request(`/catalogue/images/${category}`, {
      method: 'DELETE',
    });
  }

  // Upload image
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Upload failed');
    }
    
    return data;
  }

  // Cart
  async getCart(sessionId) {
    return this.request(`/cart/${sessionId}`);
  }

  async addToCart(sessionId, productId, quantity = 1) {
    return this.request('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ sessionId, productId, quantity }),
    });
  }

  async updateCartItem(sessionId, productId, quantity) {
    return this.request('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ sessionId, productId, quantity }),
    });
  }

  async removeFromCart(sessionId, productId) {
    return this.request('/cart/remove', {
      method: 'DELETE',
      body: JSON.stringify({ sessionId, productId }),
    });
  }

  async clearCart(sessionId) {
    return this.request(`/cart/${sessionId}/clear`, {
      method: 'DELETE',
    });
  }

  // Orders
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(id) {
    return this.request(`/orders/${id}`);
  }

  async getOrderByNumber(orderNumber) {
    return this.request(`/orders/number/${orderNumber}`);
  }

  // Contact
  async submitContact(contactData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Reviews
  async getProductReviews(productId, params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/reviews/product/${productId}?${query}`);
  }

  async createReview(reviewData) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  async markReviewHelpful(reviewId) {
    return this.request(`/reviews/${reviewId}/helpful`, {
      method: 'PUT',
    });
  }

  // Admin APIs
  async getDashboardStats() {
    return this.request('/admin/dashboard');
  }

  async bulkUpdateProducts(productIds, updates) {
    return this.request('/admin/products/bulk-update', {
      method: 'PUT',
      body: JSON.stringify({ productIds, updates }),
    });
  }

  async bulkDeleteProducts(productIds) {
    return this.request('/admin/products/bulk-delete', {
      method: 'DELETE',
      body: JSON.stringify({ productIds }),
    });
  }

  async exportData(type, format = 'json') {
    return this.request(`/admin/export?type=${type}&format=${format}`);
  }

  // Product CRUD
  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Orders
  async getAllOrders(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/orders?${query}`);
  }

  async updateOrderStatus(id, status) {
    return this.request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async getOrderStats() {
    return this.request('/orders/stats');
  }

  // Contact Admin
  async getAllContacts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/contact?${query}`);
  }

  async getContact(id) {
    return this.request(`/contact/${id}`);
  }

  async replyToContact(id, replyMessage, repliedBy) {
    return this.request(`/contact/${id}/reply`, {
      method: 'POST',
      body: JSON.stringify({ replyMessage, repliedBy }),
    });
  }

  async updateContactStatus(id, status) {
    return this.request(`/contact/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteContact(id) {
    return this.request(`/contact/${id}`, {
      method: 'DELETE',
    });
  }

  // Messaging APIs
  async sendManualMessage(phone, message, type = 'both') {
    return this.request('/contact/send-message', {
      method: 'POST',
      body: JSON.stringify({ phone, message, type }),
    });
  }

  async testMessaging() {
    return this.request('/contact/test-messaging');
  }

  // Reviews Admin
  async getAllReviews(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/reviews/admin?${query}`);
  }

  async updateReviewStatus(id, status) {
    return this.request(`/reviews/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }
}

export default new ApiService();