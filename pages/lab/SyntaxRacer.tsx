
import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Timer, Zap, Trophy, Code2 } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

const SNIPPETS = [
    {
        lang: 'Rust',
        code: `fn main() {
    let mut vec = Vec::new();
    vec.push(1);
    vec.push(2);
    println!("Vector: {:?}", vec);
}`
    },
    {
        lang: 'Go',
        code: `package main

import "fmt"

func main() {
    ch := make(chan int)
    go func() { ch <- 42 }()
    fmt.Println(<-ch)
}`
    },
    {
        lang: 'TypeScript',
        code: `interface User {
  id: number;
  name: string;
}

const getUser = (id: number): Promise<User> => {
  return fetch(\`/api/users/\${id}\`).then(r => r.json());
};`
    }
];

const SyntaxRacer: React.FC = () => {
    const { addXP } = useProgress();
    const [snippetIndex, setSnippetIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isFinished, setIsFinished] = useState(false);
    
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const snippet = SNIPPETS[snippetIndex].code;

    // Reset on snippet change
    useEffect(() => {
        setUserInput('');
        setStartTime(null);
        setEndTime(null);
        setWpm(0);
        setAccuracy(100);
        setIsFinished(false);
        if (inputRef.current) inputRef.current.focus();
    }, [snippetIndex]);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (isFinished) return;
        
        const val = e.target.value;
        if (!startTime && val.length === 1) {
            setStartTime(Date.now());
        }

        setUserInput(val);

        // Check for completion
        if (val === snippet) {
            const end = Date.now();
            setEndTime(end);
            setIsFinished(true);
            calculateStats(val, end);
            addXP(50); // XP Reward
        } else {
            // Live Stats (Rough)
            // Just accuracy calc
            let errors = 0;
            for (let i = 0; i < val.length; i++) {
                if (val[i] !== snippet[i]) errors++;
            }
            setAccuracy(Math.max(0, 100 - Math.round((errors / val.length) * 100)));
        }
    };

    const calculateStats = (finalInput: string, end: number) => {
        if (!startTime) return;
        const timeInMinutes = (end - startTime) / 60000;
        const words = finalInput.length / 5; // Standard WPM calc
        setWpm(Math.round(words / timeInMinutes));
    };

    const renderOverlay = () => {
        return snippet.split('').map((char, index) => {
            let colorClass = 'text-slate-600'; // Default untyped
            let userChar = userInput[index];

            if (userChar === undefined) {
                // Not typed yet
                colorClass = 'text-slate-700 opacity-50';
            } else if (userChar === char) {
                // Correct
                colorClass = 'text-emerald-400 text-shadow-glow';
            } else {
                // Incorrect
                colorClass = 'text-red-500 bg-red-900/30';
                if (char === '\n') return <span key={index} className="text-red-500">↵<br/></span>;
            }

            return (
                <span key={index} className={colorClass}>
                    {char}
                </span>
            );
        });
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-900/20 rounded-lg border border-blue-500/30">
                        <Zap className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Syntax Racer</h1>
                        <p className="text-[10px] font-mono text-slate-500">Speed Coding: {SNIPPETS[snippetIndex].lang}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">WPM</span>
                        <span className="text-xl font-black text-white leading-none">{wpm}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Accuracy</span>
                        <span className={`text-xl font-black leading-none ${accuracy < 90 ? 'text-red-400' : 'text-emerald-400'}`}>{accuracy}%</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(15,23,42,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                </div>

                <div className="max-w-4xl w-full relative z-10">
                    
                    {/* The Race Track */}
                    <div className="bg-[#0d1117] border border-slate-800 rounded-xl p-8 shadow-2xl relative font-mono text-lg leading-relaxed min-h-[300px]">
                        
                        {/* Overlay Text (Visual) */}
                        <div className="absolute top-8 left-8 right-8 bottom-8 pointer-events-none whitespace-pre-wrap select-none break-all" style={{ wordBreak: 'break-word' }}>
                            {renderHighlightedSnippet(snippet, userInput)}
                        </div>

                        {/* Input Area (Transparent) */}
                        <textarea
                            ref={inputRef}
                            value={userInput}
                            onChange={handleInput}
                            className="w-full h-full bg-transparent text-transparent caret-blue-500 outline-none resize-none absolute inset-0 p-8 font-mono text-lg leading-relaxed whitespace-pre-wrap break-all z-20"
                            spellCheck={false}
                            autoFocus
                            disabled={isFinished}
                        />

                        {isFinished && (
                            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center animate-fade-in">
                                <Trophy className="w-16 h-16 text-emerald-500 mb-4" />
                                <h2 className="text-3xl font-black text-white mb-2">Run Complete</h2>
                                <div className="flex gap-8 mb-8">
                                    <div className="text-center">
                                        <div className="text-sm text-slate-500 uppercase">Speed</div>
                                        <div className="text-4xl font-black text-white">{wpm} <span className="text-sm">WPM</span></div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm text-slate-500 uppercase">Precision</div>
                                        <div className="text-4xl font-black text-emerald-400">{accuracy}%</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSnippetIndex((prev) => (prev + 1) % SNIPPETS.length)}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-blue-900/20"
                                >
                                    Next Challenge
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-between items-center text-xs font-mono text-slate-500">
                        <div className="flex gap-4">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Correct</span>
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Error</span>
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-700"></div> Remaining</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setSnippetIndex((prev) => (prev + 1) % SNIPPETS.length)} className="hover:text-white transition-colors">Skip Snippet</button>
                            <button onClick={() => { setUserInput(''); setStartTime(null); setIsFinished(false); if(inputRef.current) inputRef.current.focus(); }} className="hover:text-white transition-colors flex items-center gap-1">
                                <RotateCcw className="w-3 h-3" /> Restart
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Helper to render the colored text overlay
const renderHighlightedSnippet = (snippet: string, input: string) => {
    const chars = snippet.split('');
    return chars.map((char, i) => {
        let color = 'text-slate-600'; // Default gray
        if (i < input.length) {
            if (input[i] === char) color = 'text-emerald-400';
            else color = 'text-red-500 bg-red-900/30 rounded';
        }
        return <span key={i} className={color}>{char}</span>;
    });
};

export default SyntaxRacer;
