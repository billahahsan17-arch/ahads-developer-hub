
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import ALogo from '../ALogo';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionLink = motion(Link) as any;

// Staggered animation variant for parent container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Time delay between each child animating in
      delayChildren: 0.8,   // Wait for the logo to settle before starting text animations
    },
  },
};

// Animation variant for individual child elements
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};


const ParticleField = () => {
    const ref = useRef<any>();
    const sphere = useMemo(() => {
        const temp = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const r = 1.8 * Math.cbrt(Math.random()); 
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            temp[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            temp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            temp[i * 3 + 2] = r * Math.cos(phi);
        }
        return temp;
    }, []);
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 30;
            ref.current.rotation.y -= delta / 35;
        }
    });
    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={true}>
                <PointMaterial transparent color="#ffffff" size={0.002} sizeAttenuation={true} depthWrite={false} opacity={0.7} />
            </Points>
        </group>
    );
};

const HeroScene: React.FC = () => {
  return (
    <div className="relative h-full w-full bg-black overflow-hidden flex items-center justify-center">
        {/* Background Atmosphere - Using motion.div for entry animation */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[150px] opacity-50" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-40" />
        </MotionDiv>

        <div className="absolute inset-0 z-10 opacity-50 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1]}>
                <ParticleField />
                <Stars radius={120} depth={60} count={2000} factor={5} saturation={0} fade speed={0.7} />
            </Canvas>
        </div>

        {/* Main Content Grid */}
        <div className="relative z-20 w-full max-w-7xl px-6 md:px-12 h-full flex items-center">
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                
                {/* LEFT: Orchestrated Typography */}
                <MotionDiv 
                  className="space-y-6 text-center lg:text-left"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                        <span className="text-blue-400">A.H.A.D</span> // Your Digital Architect
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0">
                       Building the future of web, one line of code at a time. I craft intelligent, beautiful, and high-performance applications that push the boundaries of user experience.
                    </motion.p>
                    <MotionLink 
                        variants={itemVariants}
                        to="/ai-arsenal"
                        className="inline-flex items-center gap-2 bg-blue-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    >
                        Explore The Arsenal <ArrowRight className="w-4 h-4" />
                    </MotionLink>
                </MotionDiv>

                {/* RIGHT: The Centerpiece Logo with shared layout transition */}
                <div className="hidden lg:flex justify-center items-center relative">
                    <motion.div layoutId="main-logo-transition">
                         <ALogo className="w-96 h-96 text-white opacity-90" animated={false} />
                    </motion.div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default HeroScene;
