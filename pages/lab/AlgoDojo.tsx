
import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, XCircle, Code2, Cpu, ChevronRight, RefreshCw, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import CodeBlock from '../../components/CodeBlock';

const MotionDiv = motion.div as any;

interface TestCase {
    input: any[];
    expected: any;
}

interface Problem {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    starterCode: string;
    testCases: TestCase[];
}

const PROBLEMS: Problem[] = [
    {
        id: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
        starterCode: `function twoSum(nums, target) {
  // Write your code here
  
}`,
        testCases: [
            { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
            { input: [[3, 2, 4], 6], expected: [1, 2] },
            { input: [[3, 3], 6], expected: [0, 1] }
        ]
    },
    {
        id: 'palindrome',
        title: 'Valid Palindrome',
        difficulty: 'Easy',
        description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.`,
        starterCode: `function isPalindrome(s) {
  // Write your code here
  return false;
}`,
        testCases: [
            { input: ["A man, a plan, a canal: Panama"], expected: true },
            { input: ["race a car"], expected: false },
            { input: [" "], expected: true }
        ]
    },
    {
        id: 'fizzbuzz',
        title: 'FizzBuzz',
        difficulty: 'Easy',
        description: `Given an integer n, return a string array answer (1-indexed) where:
- answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
- answer[i] == "Fizz" if i is divisible by 3.
- answer[i] == "Buzz" if i is divisible by 5.
- answer[i] == i (as a string) if none of the above conditions are true.`,
        starterCode: `function fizzBuzz(n) {
  // Return array of strings
  
}`,
        testCases: [
            { input: [3], expected: ["1","2","Fizz"] },
            { input: [5], expected: ["1","2","Fizz","4","Buzz"] }
        ]
    }
];

const AlgoDojo: React.FC = () => {
    const [activeProblem, setActiveProblem] = useState(PROBLEMS[0]);
    const [code, setCode] = useState(PROBLEMS[0].starterCode);
    const [results, setResults] = useState<{ passed: boolean; output: any; expected: any; error?: string }[] | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        setCode(activeProblem.starterCode);
        setResults(null);
    }, [activeProblem]);

    const runTests = async () => {
        setIsRunning(true);
        setResults(null);

        // Simulate processing delay for "realism"
        await new Promise(r => setTimeout(r, 600));

        const newResults = activeProblem.testCases.map(tc => {
            try {
                // SANDBOXED EXECUTION (Client-side)
                // Note: In a real secure app, this runs in a WebWorker or iframe.
                // For this local tool, new Function is acceptable.
                const userFn = new Function('return ' + code)();
                
                // Deep clone input to prevent mutation issues affecting display
                const inputClone = JSON.parse(JSON.stringify(tc.input));
                const result = userFn(...inputClone);
                
                const isPass = JSON.stringify(result) === JSON.stringify(tc.expected);
                return { passed: isPass, output: result, expected: tc.expected };
            } catch (e: any) {
                return { passed: false, output: null, expected: tc.expected, error: e.message };
            }
        });

        setResults(newResults);
        setIsRunning(false);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
                        <Cpu className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Algo Dojo</h1>
                        <p className="text-[10px] font-mono text-slate-500">Algorithmic Mastery Engine</p>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    {PROBLEMS.map((p, i) => (
                        <button 
                            key={p.id}
                            onClick={() => setActiveProblem(p)}
                            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${
                                activeProblem.id === p.id 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-slate-800 text-slate-500 hover:text-white'
                            }`}
                        >
                            {i + 1}. {p.title}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                
                {/* Left: Problem Description */}
                <div className="w-1/3 bg-[#0b0f19] border-r border-slate-800 flex flex-col">
                    <div className="p-6 border-b border-slate-800">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-black text-white">{activeProblem.title}</h2>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${
                                activeProblem.difficulty === 'Easy' ? 'text-emerald-400 border-emerald-900 bg-emerald-900/10' :
                                activeProblem.difficulty === 'Medium' ? 'text-amber-400 border-amber-900 bg-amber-900/10' :
                                'text-red-400 border-red-900 bg-red-900/10'
                            }`}>
                                {activeProblem.difficulty}
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                            {activeProblem.description}
                        </p>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Examples</h3>
                        <div className="space-y-4">
                            {activeProblem.testCases.slice(0, 2).map((tc, i) => (
                                <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono">
                                    <div className="mb-1"><span className="text-slate-500">Input:</span> <span className="text-blue-300">{JSON.stringify(tc.input)}</span></div>
                                    <div><span className="text-slate-500">Output:</span> <span className="text-emerald-300">{JSON.stringify(tc.expected)}</span></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Editor & Execution */}
                <div className="w-2/3 flex flex-col bg-[#020617]">
                    
                    {/* Editor Toolbar */}
                    <div className="h-10 bg-[#010409] border-b border-slate-800 flex items-center justify-between px-4">
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                            <Code2 className="w-3 h-3" /> solution.js
                        </div>
                        <button 
                            onClick={runTests}
                            disabled={isRunning}
                            className="flex items-center gap-2 px-4 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-widest rounded transition-all disabled:opacity-50"
                        >
                            {isRunning ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                            Run Code
                        </button>
                    </div>

                    {/* Editor */}
                    <div className="flex-1 relative">
                        <textarea 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="absolute inset-0 w-full h-full bg-[#0d1117] text-slate-300 font-mono text-sm p-6 resize-none outline-none custom-scrollbar leading-relaxed"
                            spellCheck={false}
                        />
                    </div>

                    {/* Test Results Console */}
                    <div className="h-1/3 bg-slate-950 border-t border-slate-800 flex flex-col">
                        <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Terminal className="w-3 h-3" /> Execution Console
                            </span>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                            {!results ? (
                                <div className="text-slate-600 font-mono text-xs italic">Ready to execute tests...</div>
                            ) : (
                                <div className="space-y-2">
                                    {results.map((res, i) => (
                                        <MotionDiv 
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className={`p-3 rounded border text-xs font-mono flex items-start gap-3 ${
                                                res.passed ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-red-950/20 border-red-900/50'
                                            }`}
                                        >
                                            {res.passed ? (
                                                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                            )}
                                            <div className="flex-1">
                                                <div className="font-bold mb-1 text-slate-300">Test Case {i + 1}</div>
                                                <div className="text-slate-500">Input: <span className="text-slate-300">{JSON.stringify(activeProblem.testCases[i].input)}</span></div>
                                                
                                                {res.error ? (
                                                    <div className="text-red-400 mt-1">Error: {res.error}</div>
                                                ) : (
                                                    <>
                                                        <div className="text-slate-500">Expected: <span className="text-emerald-400">{JSON.stringify(res.expected)}</span></div>
                                                        {!res.passed && (
                                                            <div className="text-slate-500">Received: <span className="text-red-400">{JSON.stringify(res.output)}</span></div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </MotionDiv>
                                    ))}
                                    
                                    {results.every(r => r.passed) && (
                                        <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 font-bold text-center uppercase tracking-widest text-sm animate-pulse">
                                            All Tests Passed // Solution Accepted
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AlgoDojo;
