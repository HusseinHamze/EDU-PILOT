import { Link } from 'react-router-dom';
import { Plane } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

function HomeHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') { 
        const currentScrollY = window.scrollY;
        
        // Always show navbar when scrolling to top
        if (currentScrollY === 0) {
          setShowNavbar(true);
          return;
        }
        
        // Hide navbar when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY) { // Scrolling down
          setShowNavbar(false);
        } else { // Scrolling up
          setShowNavbar(true);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ 
        y: showNavbar ? 0 : -80, 
        opacity: showNavbar ? 1 : 0 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full z-50 bg-[#0E1C36]/80 dark:bg-[#AFCBFF]/80 backdrop-blur-sm fixed top-0 left-0 flex justify-between items-center p-4 md:p-6 text-white border-b border-[#0E1C36] shadow-sm"
    >
      {/* Logo */}
      <Link to="/Home" className="text-2xl md:text-3xl font-bold flex items-center gap-2">
        <Plane className="w-6 h-6 md:w-8 md:h-8 text-white" />
        <span>Edu-Pilot</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-4 lg:space-x-6 text-base lg:text-[18px]">
        {["Home", "ChatBot", "Assessment", "About"].map((text, index) => (
          <Link
            key={index}
            to={`/${text}`}
            className="relative group overflow-hidden pb-1 px-1 transition-all duration-300 ease-in-out hover:text-[#AFCBFF] dark:hover:text-[#142c5e] hover:font-bold"
          >
            {text}
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AFCBFF] dark:bg-[#142c5e] transform origin-center scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
        ))}
      </nav>

      {/* Login Button - Desktop */}
      <Link
        to="/Login"
        className="hidden md:flex relative h-10 px-4 items-center justify-center rounded-lg overflow-hidden bg-[#AFCBFF] dark:bg-[#0E1C36] font-medium text-[#0E1C36] dark:text-white shadow-md transition-all duration-300 hover:bg-[#142c5e] hover:text-[#AFCBFF] border border-transparent hover:border-[#AFCBFF]"
      >
        <span className="relative z-10">Login</span>
      </Link>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 rounded-md focus:outline-none cursor-pointer hover:bg-[#AFCBFF]/20 dark:hover:bg-[#0E1C36]/20 transition-all duration-300"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-full left-0 right-0 bg-[#0E1C36]/80 dark:bg-[#AFCBFF]/80 shadow-lg py-4 px-6 space-y-4 border-t border-gray-100"
        >
          {["Home", "ChatBot", "Majors","Assessment", "About"].map((text, index) => (
            <Link
              key={index}
              to={`/${text}`}
              className="block py-2 text-lg font-medium hover:text-[#AFCBFF] hover:bg-[#AFCBFF]/20 dark:hover:text-[#142c5e] dark:hover:bg-[#0E1C36]/20 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {text}
            </Link>
          ))}
          <Link
            to="/Login"
            className="block mt-4 py-2 px-4 text-center rounded-lg bg-[#AFCBFF] dark:bg-[#0E1C36] text-[#0E1C36] dark:text-white font-medium shadow-md transition-colors hover:bg-[#142c5e] hover:text-[#AFCBFF]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Login
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}

export default HomeHeader;