import React, { useState, useEffect, useRef } from 'react';

const TrueFalse = ({ 
  question = "Is React a JavaScript library?",
  name = "true-false"
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);
  const [animateOptions, setAnimateOptions] = useState(false);

  // Animation effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger options animation after a short delay
          setTimeout(() => setAnimateOptions(true), 200);
        } else {
          setIsVisible(false);
          setAnimateOptions(false);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div 
      ref={componentRef}
      className="card flex flex-col justify-start items-start mt-5 w-full bg-white dark:bg-gray-800 border border-[#0E1C36] dark:border-[#AFCBFF] rounded-xl p-6
        transition-all duration-500 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <h3 className="text-lg font-bold text-[#0E1C36] dark:text-white mb-4
        transition-all duration-300 delay-75
        group-hover:scale-[1.02]">
        {question}
      </h3>

      <div className="space-y-3 w-full">
        {['True', 'False'].map((option, index) => (
          <label 
            key={option} 
            className={`flex items-center gap-3 cursor-pointer label
              transition-all duration-300 ease-out
              ${animateOptions ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
            style={{
              transitionDelay: `${index * 100 + 200}ms`
            }}
          >
            <div className="relative">
              <input
                type="radio"
                name={name}
                className="sr-only"
                value={option}
                checked={selectedOption === option}
                onChange={handleRadioChange}
              />
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                transition-all duration-200 ease-in-out
                ${selectedOption === option 
                  ? 'border-[#AFCBFF] bg-[#AFCBFF]' 
                  : 'border-gray-300 hover:border-gray-400'}
              `}>
                {selectedOption === option && (
                  <div className="w-2 h-2 rounded-full bg-[#0E1C36]
                    transition-all duration-200 ease-out"
                  />
                )}
              </div>
            </div>
            <span className="text-[#0E1C36] dark:text-white hover:text-[#142c5e] dark:hover:text-[#AFCBFF]
              transition-all duration-200 hover:font-bold">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TrueFalse;