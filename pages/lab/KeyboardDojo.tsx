
import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, Command, Zap, Trophy, RefreshCw, ChevronRight, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;
const TASK_TIME_LIMIT = 5000; // 5 seconds per task

type Mode = 'VIM' | 'VSCODE';

interface Task {
    id: string;
    description: string;
    keys: string[];
    display: string;
}

const VIM_TASKS: Task[] = [
    { id: 'v1', description: 'Move Left', keys: ['h'], display: 'h' },
    { id: 'v2', description: 'Move Down', keys: ['j'], display: 'j' },
    { id: 'v3', description: 'Move Up', keys: ['k'], display: 'k' },
    // ... (rest of the tasks remain the same)
];

const KeyboardDojo: React.FC = () => {
    const [mode, setMode] = useState<Mode>('VIM');
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [inputBuffer, setInputBuffer] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [gameState, setGameState] = useState<'IDLE' | 'ACTIVE' | 'SUCCESS' | 'FAIL'>('IDLE');
    const [timeLeft, setTimeLeft] = useState(TASK_TIME_LIMIT);

    const containerRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const activeTasks = mode === 'VIM' ? VIM_TASKS : [];
    const currentTask = activeTasks[currentTaskIndex];

    useEffect(() => {
        if (gameState === 'ACTIVE') {
            containerRef.current?.focus();
            startTimer();
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [gameState]);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleFailure();
        }
    }, [timeLeft]);

    const startTimer = () => {
        setTimeLeft(TASK_TIME_LIMIT);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => prev - 100);
        }, 100);
    };
    
    const handleFailure = () => {
        setGameState('FAIL');
        setStreak(0);
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeout(() => {
            setInputBuffer([]);
            setGameState('ACTIVE');
        }, 800);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (gameState !== 'ACTIVE') return;
        e.preventDefault();
        const key = e.key === 'Escape' ? 'ESC' : e.key;

        const newBuffer = [...inputBuffer, key];
        setInputBuffer(newBuffer);

        const targetSequence = currentTask.keys;
        const isMatchSoFar = newBuffer.every((k, i) => k === targetSequence[i]);

        if (!isMatchSoFar) {
            handleFailure();
        } else if (newBuffer.length === targetSequence.length) {
            setGameState('SUCCESS');
            setScore(s => s + 10 + (streak * 2) + Math.floor(timeLeft / 1000));
            setStreak(s => s + 1);
            if (timerRef.current) clearInterval(timerRef.current);
            setTimeout(nextTask, 500);
        }
    };

    const nextTask = () => {
        setInputBuffer([]);
        setCurrentTaskIndex((prev) => (prev + 1) % activeTasks.length);
        setGameState('ACTIVE');
    };

    const startGame = () => {
        setScore(0);
        setStreak(0);
        setCurrentTaskIndex(0);
        setInputBuffer([]);
        setGameState('ACTIVE');
    };

    const progressWidth = (timeLeft / TASK_TIME_LIMIT) * 100;

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300 select-none">
            {/* ... Header ... */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 outline-none" tabIndex={0} onKeyDown={handleKeyDown} ref={containerRef}>
                {gameState === 'IDLE' ? (
                     <div className="text-center">
                        {/* ... Idle screen ... */}
                    </div>
                ) : (
                    <div className="w-full max-w-2xl text-center">
                        <AnimatePresence mode="wait">
                            <motion.div key={currentTask.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">Current Directive</h3>
                                <div className="text-4xl md:text-5xl font-black text-white mt-2 mb-8">{currentTask.description}</div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="relative h-32 flex items-center justify-center">
                            <AnimatePresence>
                                {gameState === 'FAIL' && <motion.div initial={{ opacity: 0, scale: 0.5, rotate: -15 }} animate={{ opacity: 1, scale: 1.2, rotate: 0 }} exit={{ opacity: 0, scale: 0.5 }} className="absolute text-red-500 font-black text-7xl uppercase tracking-widest">FAIL</motion.div>}
                                {gameState === 'SUCCESS' && <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1.2, transition: { type: 'spring', stiffness: 300, damping: 10 } }} exit={{ opacity: 0, scale: 0.5 }} className="absolute text-emerald-400 font-black text-7xl uppercase tracking-widest">SUCCESS</motion.div>}
                            </AnimatePresence>
                            {gameState === 'ACTIVE' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                                    {currentTask.keys.map((k, i) => {
                                        const isEntered = i < inputBuffer.length;
                                        return (
                                            <motion.div key={i} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: i * 0.1 } }} className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-mono font-bold border-2 transition-all ${isEntered ? 'bg-amber-500 border-amber-400 text-black shadow-lg shadow-amber-500/50 scale-110' : 'bg-slate-900 border-slate-700 text-slate-600'}`}>
                                                {isEntered ? inputBuffer[i] : k}
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </div>
                        
                        <div className="mt-12 h-2 max-w-sm mx-auto bg-slate-800 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-amber-500" style={{ originX: 0 }} initial={{ width: '100%' }} animate={{ width: `${progressWidth}%` }} transition={{ duration: 0.1, ease: 'linear' }} />
                        </div>

                         <div className="mt-4 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-500">
                                <Command className="w-3 h-3" />
                                <span>Sequence: <span className="text-amber-500 font-bold">{currentTask.display}</span></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* ... Footer ... */}
        </div>
    );
};

export default KeyboardDojo;
