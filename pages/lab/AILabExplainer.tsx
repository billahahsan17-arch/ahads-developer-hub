
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap } from 'lucide-react';

interface AILabExplainerProps {
    title: string;
    description: string;
    features: string[];
}

export const AILabExplainer: React.FC<AILabExplainerProps> = ({ title, description, features }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 shadow-lg"
        >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <Zap className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-slate-400 max-w-4xl mb-6">
                {description}
            </motion.p>

            <motion.div 
                 variants={itemVariants}
                 className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
            >
                {features.map((feature, i) => (
                    <motion.div key={i} variants={itemVariants} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};
