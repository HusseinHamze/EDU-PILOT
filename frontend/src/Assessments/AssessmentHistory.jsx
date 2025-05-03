import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PersonalityType from "./PersonalityType";

export default function AssessmentHistory() {
  const navigate = useNavigate();

  // Mock data for past assessments
  const pastAssessments = [
    {
      id: 1,
      date: "2024-03-15",
      recommendedMajors: [
        { name: "Computer Science", match: 95 },
        { name: "Software Engineering", match: 92 },
        { name: "Data Science", match: 88 }
      ],
      recommendedUniversities: ["MIT", "Stanford", "UC Berkeley"],
      personalityType: "Analytical Thinker",
      score: 92
    },
    {
      id: 2,
      date: "2024-02-28",
      recommendedMajors: [
        { name: "Business Administration", match: 94 },
        { name: "Finance", match: 90 },
        { name: "Marketing", match: 85 }
      ],
      recommendedUniversities: ["Harvard", "Wharton", "NYU Stern"],
      personalityType: "Strategic Leader",
      score: 88
    },
    {
      id: 3,
      date: "2024-01-10",
      recommendedMajors: [
        { name: "Psychology", match: 93 },
        { name: "Sociology", match: 89 },
        { name: "Social Work", match: 86 }
      ],
      recommendedUniversities: ["Yale", "Columbia", "UCLA"],
      personalityType: "Compassionate Helper",
      score: 85
    }
  ];

  return (
    <motion.main 
      className="min-h-screen px-8 py-12 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          className="text-3xl font-bold text-[#0E1C36] dark:text-white"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Assessment History
        </motion.h1>
        <motion.button
          className="px-4 py-2 bg-[#0E1C36] text-white rounded-lg hover:bg-[#142c5e] dark:bg-[#AFCBFF] dark:text-[#0E1C36] dark:hover:text-[#AFCBFF] transition-colors"
          onClick={() => navigate('/Assessment')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start New Assessment
        </motion.button>
      </div>

      <div className="grid gap-6">
        {pastAssessments.map((assessment, index) => (
          <motion.div
            key={assessment.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#0E1C36] dark:text-white">
                  Assessment #{assessment.id}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Completed on {assessment.date}
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-[#0E1C36] dark:text-white mr-2">
                  {assessment.score}%
                </span>
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${assessment.score}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium text-[#0E1C36] dark:text-white mb-2">
                  Recommended Majors
                </h3>
                <ul className="space-y-3">
                  {assessment.recommendedMajors.map((major, i) => (
                    <li key={i} className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-300">{major.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-[#0E1C36] dark:text-white">{major.match}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${major.match}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#0E1C36] dark:text-white mb-2">
                  Recommended Universities
                </h3>
                <ul className="space-y-2">
                  {assessment.recommendedUniversities.map((university, i) => (
                    <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {university}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#0E1C36] dark:text-white mb-2">
                  Personality Type
                </h3>
                <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <p className="text-lg font-semibold text-[#0E1C36] dark:text-white">
                    {assessment.personalityType}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Based on your assessment results
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
} 