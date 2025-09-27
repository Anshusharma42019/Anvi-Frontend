import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const AdminDashboard = () => {
  const [checks, setChecks] = useState({
    cloudinary: { status: 'loading', message: 'Testing...' },
    database: { status: 'loading', message: 'Testing...' },
    upload: { status: 'pending', message: 'Not tested' },
    categories: { status: 'loading', message: 'Loading...' }
  });
  const [stats, setStats] = useState(null);

  useEffect(() => {
    runAllChecks();
  }, []);

  const runAllChecks = async () => {
    // Test Cloudinary
    try {
      const cloudinaryResult = await apiService.testCloudinary();
      setChecks(prev => ({
        ...prev,
        cloudinary: { status: 'success', message: 'Connected successfully', data: cloudinaryResult }
      }));
    } catch (error) {
      setChecks(prev => ({
        ...prev,
        cloudinary: { status: 'error', message: error.message }
      }));
    }

    // Test Database (via categories)
    try {
      const categories = await apiService.getAllCategories();
      setChecks(prev => ({
        ...prev,
        database: { status: 'success', message: `Database connected (${categories.length} categories)` },
        categories: { status: 'success', message: `${categories.length} categories loaded` }
      }));
    } catch (error) {
      setChecks(prev => ({
        ...prev,
        database: { status: 'error', message: 'Database connection failed' },
        categories: { status: 'error', message: error.message }
      }));
    }

    // Get dashboard stats
    try {
      const dashboardStats = await apiService.getDashboardStats();
      setStats(dashboardStats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const testUpload = async (file) => {
    setChecks(prev => ({
      ...prev,
      upload: { status: 'loading', message: 'Uploading...' }
    }));

    try {
      const result = await apiService.uploadImage(file);
      setChecks(prev => ({
        ...prev,
        upload: { status: 'success', message: 'Upload successful', data: result }
      }));
    } catch (error) {
      setChecks(prev => ({
        ...prev,
        upload: { status: 'error', message: error.message }
      }));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <span className="text-green-500">✓</span>;
      case 'error': return <span className="text-red-500">✗</span>;
      case 'loading': return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>;
      default: return <span className="text-gray-400">○</span>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'loading': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={runAllChecks}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh Checks
        </button>
      </div>
      
      {/* System Status */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(checks).map(([key, check]) => (
            <div key={key} className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                {getStatusIcon(check.status)}
                <span className="ml-2 font-medium capitalize">{key}</span>
              </div>
              <p className={`text-sm ${getStatusColor(check.status)}`}>
                {check.message}
              </p>
              {check.data && (
                <div className="mt-2 text-xs text-gray-500">
                  {key === 'cloudinary' && (
                    <div>
                      <p>Cloud: {check.data.config?.cloud_name}</p>
                      <p>API Key: {check.data.config?.api_key}</p>
                    </div>
                  )}
                  {key === 'upload' && (
                    <p>URL: {check.data.imageUrl}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalProducts || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalOrders || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Total Categories</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.totalCategories || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-yellow-600">₹{stats.totalRevenue || 0}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
              📦 Manage Products
            </button>
            <button className="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
              📂 Manage Categories
            </button>
            <button className="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
              🛒 View Orders
            </button>
            <button className="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
              📊 View Analytics
            </button>
          </div>
        </div>

        {/* Upload Test */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Test Image Upload</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) testUpload(file);
            }}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <div className={`p-3 rounded ${getStatusColor(checks.upload.status)} bg-gray-50`}>
            <div className="flex items-center">
              {getStatusIcon(checks.upload.status)}
              <span className="ml-2">{checks.upload.message}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;