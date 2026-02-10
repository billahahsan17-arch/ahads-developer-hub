
import React, { useState } from 'react';
import { Eye, AlertTriangle, CheckCircle, Info, ScanSearch, FileCode } from 'lucide-react';
import CodeBlock from '../../components/CodeBlock';

interface Issue {
    id: string;
    line: number;
    severity: 'CRITICAL' | 'WARNING' | 'INFO';
    message: string;
    suggestion: string;
}

const A11yAuditor: React.FC = () => {
    const [code, setCode] = useState('<div onClick={handleClick}>Click me</div>');
    const [issues, setIssues] = useState<Issue[]>([]);
    const [scanned, setScanned] = useState(false);

    const runAudit = () => {
        const newIssues: Issue[] = [];
        const lines = code.split('\n');

        lines.forEach((line, idx) => {
            const lineNum = idx + 1;
            
            // Check 1: Clickable Divs
            if (line.match(/<div[^>]*onClick/)) {
                newIssues.push({
                    id: `div-click-${lineNum}`,
                    line: lineNum,
                    severity: 'CRITICAL',
                    message: 'Non-interactive element <div> has click handler.',
                    suggestion: 'Use <button> or add role="button" and onKeyPress.'
                });
            }

            // Check 2: Images missing Alt
            if (line.match(/<img/) && !line.match(/alt=["'{]/)) {
                newIssues.push({
                    id: `img-alt-${lineNum}`,
                    line: lineNum,
                    severity: 'CRITICAL',
                    message: 'Image missing alt attribute.',
                    suggestion: 'Add alt="description" to the <img> tag.'
                });
            }

            // Check 3: Inputs missing labels
            if (line.match(/<input/) && !line.match(/aria-label/) && !line.match(/id=/)) {
                newIssues.push({
                    id: `input-label-${lineNum}`,
                    line: lineNum,
                    severity: 'WARNING',
                    message: 'Input may be missing a label.',
                    suggestion: 'Ensure <label htmlFor="..."> exists or add aria-label.'
                });
            }

            // Check 4: Empty Buttons
            if (line.match(/<button[^>]*>\s*<\/button>/)) {
                newIssues.push({
                    id: `btn-empty-${lineNum}`,
                    line: lineNum,
                    severity: 'CRITICAL',
                    message: 'Button has no accessible name.',
                    suggestion: 'Add text content or aria-label to <button>.'
                });
            }

            // Check 5: TabIndex > 0
            if (line.match(/tabIndex=["']?[1-9]/)) {
                newIssues.push({
                    id: `tab-index-${lineNum}`,
                    line: lineNum,
                    severity: 'WARNING',
                    message: 'Positive tabIndex detected.',
                    suggestion: 'Avoid manual tab order. Use tabIndex="0" or "-1".'
                });
            }
        });

        setIssues(newIssues);
        setScanned(true);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-900/20 rounded-lg border border-blue-500/30">
                        <Eye className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">A11y Auditor</h1>
                        <p className="text-[10px] font-mono text-slate-500">Static Accessibility Analysis</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-8 flex flex-col lg:flex-row gap-8 overflow-hidden">
                
                {/* Code Editor */}
                <div className="flex-1 flex flex-col h-full min-h-0">
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <FileCode className="w-4 h-4" /> Source Code (JSX/HTML)
                        </label>
                        <button 
                            onClick={runAudit}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-blue-900/20"
                        >
                            <ScanSearch className="w-4 h-4" /> Scan for Issues
                        </button>
                    </div>
                    <div className="flex-1 bg-[#0d1117] border border-slate-800 rounded-xl overflow-hidden relative">
                        <textarea 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="absolute inset-0 w-full h-full bg-transparent text-slate-300 font-mono text-sm p-6 resize-none outline-none custom-scrollbar"
                            spellCheck={false}
                            placeholder="Paste your React component or HTML here..."
                        />
                    </div>
                </div>

                {/* Report Panel */}
                <div className="w-full lg:w-96 flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800 bg-slate-950/50">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Audit Report</h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                        {!scanned ? (
                            <div className="text-center py-12 opacity-50">
                                <Eye className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                                <p className="text-xs font-mono text-slate-500">Ready to Analyze</p>
                            </div>
                        ) : issues.length === 0 ? (
                            <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-6 text-center">
                                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-emerald-500" />
                                <h4 className="text-emerald-400 font-bold mb-1">No Issues Found</h4>
                                <p className="text-xs text-emerald-200/60">Code passed basic heuristic checks.</p>
                            </div>
                        ) : (
                            issues.map((issue) => (
                                <div key={issue.id} className={`p-4 rounded-lg border flex gap-3 ${
                                    issue.severity === 'CRITICAL' ? 'bg-red-900/10 border-red-500/30' :
                                    issue.severity === 'WARNING' ? 'bg-amber-900/10 border-amber-500/30' :
                                    'bg-blue-900/10 border-blue-500/30'
                                }`}>
                                    <div className="mt-0.5">
                                        {issue.severity === 'CRITICAL' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                                        {issue.severity === 'WARNING' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                                        {issue.severity === 'INFO' && <Info className="w-4 h-4 text-blue-500" />}
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-[10px] font-bold px-1.5 rounded border ${
                                                issue.severity === 'CRITICAL' ? 'text-red-400 border-red-500/30 bg-red-950' :
                                                issue.severity === 'WARNING' ? 'text-amber-400 border-amber-500/30 bg-amber-950' :
                                                'text-blue-400 border-blue-500/30 bg-blue-950'
                                            }`}>
                                                Line {issue.line}
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-200 mb-1">{issue.message}</p>
                                        <p className="text-xs text-slate-400 font-mono bg-black/20 p-2 rounded">
                                            Fix: {issue.suggestion}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default A11yAuditor;
