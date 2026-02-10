import React from 'react';
import { motion } from 'framer-motion';

const MotionSvg = motion.svg as any;
const MotionPath = motion.path as any;
const MotionCircle = motion.circle as any;

interface AtlasLogoProps {
  className?: string;
  animated?: boolean;
}

const AtlasLogo: React.FC<AtlasLogoProps> = ({ className = "w-6 h-6", animated = false }) => {
  
  // The Exact "Monolith A" Path from InitialLoader (200x200 coordinate space)
  const logoPath = "M100 40 L160 160 H140 L130 140 H70 L60 160 H40 L100 40Z M100 65 L125 120 H75 L100 65Z";

  // If animated=true, we play the entrance sequence (Draw in).
  // If animated=false, we show the full logo but keep the inner ring spinning slowly to match the "Intro" feel of being alive.

  return (
    <MotionSvg 
      viewBox="0 0 200 200" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
        {/* Outer Ring */}
        <MotionCircle
          cx="100" cy="100" r="80"
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          initial={animated ? { pathLength: 0, opacity: 0, rotate: -90 } : { pathLength: 1, opacity: 1, rotate: 0 }}
          animate={animated ? { pathLength: 1, opacity: 1, rotate: 0 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Inner Rotating Ring (The 'Alive' part) */}
        <MotionCircle
          cx="100" cy="100" r="70"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="transparent"
          opacity="0.5"
          initial={animated ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 0.5 }}
          animate={{ 
             scale: 1, 
             opacity: 0.5,
             rotate: 360 
          }}
          transition={{ 
             // Entrance params
             scale: { duration: 1.2, delay: animated ? 0.2 : 0 },
             opacity: { duration: 1.2, delay: animated ? 0.2 : 0 },
             // Loop params
             rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        />

        {/* The Monolith A - Outline */}
        <MotionPath
          d={logoPath}
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* The Monolith A - Fill (Glow) */}
        <MotionPath
          d={logoPath}
          fill="currentColor"
          stroke="transparent"
          initial={animated ? { opacity: 0 } : { opacity: 0.2 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: animated ? 1.5 : 0, duration: 1 }}
        />
    </MotionSvg>
  );
};

export default AtlasLogo;