
import React from 'react';
import { motion } from 'framer-motion';

const MotionSvg = motion.svg as any;
const MotionPath = motion.path as any;
const MotionCircle = motion.circle as any;
const MotionRect = motion.rect as any;
const MotionG = motion.g as any;

interface AtlasRobotProps {
  className?: string;
  strokeWidth?: number;
  animated?: boolean;
}

const AtlasRobot: React.FC<AtlasRobotProps> = ({ className = "w-6 h-6", strokeWidth = 1.5, animated = false }) => {
  
  if (animated) {
    return (
      <MotionSvg 
        viewBox="0 0 24 24" 
        className={className} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
          <defs>
            <linearGradient id="robotGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" /> {/* Blue */}
              <stop offset="100%" stopColor="#06B6D4" /> {/* Cyan */}
            </linearGradient>
          </defs>

          {/* Antenna Stem */}
          <MotionPath
            d="M12 2V6"
            stroke="url(#robotGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Antenna Ball (Pulsing) */}
          <MotionCircle
            cx="12" cy="2" r="2"
            fill="url(#robotGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Head Box */}
          <MotionRect
            x="4" y="6" width="16" height="14" rx="4"
            stroke="url(#robotGradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />

          {/* Eyes (Blinking) */}
          <MotionG
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8 }}
          >
             <MotionCircle 
               cx="9" cy="11" r="1.5" 
               fill="white" 
               animate={{ scaleY: [1, 0.1, 1] }} 
               transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
             />
             <MotionCircle 
               cx="15" cy="11" r="1.5" 
               fill="white"
               animate={{ scaleY: [1, 0.1, 1] }} 
               transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
             />
          </MotionG>

          {/* Mouth (Simple Line) */}
          <MotionPath
            d="M9 16H15"
            stroke="url(#robotGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          />

          {/* Ear-like details */}
          <MotionPath d="M2 10V16" stroke="url(#robotGradient)" strokeWidth={strokeWidth} strokeLinecap="round" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.2 }} />
          <MotionPath d="M22 10V16" stroke="url(#robotGradient)" strokeWidth={strokeWidth} strokeLinecap="round" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.2 }} />

      </MotionSvg>
    );
  }

  // --- Static Version ---
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 2V6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
        <circle cx="12" cy="2" r="2" fill="currentColor" />
        <rect x="4" y="6" width="16" height="14" rx="4" stroke="currentColor" strokeWidth={strokeWidth} />
        <circle cx="9" cy="11" r="1.5" fill="currentColor" />
        <circle cx="15" cy="11" r="1.5" fill="currentColor" />
        <path d="M9 16H15" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M2 10V16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.5" />
        <path d="M22 10V16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.5" />
    </svg>
  );
};

export default AtlasRobot;
