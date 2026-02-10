
import React, { useState, useEffect } from 'react';
import { Repeat, Brain, Check, X, RotateCw, Layers, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface Flashcard {
    id: string;
    question: string;
    answer: string;
    category: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    nextReview: number; // timestamp
}

const INITIAL_DECK: Flashcard[] = [
    {
        id: '1',
        category: 'System Design',
        question: 'What is the CAP Theorem?',
        answer: 'In a distributed system, you can only satisfy 2 out of 3 guarantees: Consistency (every read receives most recent write), Availability (every request receives a response), and Partition Tolerance (system continues despite network message drops).',
        difficulty: 'MEDIUM',
        nextReview: 0
    },
    {
        id: '2',
        category: 'Rust',
        question: 'Explain the concept of "Ownership" in Rust.',
        answer: '1. Each value in Rust has a variable that’s called its owner.\n2. There can only be one owner at a time.\n3. When the owner goes out of scope, the value will be dropped (memory freed).',
        difficulty: 'HARD',
        nextReview: 0
    },
    {
        id: '3',
        category: 'Database',
        question: 'What is the difference between Clustered and Non-Clustered Indexes?',
        answer: 'Clustered: Sorts and stores the data rows in the table based on the key (only 1 per table). Non-Clustered: A separate structure pointing to the data rows (can have multiple).',
        difficulty: 'MEDIUM',
        nextReview: 0
    },
    {
        id: '4',
        category: 'React',
        question: 'Why should you avoid using array index as a key prop?',
        answer: 'If the list order changes (sorting/filtering), React uses keys to match tree nodes. Using indices leads to incorrect state mapping and performance issues during reconciliation.',
        difficulty: 'EASY',
        nextReview: 0
    },
    {
        id: '5',
        category: 'Networking',
        question: 'Explain the 3-Way Handshake in TCP.',
        answer: 'SYN (Client sends synchronize), SYN-ACK (Server acknowledges), ACK (Client acknowledges). Establishes a reliable connection before data transfer.',
        difficulty: 'MEDIUM',
        nextReview: 0
    }
];

const FlashcardSRS: React.FC = () => {
    const [deck, setDeck] = useState<Flashcard[]>(INITIAL_DECK);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [sessionStats, setSessionStats] = useState({ reviewed: 0, correct: 0 });
    
    // Simple "algorithm" - just moves card to end of queue or keeps it near based on rating
    const handleRate = (rating: 'AGAIN' | 'HARD' | 'GOOD' | 'EASY') => {
        const currentCard = deck[currentCardIndex];
        let nextDeck = [...deck];
        
        // Remove current card from its position
        nextDeck.splice(currentCardIndex, 1);

        // Re-insert based on rating
        if (rating === 'AGAIN') {
            // Put it 3 cards later or end if smaller
            const insertIdx = Math.min(nextDeck.length, 2);
            nextDeck.splice(insertIdx, 0, currentCard);
        } else if (rating === 'HARD') {
            const insertIdx = Math.min(nextDeck.length, 5);
            nextDeck.splice(insertIdx, 0, currentCard);
        } else {
            // GOOD/EASY: Push to end (simplified "review later")
            nextDeck.push(currentCard);
            setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
        }

        setSessionStats(prev => ({ ...prev, reviewed: prev.reviewed + 1 }));
        setDeck(nextDeck);
        setIsFlipped(false);
        // Index stays 0 because we removed the top card
    };

    const progress = Math.min(100, (sessionStats.reviewed / 20) * 100); // Goal: 20 cards

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
                        <Repeat className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Spaced Repetition</h1>
                        <p className="text-[10px] font-mono text-slate-500">Active Recall Engine</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Session Goal</span>
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

                <div className="w-full max-w-2xl perspective-1000 relative z-10">
                    <AnimatePresence mode="wait">
                        <MotionDiv
                            key={deck[0].id}
                            initial={{ opacity: 0, rotateX: -10, y: 50 }}
                            animate={{ opacity: 1, rotateX: 0, y: 0 }}
                            exit={{ opacity: 0, rotateX: 10, y: -50 }}
                            transition={{ duration: 0.3 }}
                            className="relative min-h-[400px]"
                        >
                            {/* The Card */}
                            <div 
                                className="w-full h-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-slate-700 group"
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                <div className="absolute top-6 left-6 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-emerald-500" />
                                    {deck[0].category}
                                </div>
                                <div className="absolute top-6 right-6">
                                    <span className="text-[10px] font-mono text-slate-600 border border-slate-800 px-2 py-1 rounded">
                                        ID: {deck[0].id}
                                    </span>
                                </div>

                                <div className="flex-1 flex flex-col items-center justify-center">
                                    {!isFlipped ? (
                                        <div className="space-y-6">
                                            <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                                                {deck[0].question}
                                            </h2>
                                            <p className="text-sm text-slate-500 font-mono animate-pulse">
                                                Tap to Reveal Answer
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6 animate-fade-in">
                                            <div className="w-12 h-1 bg-emerald-500 rounded-full mx-auto" />
                                            <p className="text-lg md:text-xl text-emerald-100 leading-relaxed font-medium whitespace-pre-wrap">
                                                {deck[0].answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </MotionDiv>
                    </AnimatePresence>

                    {/* Controls */}
                    {isFlipped && (
                        <div className="mt-8 grid grid-cols-4 gap-4 animate-slide-up">
                            <button onClick={() => handleRate('AGAIN')} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500 hover:bg-red-900/10 transition-all group">
                                <span className="text-xs font-bold text-red-400 group-hover:text-red-300">Again</span>
                                <span className="text-[10px] text-slate-500 font-mono">&lt; 1m</span>
                            </button>
                            <button onClick={() => handleRate('HARD')} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500 hover:bg-orange-900/10 transition-all group">
                                <span className="text-xs font-bold text-orange-400 group-hover:text-orange-300">Hard</span>
                                <span className="text-[10px] text-slate-500 font-mono">2d</span>
                            </button>
                            <button onClick={() => handleRate('GOOD')} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-blue-900/10 transition-all group">
                                <span className="text-xs font-bold text-blue-400 group-hover:text-blue-300">Good</span>
                                <span className="text-[10px] text-slate-500 font-mono">4d</span>
                            </button>
                            <button onClick={() => handleRate('EASY')} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-900/10 transition-all group">
                                <span className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300">Easy</span>
                                <span className="text-[10px] text-slate-500 font-mono">7d</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FlashcardSRS;
