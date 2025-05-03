import React, { useState, useEffect, lazy, Suspense } from 'react';
import { CheckIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../Multi-Use/Loader';

// Lazy load sub-sections
const AcademicSection = lazy(() => import('./Sections/AcademicSection'));
const WorkPreferencesSection = lazy(() => import('./Sections/WorkPrefSection'));
const CareerSection = lazy(() => import('./Sections/CareerSection'));
const PersonalitySection = lazy(() => import('./Sections/PersonalitySection'));
const DealbreakersSection = lazy(() => import('./Sections/DealbreakersSection'));

export default function Stepper({ onComplete }) {
    const sections = [
        { title: "Academic Background & Performance", component: <AcademicSection /> },
        { title: "Work Preferences", component: <WorkPreferencesSection /> },
        { title: "Career & Lifestyle Priorities", component: <CareerSection /> },
        { title: "Personality & Soft Skills", component: <PersonalitySection /> },
        { title: "Dealbreakers", component: <DealbreakersSection /> },
    ];

    const [currentStep, setCurrentStep] = useState(0);
    const [completedSections, setCompletedSections] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const handleNext = () => {
        if (!completedSections.includes(currentStep)) {
            setCompletedSections(prev => [...prev, currentStep]);
        }

        if (currentStep < sections.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                onComplete?.();
            }, 2000);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleStepClick = (index) => {
        setCurrentStep(index);
    };

    if (isSubmitting) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen py-8 flex flex-col items-center pt-30 px-4">
            {/* Stepper */}
            <motion.div
                className="relative w-full max-w-4xl px-4 md:px-8 mb-12"
                initial="hidden"
                animate={loaded ? "visible" : "hidden"}
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
            >
                {/* Progress Line */}
                <div className="relative w-full flex items-center" style={{ height: '4rem' }}>
                    <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-0 px-[6%]">
                        <div className="w-full h-1 bg-gray-200 relative">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-[#0E1C36] dark:bg-[#AFCBFF]"
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStep / (sections.length - 1)) * 100}%` }}
                                transition={{ duration: 0.8 }}
                            />
                        </div>
                    </div>

                    {/* Circles */}
                    <div className="relative z-10 flex justify-between items-center w-full">
                        {sections.map((_, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center cursor-pointer"
                                onClick={() => handleStepClick(index)}
                                variants={{
                                    hidden: { y: 10, opacity: 0 },
                                    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
                                }}
                            >
                                <motion.div
                                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500
                                        ${completedSections.includes(index) ? "bg-[#142c5e]"
                                            : index <= currentStep ? "bg-[#0E1C36] dark:bg-[#AFCBFF]"
                                                : "bg-white border-2 border-gray-300"}
                                        ${index === currentStep ? "ring-4 ring-white scale-110" : ""}`}
                                    whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
                                    whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                                >
                                    {completedSections.includes(index) ? (
                                        <CheckIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    ) : (
                                        <p className={`text-sm md:text-lg font-semibold
                                            ${index <= currentStep ? "text-white dark:text-[#0E1C36]" : "text-gray-400"}`}>
                                            {index + 1}
                                        </p>
                                    )}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Section Content */}
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mb-8 min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0E1C36] dark:text-white mb-10">
                            {sections[currentStep].title}
                        </h2>
                        <Suspense fallback={<div className="text-center">Loading...</div>}>
                            {sections[currentStep].component}
                        </Suspense>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="w-full max-w-4xl flex justify-between">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`flex items-center px-6 py-3 rounded-lg cursor-pointer
                        ${currentStep === 0 ? 'bg-gray-200 text-gray-400'
                            : 'bg-[#0E1C36] dark:bg-[#AFCBFF] text-white dark:text-[#0E1C36] hover:bg-[#142c5e] dark:hover:text-[#AFCBFF] transition-all duration-300'}`}
                >
                    <ChevronLeft className="mr-2" />
                    Previous
                </button>

                <button
                    onClick={handleNext}
                    className="flex items-center px-6 py-3 bg-[#0E1C36] dark:bg-[#AFCBFF] text-white dark:text-[#0E1C36] cursor-pointer rounded-lg hover:bg-[#142c5e] dark:hover:text-[#AFCBFF] transition-all duration-300"
                >
                    {currentStep === sections.length - 1 ? 'Complete Assessment' : 'Next Section'}
                    <ChevronRight className="ml-2" />
                </button>
            </div>
        </div>
    );
}