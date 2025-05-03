import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AssessmentGateway() {
  const navigate = useNavigate();

  return (
    <motion.main 
      className="min-h-screen flex flex-col items-center justify-center px-8 py-20 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold text-[#0E1C36] dark:text-white mb-4">
          Welcome to Your Academic Journey
        </h1>
        <p className="text-lg text-[#0E1C36]/80 dark:text-white/80">
          Choose how you'd like to proceed with your assessment
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* New User Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col h-full"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/Assessment')}
        >
          <div className="flex flex-col h-full">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[#0E1C36] dark:text-white mb-4 text-center">
              Start New Assessment
            </h2>
            <p className="text-[#0E1C36]/70 dark:text-white/70 mb-6 text-center">
              Begin a fresh assessment to discover your ideal college major and career path.
            </p>
            <ul className="space-y-2 mb-6 flex-grow">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Personalized questions based on your interests</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Detailed analysis of your strengths</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>University recommendations</span>
              </li>
            </ul>
            <button className="w-full px-6 py-3 bg-[#0E1C36] text-white rounded-lg font-medium hover:bg-[#142c5e] dark:bg-[#AFCBFF] dark:text-[#0E1C36] dark:hover:text-[#AFCBFF] transition-colors">
              Start Now
            </button>
          </div>
        </motion.div>

        {/* Returning User Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col h-full"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/assessment/history')}
        >
          <div className="flex flex-col h-full">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[#0E1C36] dark:text-white mb-4 text-center">
              View Past Results
            </h2>
            <p className="text-[#0E1C36]/70 dark:text-white/70 mb-6 text-center">
              Access your previous assessment results and track your progress.
            </p>
            <ul className="space-y-2 mb-6 flex-grow">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Review previous assessments</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Compare your progress</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Update your preferences</span>
              </li>
            </ul>
            <button className="w-full px-6 py-3 bg-[#0E1C36] text-white rounded-lg font-medium hover:bg-[#142c5e] dark:bg-[#AFCBFF] dark:text-[#0E1C36] dark:hover:text-[#AFCBFF] transition-colors">
              View History
            </button>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
} 