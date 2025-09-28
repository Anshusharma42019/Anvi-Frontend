const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AdminAPI {
  // Upload single image
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Upload multiple images
  async uploadMultipleImages(files) {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Multiple upload failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Upload file (profile images)
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload/upload-file`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`File upload failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Download file by public ID
  async downloadFile(publicId) {
    const response = await fetch(`${API_BASE_URL}/upload/download-file/${publicId}`);

    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Delete image
  async deleteImage(publicId) {
    const response = await fetch(`${API_BASE_URL}/upload/${publicId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Test endpoints
  async testUploadEndpoint() {
    const response = await fetch(`${API_BASE_URL}/upload/test`);
    return response.json();
  }

  async testCloudinaryConnection() {
    const response = await fetch(`${API_BASE_URL}/upload/test-cloudinary`);
    return response.json();
  }
}

export default new AdminAPI();