
import React, { useState } from 'react';
import { GitMerge, GitPullRequest, Check, X, AlertTriangle, Code, ArrowRight } from 'lucide-react';
import CodeBlock from '../../components/CodeBlock';

interface ConflictLevel {
    id: number;
    title: string;
    context: string;
    baseCode: string[]; // The code lines
    conflictStart: number; // Line index where conflict starts
    currentChange: string;
    incomingChange: string;
    correctChoice: 'CURRENT' | 'INCOMING' | 'BOTH';
    explanation: string;
}

const LEVELS: ConflictLevel[] = [
    {
        id: 1,
        title: "The API Endpoint Update",
        context: "Team A updated the user endpoint to version 2. Team B fixed a bug in version 1. We need to move forward with Version 2 but keep the bug fix logic if applicable (it's not, v2 rewrites it).",
        baseCode: [
            "import express from 'express';",
            "const app = express();",
            "",
            "app.get('/health', (req, res) => res.send('OK'));",
            "",
        ],
        conflictStart: 5,
        currentChange: `app.get('/api/v1/user', (req, res) => {
  // Bug fix: Added null check
  if (!req.user) return res.sendStatus(401);
  res.json(req.user);
});`,
        incomingChange: `app.get('/api/v2/user', (req, res) => {
  // V2 Implementation: Returns full profile
  res.json({ 
    id: req.user.id, 
    profile: req.user.profile,
    v: 2 
  });
});`,
        correctChoice: 'INCOMING',
        explanation: "Since we are moving to V2 and the architecture changed, keeping the V1 bug fix is irrelevant. V2 is the target state."
    },
    {
        id: 2,
        title: "Database Configuration",
        context: "DevOps increased the connection pool size. Backend team changed the host URL. We need BOTH changes to work in production.",
        baseCode: [
            "const dbConfig = {",
            "  dialect: 'postgres',",
        ],
        conflictStart: 2,
        currentChange: `  host: 'db-prod-primary.internal',
  port: 5432,`,
        incomingChange: `  host: 'localhost',
  pool: {
    max: 20,
    min: 5
  },`,
        correctChoice: 'BOTH',
        explanation: "We need the production host address (Current) AND the performance tuning pool settings (Incoming). Merging both is required manually."
    }
];

const GitConflictResolver: React.FC = () => {
    const [levelIndex, setLevelIndex] = useState(0);
    const [resolved, setResolved] = useState(false);
    const [result, setResult] = useState<'SUCCESS' | 'FAILURE' | null>(null);
    const [selection, setSelection] = useState<'CURRENT' | 'INCOMING' | 'BOTH' | null>(null);

    const level = LEVELS[levelIndex];

    const handleResolve = (choice: 'CURRENT' | 'INCOMING' | 'BOTH') => {
        setSelection(choice);
        setResolved(true);
        if (choice === level.correctChoice) {
            setResult('SUCCESS');
        } else {
            setResult('FAILURE');
        }
    };

    const nextLevel = () => {
        if (levelIndex < LEVELS.length - 1) {
            setLevelIndex(prev => prev + 1);
            setResolved(false);
            setResult(null);
            setSelection(null);
        }
    };

    const renderMergedCode = () => {
        let content = "";
        if (selection === 'CURRENT') content = level.currentChange;
        if (selection === 'INCOMING') content = level.incomingChange;
        if (selection === 'BOTH') {
            // Naive merge for visuals
            content = level.currentChange + '\n' + level.incomingChange; 
            if(level.id === 2) {
                 content = `  host: 'db-prod-primary.internal',\n  port: 5432,\n  pool: {\n    max: 20,\n    min: 5\n  },`;
            }
        }
        
        return [
            ...level.baseCode.slice(0, level.conflictStart),
            content,
            "}"
        ].join('\n');
    };

    return (
        <div className="h-full flex flex-col bg-[#0d1117] font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-[#010409] border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-900/20 rounded-lg border border-orange-500/30">
                        <GitMerge className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Merge Conflict Resolver</h1>
                        <p className="text-[10px] font-mono text-slate-500">HEAD vs origin/main</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-xs font-mono text-slate-500">
                        Level {levelIndex + 1} / {LEVELS.length}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Context Sidebar */}
                <div className="w-80 bg-[#0d1117] border-r border-slate-800 p-6 flex flex-col">
                    <h2 className="text-lg font-bold text-white mb-2">{level.title}</h2>
                    <div className="text-xs text-slate-400 leading-relaxed mb-6 bg-slate-900 p-3 rounded border border-slate-800">
                        <span className="font-bold text-orange-400 block mb-1">Context:</span>
                        {level.context}
                    </div>

                    <div className="flex-1"></div>

                    {resolved && (
                        <div className={`p-4 rounded-xl border mb-6 animate-slide-up ${result === 'SUCCESS' ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-red-900/10 border-red-500/30'}`}>
                            <div className="flex items-center gap-2 mb-2 font-bold">
                                {result === 'SUCCESS' ? <Check className="w-5 h-5 text-emerald-500" /> : <X className="w-5 h-5 text-red-500" />}
                                <span className={result === 'SUCCESS' ? 'text-emerald-400' : 'text-red-400'}>
                                    {result === 'SUCCESS' ? 'Conflict Resolved' : 'Merge Failed'}
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                {level.explanation}
                            </p>
                            {result === 'SUCCESS' && (
                                <button onClick={nextLevel} className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                                    Next Conflict <ArrowRight className="w-3 h-3" />
                                </button>
                            )}
                            {result === 'FAILURE' && (
                                <button onClick={() => { setResolved(false); setResult(null); setSelection(null); }} className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded uppercase tracking-wider transition-all">
                                    Retry
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Editor Area */}
                <div className="flex-1 bg-[#0d1117] overflow-y-auto custom-scrollbar p-8">
                    {!resolved ? (
                        <div className="font-mono text-sm">
                            {/* Pre-Conflict Code */}
                            <div className="opacity-60 mb-2">
                                {level.baseCode.slice(0, level.conflictStart).map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </div>

                            {/* Conflict Zone */}
                            <div className="border-l-4 border-yellow-500/50 bg-yellow-900/10 my-4">
                                {/* Current Change */}
                                <div className="bg-green-900/20 p-4 border-b border-yellow-500/20 relative group">
                                    <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-bl uppercase font-bold">
                                        Current Change (HEAD)
                                    </div>
                                    <pre className="text-green-300">{level.currentChange}</pre>
                                    <button 
                                        onClick={() => handleResolve('CURRENT')}
                                        className="mt-3 px-3 py-1 bg-green-700 hover:bg-green-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Accept Current
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="h-4 bg-yellow-500/20 flex items-center justify-center">
                                    <div className="h-px bg-yellow-500/50 w-full" />
                                </div>

                                {/* Incoming Change */}
                                <div className="bg-blue-900/20 p-4 relative group">
                                    <div className="absolute top-0 right-0 bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-bl uppercase font-bold">
                                        Incoming Change (v2)
                                    </div>
                                    <pre className="text-blue-300">{level.incomingChange}</pre>
                                    <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleResolve('INCOMING')}
                                            className="px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded"
                                        >
                                            Accept Incoming
                                        </button>
                                        <button 
                                            onClick={() => handleResolve('BOTH')}
                                            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded"
                                        >
                                            Accept Both
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Post-Conflict Code */}
                            <div className="opacity-60 mt-2">
                                <div>{'}'}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Resolved File Preview</h3>
                            <CodeBlock className="language-typescript">
                                {renderMergedCode()}
                            </CodeBlock>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GitConflictResolver;
