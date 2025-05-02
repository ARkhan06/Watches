import React from 'react';
import { useParams } from 'react-router-dom';
import WatchList from '../components/WatchList';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const WomensWatches = () => {
  // Get the category from URL parameters
  const { category } = useParams();
  const gender = 'women'; // Explicitly set gender for women's page
  
  // Title formatting based on category
  let pageTitle = "Women's Watches";
  let pageDescription = "Discover our elegant collection of women's watches, designed with sophistication and style in mind.";
  
  if (category === 'leather') {
    pageTitle = "Women's Leather Watches";
    pageDescription = "Browse our luxurious selection of leather women's watches, where timeless design meets modern elegance.";
  } else if (category === 'stainless-steel') {
    pageTitle = "Women's Stainless Steel Watches"; 
    pageDescription = "Explore our premium stainless steel women's watches, crafted for durability without compromising on style.";
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
  
  return (
    <>
    <Navbar/>
    <motion.div 
      className="container mx-auto px-4"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
     
      
      {/* Pass both category and gender to the WatchList component */}
      <WatchList category={category} gender={gender} />
    </motion.div>
    </>
  );
};

export default WomensWatches;