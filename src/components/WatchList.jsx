import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Update these URLs to match your actual server address
const API_URL = 'http://localhost:3000/api'; // Make sure this is your actual backend API URL

// Fallback image (embedded base64 image to ensure it always works)
const FALLBACK_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=";

const WatchList = ({ category, gender }) => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch watches when component mounts or filters change
    const fetchWatches = async () => {
      try {
        setLoading(true);
        
        // Build query parameters for filtering
        let url = `${API_URL}/watches`;
        const queryParams = [];
        
        // Format category with proper capitalization for the database
        if (category) {
          // Convert category to proper case format based on database structure
          let formattedCategory = '';
          
          if (category.toLowerCase() === 'leather') {
            formattedCategory = 'Leather';
          } else if (category.toLowerCase() === 'stainless-steel') {
            formattedCategory = 'stainless-steel';
          }
          
          queryParams.push(`category=${encodeURIComponent(formattedCategory)}`);
        }
        
        // Keep gender as lowercase
        if (gender) {
          queryParams.push(`gender=${encodeURIComponent(gender)}`);
        }
        
        if (queryParams.length > 0) {
          url += `?${queryParams.join('&')}`;
        }
        
        console.log('WatchList - Fetching watches from:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setWatches(data);
        setError('');
      } catch (err) {
        console.error('Error fetching watches:', err);
        setError('Failed to load watches. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWatches();
  }, [category, gender]);

  // Format price as currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Format text for display
  const formatText = (text) => {
    if (!text) return '';
    
    // Handle hyphenated text
    if (text.includes('-')) {
      return text.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading watches...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center">
        <svg className="w-10 h-10 mx-auto text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state - customize message based on filters
  if (watches.length === 0) {
    let messageText = "No watches found";
    
    if (category && gender) {
      messageText = `No ${formatText(category)} watches found for ${formatText(gender)}`;
    } else if (gender) {
      messageText = `No ${formatText(gender)}'s watches found`;
    }
    
    return (
      <div className="bg-gray-50 border border-gray-200 p-10 rounded-lg text-center">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="text-xl text-gray-600 font-medium">{messageText}</p>
        <p className="text-gray-500 mt-2">
          Try changing your filters or check back later for new arrivals.
        </p>
      </div>
    );
  }

  // Watches grid
  return (
    <motion.div
      className="py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {watches.map(watch => {
          // Use the Cloudinary image_url directly, with fallback options
          const imageUrl = watch.image_url || 
                          (watch.image_name ? `/images/${watch.image_name}` : FALLBACK_IMAGE);
          
          return (
            <motion.div
              key={watch.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="relative overflow-hidden">
                {/* Image container with fixed aspect ratio */}
                <div className="relative pt-[90%]">
                  <img
                    src={imageUrl}
                    alt={watch.name}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      console.log('Image failed to load:', e.target.src);
                      e.target.src = FALLBACK_IMAGE;
                    }}
                  />
                  {/* Glass effect metadata overlay on hover */}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full bg-black bg-opacity-0 group-hover:bg-opacity-40 p-3 transform translate-y-full group-hover:translate-y-0 transition-all duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white text-xs font-medium px-2 py-1 rounded bg-black bg-opacity-40 backdrop-blur-sm">
                        {watch.category}
                      </span>
                      <span className="text-white text-xs font-medium px-2 py-1 rounded bg-black bg-opacity-40 backdrop-blur-sm capitalize">
                        {watch.gender}
                      </span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Sale badge */}
                {watch.on_sale && (
                  <div className="absolute top-3 right-3">
                    <motion.div
                      className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                    >
                      SALE
                    </motion.div>
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 truncate group-hover:text-indigo-600 transition-colors">
                    {watch.name}
                  </h3>
                  
                  <div className="text-xl font-bold text-gray-900 mb-2">
                    {formatPrice(watch.price)}
                  </div>
                  
                  <div className="mb-3 flex items-center gap-2">
                    {watch.stock > 0 ? (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full inline-flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        In Stock
                      </span>
                    ) : (
                      <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full inline-flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
                
                <motion.button 
                  className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default WatchList;