import apiService from './api';

class UploadService {
  // Test Cloudinary connection
  async testCloudinary() {
    try {
      const response = await fetch(`${apiService.baseURL}/upload/test-cloudinary`);
      
      if (!response.ok) {
        throw new Error('Test failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Cloudinary test error:', error);
      throw error;
    }
  }

  // Upload single image
  async uploadImage(file) {
    try {
      console.log('Starting upload for file:', file.name, 'Size:', file.size);
      
      const formData = new FormData();
      formData.append('image', file);

      console.log('Sending request to:', `${apiService.baseURL}/upload`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);
      
      const response = await fetch(`${apiService.baseURL}/upload`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed with status:', response.status, 'Error:', errorText);
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Upload successful:', result);
      return result;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Upload timeout - please try again');
      }
      console.error('Upload error:', error);
      throw error;
    }
  }

  // Upload multiple images
  async uploadMultipleImages(files) {
    try {
      const formData = new FormData();
      
      Array.from(files).forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch(`${apiService.baseURL}/upload/multiple`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  // Delete image
  async deleteImage(publicId) {
    try {
      const response = await fetch(`${apiService.baseURL}/upload/${publicId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }

  // Validate image file
  validateImage(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
    }

    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 10MB.');
    }

    return true;
  }

  // Preview image before upload
  previewImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

const uploadService = new UploadService();
export default uploadService;