import React, { useState, useEffect } from 'react';
import { CheckIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Range from './Range';
import MultiChoice from './MultiChoice';
import TrueFalse from './TrueFalse';

export default function Stepper({ onComplete }) {
    const sections = [
        {
            title: "Academic Background & Performance",
            component: <AcademicSection />,
            completed: false
        },
        {
            title: "Work preferences",
            component: <WorkPreferencesSection />,
            completed: false
        },
        {
            title: "Career & Lifestyle Priorities",
            component: <CareerSection />,
            completed: false
        },
        {
            title: "Personality & Soft Skills",
            component: <PersonalitySection />,
            completed: false
        },
        {
            title: "Dealbreakers",
            component: <DealbreakersSection />,
            completed: false
        },
    ];

    const [currentStep, setCurrentStep] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [completedSections, setCompletedSections] = useState([]);

    useEffect(() => {
        setLoaded(true);
        updateProgress();
    }, [currentStep, completedSections]);

    const updateProgress = () => {
        const completedCount = completedSections.length;
        setProgress((completedCount / sections.length) * 100);
    };

    const handleNext = () => {
        if (currentStep < sections.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            onComplete?.();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleStepClick = (index) => {
        // Only allow navigation to completed steps or next in sequence
        if (completedSections.includes(index) || index === currentStep + 1) {
            setCurrentStep(index);
        }
    };

    const markSectionComplete = () => {
        if (!completedSections.includes(currentStep)) {
            setCompletedSections([...completedSections, currentStep]);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="w-full min-h-screen py-8 md:py-12 flex flex-col items-center mt-20 px-4">
            {/* Stepper */}
            <motion.div 
                className="relative flex justify-between items-center w-full max-w-4xl px-4 md:px-8 mb-12"
                initial="hidden"
                animate={loaded ? "visible" : "hidden"}
                variants={containerVariants}
            >
                {/* Progress line */}
                <div className="absolute top-1/2 left-8 right-8 h-1 z-0 -translate-y-1/2 bg-gray-200 overflow-hidden">
                    <motion.div 
                        className="h-full bg-[#0E1C36]"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / (sections.length - 1)) * 100}%` }}
                        transition={{ duration: 0.8 }}
                    />
                </div>
                
                {sections.map((section, index) => (
                    <motion.div
                        key={index}
                        className="relative z-10"
                        onClick={() => handleStepClick(index)}
                        variants={itemVariants}
                    >
                        <motion.div
                            className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                                index <= currentStep
                                    ? completedSections.includes(index)
                                        ? "bg-[#142c5e]"
                                        : "bg-[#0E1C36]"
                                    : "bg-white border-2 border-gray-300"
                            } ${index === currentStep ? "ring-4 ring-white scale-110" : ""}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {completedSections.includes(index) ? (
                                <CheckIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            ) : (
                                <p className={`text-sm md:text-lg font-semibold ${
                                    index <= currentStep ? "text-white" : "text-gray-400"
                                }`}>
                                    {index + 1}
                                </p>
                            )}
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Current Section Content */}
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.h2
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center text-2xl md:text-3xl font-bold text-[#0E1C36] mb-10"
                    >
                        {sections[currentStep].title}
                    </motion.h2>
                    <div className="min-h-[300px]">
                        {sections[currentStep].component}
                    </div>
                </motion.div>
            </AnimatePresence>
             </div>

            {/* Navigation Controls */}
            <div className="w-full max-w-4xl flex justify-between">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`flex items-center px-6 py-3 rounded-lg cursor-pointer ${currentStep === 0 ? 'bg-gray-200 text-gray-400' : 'bg-[#0E1C36] text-white hover:bg-[#142c5e]'}`}
                >
                    <ChevronLeft className="mr-2" />
                    Previous
                </button>
                
                <button
                    onClick={() => {
                        markSectionComplete();
                        handleNext();
                    }}
                    className="flex items-center px-6 py-3 cursor-pointer bg-[#0E1C36] text-white rounded-lg hover:bg-[#142c5e]"
                >
                    {currentStep === sections.length - 1 ? 'Complete Assessment' : 'Next Section'}
                    <ChevronRight className="ml-2" />
                </button>
            </div>
        </div>
    );
}

function AcademicSection() {
    return (
        <>
        <Range/>
        <MultiChoice/>
        <TrueFalse/>
        </>
    );
}

function WorkPreferencesSection() {
    return <div>Work Preferences form goes here...</div>;
}

function CareerSection() {
    return <div>Career Priorities form goes here...</div>;
}

function PersonalitySection() {
    return <div>Personality Assessment goes here...</div>;
}

function DealbreakersSection() {
    return <div>Dealbreakers questions go here...</div>;
}