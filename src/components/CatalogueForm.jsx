import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import apiService from '../services/api';

const CatalogueForm = ({ catalogue = null, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    category: catalogue?.category || '',
    catalogueNumber: catalogue?.catalogueNumber || '',
    imageUrl: catalogue?.imageUrl || '',
    imagePublicId: catalogue?.imagePublicId || '',
    description: catalogue?.description || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (result) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: result.imageUrl,
      imagePublicId: result.publicId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (catalogue) {
        await apiService.updateCatalogueImage(catalogue.category, formData);
      } else {
        await apiService.createCatalogueCategory(formData);
      }

      onSuccess?.();
    } catch (err) {
      setError(err.message || 'Failed to save catalogue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        {catalogue ? 'Edit Catalogue Category' : 'Add New Catalogue Category'}
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name *
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            disabled={!!catalogue} // Disable editing category name for existing catalogues
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="e.g., Marble, Granite, Ceramic"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catalogue Number *
          </label>
          <input
            type="text"
            name="catalogueNumber"
            value={formData.catalogueNumber}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., CAT-001, MAR-2024"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description of the category"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Image *
          </label>
          {formData.imageUrl && (
            <div className="mb-4">
              <img 
                src={formData.imageUrl} 
                alt="Category" 
                className="w-48 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
          <ImageUpload
            onUploadSuccess={handleImageUpload}
            onUploadError={setError}
          >
            <div>
              <div className="text-4xl mb-2">🏗️</div>
              <p className="text-gray-600">Upload category showcase image</p>
              <p className="text-sm text-gray-400 mt-1">
                This image will represent the category in the catalogue
              </p>
            </div>
          </ImageUpload>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !formData.imageUrl}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (catalogue ? 'Update Category' : 'Create Category')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CatalogueForm;