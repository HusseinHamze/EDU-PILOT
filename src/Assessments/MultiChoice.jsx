import React, { useState, useEffect, useRef } from 'react';

const MultiChoice = ({ 
  question = "What are your favorite programming languages?",
  options = ["JavaScript", "Python", "Java", "C#", "TypeScript"],
  selectedOptions: initialSelected = [],
  onSelect
}) => {
  const [selectedOptions, setSelectedOptions] = useState(initialSelected);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);
  const [animatedOptions, setAnimatedOptions] = useState([]);

  // Animation effects
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate options in sequence when scrolled into view
          options.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedOptions(prev => [...prev, options[index]]);
            }, index * 150);
          });
        } else {
          setIsVisible(false);
          setAnimatedOptions([]);
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
  }, [options]);

  const handleCheckboxChange = (option) => {
    const newSelected = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option)
      : [...selectedOptions, option];
    
    setSelectedOptions(newSelected);
    if (onSelect) onSelect(newSelected);
  };

  return (
    <div 
      ref={componentRef}
      className="card flex justify-center items-start mt-5 w-full bg-white border border-[#0E1C36] rounded-xl p-6
        transition-all duration-500 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[#0E1C36] 
          transition-all duration-300 delay-100
          group-hover:scale-105">
          {question}
        </h3>
      </div>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <label 
            key={option} 
            className={`flex items-center space-x-3 cursor-pointer group
              transition-all duration-300 ease-out
              ${animatedOptions.includes(option) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
              delay-${index * 100}`}
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          >
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              <div className={`
                w-5 h-5 rounded border-2 flex items-center justify-center
                transition-all duration-200 ease-in-out
                ${selectedOptions.includes(option) 
                  ? 'border-[#AFCBFF] bg-[#AFCBFF] scale-110' 
                  : 'border-gray-300 group-hover:border-gray-400'}
              `}>
                {selectedOptions.includes(option) && (
                  <svg 
                    className="w-3 h-3 text-[#0E1C36] transition-all duration-200 ease-out" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-[#0E1C36] group-hover:text-[#142c5e] 
              transition-all duration-200 hover:font-medium">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultiChoice;