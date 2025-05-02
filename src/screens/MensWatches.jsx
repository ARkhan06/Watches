import React from 'react';
import { useParams } from 'react-router-dom';
import WatchList from '../components/WatchList';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const MensWatches = () => {
  // Get the category from URL parameters
  const { category } = useParams();
  const gender = 'men'; // Explicitly set gender for men's page
  
  // Normalize category for consistent comparison
  const normalizedCategory = category ? category.toLowerCase() : null;
  
  // Title formatting based on category
  let pageTitle = "Men's Watches";
  let pageDescription = "Browse our exclusive collection of men's watches, crafted with precision and designed for distinction.";
  
  if (normalizedCategory === 'Leather') {
    pageTitle = "Men's Leather Watches";
    pageDescription = "Discover our premium collection of leather men's watches, combining classic elegance with contemporary design.";
  } else if (normalizedCategory === 'Stainless-steel') {
    pageTitle = "Men's Stainless Steel Watches"; 
    pageDescription = "Explore our durable and stylish stainless steel men's watches, perfect for everyday wear and special occasions.";
  }
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.2,
        type: "spring",
        stiffness: 200
      }
    }
  };
  
  const descriptionVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        delay: 0.4
      }
    }
  };
  
  console.log('MensWatches - Received category:', category);
  console.log('MensWatches - Normalized category:', normalizedCategory);
  
  return (
    <>
    <Navbar/>
    <motion.div 
      className="container mx-auto px-4 "
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      
      
      {/* Pass normalized category and gender to WatchList */}
      <WatchList category={normalizedCategory} gender={gender} />
    </motion.div>
    </>
  );
};

export default MensWatches;