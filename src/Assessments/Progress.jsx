// Progress.jsx
import React, { useMemo } from 'react';

export default function Progress({
  value = 0,
  size = '12rem', // default size
  smSize = '8rem', // small screens
  thickness = '2rem',
  color = 'text-primary',
  showPercentage = true,
  ariaLabel = 'Progress indicator',
  className = '',
  trackColor = 'text-opacity-20',
  animationDuration = '1s',
  hideBelow = 'xl', // screens smaller than 'md' (768px) will hide the progress
  position = 'fixed',
  placement = 'top-30 right-3'
}) {
  // Clamp value between 0 and 100
  const clampedValue = useMemo(() => Math.min(100, Math.max(0, value)), [value]);

  // Calculate stroke dashoffset for SVG-based fallback
  function calculateStrokeDashoffset(percent) {
    const circumference = 2 * Math.PI * 45;
    return circumference - (percent / 100) * circumference;
  }

  // Format display value
  function formatDisplayValue(val) {
    return `${Math.round(val)}%`;
  }

  // Responsive visibility classes
  const visibilityClass = {
    sm: 'hidden sm:block',     // hide on xs, show on sm and up
    md: 'hidden md:block',     // hide on sm and xs, show on md and up
    lg: 'hidden lg:block',     // hide on md and below, show on lg and up
    xl: 'hidden xl:block'      // hide on lg and below, show on xl
  }[hideBelow] || 'block';     // default to always visible

  return (
    <div className={`${position} ${placement} ${visibilityClass} ${className}`}>
      {/* DaisyUI Radial Progress */}
      <div
        className={`radial-progress`}
        style={{
          '--value': clampedValue,
          '--size': size,
          '--thickness': thickness,
          '--duration': animationDuration,
          '--sm-size': smSize,
        }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        {showPercentage && (
          <span className="text-sm sm:text-base md:text-lg">
            {formatDisplayValue(clampedValue)}
          </span>
        )}
      </div>

      {/* SVG Fallback (optional) */}
      {process.env.NODE_ENV === 'test' && (
        <svg className="w-0 h-0">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={calculateStrokeDashoffset(clampedValue)}
          />
        </svg>
      )}
    </div>
  );
}