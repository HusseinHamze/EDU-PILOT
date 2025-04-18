import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import React from "react";

export default function Footer() {
  const containerVariants = {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.footer 
      className="bg-[#0E1C36] text-white py-10 px-8 mt-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Brand Section */}
        <motion.div variants={itemVariants}>
          <motion.div 
            className="text-3xl font-bold flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Plane className="w-8 h-8 text-white" />
            <span>Edu-Pilot</span>
          </motion.div>
          <motion.p 
            className="text-sm text-gray-300"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Empowering students to make confident academic decisions.


          </motion.p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants}>
          <motion.h4 
            className="text-lg font-semibold mb-2"
            whileHover={{ scale: 1.02 }}
          >

            Quick Links
          </motion.h4>
          <motion.ul className="space-y-1 text-sm text-gray-300">
            {[
              {name: 'Home', id: 'hero'},
              {name: 'How It Works', id: 'hiw'},
              {name: 'Features', id: 'features'},
              {name: 'FAQs', id: 'faqs'},
              {name: 'Testimonials', id: 'testimonials'}
            ].map((link, index) => (
              <motion.li
                key={index}
                whileHover={{
                  x: 5,
                  color: "#ffffff"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                 {/* Using an anchor tag for smooth scrolling to specific sections */}
                <a
                  href={`#${link.id}`}
                  className="hover:underline"
                  onClick={(e) => {
                    // Prevent default anchor behavior
                     e.preventDefault();
                    document.getElementById(link.id)?.scrollIntoView({
                      behavior: 'smooth',
                       block: 'start'
                       , duration: 3000 
                    })
                  }}
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={itemVariants}>
          <motion.h4 

            className="text-lg font-semibold mb-2"
            whileHover={{ scale: 1.02 }}
          >
            Contact Us
          </motion.h4>
          <motion.div 
            className="space-y-1"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-sm text-gray-300">Email: support@edupilots.com</p>
            <p className="text-sm text-gray-300">Phone: +123 456 7890</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div 
        className="text-center text-sm text-gray-400 mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        © {new Date().getFullYear()} Edu-Pilot. All rights reserved.
      </motion.div>
    </motion.footer>
  );
}