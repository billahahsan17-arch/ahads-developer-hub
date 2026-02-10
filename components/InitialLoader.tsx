
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ALogo from './ALogo'; // Use the actual ALogo component

const MotionDiv = motion.div;

interface InitialLoaderProps {
  onComplete: () => void;
}

const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [isReadyToTransition, setIsReadyToTransition] = useState(false);

  useEffect(() => {
    // Simulate loading time and then trigger the transition
    const timer = setTimeout(() => {
      setIsReadyToTransition(true);
    }, 2500); // Adjust time as needed

    // When the loader is ready to transition, we wait for its animation to finish, then call onComplete
    if (isReadyToTransition) {
        const exitTimer = setTimeout(onComplete, 500); // This duration should match the exit animation
        return () => clearTimeout(exitTimer);
    }

    return () => clearTimeout(timer);
  }, [isReadyToTransition, onComplete]);

  return (
    <AnimatePresence>
      {!isReadyToTransition ? (
        <MotionDiv
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ 
              opacity: 0,
              transition: { duration: 0.5, ease: 'easeOut' } 
          }}
        >
          {/* The logo is given a layoutId, which allows it to transition to the hero logo */}
          <motion.div layoutId="main-logo-transition">
            <ALogo className="w-64 h-64 text-white" animated={true} />
          </motion.div>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  );
};

export default InitialLoader;
