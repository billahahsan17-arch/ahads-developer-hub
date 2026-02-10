
import React, { useState, useEffect } from 'react';
import { GitPullRequest, CheckCircle, XCircle, AlertTriangle, Code, RefreshCw, Loader, ChevronRight, ShieldAlert, Trophy } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface Challenge {
    id: string;
    filename: string;
    language: string;
    code: string;
    bugLine: number;
    bugType: string;
    explanation: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

const LOCAL_CHALLENGES: Challenge[] = [
    {
        id: 'vuln-1',
        filename: 'auth_middleware.ts',
        language: 'typescript',
        difficulty: 'MEDIUM',
        code: `import { Request, Response, NextFunction } from 'express';

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Unauthorized');

  const token = authHeader.split(' ')[1];
  
  // DECODE PAYLOAD (Missing Signature Verification)
  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

  if (payload.role === 'ADMIN') {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};`,
        bugLine: 10,
        bugType: 'Broken Authentication (JWT)',
        explanation: 'The code decodes the JWT payload to trust the "role" claim but never verifies the cryptographic signature. An attacker can forge a token with "role": "ADMIN" and bypass security completely.'
    },
    {
        id: 'vuln-2',
        filename: 'user_query.go',
        language: 'go',
        difficulty: 'EASY',
        code: `func GetUserByEmail(email string) (*User, error) {
    query := fmt.Sprintf("SELECT * FROM users WHERE email = '%s'", email)
    
    row := db.QueryRow(query)
    
    var user User
    err := row.Scan(&user.ID, &user.Name, &user.Email)
    if err != nil {
        return nil, err
    }
    return &user, nil
}`,
        bugLine: 2,
        bugType: 'SQL Injection',
        explanation: 'Using fmt.Sprintf to construct SQL queries allows attackers to manipulate the query structure (e.g., "\' OR \'1\'=\'1"). Always use parameterized queries (e.g., db.QueryRow("... WHERE email = ?", email)).'
    },
    {
        id: 'vuln-3',
        filename: 'Dashboard.tsx',
        language: 'typescript',
        difficulty: 'MEDIUM',
        code: `const Dashboard = ({ userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(userId).then(res => {
        // This triggers a re-render...
        setData(res);
    });
  }); // ...which triggers useEffect again because dependency array is missing!

  if (!data) return <Loader />;
  return <div>{data.title}</div>;
};`,
        bugLine: 8,
        bugType: 'Infinite Render Loop',
        explanation: 'The useEffect hook has no dependency array. It runs after every render. Since it calls setData(), it triggers a re-render, creating an infinite loop that freezes the browser.'
    },
    {
        id: 'vuln-4',
        filename: 'payment_calc.py',
        language: 'python',
        difficulty: 'HARD',
        code: `def calculate_total(items):
    total = 0.0
    for item in items:
        # Floating point arithmetic for currency
        total += item['price'] * item['quantity']
    
    if total > 1000.00:
        apply_discount(total)
    
    return total`,
        bugLine: 4,
        bugType: 'Floating Point Precision Error',
        explanation: 'Using standard floats (0.0) for currency leads to precision errors (e.g., 0.1 + 0.2 != 0.3). In financial systems, this causes drift. Use the Decimal class for exact fixed-point arithmetic.'
    }
];

const PRDojo: React.FC = () => {
    const { addXP, incrementMistake } = useProgress();
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedLine, setSelectedLine] = useState<number | null>(null);
    const [status, setStatus] = useState<'REVIEWING' | 'SUCCESS' | 'FAILURE'>('REVIEWING');
    const [lines, setLines] = useState<string[]>([]);

    const loadChallenge = async () => {
        setLoading(true);
        setStatus('REVIEWING');
        setSelectedLine(null);
        
        // Simulate "Network" delay for realism
        await new Promise(r => setTimeout(r, 600));
        
        // Random selection logic
        const random = LOCAL_CHALLENGES[Math.floor(Math.random() * LOCAL_CHALLENGES.length)];
        
        setChallenge(random);
        setLines(random.code.split('\n'));
        setLoading(false);
    };

    useEffect(() => {
        loadChallenge();
    }, []);

    const handleSubmit = () => {
        if (!challenge || selectedLine === null) return;

        // Allow a margin of error of +/- 0 lines (Strict Mode for local) or 1 for UX
        const isCorrect = selectedLine === challenge.bugLine;

        if (isCorrect) {
            setStatus('SUCCESS');
            addXP(250); // XP Reward
        } else {
            setStatus('FAILURE');
            incrementMistake(); // Mistake Genome tracking
        }
    };

    return (
        <div className="h-full bg-[#0d1117] text-slate-300 flex flex-col font-sans overflow-hidden">
            
            {/* Header */}
            <div className="h-16 border-b border-slate-800 bg-[#010409] flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-900/20 rounded-lg border border-purple-500/30">
                        <GitPullRequest className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-white uppercase tracking-wider">PR Review Dojo</h1>
                        <p className="text-[10px] text-slate-500 font-mono">Elite Code Audit Simulation</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={loadChallenge}
                        className="flex items-center gap-2 px-3 py-1.5 rounded border border-slate-700 hover:bg-slate-800 text-xs font-bold uppercase transition-colors"
                    >
                        <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                        Next PR
                    </button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden">
                
                {/* Code Viewer */}
                <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#0d1117]">
                    {loading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                            <Loader className="w-8 h-8 text-purple-500 animate-spin" />
                            <p className="text-xs font-mono text-purple-400 animate-pulse">Decrypting Source Code...</p>
                        </div>
                    ) : (
                        <div className="p-8 pb-32">
                            {/* File Tab */}
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/50 w-fit px-4 py-2 rounded-t-lg border border-slate-800 border-b-0">
                                    <Code className="w-3 h-3" />
                                    {challenge?.filename}
                                </div>
                                {challenge && (
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${
                                        challenge.difficulty === 'HARD' ? 'text-red-400 border-red-900 bg-red-900/10' :
                                        challenge.difficulty === 'MEDIUM' ? 'text-amber-400 border-amber-900 bg-amber-900/10' :
                                        'text-emerald-400 border-emerald-900 bg-emerald-900/10'
                                    }`}>
                                        Difficulty: {challenge.difficulty}
                                    </span>
                                )}
                            </div>

                            {/* Code Area */}
                            <div className="bg-[#0d1117] rounded-lg border border-slate-800 overflow-hidden shadow-2xl relative font-mono text-sm">
                                {lines.map((line, idx) => {
                                    const lineNum = idx + 1;
                                    const isSelected = selectedLine === lineNum;
                                    const isCorrectLine = challenge && lineNum === challenge.bugLine;
                                    
                                    // Visual state logic
                                    let bgClass = 'hover:bg-slate-800/50 cursor-pointer';
                                    if (isSelected && status === 'REVIEWING') bgClass = 'bg-blue-900/20 border-l-2 border-blue-500';
                                    if (isSelected && status === 'SUCCESS') bgClass = 'bg-emerald-900/20 border-l-2 border-emerald-500';
                                    if (isSelected && status === 'FAILURE') bgClass = 'bg-red-900/20 border-l-2 border-red-500';
                                    
                                    // Show correct answer if failed
                                    if (status === 'FAILURE' && isCorrectLine) bgClass = 'bg-emerald-900/10 border-l-2 border-emerald-500/50 opacity-100';

                                    return (
                                        <div 
                                            key={idx}
                                            onClick={() => status === 'REVIEWING' && setSelectedLine(lineNum)}
                                            className={`flex group transition-colors duration-150 ${bgClass}`}
                                        >
                                            {/* Line Number */}
                                            <div className="w-12 py-1 text-right pr-4 text-slate-600 select-none bg-[#010409] border-r border-slate-800 group-hover:text-slate-400">
                                                {lineNum}
                                            </div>
                                            {/* Code Content */}
                                            <div className="flex-1 py-1 pl-4 text-slate-300 whitespace-pre overflow-x-auto">
                                                {line || ' '}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel: Context & Feedback */}
                <div className="w-80 bg-[#010409] border-l border-slate-800 p-6 flex flex-col gap-6">
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Mission Directive</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Review the code. Click the line number containing the <span className="text-white font-bold">Primary Vulnerability</span>.
                        </p>
                    </div>

                    <div className="flex-1"></div>

                    {/* Feedback Area */}
                    <AnimatePresence mode="wait">
                        {status === 'REVIEWING' ? (
                            <MotionDiv 
                                key="action"
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }}
                                className="space-y-4"
                            >
                                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-center">
                                    <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Selected Line</div>
                                    <div className="text-3xl font-black text-blue-400">
                                        {selectedLine !== null ? selectedLine : '--'}
                                    </div>
                                </div>
                                <button 
                                    onClick={handleSubmit}
                                    disabled={selectedLine === null}
                                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
                                >
                                    <AlertTriangle className="w-4 h-4" /> Flag Issue
                                </button>
                            </MotionDiv>
                        ) : (
                            <MotionDiv 
                                key="result"
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-5 rounded-xl border ${status === 'SUCCESS' ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-red-900/10 border-red-500/30'}`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    {status === 'SUCCESS' ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                                    <span className={`font-black uppercase tracking-wider ${status === 'SUCCESS' ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {status === 'SUCCESS' ? 'Secure' : 'Breach'}
                                    </span>
                                </div>
                                
                                <div className="space-y-3">
                                    <div>
                                        <div className="text-[10px] font-mono text-slate-500 uppercase">Issue Type</div>
                                        <div className="text-sm font-bold text-white">{challenge?.bugType}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono text-slate-500 uppercase">Analysis</div>
                                        <p className="text-xs text-slate-300 leading-relaxed mt-1">
                                            {challenge?.explanation}
                                        </p>
                                    </div>
                                </div>

                                <button 
                                    onClick={loadChallenge}
                                    className="w-full mt-6 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-widest rounded border border-slate-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    Next Review <ChevronRight className="w-3 h-3" />
                                </button>
                            </MotionDiv>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default PRDojo;
