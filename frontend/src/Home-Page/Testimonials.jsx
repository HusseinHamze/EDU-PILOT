import { motion } from "framer-motion";

export default function Testimonials() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.4
      }
    }
  };

  return (
    <motion.section 
      id="testimonials"
      className="text-[#0E1C36] body-font py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container px-6 sm:px-8 mx-auto">
        <motion.h1 
          className="text-3xl font-medium title-font text-[#0E1C36] mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Testimonials
        </motion.h1>
        
        <motion.div 
          className="flex flex-wrap -m-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Testimonial 1 */}
          <motion.div 
            className="p-4 md:w-1/2 w-full"
            variants={itemVariants}
            whileHover="hover"
          >
            <motion.div 
              className="h-full p-8 rounded-lg bg-[#E6F0FF] border border-[#0E1C36] dark:border-[#AFCBFF]"
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(14, 28, 54, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={quoteVariants}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-[#0E1C36] mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed text-[#0E1C36] mb-6">"Edu-Pilot helped me find the perfect major based on my skills and interests. The AI advisor guided me through a series of insightful questions, and I now feel confident about pursuing a career in Software Engineering!"</p>
                <div className="text-center">
                  <p className="title-font font-medium text-[#0E1C36]">Emily Johnson</p>
                  <p className="text-sm text-[#0E1C36]">Software Engineering Student</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div 
            className="p-4 md:w-1/2 w-full"
            variants={itemVariants}
            whileHover="hover"
          >
            <motion.div 
              className="h-full p-8 rounded-lg bg-[#E6F0FF] border border-[#0E1C36] dark:border-[#AFCBFF]"
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(14, 28, 54, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={quoteVariants}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-[#0E1C36] mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed text-[#0E1C36] mb-6">"I was so lost when it came to choosing a college major. Thanks to Edu-Pilot, I was able to answer a few questions and discover that I would be perfect for a career in Environmental Science. It truly helped me understand my strengths!"</p>
                <div className="text-center">
                  <p className="title-font font-medium text-[#0E1C36]">Matthew Davis</p>
                  <p className="text-sm text-[#0E1C36]">Environmental Science Major</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}