import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import MainHome from '../assets/MainHome.jpg';

// Import watch images
import CartierImage from "../assets/Cartier.jfif";
import DiscoverTopWatches from "../assets/watchChain.jfif";
import IWCSchaffhausen from "../assets/second.jfif";
import LuxuryWatches from "../assets/Luxury Watches.jfif";
import SpeedmasterMoonwatch from "../assets/Speedmaster.jpg";
import UltraMinimalist from "../assets/IWC Schaffhausen Takes Off at SIHH.jpg";

const HomePage = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // New particle animation for banner
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
};

  return (
    <div className="homepage overflow-x-hidden">
      <Navbar />
      
      <div className="relative w-full h-[550px] overflow-hidden">
        {/* Background image with parallax effect */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: -20 }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 8, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 scale-110"
        >
          <img 
            src={LuxuryWatches} 
            alt="Luxury Watch Collection" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Dark overlay with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        
        {/* Decorative watch gear elements */}
        <div className="absolute inset-0">
          <motion.svg 
            className="absolute right-10 top-10 w-32 h-32 text-yellow-300/20"
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
          >
            <motion.circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" variants={draw} />
            <motion.circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" variants={draw} />
            <motion.circle cx="50" cy="50" r="5" stroke="currentColor" strokeWidth="0.5" fill="none" variants={draw} />
            {[...Array(12)].map((_, i) => (
              <motion.line 
                key={i}
                x1="50"
                y1="15"
                x2="50"
                y2="10"
                stroke="currentColor"
                strokeWidth="0.5"
                transform={`rotate(${i * 30} 50 50)`}
                variants={draw}
              />
            ))}
          </motion.svg>
          
          <motion.svg 
            className="absolute left-10 bottom-10 w-40 h-40 text-yellow-300/20"
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
          >
            <motion.circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" variants={draw} />
            <motion.circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" variants={draw} />
            <motion.circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" fill="none" variants={draw} />
          </motion.svg>
        </div>
        
        {/* Main content container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-4xl relative z-10"
          >
            {/* Animated decorator lines */}
            <motion.div 
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-px h-0 bg-yellow-400"
              initial={{ height: 0 }}
              animate={{ height: "40px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            
            {/* Main heading */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-2"
            >
              <span className="text-sm text-yellow-400 tracking-[0.3em] uppercase">Precision • Elegance • Heritage</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-serif font-bold text-white mb-2 tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              WATCHES <span className="text-yellow-400 italic">BY</span> MAK
            </motion.h1>
            
            {/* Animated separator */}
            <div className="relative h-8 mb-6">
              <motion.div 
                className="absolute left-1/4 right-1/4 top-1/2 h-[1px] bg-white/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
              <motion.div 
                className="absolute left-1/3 right-1/3 top-1/2 h-[1px] bg-yellow-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              />
            </div>
            
            {/* Captivating tagline */}
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              "Beyond keeping time, our watches tell your story."
            </motion.p>
            
            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="space-x-6"
            >
              <motion.button
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(252, 211, 77, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Collection
              </motion.button>
              
              <motion.button
                className="border border-white/30 text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Our Story
              </motion.button>
            </motion.div>
            
            {/* Establishment year */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex items-center">
                <div className="h-px w-8 bg-yellow-400/50"></div>
                <span className="text-yellow-400/80 text-sm tracking-widest uppercase px-3">Est. 2020</span>
                <div className="h-px w-8 bg-yellow-400/50"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-2">
          <motion.div
            className="w-full md:w-1/2 text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
          >
            <img 
              src={MainHome} 
              alt="Luxury Gold Watch" 
              className="max-w-full h-auto rounded-lg shadow-lg" 
            />
          </motion.div>
          
          <motion.div
            className="w-full md:w-1/2 bg-gray-100 p-8 md:p-12 rounded-lg"
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
          >
            <p className="text-gray-600 mb-3">Discover Our Exquisite Watch Collection</p>
            <h2 className="font-serif italic text-4xl mb-5">Timeless Elegance:</h2>
            <p className="mb-8 leading-relaxed">
              Explore the perfect blend of innovative design, superior craftsmanship, 
              and unparalleled functionality in our premium watch collection. Discover 
              timepieces that not only keep you punctual but also elevate your style.
            </p>
            <motion.button 
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Our Watches
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Second Section */}
      <section className="my-6 px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 bg-gray-100 p-8 md:p-12 rounded-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
          >
            <p className="text-gray-600 mb-3">Explore Our Watches</p>
            <h2 className="font-serif italic text-4xl mb-5">Elevate Your Wrist with Our Exclusive</h2>
            <p className="mb-8 leading-relaxed">
              Discover a symphony of horological artistry and modern sophistication 
              in our curated collection of premium watches.
            </p>
            <motion.button 
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 pl-0 md:pl-6 mt-6 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
          >
            <img 
              src={IWCSchaffhausen} 
              alt="Luxury IWC Schaffhausen Watch" 
              className="max-w-full h-auto rounded-lg shadow-lg" 
            />
          </motion.div>
        </div>
      </section>

      {/* Collection Section - FIXED */}
      <section className="my-16 py-16 bg-gray-50">
        <h2 className="text-center font-serif italic text-3xl mb-12">
          Crafted for the Connoisseur
        </h2>
        
        <div className="flex flex-col md:flex-row justify-between gap-6 px-6 md:px-12">
          {/* Card 1 */}
          <div className="flex-1 bg-gray-100 p-6 text-center rounded-lg">
            <div className="mb-5">
              <img 
                src={CartierImage} 
                alt="Cartier Excellence" 
                className="w-full h-auto rounded-lg object-cover" 
              />
            </div>
            <h3 className="text-lg font-medium mb-3">Cartier Excellence</h3>
            <p className="text-sm text-gray-600 mb-5">
              Timeless Sophistication Meets Innovative Design. Discover Our Premium Watch Collection
            </p>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
              Shop Now
            </button>
            <p className="text-xs text-gray-500 mt-3">Exceptional Timepieces</p>
          </div>
          
          {/* Card 2 */}
          <div className="flex-1 bg-gray-100 p-6 text-center rounded-lg">
            <div className="mb-5">
              <img 
                src={UltraMinimalist} 
                alt="Minimalist Design" 
                className="w-full h-auto rounded-lg object-cover" 
              />
            </div>
            <h3 className="text-lg font-medium mb-3">Minimalist Design</h3>
            <p className="text-sm text-gray-600 mb-5">
              Elegance Redefined. Explore Our Stunning Collection of Ultra Minimalist Watches
            </p>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
              Shop Now
            </button>
            <p className="text-xs text-gray-500 mt-3">Sophisticated Style</p>
          </div>
          
          {/* Card 3 */}
          <div className="flex-1 bg-gray-100 p-6 text-center rounded-lg">
            <div className="mb-5">
              <img 
                src={SpeedmasterMoonwatch} 
                alt="OMEGA Precision" 
                className="w-full h-auto rounded-lg object-cover" 
              />
            </div>
            <h3 className="text-lg font-medium mb-3">OMEGA Precision</h3>
            <p className="text-sm text-gray-600 mb-5">
              Elevate Your Wrist with Our Meticulously Crafted Speedmaster Moonwatch Collection
            </p>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
              Shop Now
            </button>
            <p className="text-xs text-gray-500 mt-3">Precision Timekeeping</p>
          </div>
        </div>
      </section>

      {/* Luxury Section */}
      <section className="my-16 px-6 md:px-12">
        <div className="flex flex-col md:flex-row mb-16">
          <div className="w-full md:w-1/2 bg-gray-100 p-8 md:p-12 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Exceptional Timepieces</p>
            <h2 className="font-serif italic text-3xl mb-5">Luxury Watches for the Discerning</h2>
            <p className="text-sm text-gray-600 mb-6">
              Indulge in the pinnacle of horology with our exquisite timepieces, where the 
              artisan's precision has transformed function to art.
            </p>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
              Shop Now
            </button>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-6 mt-6 md:mt-0">
            <img 
              src={LuxuryWatches} 
              alt="Luxury Watch Collection" 
              className="max-w-full h-auto rounded-lg shadow-lg" 
            />
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-1/2 pr-0 md:pr-6 mt-6 md:mt-0">
            <img 
              src={DiscoverTopWatches} 
              alt="Men's Luxury Watch Collection" 
              className="max-w-full h-auto rounded-lg shadow-lg" 
            />
          </div>
          <div className="w-full md:w-1/2 bg-gray-100 p-8 md:p-12 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Refined Sophistication</p>
            <h2 className="font-serif italic text-3xl mb-5">Timeless Sophistication for the Modern Era</h2>
            <p className="text-sm text-gray-600 mb-6">
              Elevate your style and experience the epitome of luxury with our finely curated collection 
              of premium watches. Crafted with precision for discerning tastes.
            </p>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
              Discover More
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;