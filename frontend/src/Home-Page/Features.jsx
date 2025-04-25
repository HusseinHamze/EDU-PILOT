import { motion } from "framer-motion";

export default function Feature() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="text-[#0E1C36] dark:text-white body-font">
      <div className="container px-4 py-8 mx-auto max-w-7xl flex flex-wrap justify-center items-center">
        {/* Features Header */}
        <motion.div 
          className="w-full lg:w-2/3 text-center mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-[#0E1C36] dark:text-white">Features</h1>
          <p className="text-sm text-[#0E1C36] dark:text-white opacity-80 mt-2">
            Discover the unique features that make Edu-Pilot the best choice for career guidance.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center w-full">
          {/* Left Side Image */}
          <motion.div 
            className="lg:w-1/2 md:w-2/3 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden flex justify-center items-center"
            variants={imageVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
          >
            <motion.img
              alt="features"
              className="object-cover object-center h-full w-full"
              src="/features.png"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Features List */}
          <motion.div 
            className="flex flex-col flex-wrap lg:py-2 -mb-10 lg:w-1/2 md:w-2/3 lg:pl-8 lg:text-left text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
          >
            {/* Feature 1: AI Recommendations */}
            <motion.div 
              className="flex flex-col mb-6 lg:items-start items-center"
              variants={itemVariants}
            >
              <motion.div 
                className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-[#0E1C36] mb-5"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.11 0-2 .89-2 2v6a2 2 0 104 0v-6c0-1.11-.89-2-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18h12" />
                </svg>
              </motion.div>
              <div className="flex-grow">
                <h2 className="text-[#0E1C36] dark:text-white font-bold text-base title-font mb-3">AI-Powered Recommendations</h2>
                <p className="leading-relaxed opacity-80 text-sm">
                  Our smart AI system analyzes your preferences, skills, and interests to suggest the most suitable college majors for you. It's a personalized career guidance experience.
                </p>
              </div>
            </motion.div>

            {/* Feature 2: Fast */}
            <motion.div 
              className="flex flex-col mb-6 lg:items-start items-center"
              variants={itemVariants}
            >
              <motion.div 
                className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-[#0E1C36] mb-5"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3M12 3a9 9 0 100 18 9 9 0 000-18z" />
                </svg>
              </motion.div>
              <div className="flex-grow">
                <h2 className="text-[#0E1C36] dark:text-white text-base title-font font-bold mb-3">Quick & Simple</h2>
                <p className="leading-relaxed opacity-80 text-sm">
                  The process is fast and simple! Complete the questionnaire in just a few minutes to receive personalized major recommendations based on your answers.
                </p>
              </div>
            </motion.div>

            {/* Feature 3: Personalized Insights */}
            <motion.div 
              className="flex flex-col mb-6 lg:items-start items-center"
              variants={itemVariants}
            >
              <motion.div 
                className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-[#0E1C36] mb-5"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12V4" />
                </svg>
              </motion.div>
              <div className="flex-grow">
                <h2 className="text-[#0E1C36] dark:text-white text-base title-font font-bold mb-3">Personalized Insights</h2>
                <p className="leading-relaxed opacity-80 text-sm">
                  Our platform offers tailored insights based on your unique responses, ensuring that each recommendation aligns with your individual strengths, interests, and goals.
                </p>
              </div>
            </motion.div>

            {/* Feature 4: Free to Use */}
            <motion.div 
              className="flex flex-col mb-6 lg:items-start items-center"
              variants={itemVariants}
            >
              <motion.div 
                className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-[#0E1C36] mb-5"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.5 0-2.7 1.2-2.7 2.7v2.6a2.7 2.7 0 105.4 0v-2.6c0-1.5-1.2-2.7-2.7-2.7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m10-10h-2M4 12H2m16.95 6.95l-1.41-1.41M6.46 6.46L5.05 5.05m12.9 0l-1.41 1.41M5.05 18.95l1.41-1.41" />
                </svg>
              </motion.div>
              <div className="flex-grow">
                <h2 className="text-[#0E1C36] dark:text-white text-base title-font font-bold mb-3">100% Free</h2>
                <p className="leading-relaxed opacity-80 text-sm">
                  Edu-Pilot is completely free for all students! No hidden fees or costs, providing equal access to career guidance for everyone.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}