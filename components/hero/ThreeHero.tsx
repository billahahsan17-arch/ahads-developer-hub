
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import AtlasLogo from '../AtlasLogo';

const MotionDiv = motion.div as any;

// --- 3D PARTICLE FIELD GENERATOR ---
const ParticleField = () => {
    const ref = useRef<any>();
    
    // ULTRA-OPTIMIZED: 1200 points for guaranteed 60FPS on laptops
    const sphere = useMemo(() => {
        const temp = new Float32Array(1200 * 3);
        for (let i = 0; i < 1200; i++) {
            const r = 1.8 * Math.cbrt(Math.random()); 
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            temp[i * 3] = x;
            temp[i * 3 + 1] = y;
            temp[i * 3 + 2] = z;
        }
        return temp;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            // Slower rotation for elegance and lower motion blur calc
            ref.current.rotation.x -= delta / 25; 
            ref.current.rotation.y -= delta / 30;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={true}>
                <PointMaterial
                    transparent
                    color="#6366f1" 
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
};

const HeroScene: React.FC = () => {
  return (
    <div className="relative h-full w-full bg-[#020617] overflow-hidden flex items-center justify-center">
        
        {/* 1. 3D Canvas Layer (The Void) */}
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
            {/* Forced low DPR for performance stability */}
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1]}>
                <ParticleField />
                <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={0.5} />
            </Canvas>
        </div>

        {/* 2. Main Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 h-full flex items-center pointer-events-none">
            
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full mt-12">
                
                {/* LEFT: Typography Only */}
                <div className="pointer-events-auto space-y-10">
                    
                    {/* Main Heading */}
                    <MotionDiv
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.95] drop-shadow-2xl">
                            ELITE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 animate-shimmer bg-[length:200%_100%]">
                                ENGINEERING OS
                            </span>
                        </h1>
                    </MotionDiv>

                    {/* Description */}
                    <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col md:flex-row gap-6 md:items-start"
                    >
                        <div className="h-full w-1 bg-gradient-to-b from-indigo-500 to-transparent hidden md:block rounded-full opacity-50 min-h-[80px]" />
                        <div className="space-y-4">
                            <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                                The complete ecosystem for software mastery. Architect robust systems, sharpen skills in <span className="text-white font-medium">The Forge</span>, and accelerate workflow with <span className="text-white font-medium">Neural AI Agents</span>.
                            </p>
                        </div>
                    </MotionDiv>
                </div>

                {/* RIGHT: Visual Anchor / Logo */}
                <MotionDiv
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="hidden lg:flex justify-center items-center relative pointer-events-auto"
                >
                    {/* Ambient Glow behind logo */}
                    <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full" />
                    
                    {/* Floating Logo */}
                    <MotionDiv
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        <AtlasLogo className="w-96 h-96 text-white opacity-90 drop-shadow-[0_0_50px_rgba(99,102,241,0.5)]" animated={true} />
                    </MotionDiv>
                </MotionDiv>

            </div>
        </div>
    </div>
  );
};

export default HeroScene;
