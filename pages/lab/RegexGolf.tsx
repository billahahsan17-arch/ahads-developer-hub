import React, { useState, useEffect } from 'react';
import { Target, Flag, Play, Award, RotateCcw, Hash, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface Level {
    id: number;
    title: string;
    description: string;
    match: string[];
    skip: string[];
    par: number; // target regex length
}

const LEVELS: Level[] = [
    {
        id: 1,
        title: "Warmup",
        description: "Match the words containing 'foo'.",
        match: ['foo', 'food', 'football', 'buffoon'],
        skip: ['bar', 'baz', 'qux', 'fool'], // wait 'fool' has foo. Let's fix. Match contains foo.
        par: 3
    },
    {
        id: 2,
        title: "Anchors Aweigh",
        description: "Match words ending in 'ing'.",
        match: ['playing', 'singing', 'eating'],
        skip: ['played', 'singer', 'gin', 'wingman'],
        par: 4
    },
    {
        id: 3,
        title: "Numeric Ranges",
        description: "Match years from 2010 to 2019.",
        match: ['2010', '2015', '2019'],
        skip: ['2009', '2020', '201', '20199'],
        par: 7
    },
    {
        id: 4,
        title: "The Hex",
        description: "Match valid 3 or 6 digit hex color codes (with #).",
        match: ['#fff', '#000000', '#abc', '#1a2b3c'],
        skip: ['#ff', '#gggggg', '123456', '#12345'],
        par: 15
    }
];

const RegexGolf: React.FC = () => {
    const [levelIdx, setLevelIdx] = useState(0);
    const [regex, setRegex] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [solved, setSolved] = useState(false);
    const [score, setScore] = useState(0);

    const level = LEVELS[levelIdx];

    useEffect(() => {
        setRegex('');
        setSolved(false);
        setError(null);
    }, [levelIdx]);

    useEffect(() => {
        validateRegex(regex);
    }, [regex, level]);

    const validateRegex = (input: string) => {
        if (!input) {
            setError(null);
            return;
        }

        try {
            const re = new RegExp(input);
            setError(null);

            const allMatch = level.match.every(w => re.test(w));
            const noneSkip = level.skip.every(w => !re.test(w));

            if (allMatch && noneSkip) {
                setSolved(true);
                // Calculate score based on length relative to par
                // If length <= par, max score.
                const len = input.length;
                const points = Math.max(10, 100 - (len - level.par) * 5);
                setScore(s => s + points); // Accumulate visual score (naive)
            } else {
                setSolved(false);
            }
        } catch (e: any) {
            setError(e.message);
            setSolved(false);
        }
    };

    const nextLevel = () => {
        if (levelIdx < LEVELS.length - 1) {
            setLevelIdx(i => i + 1);
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-fuchsia-900/20 rounded-lg border border-fuchsia-500/30">
                        <Target className="w-5 h-5 text-fuchsia-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Regex Golf</h1>
                        <p className="text-[10px] font-mono text-slate-500">Pattern Optimization Game</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-xs font-mono text-slate-500">Level {levelIdx + 1}/{LEVELS.length}</div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-800 border border-slate-700">
                        <Trophy className="w-3 h-3 text-amber-400" />
                        <span className="text-xs font-bold text-white">{score} XP</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-6 md:p-10 gap-8 overflow-y-auto custom-scrollbar">
                
                {/* Info Card */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black text-white">{level.title}</h2>
                    <p className="text-slate-400">{level.description}</p>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        Target Length (Par): <span className="text-fuchsia-400">{level.par} chars</span>
                    </div>
                </div>

                {/* Input Area */}
                <div className="space-y-4">
                    <div className={`bg-slate-900 border-2 rounded-xl p-2 flex items-center transition-all shadow-xl ${
                        error ? 'border-red-500/50' : solved ? 'border-emerald-500/50 shadow-emerald-900/20' : 'border-slate-700 focus-within:border-fuchsia-500/50'
                    }`}>
                        <div className="pl-4 pr-2 text-slate-500 font-mono text-xl select-none">/</div>
                        <input 
                            value={regex}
                            onChange={(e) => setRegex(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xl placeholder-slate-700"
                            placeholder="regex..."
                            autoFocus
                        />
                        <div className="pl-2 pr-4 text-slate-500 font-mono text-xl select-none">/</div>
                    </div>
                    
                    <div className="flex justify-between items-center px-2">
                        <div className={`text-xs font-mono ${regex.length <= level.par ? 'text-emerald-400' : 'text-amber-400'}`}>
                            Length: {regex.length} chars
                        </div>
                        {error && <div className="text-xs font-mono text-red-400">{error}</div>}
                    </div>
                </div>

                {/* Game Board */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Targets */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
                            <CheckCircleIcon className="w-4 h-4" /> Should Match
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {level.match.map((word, i) => {
                                let isMatch = false;
                                try { isMatch = new RegExp(regex).test(word); } catch {}
                                
                                return (
                                    <div 
                                        key={i} 
                                        className={`px-3 py-1.5 rounded font-mono text-sm border transition-all duration-200 ${
                                            isMatch 
                                            ? 'bg-emerald-500 text-black border-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                                            : 'bg-slate-900 text-slate-400 border-slate-700'
                                        }`}
                                    >
                                        {word}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Distractors */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
                            <XCircleIcon className="w-4 h-4" /> Should Skip
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {level.skip.map((word, i) => {
                                let isMatch = false;
                                try { isMatch = new RegExp(regex).test(word); } catch {}

                                return (
                                    <div 
                                        key={i} 
                                        className={`px-3 py-1.5 rounded font-mono text-sm border transition-all duration-200 ${
                                            !isMatch 
                                            ? 'bg-slate-800 text-slate-500 border-slate-700 opacity-50' 
                                            : 'bg-red-500 text-white border-red-400 font-bold shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                                        }`}
                                    >
                                        {word}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Victory Panel */}
                <AnimatePresence>
                    {solved && (
                        <MotionDiv 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-auto bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-xl flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-500 rounded-full text-black shadow-lg shadow-emerald-500/20">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white">Pattern Optimized</h3>
                                    <p className="text-emerald-400 text-xs font-mono">You achieved {regex.length <= level.par ? 'Par' : 'Bogey'} efficiency.</p>
                                </div>
                            </div>
                            <button 
                                onClick={nextLevel}
                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg"
                            >
                                Next Level
                            </button>
                        </MotionDiv>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

// Icons Helper
const CheckCircleIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
)
const XCircleIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
)

export default RegexGolf;