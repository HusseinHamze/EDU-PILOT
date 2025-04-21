import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Is Edu-Pilot free to use?",
    answer: "Yes, Edu-Pilot is completely free for students exploring their career paths.",
  },
  {
    question: "How accurate are the AI recommendations?",
    answer: "While no system is perfect, our AI is trained on real academic and personality data for strong guidance.",
  },
  {
    question: "Can I retake the questionnaire?",
    answer: "Absolutely! You can retake the assessment any time to refine your results.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const answerVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      id="faqs"
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 md:py-16 lg:py-20 bg-[#AFCBFF] rounded-lg border border-[#0E1C36]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-10 text-[#0E1C36]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Frequently Asked Questions
      </motion.h2>
      
      <motion.div 
        className="space-y-3 sm:space-y-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="accordion py-3 sm:py-4 border-b border-solid border-[#0E1C36]"
            id={`basic-heading-${index}-default`}
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.button
              className="accordion-toggle group inline-flex items-center justify-between w-full transition duration-500 hover:text-[#142c5e] text-left"
              aria-controls={`basic-collapse-${index}-default`}
              onClick={() => toggleFAQ(index)}
              whileTap={{ scale: 0.98 }}
            >
              <h5 className="text-base sm:text-lg font-medium">{faq.question}</h5>
              <motion.svg
                className="text-[#0E1C36] transition duration-500 group-hover:text-[#142c5e] flex-shrink-0 ml-4"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{
                  rotate: openIndex === index ? 180 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </motion.svg>
            </motion.button>
            
            <motion.div
              id={`basic-collapse-${index}-default`}
              className="accordion-content w-full overflow-hidden"
              aria-labelledby={`basic-heading-${index}-default`}
              initial={false}
              animate={openIndex === index ? "open" : "closed"}
              variants={answerVariants}
            >
              <p className="text-sm sm:text-base text-[#0E1C36]/80 leading-6 pt-2 pb-1">
                {faq.answer}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}