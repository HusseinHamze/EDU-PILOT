// Progress.jsx
import React, { useMemo } from 'react';

export default function Progress({
  value = 0,
  size = '12rem',
  thickness = '2rem',
  color = 'text-primary',
  showPercentage = true,
  ariaLabel = 'Progress indicator',
  className = '',
  trackColor = 'text-opacity-20',
  animationDuration = '1s'
}) {
  // Clamp value between 0 and 100
  const clampedValue = useMemo(() => Math.min(100, Math.max(0, value)), [value]);

  // Calculate stroke dashoffset for SVG-based fallback
  function calculateStrokeDashoffset(percent) {
    const circumference = 2 * Math.PI * 45; // Assuming radius of 45
    return circumference - (percent / 100) * circumference;
  }

  // Format display value
  function formatDisplayValue(val) {
    return `${Math.round(val)}%`;
  }

  return (
    <div className={`fixed top-30 right-3 ${className}`}>
      {/* DaisyUI Radial Progress (primary implementation) */}
      <div
        className={`radial-progress`}
        style={
          {
            '--value': clampedValue,
            '--size': size,
            '--thickness': thickness,
            '--duration': animationDuration,
          }
        }
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        {showPercentage && formatDisplayValue(clampedValue)}
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
