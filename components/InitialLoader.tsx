
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionPath = motion.path as any;
const MotionCircle = motion.circle as any;
const MotionSpan = motion.span as any;

interface InitialLoaderProps {
  onComplete: () => void;
}

const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Initiation (0ms)
      await new Promise(r => setTimeout(r, 500)); 
      setPhase(1); // Horizon Line / Circle

      // Phase 2: Logo Construction (1200ms)
      await new Promise(r => setTimeout(r, 1200));
      setPhase(2); // 'A' Mark

      // Phase 3: Text & Polish (2000ms)
      await new Promise(r => setTimeout(r, 1000));
      setPhase(3); // Text

      // Phase 4: Exit Sequence (3500ms)
      await new Promise(r => setTimeout(r, 2000));
      setPhase(4); // Exit

      // Cleanup (4300ms)
      await new Promise(r => setTimeout(r, 800));
      onComplete();
    };

    sequence();
  }, [onComplete]);

  // Classical "A" Path - Sharp, Geometric, Elegant
  const aPath = "M100 40 L160 160 H140 L130 140 H70 L60 160 H40 L100 40Z M100 65 L125 120 H75 L100 65Z"; 

  return (
    <MotionDiv
        className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
        }}
    >
        {/* --- CINEMATIC BACKGROUND --- */}
        <div className="absolute inset-0 z-0">
            {/* Moving Gradient Spotlight */}
            <MotionDiv 
                className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-20"
                style={{ 
                    background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(2,6,23,0) 70%)" 
                }}
                animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            {/* Subtle Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
        </div>

        {/* --- MAIN LOGO ASSEMBLY --- */}
        <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
                
                {/* 1. The Horizon Ring (Classical Eternity) */}
                <svg width="256" height="256" viewBox="0 0 200 200" className="absolute overflow-visible">
                    <defs>
                        <linearGradient id="classicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e2e8f0" /> {/* Slate 200 */}
                            <stop offset="100%" stopColor="#94a3b8" /> {/* Slate 400 */}
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Outer Circle */}
                    <MotionCircle
                        cx="100" cy="100" r="80"
                        fill="transparent"
                        stroke="url(#classicGradient)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0, rotate: -90 }}
                        animate={phase >= 1 ? { pathLength: 1, opacity: 1, rotate: 0 } : {}}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    
                    {/* Inner Rotating Ring */}
                    <MotionCircle
                        cx="100" cy="100" r="70"
                        fill="transparent"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="0.5"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={phase >= 1 ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.2 }}
                    />

                    {/* 2. The 'A' Monolith */}
                    <AnimatePresence>
                        {phase >= 2 && (
                            <MotionPath
                                d={aPath}
                                fill="transparent"
                                stroke="#f8fafc"
                                strokeWidth="1.5"
                                filter="url(#glow)"
                                initial={{ pathLength: 0, opacity: 0, y: 10 }}
                                animate={{ pathLength: 1, opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        )}
                    </AnimatePresence>
                    
                    {/* Fill 'A' slightly later for solidity */}
                    <AnimatePresence>
                        {phase >= 3 && (
                            <MotionPath
                                d={aPath}
                                fill="rgba(255,255,255,0.05)"
                                stroke="transparent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            />
                        )}
                    </AnimatePresence>
                </svg>
            </div>

            {/* 3. Typography & Brand */}
            <div className="mt-8 flex flex-col items-center space-y-4">
                {/* Brand Name */}
                <div className="overflow-hidden h-12 flex items-center justify-center">
                    <AnimatePresence>
                        {phase >= 3 && (
                            <MotionDiv
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-3xl md:text-4xl font-light text-white tracking-[0.5em] font-sans"
                                style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}
                            >
                                AHAD
                            </MotionDiv>
                        )}
                    </AnimatePresence>
                </div>

                {/* Subtitle / Loading Line */}
                <div className="w-48 h-[1px] bg-slate-800 relative overflow-hidden">
                    {phase >= 3 && (
                        <MotionDiv 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
                        />
                    )}
                </div>
                
                <AnimatePresence>
                    {phase >= 3 && (
                        <MotionSpan
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-mono"
                        >
                            Developing Future
                        </MotionSpan>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* --- WHOLE SCREEN TRANSITION OVERLAY --- */}
        {/* White flash or warp effect on exit */}
        <AnimatePresence>
            {phase === 4 && (
                <MotionDiv 
                    className="absolute inset-0 bg-white z-20 pointer-events-none mix-blend-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.8, 0] }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />
            )}
        </AnimatePresence>
    </MotionDiv>
  );
};

export default InitialLoader;
