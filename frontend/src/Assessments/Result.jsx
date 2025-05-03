import { Star } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import PersonalityType from './PersonalityType';

export default function Result() {
  const [loaded, setLoaded] = useState(false);
  const [flippedCards, setFlippedCards] = useState([false, false, false]);
  const uniRef = useRef(null);
  const [isUniVisible, setIsUniVisible] = useState(false);

  useEffect(() => {
    setLoaded(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsUniVisible(true),
      { threshold: 0.1 }
    );
    if (uniRef.current) observer.observe(uniRef.current);

    return () => observer.disconnect();
  }, []);

  const orderedMajors = [topMajors[1], topMajors[0], topMajors[2]];

  const toggleFlip = (index) => {
    setFlippedCards(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center px-6 py-10 pt-30 overflow-hidden bg-gradient-to-b from-[#AFCBFF]/10 to-white dark:from-[#0E1C36]/10 dark:to-[#AFCBFF]">
      {/* Decorative Background Images */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <img 
          src="/result-1.png" 
          alt="Decorative Image 1" 
          className="absolute hidden sm:block sm:bottom-8 sm:left-4 sm:w-40 md:left-10 md:w-60 lg:w-80 opacity-80"
        />
        <img 
          src="/result-2.png" 
          alt="Decorative Image 2" 
          className="absolute hidden sm:block sm:bottom-8 sm:right-4 sm:w-44 md:right-10 md:w-64 lg:w-86 opacity-80"
        />
      </div>

      {/* Main Content */}
      <div className={`w-full max-w-7xl transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Congratulations Banner */}
        <div className="text-center mb-12 relative z-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0E1C36] dark:text-white mb-4">
            🎉 Congratulations, Ali!
          </h1>
          <p className="text-[#0E1C36]/80 dark:text-white/80 text-lg">
            Here are the majors that suit you best.
          </p>
        </div>

        {/* Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-25 items-stretch relative z-1">
          {orderedMajors.map((major, index) => (
            <div 
              key={index}
              className="group relative h-96 perspective-1000"
            >
              <div 
              className={`relative w-full h-full transition-transform duration-700 ease-in-out transform-style-preserve-3d ${
                flippedCards[index] ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front Side */}
              <div className="absolute w-full h-full backface-hidden bg-[#f5f5f5] dark:bg-gray-800 rounded-2xl p-6 border-2 border-[#c3c6ce] flex flex-col transition-all duration-600 ease-out overflow-visible group-hover:border-[#0E1C36] dark:group-hover:border-[#AFCBFF] group-hover:shadow-[0_4px_18px_0_rgba(0,0,0,0.25)]">
                <div className="h-full flex flex-col gap-2">
                  <h2 className="text-2xl font-bold text-[#0E1C36] dark:text-white mb-8 text-center">
                    {major.name}
                  </h2>
                  <p className="text-[#0E1C36]/70 dark:text-white/70 text-center mb-4 flex-grow px-2">
                    {major.description}
                  </p>
                  <div className="w-full mt-auto mb-7">
                    <div className="w-full bg-[#AFCBFF]/30 rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-[#142c5e] dark:bg-[#AFCBFF]/80 h-2.5 rounded-full" 
                        style={{ width: `${major.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-[#142c5e] dark:text-[#AFCBFF] font-bold text-lg block text-center">
                      {major.percentage}% Match
                    </span>
                  </div>
                  <button 
                    onClick={() => toggleFlip(index)}
                    className="absolute left-1/2 bottom-0 w-[60%] bg-[#0E1C36] dark:bg-[#AFCBFF] text-white dark:text-[#0E1C36] font-medium py-2 px-4 rounded-3xl transform -translate-x-1/2 translate-y-[125%] opacity-0 transition-all duration-600 ease-out group-hover:translate-y-[50%] group-hover:opacity-100 hover:bg-[#142c5e] dark:hover:bg-[#7caaff] cursor-pointer"
                  >
                    Learn More
                  </button>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full backface-hidden bg-[#f5f5f5] dark:bg-gray-800 rounded-2xl p-6 border-2 border-[#c3c6ce] transform rotate-y-180 flex flex-col transition-all duration-600 ease-out overflow-visible group-hover:border-[#0E1C36] dark:group-hover:border-[#AFCBFF] group-hover:shadow-[0_4px_18px_0_rgba(0,0,0,0.25)]">
                <h3 className="text-xl font-bold text-[#0E1C36] dark:text-white mb-4 text-center">
                  More About {major.name}
                </h3>
                <div className="flex-grow space-y-3">
                  <p className="text-[#0E1C36]/70 dark:text-white/70">
                    📈 Average Starting Salary: {major.details.salary}
                  </p>
                  <p className="text-[#0E1C36]/70 dark:text-white/70">
                    📚 Top Courses:
                  </p>
                  <ul className="list-disc list-inside pl-4">
                    {major.details.courses.map((course, i) => (
                      <li key={i} className="text-[#0E1C36]/70 dark:text-white/70">{course}</li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => toggleFlip(index)}
                  className="mt-4 w-full bg-[#0E1C36] dark:bg-[#AFCBFF] text-white dark:text-[#0E1C36] py-2 rounded-full hover:bg-[#142c5e] dark:hover:bg-[#7caaff] cursor-pointer transition-colors"
                >
                  Back to Overview
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>

        {/* Top Universities Section */}
        <div 
          ref={uniRef}
          className={`w-full mb-25 relative z-10 transition-all duration-1000 ${
            isUniVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-bold text-[#0E1C36] dark:text-white mb-8 text-center">
            Recommended Universities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {orderedMajors.map((major, index) => (
              <div 
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-[#c3c6ce] dark:border-[#AFCBFF]/20 transition-all duration-300 hover:border-[#0E1C36] hover:dark:border-[#AFCBFF] hover:shadow-lg hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-[#0E1C36] dark:text-white mb-4 text-center transition-colors duration-300 group-hover:text-[#142c5e] dark:group-hover:text-[#AFCBFF]">
                  {major.name}
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-[#0E1C36] dark:text-white/80">
                  {universityData[major.name].map((uni, uniIndex) => (
                    <li 
                      key={uniIndex} 
                      className="text-base transition-colors duration-300 group-hover:text-[#142c5e] dark:group-hover:text-[#AFCBFF]/90"
                    >
                      {uni.name}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>


        {/* Rate the Result */}
        <div className={`text-center mb-16 animate-fadeIn delay-300 relative z-10`}>
          <h3 className="text-2xl font-semibold text-[#0E1C36] mb-6">How satisfied are you with your results?</h3>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={36} 
                className="text-[#FFD700] cursor-pointer hover:scale-125 transition-all duration-200 hover:fill-[#FFD700]" 
                fill="transparent"
              />
            ))}
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className={`flex flex-col md:flex-row justify-center gap-4 mb-16 animate-fadeIn delay-500 relative z-10`}>
          <button className="bg-[#0E1C36] hover:bg-[#142c5e] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg cursor-pointer">
            Explore Universities
          </button>
          <button className="bg-[#AFCBFF] hover:bg-[#8fb6ff] text-[#0E1C36] px-8 py-3 rounded-full border border-[#0E1C36] font-medium transition-all duration-300 hover:shadow-lg hover:border-transparent cursor-pointer">
            Retake Assessment
          </button>
          <button className="bg-[#4CAF50] hover:bg-[#3e8e41] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg cursor-pointer">
            Save My Results
          </button>
        </div>

        {/* Personality Tagline and Quote */}
        <div className={`text-center max-w-2xl mx-auto animate-fadeIn delay-700 relative z-10`}>
          <PersonalityType topMajor={orderedMajors[1].name} />
          <p className="text-[#0E1C36]/80 italic">
            "The future belongs to those who believe in the beauty of their dreams." — Eleanor Roosevelt
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}

// Mock Data
const topMajors = [
  { 
    name: "Computer Science",
    description: "Dive into technology and innovation with this comprehensive program that prepares you for the digital future.",
    percentage: 95,
    details: {
      salary: "$110,000",
      courses: ["Algorithms", "Data Structures", "Artificial Intelligence", "Computer Systems"]
    }
  },
  { 
    name: "Business Administration",
    description: "Develop leadership skills to manage organizations and inspire teams in any industry.",
    percentage: 89,
    details: {
      salary: "$85,000",
      courses: ["Financial Accounting", "Marketing Management", "Organizational Behavior", "Business Strategy"]
    }
  },
  { 
    name: "Psychology",
    description: "Explore human behavior and mental processes to help individuals and communities thrive.",
    percentage: 87,
    details: {
      salary: "$75,000",
      courses: ["Cognitive Psychology", "Developmental Psychology", "Social Psychology", "Research Methods"]
    }
  },
];

// Mock university data
const universityData = {
  "Computer Science": [
    { name: "MIT" },
    { name: "Stanford University" },
    { name: "Carnegie Mellon University" },
    { name: "University of California, Berkeley" },
    { name: "Harvard University" }
  ],
  "Business Administration": [
    { name: "Harvard University" },
    { name: "University of Pennsylvania (Wharton)" },
    { name: "Stanford University" },
    { name: "MIT (Sloan)" },
    { name: "University of Chicago (Booth)" }
  ],
  "Psychology": [
    { name: "Stanford University" },
    { name: "Yale University" },
    { name: "University of Michigan" },
    { name: "University of California, Berkeley" },
    { name: "Harvard University" }
  ]
};