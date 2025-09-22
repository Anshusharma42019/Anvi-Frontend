import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Package, Grid, Users, MessageSquare, Star, LogOut, Sparkles, Menu, X } from "lucide-react";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl shadow-lg"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white shadow-2xl z-50 border-r border-purple-500/20 transform transition-transform duration-300 lg:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
      {/* Header */}
      <div className="p-6 border-b border-purple-500/30 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-purple-400" size={24} />
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </div>
        <div className="mt-2 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="mt-8">
        <ul className="space-y-3 px-4">
          <li>
            <button 
              onClick={() => {
                setActiveTab('dashboard');
                setIsMobileOpen(false);
              }}
              className={`group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 w-full text-left relative overflow-hidden ${
                activeTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25 scale-105' 
                  : 'hover:bg-white/10 hover:scale-102 hover:shadow-md'
              }`}
            >
              <BarChart3 size={20} className={activeTab === 'dashboard' ? 'text-white' : 'text-purple-400'} />
              <span className="font-medium">Dashboard</span>
              {activeTab === 'dashboard' && <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            </button>
          </li>
          <li>
            <button 
              onClick={() => {
                setActiveTab('products');
                setIsMobileOpen(false);
              }}
              className={`group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 w-full text-left relative overflow-hidden ${
                activeTab === 'products' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25 scale-105' 
                  : 'hover:bg-white/10 hover:scale-102 hover:shadow-md'
              }`}
            >
              <Package size={20} className={activeTab === 'products' ? 'text-white' : 'text-purple-400'} />
              <span className="font-medium">Products</span>
              {activeTab === 'products' && <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            </button>
          </li>
          <li>
            <button 
              onClick={() => {
                setActiveTab('catalogue');
                setIsMobileOpen(false);
              }}
              className={`group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 w-full text-left relative overflow-hidden ${
                activeTab === 'catalogue' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25 scale-105' 
                  : 'hover:bg-white/10 hover:scale-102 hover:shadow-md'
              }`}
            >
              <Grid size={20} className={activeTab === 'catalogue' ? 'text-white' : 'text-purple-400'} />
              <span className="font-medium">Catalogue</span>
              {activeTab === 'catalogue' && <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            </button>
          </li>
          <li>
            <button 
              onClick={() => {
                setActiveTab('contacts');
                setIsMobileOpen(false);
              }}
              className={`group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 w-full text-left relative overflow-hidden ${
                activeTab === 'contacts' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25 scale-105' 
                  : 'hover:bg-white/10 hover:scale-102 hover:shadow-md'
              }`}
            >
              <Users size={20} className={activeTab === 'contacts' ? 'text-white' : 'text-purple-400'} />
              <span className="font-medium">Contacts</span>
              {activeTab === 'contacts' && <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            </button>
          </li>
          <li>
            <button 
              onClick={() => {
                setActiveTab('messaging');
                setIsMobileOpen(false);
              }}
              className={`group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 w-full text-left relative overflow-hidden ${
                activeTab === 'messaging' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25 scale-105' 
                  : 'hover:bg-white/10 hover:scale-102 hover:shadow-md'
              }`}
            >
              <MessageSquare size={20} className={activeTab === 'messaging' ? 'text-white' : 'text-purple-400'} />
              <span className="font-medium">📱 Messaging</span>
              {activeTab === 'messaging' && <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            </button>
          </li>
          <li>
            <button 
              onClick={() => {
                setActiveTab('reviews');
                setIsMobileOpen(false);
              }}
              className={`group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 w-full text-left relative overflow-hidden ${
                activeTab === 'reviews' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25 scale-105' 
                  : 'hover:bg-white/10 hover:scale-102 hover:shadow-md'
              }`}
            >
              <Star size={20} className={activeTab === 'reviews' ? 'text-white' : 'text-purple-400'} />
              <span className="font-medium">Reviews</span>
              {activeTab === 'reviews' && <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>}
            </button>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="mb-4 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <Link
          to="/"
          className="group flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 transition-all duration-300 w-full text-left shadow-lg hover:shadow-xl hover:scale-105"
        >
          <LogOut size={20} className="text-white group-hover:rotate-12 transition-transform" />
          <span className="font-medium text-white">Exit to Site</span>
        </Link>
      </div>
    </div>
    </>
  );
};

export default AdminSidebar;