import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import apiService from '../services/api';

const Orders = () => {
  const { cart, clearCart, getTotalPrice } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setCustomerInfo(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }));
    } else {
      setCustomerInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!cart.items || cart.items.length === 0) {
      alert('Your cart is empty. Please add some products first.');
      window.location.href = '/products';
      return;
    }
    
    console.log('Cart items:', cart.items);

    try {
      setLoading(true);
      const sessionId = localStorage.getItem('anvi-session-id');
      
      if (!sessionId) {
        alert('Session expired. Please add items to cart again.');
        return;
      }
      
      const orderData = {
        sessionId,
        customer: customerInfo,
        notes: ''
      };

      console.log('Creating order with data:', orderData);
      const order = await apiService.createOrder(orderData);
      console.log('Order created:', order);
      
      setOrderNumber(order.orderNumber);
      setOrderPlaced(true);
      await clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order: ' + (error.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-4">Your order number is:</p>
          <p className="text-xl font-bold text-blue-600 mb-6">{orderNumber}</p>
          <p className="text-sm text-gray-500 mb-6">
            We'll send you an email confirmation shortly. You can track your order using the order number above.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Customer Information</h2>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Street Address *</label>
                <input
                  type="text"
                  name="address.street"
                  value={customerInfo.address.street}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">City *</label>
                  <input
                    type="text"
                    name="address.city"
                    value={customerInfo.address.city}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">State *</label>
                  <input
                    type="text"
                    name="address.state"
                    value={customerInfo.address.state}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    placeholder="State"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Pincode *</label>
                <input
                  type="text"
                  name="address.pincode"
                  value={customerInfo.address.pincode}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  placeholder="Enter pincode"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !cart.items || cart.items.length === 0}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            {cart.items && cart.items.length > 0 ? (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.product._id} className="flex items-center space-x-4 border-b pb-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-blue-600 font-bold">₹{item.price}/sq ft</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span>₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
                <a href="/products" className="text-blue-600 hover:underline">
                  Browse Products
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;