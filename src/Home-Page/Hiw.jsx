import { motion } from "framer-motion";

export default function Hiw() {
  // Animation variants for the steps
  const stepVariants = {
    offscreen: {
      opacity: 0,
      x: -50
    },
    onscreen: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const containerVariants = {
    offscreen: {},
    onscreen: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="text-[#0E1C36] body-font min-h-screen flex items-center justify-center py-20">
      <div className="max-w-7xl w-full px-6 sm:px-8 mx-auto flex flex-col items-center">
        <motion.h1 
          className="text-3xl font-semibold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h1>
        
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-12">
          {/* Steps Column */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false, amount: 0.5 }}
            variants={containerVariants}
          >
            <motion.div className="flex relative pb-12" variants={stepVariants}>
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="h-full w-1 bg-[#0E1C36] pointer-events-none"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0E1C36] inline-flex items-center justify-center text-white relative z-10">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-bold title-font text-sm text-[#0E1C36] mb-1 tracking-wider">STEP 1</h2>
                <p className="leading-relaxed text-[#0E1C36] opacity-80">Answer a series of carefully designed questions to help the AI understand your strengths and interests.</p>
              </div>
            </motion.div>

            <motion.div className="flex relative pb-12" variants={stepVariants}>
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="h-full w-1 bg-[#0E1C36] pointer-events-none"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0E1C36] inline-flex items-center justify-center text-white relative z-10">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M12 20h9" />
                  <path d="M12 4h9" />
                  <path d="M4 9h16" />
                  <path d="M4 15h16" />
                </svg>
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-bold title-font text-sm text-[#0E1C36] mb-1 tracking-wider">STEP 2</h2>
                <p className="leading-relaxed text-[#0E1C36] opacity-80">Our AI analyzes your profile using advanced algorithms to match your personality with ideal college majors.</p>
              </div>
            </motion.div>

            <motion.div className="flex relative" variants={stepVariants}>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0E1C36] inline-flex items-center justify-center text-white relative z-10">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-bold title-font text-sm text-[#0E1C36] mb-1 tracking-wider">STEP 3</h2>
                <p className="leading-relaxed text-[#0E1C36] opacity-80">Receive personalized recommendations and explore paths that align with your goals and strengths.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2
            }}
          >
            <img 
              className="max-w-[500px] w-full h-auto object-contain rounded-lg" 
              src="/steps.png" 
              alt="step" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}