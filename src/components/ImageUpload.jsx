import React, { useState, useRef } from 'react';
import uploadService from '../services/uploadService';

const ImageUpload = ({ 
  onUploadSuccess, 
  onUploadError, 
  multiple = false, 
  maxFiles = 5,
  className = "",
  children,
  showTestButton = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [testing, setTesting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      // Validate files
      Array.from(files).forEach(file => {
        uploadService.validateImage(file);
      });

      let result;
      if (multiple && files.length > 1) {
        result = await uploadService.uploadMultipleImages(files);
      } else {
        result = await uploadService.uploadImage(files[0]);
      }

      onUploadSuccess?.(result);
    } catch (error) {
      onUploadError?.(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files).slice(0, multiple ? maxFiles : 1);
      handleFiles(fileArray);
    }
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const testCloudinary = async () => {
    setTesting(true);
    try {
      const result = await uploadService.testCloudinary();
      alert('Cloudinary connection successful!');
      console.log('Test result:', result);
    } catch (error) {
      alert(`Cloudinary test failed: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!uploading ? openFileDialog : undefined}
      >
        {uploading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">Uploading...</span>
          </div>
        ) : children ? (
          children
        ) : (
          <div>
            <div className="text-4xl mb-2">📁</div>
            <p className="text-gray-600 mb-2">
              {multiple ? 'Drop images here or click to select' : 'Drop image here or click to select'}
            </p>
            <p className="text-sm text-gray-400">
              Supports: JPEG, PNG, GIF, WebP (Max: 10MB)
            </p>
          </div>
        )}
      </div>
      
      {showTestButton && (
        <button
          type="button"
          onClick={testCloudinary}
          disabled={testing}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {testing ? 'Testing...' : 'Test Cloudinary'}
        </button>
      )}
    </div>
  );
};

export default ImageUpload;