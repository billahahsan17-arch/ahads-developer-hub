
import React, { useState } from 'react';
import { GitCommit, Copy, Check, Loader, Terminal, FileDiff } from 'lucide-react';
import { generateCommitMessage } from '../../services/atlasService';
import CodeBlock from '../../components/CodeBlock';

const CommitSentinel: React.FC = () => {
    const [diff, setDiff] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!diff.trim()) return;
        setLoading(true);
        const msg = await generateCommitMessage(diff);
        setMessage(msg);
        setLoading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
                        <GitCommit className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Commit Sentinel</h1>
                        <p className="text-[10px] font-mono text-slate-500">Semantic Git Message Generator</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
                
                <div className="flex flex-col gap-4 h-full">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <FileDiff className="w-4 h-4" /> Staged Changes / Diff / Notes
                    </label>
                    <div className="flex-1 bg-[#0d1117] border border-slate-800 rounded-xl overflow-hidden relative">
                        <textarea 
                            value={diff}
                            onChange={(e) => setDiff(e.target.value)}
                            placeholder="Paste your `git diff` or describe changes (e.g., 'fixed login bug on safari')..."
                            className="absolute inset-0 w-full h-full bg-transparent p-6 font-mono text-sm text-slate-300 resize-none outline-none custom-scrollbar"
                            spellCheck={false}
                        />
                    </div>
                    <button 
                        onClick={handleGenerate}
                        disabled={loading || !diff.trim()}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Terminal className="w-5 h-5" />}
                        {loading ? 'Analyzing Diff...' : 'Generate Commit Message'}
                    </button>
                </div>

                <div className="flex flex-col gap-4 h-full">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sentinel Output</label>
                        {message && (
                            <button onClick={copyToClipboard} className="flex items-center gap-1 text-emerald-400 hover:text-white transition-colors text-xs font-bold uppercase">
                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        )}
                    </div>
                    
                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-8 relative flex items-center justify-center">
                        {message ? (
                            <div className="w-full">
                                <CodeBlock className="language-bash">{`git commit -m "${message}"`}</CodeBlock>
                                <div className="mt-4 p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-lg">
                                    <p className="text-xs text-emerald-300 leading-relaxed font-mono">
                                        Format: Conventional Commits (type: subject)
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center opacity-30">
                                <GitCommit className="w-16 h-16 mx-auto mb-4" />
                                <p className="font-mono text-sm uppercase tracking-widest">Awaiting Diff Input</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CommitSentinel;
