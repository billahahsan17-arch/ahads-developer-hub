
import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, Command, Zap, Trophy, RefreshCw, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

type Mode = 'VIM' | 'VSCODE';

interface Task {
    id: string;
    description: string;
    keys: string[]; // Sequence of keys to press
    display: string; // Visual representation (e.g. "Ctrl + C")
}

const VIM_TASKS: Task[] = [
    { id: 'v1', description: 'Move Left', keys: ['h'], display: 'h' },
    { id: 'v2', description: 'Move Down', keys: ['j'], display: 'j' },
    { id: 'v3', description: 'Move Up', keys: ['k'], display: 'k' },
    { id: 'v4', description: 'Move Right', keys: ['l'], display: 'l' },
    { id: 'v5', description: 'Insert Mode (Before cursor)', keys: ['i'], display: 'i' },
    { id: 'v6', description: 'Append Mode (After cursor)', keys: ['a'], display: 'a' },
    { id: 'v7', description: 'Delete Line', keys: ['d', 'd'], display: 'dd' },
    { id: 'v8', description: 'Undo', keys: ['u'], display: 'u' },
    { id: 'v9', description: 'Go to End of File', keys: ['G'], display: 'G' },
    { id: 'v10', description: 'Go to Start of File', keys: ['g', 'g'], display: 'gg' },
    { id: 'v11', description: 'Visual Mode', keys: ['v'], display: 'v' },
    { id: 'v12', description: 'Copy (Yank) Line', keys: ['y', 'y'], display: 'yy' },
    { id: 'v13', description: 'Paste After', keys: ['p'], display: 'p' },
    { id: 'v14', description: 'Change Word', keys: ['c', 'w'], display: 'cw' },
];

const KeyboardDojo: React.FC = () => {
    const [mode, setMode] = useState<Mode>('VIM');
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [inputBuffer, setInputBuffer] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [gameState, setGameState] = useState<'IDLE' | 'ACTIVE' | 'SUCCESS' | 'FAIL'>('IDLE');
    const [lastKey, setLastKey] = useState<string>('');
    
    // Focus management
    const containerRef = useRef<HTMLDivElement>(null);

    const activeTasks = mode === 'VIM' ? VIM_TASKS : []; // Extend for VSCode later
    const currentTask = activeTasks[currentTaskIndex];

    useEffect(() => {
        if (gameState === 'ACTIVE') {
            containerRef.current?.focus();
        }
    }, [gameState]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (gameState !== 'ACTIVE') return;
        e.preventDefault();
        
        const key = e.key;
        setLastKey(key);

        // Logic to handle sequence matching
        const newBuffer = [...inputBuffer, key];
        setInputBuffer(newBuffer);

        // Check against current task
        const targetSequence = currentTask.keys;
        
        // Compare buffer with target prefix
        const isMatchSoFar = newBuffer.every((k, i) => k === targetSequence[i]);

        if (!isMatchSoFar) {
            // Mistake
            setGameState('FAIL');
            setStreak(0);
            setTimeout(() => {
                setInputBuffer([]);
                setGameState('ACTIVE');
            }, 500);
        } else if (newBuffer.length === targetSequence.length) {
            // Complete match
            setGameState('SUCCESS');
            setScore(s => s + 10 + (streak * 2));
            setStreak(s => s + 1);
            setTimeout(nextTask, 300);
        }
    };

    const nextTask = () => {
        setInputBuffer([]);
        setGameState('ACTIVE');
        setCurrentTaskIndex((prev) => (prev + 1) % activeTasks.length);
    };

    const startGame = () => {
        setScore(0);
        setStreak(0);
        setCurrentTaskIndex(0);
        setInputBuffer([]);
        setGameState('ACTIVE');
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-900/20 rounded-lg border border-amber-500/30">
                        <Keyboard className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Keyboard Dojo</h1>
                        <p className="text-[10px] font-mono text-slate-500">Muscle Memory Trainer // {mode}</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Score</span>
                        <span className="text-xl font-black text-white leading-none">{score}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Streak</span>
                        <span className="text-xl font-black text-amber-500 leading-none">x{streak}</span>
                    </div>
                </div>
            </div>

            {/* Main Arena */}
            <div 
                className="flex-1 flex flex-col items-center justify-center p-6 outline-none"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                ref={containerRef}
            >
                {gameState === 'IDLE' ? (
                    <div className="text-center space-y-6">
                        <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-slate-800 shadow-2xl">
                            <Zap className="w-12 h-12 text-amber-500" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white mb-2">Ready to Train?</h2>
                            <p className="text-slate-500 font-mono text-sm">Select your weapon system.</p>
                        </div>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => { setMode('VIM'); startGame(); }} className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-amber-900/20">
                                VIM Mode
                            </button>
                            <button disabled className="px-8 py-3 bg-slate-800 text-slate-500 font-bold uppercase tracking-widest rounded-lg cursor-not-allowed border border-slate-700">
                                VS Code (Soon)
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-2xl space-y-12">
                        
                        {/* Task Display */}
                        <div className="text-center space-y-4">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">Current Directive</h3>
                            <div className="text-4xl md:text-5xl font-black text-white">{currentTask.description}</div>
                        </div>

                        {/* Input Visualizer */}
                        <div className="relative h-32 flex items-center justify-center gap-4">
                            <AnimatePresence mode="wait">
                                {gameState === 'FAIL' ? (
                                    <MotionDiv 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1.1, rotate: [0, -5, 5, 0] }}
                                        exit={{ opacity: 0 }}
                                        className="text-red-500 font-black text-6xl uppercase tracking-widest"
                                    >
                                        MISS
                                    </MotionDiv>
                                ) : gameState === 'SUCCESS' ? (
                                    <MotionDiv 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1.2 }}
                                        exit={{ opacity: 0 }}
                                        className="text-emerald-500 font-black text-6xl uppercase tracking-widest"
                                    >
                                        GOOD
                                    </MotionDiv>
                                ) : (
                                    <div className="flex gap-2">
                                        {/* Render key placeholders */}
                                        {currentTask.keys.map((k, i) => {
                                            const active = i < inputBuffer.length;
                                            return (
                                                <div 
                                                    key={i}
                                                    className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-mono font-bold border-2 transition-all ${
                                                        active 
                                                        ? 'bg-amber-500 border-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-110' 
                                                        : 'bg-slate-900 border-slate-700 text-slate-600'
                                                    }`}
                                                >
                                                    {active ? inputBuffer[i] : '?'}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Hint / Helper */}
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-500">
                                <Command className="w-3 h-3" />
                                <span>Sequence: <span className="text-amber-500 font-bold">{currentTask.display}</span></span>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="h-12 border-t border-slate-800 bg-[#0d1117] flex items-center justify-center text-[10px] text-slate-600 font-mono uppercase tracking-widest">
                Press keys to execute. Do not use mouse.
            </div>
        </div>
    );
};

export default KeyboardDojo;
