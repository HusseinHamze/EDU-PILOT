import { motion } from "framer-motion";

export default function Cta() {
  return (
    <motion.section 
      className="text-center px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Image */}
      <motion.img
        src="/CTA.png"
        alt="Student exploring career paths"
        className="mx-auto mb-6 max-w-md w-full h-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      />

      <motion.h2 
        className="text-3xl font-bold mb-6 text-[#0E1C36] dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ 
          duration: 0.6,
          delay: 0.4
        }}
      >
        Ready to Find Your Future?
      </motion.h2>

      <motion.p 
        className="text-lg text-[#0E1C36] dark:text-white opacity-80 mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ 
          duration: 0.6,
          delay: 0.5
        }}
      >
        Take the first step towards discovering the right academic path for you.
      </motion.p>

      <motion.button 
        className="px-6 py-3 rounded-lg font-medium bg-[#0E1C36] text-white hover:bg-[#142c5e] dark:bg-[#AFCBFF] dark:text-[#0E1C36] dark:hover:text-[#AFCBFF] cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ 
          duration: 0.6,
          delay: 0.6
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 5px 15px rgba(14, 28, 54, 0.3)"
        }}
        whileTap={{ 
          scale: 0.95,
          boxShadow: "0 2px 5px rgba(14, 28, 54, 0.3)"
        }}
      >
        Start Your Assessment
      </motion.button>
    </motion.section>
  );
}