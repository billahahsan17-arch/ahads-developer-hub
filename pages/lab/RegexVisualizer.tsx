
import React, { useState, useMemo } from 'react';
import { Hash, Play, AlertCircle, CheckCircle, Info, Layers } from 'lucide-react';

const RegexVisualizer: React.FC = () => {
    const [pattern, setPattern] = useState('([A-Z])\\w+');
    const [flags, setFlags] = useState('g');
    const [testString, setTestString] = useState('Atlas Kernel v4.0 System Online');
    
    const { matches, error, explanation } = useMemo(() => {
        try {
            const regex = new RegExp(pattern, flags);
            const matches = [];
            let match;
            
            // Prevent infinite loops with empty patterns
            if (pattern === '') return { matches: [], error: null, explanation: [] };

            if (!flags.includes('g')) {
                match = regex.exec(testString);
                if (match) matches.push({ index: match.index, text: match[0], groups: match.slice(1) });
            } else {
                while ((match = regex.exec(testString)) !== null) {
                    matches.push({ index: match.index, text: match[0], groups: match.slice(1) });
                    if (match.index === regex.lastIndex) regex.lastIndex++;
                }
            }

            // Simple explanation logic
            const explanation = [];
            if (pattern.includes('^')) explanation.push({ token: '^', desc: 'Asserts position at start of string/line' });
            if (pattern.includes('$')) explanation.push({ token: '$', desc: 'Asserts position at end of string/line' });
            if (pattern.includes('\\d')) explanation.push({ token: '\\d', desc: 'Matches any digit (0-9)' });
            if (pattern.includes('\\w')) explanation.push({ token: '\\w', desc: 'Matches any word character (alphanumeric + underscore)' });
            if (pattern.includes('\\s')) explanation.push({ token: '\\s', desc: 'Matches any whitespace character' });
            if (pattern.includes('[')) explanation.push({ token: '[...]', desc: 'Matches any single character present in the set' });
            if (pattern.includes('(')) explanation.push({ token: '(...)', desc: 'Capturing group' });
            if (pattern.includes('+')) explanation.push({ token: '+', desc: 'Quantifier: 1 or more times' });
            if (pattern.includes('*')) explanation.push({ token: '*', desc: 'Quantifier: 0 or more times' });
            if (pattern.includes('?')) explanation.push({ token: '?', desc: 'Quantifier: 0 or 1 time' });

            return { matches, error: null, explanation };
        } catch (e: any) {
            return { matches: [], error: e.message, explanation: [] };
        }
    }, [pattern, flags, testString]);

    // Highlight logic
    const renderHighlightedText = () => {
        if (error || !pattern) return <span className="text-slate-400">{testString}</span>;
        
        let lastIndex = 0;
        const elements = [];
        
        matches.forEach((m, i) => {
            // Text before match
            if (m.index > lastIndex) {
                elements.push(<span key={`pre-${i}`} className="text-slate-400 opacity-60">{testString.slice(lastIndex, m.index)}</span>);
            }
            // Match
            elements.push(
                <span key={`match-${i}`} className="bg-fuchsia-900/50 text-fuchsia-200 border-b-2 border-fuchsia-500 rounded-sm px-0.5 relative group cursor-default">
                    {m.text}
                    {/* Tooltip for match info */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black border border-slate-700 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Match #{i + 1} {m.groups.length > 0 && `(${m.groups.length} groups)`}
                    </span>
                </span>
            );
            lastIndex = m.index + m.text.length;
        });

        if (lastIndex < testString.length) {
            elements.push(<span key="post" className="text-slate-400 opacity-60">{testString.slice(lastIndex)}</span>);
        }

        return elements;
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-fuchsia-900/20 rounded-lg border border-fuchsia-500/30">
                        <Hash className="w-5 h-5 text-fuchsia-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Regex Visualizer</h1>
                        <p className="text-[10px] font-mono text-slate-500">Pattern Matching & Explanation Engine</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 max-w-6xl mx-auto w-full space-y-8">
                
                {/* Input Area */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2 flex items-center focus-within:border-fuchsia-500/50 focus-within:ring-2 focus-within:ring-fuchsia-500/20 transition-all shadow-lg">
                            <span className="pl-3 text-slate-500 font-mono text-lg select-none">/</span>
                            <input 
                                type="text" 
                                value={pattern}
                                onChange={(e) => setPattern(e.target.value)}
                                placeholder="Enter regex pattern..."
                                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-lg px-2 placeholder-slate-600"
                            />
                            <span className="text-slate-500 font-mono text-lg select-none">/</span>
                            <input 
                                type="text" 
                                value={flags}
                                onChange={(e) => setFlags(e.target.value)}
                                placeholder="flags"
                                className="w-16 bg-transparent border-l border-slate-800 pl-2 outline-none text-slate-400 font-mono text-sm"
                            />
                        </div>
                    </div>
                    
                    {error && (
                        <div className="flex items-center gap-2 text-red-400 text-xs font-mono bg-red-900/10 border border-red-900/30 px-4 py-2 rounded-lg">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Test String & Result */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                            <div className="px-4 py-2 bg-slate-950/50 border-b border-slate-800 flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Test String</span>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${matches.length > 0 ? 'bg-emerald-900/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                                        {matches.length} Matches
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <textarea 
                                    value={testString}
                                    onChange={(e) => setTestString(e.target.value)}
                                    className="w-full h-24 bg-transparent border-none outline-none text-slate-300 font-mono text-sm resize-none mb-4 focus:bg-slate-800/50 rounded transition-colors"
                                    spellCheck={false}
                                />
                                <div className="pt-4 border-t border-slate-800/50">
                                    <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-all">
                                        {renderHighlightedText()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Match Details */}
                        {matches.length > 0 && (
                            <div className="bg-[#0d1117] border border-slate-800 rounded-xl p-4 overflow-hidden">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Capture Groups</div>
                                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                    {matches.map((m, i) => (
                                        <div key={i} className="flex items-start gap-4 p-2 rounded hover:bg-slate-800/50 transition-colors">
                                            <span className="text-xs font-mono text-fuchsia-400 whitespace-nowrap">Match {i + 1}:</span>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-1.5 py-0.5 bg-fuchsia-900/20 border border-fuchsia-500/30 rounded text-xs font-mono text-fuchsia-200">
                                                    {m.text}
                                                </span>
                                                {m.groups.map((g, gi) => (
                                                    <span key={gi} className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-400">
                                                        ${gi + 1}: {g}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Regex Explanation Sidebar */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-fit">
                        <div className="flex items-center gap-2 mb-6">
                            <Layers className="w-4 h-4 text-fuchsia-500" />
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Pattern Anatomy</h3>
                        </div>
                        
                        <div className="space-y-4">
                            {explanation.length > 0 ? explanation.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm">
                                    <code className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-fuchsia-300 font-mono text-xs min-w-[24px] text-center">
                                        {item.token}
                                    </code>
                                    <span className="text-slate-400 text-xs leading-relaxed">{item.desc}</span>
                                </div>
                            )) : (
                                <div className="text-center py-8 text-slate-600">
                                    <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-xs uppercase tracking-widest">No recognized tokens</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800">
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Cheatsheet</h4>
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                                <div className="flex justify-between"><span>.</span> <span className="text-slate-600">Any Char</span></div>
                                <div className="flex justify-between"><span>\d</span> <span className="text-slate-600">Digit</span></div>
                                <div className="flex justify-between"><span>\w</span> <span className="text-slate-600">Word</span></div>
                                <div className="flex justify-between"><span>\s</span> <span className="text-slate-600">Space</span></div>
                                <div className="flex justify-between"><span>*</span> <span className="text-slate-600">0+</span></div>
                                <div className="flex justify-between"><span>+</span> <span className="text-slate-600">1+</span></div>
                                <div className="flex justify-between"><span>?</span> <span className="text-slate-600">0/1</span></div>
                                <div className="flex justify-between"><span>^</span> <span className="text-slate-600">Start</span></div>
                                <div className="flex justify-between"><span>$</span> <span className="text-slate-600">End</span></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegexVisualizer;
