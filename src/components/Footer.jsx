import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const linkVariants = {
    initial: { x: 0 },
    hover: { 
      x: 5, 
      color: "#000",
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const socialIconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.15,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 pt-16 pb-8 mt-16 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-300 to-gray-100" 
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="flex flex-wrap justify-between mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="mb-8 md:mb-0 w-full md:w-1/4"
            variants={itemVariant}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500">Chrono</h3>
              <motion.div 
                className="h-0.5 w-16 bg-gradient-to-r from-gray-800 to-gray-400"
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </motion.div>
            <p className="text-sm text-gray-600 mb-4">
              Crafting timepieces that blend heritage with innovation. Discover watches that tell more than just time.
            </p>
            <div className="flex space-x-4 mt-6">
              {[
                { icon: "ri-facebook-fill", color: "hover:bg-blue-500" },
                { icon: "ri-instagram-line", color: "hover:bg-pink-500" },
                { icon: "ri-twitter-fill", color: "hover:bg-blue-400" },
                { icon: "ri-pinterest-fill", color: "hover:bg-red-500" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`w-8 h-8 rounded-full bg-gray-200 ${social.color} hover:text-white flex items-center justify-center transition-colors duration-300`}
                  variants={socialIconVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <div className="flex flex-wrap w-full md:w-3/4 lg:w-2/3 justify-between">
            <motion.div 
              className="w-1/2 sm:w-1/3 mb-8"
              variants={itemVariant}
            >
              <h4 className="text-base font-semibold mb-4 relative inline-block">
                Shop Links
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </h4>
              <ul className="space-y-2">
                {['Luxury Watches', 'Collections', 'New Arrivals', 'Limited Editions'].map(item => (
                  <li key={item}>
                    <motion.a
                      href={`/${item.toLowerCase().replace(' ', '-')}`} 
                      className="text-sm text-gray-600 hover:text-black transition-colors duration-300 flex items-center"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <motion.span className="mr-1 opacity-0 hover:opacity-100">→</motion.span> {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              className="w-1/2 sm:w-1/3 mb-8"
              variants={itemVariant}
            >
              <h4 className="text-base font-semibold mb-4 relative inline-block">
                Support
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  viewport={{ once: true }}
                />
              </h4>
              <ul className="space-y-2">
                {['FAQ', 'Shipping & Delivery', 'Returns', 'Warranty & Service'].map(item => (
                  <li key={item}>
                    <motion.a
                      href={`/${item.toLowerCase().replace(/[\s&]/g, '-')}`} 
                      className="text-sm text-gray-600 hover:text-black transition-colors duration-300 flex items-center"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <motion.span className="mr-1 opacity-0 hover:opacity-100">→</motion.span> {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              className="w-1/2 sm:w-1/3 mb-8"
              variants={itemVariant}
            >
              <h4 className="text-base font-semibold mb-4 relative inline-block">
                Company
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  viewport={{ once: true }}
                />
              </h4>
              <ul className="space-y-2">
                {['About Our Heritage', 'Our Craftsmanship', 'Blog & News', 'Press Room'].map(item => (
                  <li key={item}>
                    <motion.a
                      href={`/${item.toLowerCase().replace(/[\s&]/g, '-')}`} 
                      className="text-sm text-gray-600 hover:text-black transition-colors duration-300 flex items-center"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <motion.span className="mr-1 opacity-0 hover:opacity-100">→</motion.span> {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500 mb-4 md:mb-0">© 2025 Chrono Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(item => (
              <motion.a
                key={item}
                href={`/${item.toLowerCase().replace(/\s/g, '-')}`}
                className="text-xs text-gray-500 hover:text-gray-800 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Newsletter subscription - floating section */}
      <motion.div 
        className="absolute right-8 top-16 bg-white p-6 rounded-lg shadow-md max-w-xs hidden lg:block"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.4
        }}
        viewport={{ once: true }}
      >
        <h4 className="text-sm font-bold mb-3">Stay Updated</h4>
        <p className="text-xs text-gray-600 mb-4">Subscribe to receive news about limited collections and exclusive offers.</p>
        <div className="flex">
          <input 
            type="email" 
            placeholder="Your email" 
            className="text-sm px-3 py-2 border border-gray-300 rounded-l-md flex-grow focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <motion.button 
            className="bg-gray-900 text-white text-sm px-4 py-2 rounded-r-md"
            whileHover={{ backgroundColor: "#333" }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;