import { useState, useEffect, useRef } from "react";

export default function Range() {
    const [value, setValue] = useState(0); // Start at 0 for animation
    const rangeRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Animation on mount
    useEffect(() => {
        // Initial animation from 0 to 50 (which represents 3 on the scale)
        const duration = 1000; // 1 second animation
        const startValue = 0;
        const endValue = 50;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentValue = startValue + progress * (endValue - startValue);
            setValue(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Trigger animation when scrolled into view
                    if (value !== 50) {
                        setValue(0);
                        requestAnimationFrame(animate);
                    }
                }
            },
            {
                threshold: 0.5, // Trigger when 50% of component is visible
            }
        );

        if (rangeRef.current) {
            observer.observe(rangeRef.current);
        }

        return () => {
            if (rangeRef.current) {
                observer.unobserve(rangeRef.current);
            }
        };
    }, []);

    // Handle manual changes
    const handleChange = (e) => {
        setValue(parseInt(e.target.value));
    };

    return (
        <div 
            ref={rangeRef}
            className="card flex justify-center items-center mt-5 w-full bg-white border border-[#0E1C36] rounded-xl p-6 transition-all duration-500 ease-out"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
        >
            <h3 className="text-lg font-semibold text-[#0E1C36] mb-10">
                How confident are you in your academic abilities?
            </h3>

            <div className="w-[70%] text-[#0E1C36]">
                <div className="px-4 w-full">
                    <input
                        type="range"
                        min={0}
                        max="100"
                        step="25"
                        value={value}
                        onChange={handleChange}
                        className="range text-[#AFCBFF] w-full transition-all duration-300 ease-out"  
                    />
                </div>
                <div className="flex justify-between w-full px-4 mt-2 text-xs font-bold"> 
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                </div>
                <div className="flex justify-between w-full px-4 mt-2 text-xs font-bold"> 
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                </div>
            </div>
        </div>
    );
}