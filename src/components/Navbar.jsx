import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menDropdownOpen, setMenDropdownOpen] = useState(false);
  const [womenDropdownOpen, setWomenDropdownOpen] = useState(false);
  const location = useLocation();

  // Close dropdowns when navigating
  useEffect(() => {
    setMenDropdownOpen(false);
    setWomenDropdownOpen(false);
    setIsOpen(false);
  }, [location]);

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const logoVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12
      }
    }
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: "100%" },
    hover: { width: "100%" }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      height: 0,
      transition: { 
        duration: 0.2,
        ease: "easeIn" 
      } 
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.3
      } 
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.3
      } 
    }
  };

  // Button hover effect
  const buttonHover = {
    rest: { scale: 1, backgroundColor: "#000" },
    hover: {
      scale: 1.05,
      backgroundColor: "#333",
      transition: {
        duration: 0.3,
        type: "tween",
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.nav
      className="relative bg-white shadow-sm z-50"
      initial="hidden"
      animate="visible"
      variants={containerVariant}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            variants={logoVariant}
          >
            <Link to="/" className="text-decoration-none">
              <motion.h1
                className="text-2xl font-bold m-0 relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                  Chrono
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-black"
                  initial="hidden"
                  animate="visible"
                  variants={underlineVariants}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </motion.h1>
            </Link>
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            {/* Home */}
            <motion.div
              className="relative mx-4"
              variants={navItemVariants}
              whileHover="hover"
            >
              <Link 
                to="/" 
                className="text-gray-600 no-underline transition-colors duration-300 hover:text-black"
              >
                Home
              </Link>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                initial="hidden"
                variants={underlineVariants}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            {/* Men's Dropdown */}
            <motion.div
              className="relative mx-4"
              variants={navItemVariants}
              onHoverStart={() => setMenDropdownOpen(true)}
              onHoverEnd={() => setMenDropdownOpen(false)}
            >
              <button 
                className="text-gray-600 transition-colors duration-300 hover:text-black focus:outline-none flex items-center"
                onClick={() => setMenDropdownOpen(!menDropdownOpen)}
              >
                Men
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <AnimatePresence>
                {menDropdownOpen && (
                  <motion.div
                    className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-1 py-2 w-48 z-20"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link 
                      to="/men/leather" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Leather
                    </Link>
                    <Link 
                      to="/men/stainless-steel" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Stainless Steel
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Women's Dropdown */}
            <motion.div
              className="relative mx-4"
              variants={navItemVariants}
              onHoverStart={() => setWomenDropdownOpen(true)}
              onHoverEnd={() => setWomenDropdownOpen(false)}
            >
              <button 
                className="text-gray-600 transition-colors duration-300 hover:text-black focus:outline-none flex items-center"
                onClick={() => setWomenDropdownOpen(!womenDropdownOpen)}
              >
                Women
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <AnimatePresence>
                {womenDropdownOpen && (
                  <motion.div
                    className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-1 py-2 w-48 z-20"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link 
                      to="/women/leather" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Leather
                    </Link>
                    <Link 
                      to="/women/stainless-steel" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Stainless Steel
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Shop Button */}
            <motion.div
              variants={navItemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/shop" 
                className="ml-4 px-5 py-2 bg-black text-white no-underline rounded-md inline-block"
              >
                <motion.span variants={buttonHover}>Shop</motion.span>
              </Link>
            </motion.div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              variants={navItemVariants}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              >
                Home
              </Link>
              
              {/* Mobile Men's Dropdown */}
              <div>
                <button 
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 focus:outline-none flex justify-between items-center"
                  onClick={() => setMenDropdownOpen(!menDropdownOpen)}
                >
                  <span>Men</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${menDropdownOpen ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                <AnimatePresence>
                  {menDropdownOpen && (
                    <motion.div
                      className="pl-4"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link 
                        to="/men/leather" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50"
                      >
                        Leather
                      </Link>
                      <Link 
                        to="/men/stainless-steel" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50"
                      >
                        Stainless Steel
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Mobile Women's Dropdown */}
              <div>
                <button 
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 focus:outline-none flex justify-between items-center"
                  onClick={() => setWomenDropdownOpen(!womenDropdownOpen)}
                >
                  <span>Women</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${womenDropdownOpen ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                <AnimatePresence>
                  {womenDropdownOpen && (
                    <motion.div
                      className="pl-4"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link 
                        to="/women/leather" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50"
                      >
                        Leather
                      </Link>
                      <Link 
                        to="/women/stainless-steel" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50"
                      >
                        Stainless Steel
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link 
                to="/shop" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-black hover:bg-gray-800"
              >
                Shop
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;