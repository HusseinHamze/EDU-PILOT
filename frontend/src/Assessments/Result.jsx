import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Result() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Reordered majors with highest in middle
  const orderedMajors = [topMajors[1], topMajors[0], topMajors[2]];

  return (
    <div className="relative min-h-screen flex flex-col items-center px-6 py-10 pt-30 overflow-hidden bg-gradient-to-b from-[#AFCBFF]/10 to-white dark:dark:from-[#0E1C36]/10 dark:to-[#AFCBFF]">
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
        <div className="text-center mb-12 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0E1C36] dark:text-white mb-4 animate-fadeIn">
            🎉 Congratulations, Alex!
          </h1>
          <p className="text-[#0E1C36]/80 dark:text-white/80 text-lg">
            Here are the majors that suit you best.
          </p>
        </div>

        {/* Top 3 Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-40 items-stretch relative z-10">
            {orderedMajors.map((major, index) => (
                <div 
                key={index} 
                className={`bg-white rounded-2xl border-2 border-[#AFCBFF] shadow-xl p-6 flex flex-col hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-[#0E1C36] animate-fadeInUp delay-${index * 100}`}
                style={{ 
                    background: 'linear-gradient(to bottom, #FFFFFF, #F5F9FF)',
                    animationDelay: `${index * 100}ms`,
                    minHeight: '360px' // Slightly reduced height
                }}
                >
                <h2 className="text-2xl font-bold text-[#0E1C36] mb-3 text-center">{major.name}</h2>
                
                {/* Description with tighter margin */}
                <p className="text-[#0E1C36]/70 text-center mb-4 flex-grow px-2">
                    {major.description}
                </p>
                
                {/* Percentage section moved closer */}
                <div className="w-full mt-auto mb-7">
                    <div className="w-full bg-[#AFCBFF]/30 rounded-full h-2.5 mb-2">
                    <div 
                        className="bg-[#142c5e] h-2.5 rounded-full" 
                        style={{ width: `${major.percentage}%` }}
                    ></div>
                    </div>
                    <span className="text-[#142c5e] font-bold text-lg block text-center">
                    {major.percentage}% Match
                    </span>
                </div>
                
                <button className="mt-4 bg-[#0E1C36] hover:bg-[#142c5e] text-white font-medium px-6 py-2 rounded-full transition-colors duration-300 cursor-pointer w-full">
                    Learn More
                </button>
                </div>
            ))}
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
            Explore Majors
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
          <p className="text-xl font-bold text-[#0E1C36] mb-3">You're a Creative Problem-Solver!</p>
          <p className="text-[#0E1C36]/80 italic">
            "The future belongs to those who believe in the beauty of their dreams." — Eleanor Roosevelt
          </p>
        </div>
      </div>

      {/* Global Styles for Animations */}
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
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
}

// Mock Data (original order)
const topMajors = [
  { 
    name: "Computer Science", 
    description: "Dive into technology and innovation with this comprehensive program that prepares you for the digital future.", 
    percentage: 95 
  },
  { 
    name: "Business Administration", 
    description: "Develop leadership skills to manage organizations and inspire teams in any industry.", 
    percentage: 89 
  },
  { 
    name: "Psychology", 
    description: "Explore human behavior and mental processes to help individuals and communities thrive.", 
    percentage: 87 
  },
];