import { motion } from "framer-motion";

export default function Hero() {
  return (
    <main id="hero" className="flex flex-col md:flex-row items-center px-8 py-20 mt-18 max-w-6xl mx-auto gap-12">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="basis-1/2 shrink-0 space-y-6"
      >
        <motion.h1 
          className="text-5xl font-extrabold leading-tight"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Choose the Right College Major for You
        </motion.h1>
        <motion.p 
          className="text-lg text-[#0E1C36] opacity-80"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Edu-Pilot helps guide high school students and graduates in finding
          the major that fits their interests and strengths best. Make your
          decision with confidence.
        </motion.p>
        <motion.button 
          className="px-7 py-2 text-lg rounded-xl font-semibold bg-[#0E1C36] text-white hover:bg-[#142c5e] cursor-pointer shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="basis-1/2 shrink-0 flex justify-center"
      >
        <motion.img
          src="/Hero.png"
          alt="Student with laptop and signs"
          className="w-full max-w-[500px] object-contain"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut", 
            delay: 0.5,
            when: "beforeChildren"
          }}
        />
      </motion.div>
    </main>
  );
}