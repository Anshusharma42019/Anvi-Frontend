import { useState, useEffect } from 'react';
import apiService from '../services/api';

export const useCart = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0, totalItems: 0 });
  const [loading, setLoading] = useState(false);

  const getSessionId = () => {
    let sessionId = localStorage.getItem('anvi-session-id');
    if (!sessionId) {
      sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('anvi-session-id', sessionId);
    }
    return sessionId;
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const sessionId = getSessionId();
      const cartData = await apiService.getCart(sessionId);
      setCart(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product, quantity = 1) => {
    try {
      setLoading(true);
      const sessionId = getSessionId();
      const updatedCart = await apiService.addToCart(sessionId, product._id || product.id, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      setLoading(true);
      const sessionId = getSessionId();
      const updatedCart = await apiService.updateCartItem(sessionId, productId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const sessionId = getSessionId();
      const updatedCart = await apiService.removeFromCart(sessionId, productId);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      const sessionId = getSessionId();
      const updatedCart = await apiService.clearCart(sessionId);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTotalPrice = () => {
    return cart.totalAmount || 0;
  };

  const getTotalItems = () => {
    return cart.totalItems || 0;
  };

  return { 
    cart, 
    loading,
    addToCart, 
    updateCartItem,
    removeFromCart, 
    clearCart,
    getTotalPrice,
    getTotalItems,
    refreshCart: fetchCart
  };
};