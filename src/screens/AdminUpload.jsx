import React, { useState } from 'react';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:3000/api';

const WatchForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    gender: 'men',
    category: '',
    stock: 1,
    price: '',
    on_sale: false
  });
  
  // Image state
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Form status
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setMessage({ 
          text: 'Only JPG, PNG and WebP images are allowed', 
          type: 'error' 
        });
        return;
      }
      
      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setMessage({ 
          text: 'File too large. Maximum size is 5MB', 
          type: 'error' 
        });
        return;
      }
      
      setImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear any previous error messages
      setMessage({ text: '', type: '' });
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.category || !formData.price || !image) {
      setMessage({ 
        text: 'Please fill all required fields and upload an image', 
        type: 'error' 
      });
      return;
    }
    
    setLoading(true);
    setUploadProgress(0);
    
    try {
      // Create form data object for file upload
      const data = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      
      // Add image file
      data.append('image', image);
      
      // Use XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();
      
      // Set up progress tracking
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      });
      
      // Create a promise to wrap the XHR request
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.open('POST', `${API_URL}/watches`);
        
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (error) {
              reject(new Error('Invalid JSON response'));
            }
          } else {
            try {
              const errorData = JSON.parse(xhr.responseText);
              reject(new Error(errorData.error || errorData.details || `Error: ${xhr.status}`));
            } catch (error) {
              reject(new Error(`Error: ${xhr.status}`));
            }
          }
        };
        
        xhr.onerror = function() {
          reject(new Error('Network error occurred'));
        };
        
        xhr.send(data);
      });
      
      // Wait for upload to complete
      const result = await uploadPromise;
      
      // Handle success
      setMessage({ 
        text: 'Watch added successfully! Image uploaded to Cloudinary.', 
        type: 'success' 
      });
      
      // Reset form
      setFormData({
        name: '',
        gender: 'men',
        category: '',
        stock: 1,
        price: '',
        on_sale: false
      });
      setImage(null);
      setImagePreview(null);
      setUploadProgress(0);
      
      // Reset form inputs
      document.getElementById('watch-form').reset();
      
      console.log('Watch added with Cloudinary image:', result);
    } catch (error) {
      console.error('Error adding watch:', error);
      
      setMessage({ 
        text: error.message || 'Failed to add watch', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div 
      className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mb-10"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <motion.h2 
        className="text-2xl font-semibold text-center text-gray-800 mb-8"
        variants={itemVariants}
      >
        Add New Watch
      </motion.h2>
      
      {message.text && (
        <motion.div 
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'error' 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message.text}
        </motion.div>
      )}
      
      <motion.form 
        id="watch-form" 
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Watch Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter watch name"
            disabled={loading}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100"
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <label 
              htmlFor="gender" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors disabled:bg-gray-100"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label 
              htmlFor="category" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Luxury, Sport, Casual"
              disabled={loading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100"
            />
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <label 
              htmlFor="stock" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              disabled={loading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label 
              htmlFor="price" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              disabled={loading}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100"
            />
          </motion.div>
        </div>
        
        <motion.div 
          className="flex items-center"
          variants={itemVariants}
        >
          <input
            type="checkbox"
            id="on_sale"
            name="on_sale"
            checked={formData.on_sale}
            onChange={handleChange}
            disabled={loading}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
          />
          <label 
            htmlFor="on_sale" 
            className="text-sm font-medium text-gray-700"
          >
            On Sale
          </label>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <label 
            htmlFor="image" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Watch Image <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500 ml-2">(Uploads to Cloudinary - WatchesByMak folder)</span>
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-1 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG, WebP (MAX. 5MB)
                </p>
              </div>
              <input
                id="image"
                type="file"
                className="hidden"
                accept="image/jpeg, image/png, image/jpg, image/webp"
                onChange={handleImageChange}
                disabled={loading}
                required
              />
            </label>
          </div>
        </motion.div>
        
        {imagePreview && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={imagePreview} 
                alt="Watch preview" 
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        )}
        
        {loading && uploadProgress > 0 && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-gray-700">Uploading to Cloudinary...</p>
              <p className="text-sm font-medium text-blue-600">{uploadProgress}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </motion.div>
        )}
        
        <motion.div variants={itemVariants} className="pt-4">
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
              loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading to Cloudinary...
              </div>
            ) : (
              'Add Watch'
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default WatchForm;