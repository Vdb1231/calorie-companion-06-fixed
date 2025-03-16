
import React from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  valueLabel?: string;
  color?: string;
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  label,
  valueLabel,
  color = '#F4795F', // Default rose-gold-500
  className,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = value / max;
  const progressOffset = circumference * (1 - progress);
  
  // Ensure progress is within 0-100%
  const normalizedProgress = Math.min(Math.max(progress, 0), 1);
  const percentage = Math.round(normalizedProgress * 100);

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {label && (
        <div className="text-sm font-medium text-foreground/70 mb-2">{label}</div>
      )}
      
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            stroke="rgba(0,0,0,0.1)"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            stroke={color}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        
        {/* Center text */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-foreground font-medium"
        >
          <span className="text-xl">{percentage}%</span>
          {valueLabel && (
            <span className="text-xs text-foreground/60">{valueLabel}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
