import React, { useState } from 'react';
import { Hash, Search, Loader, ShieldCheck } from 'lucide-react';
import { generateRegex } from '../services/atlasService';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../components/CodeBlock';

const RegexEnforcer: React.FC = () => {
  const [description, setDescription] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    const result = await generateRegex(description);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="min-h-full bg-slate-950 p-4 md:p-8 font-sans text-slate-300">
       <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
             <div className="p-3 bg-fuchsia-900/20 rounded-xl border border-fuchsia-500/30">
                <Hash className="w-8 h-8 text-fuchsia-500" />
            </div>
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">The Regex Enforcer</h1>
                <p className="text-slate-500 font-mono text-sm">Complex Pattern Matching Engine</p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8">
        
        {/* Input Bar */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-4 items-end md:items-center shadow-xl">
             <div className="flex-1 w-full">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Match Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., 'Extract all emails that are NOT from gmail.com' or 'Match strong passwords with 1 special char'"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-fuchsia-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
             </div>
             <button
                onClick={handleGenerate}
                disabled={loading || !description.trim()}
                className="w-full md:w-auto px-8 py-3 bg-fuchsia-700 hover:bg-fuchsia-600 text-white font-bold uppercase tracking-widest rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-900/20"
            >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                {loading ? 'Computing...' : 'Generate Pattern'}
            </button>
        </div>

        {/* Output Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl min-h-[400px] p-8 relative overflow-hidden shadow-2xl">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                 <ShieldCheck className="w-64 h-64 text-fuchsia-500" />
             </div>

             {output ? (
                 <div className="relative z-10 prose prose-invert prose-lg max-w-none prose-headings:text-fuchsia-200 prose-code:text-fuchsia-300">
                    <ReactMarkdown
                        components={{
                            code: ({node, className, children, ...props}) => {
                                const match = /language-(\w+)/.exec(className || '');
                                return match ? (
                                    <CodeBlock className={className}>{String(children).replace(/\n$/, '')}</CodeBlock>
                                ) : (
                                    <code className="bg-slate-800 text-fuchsia-200 px-1 py-0.5 rounded text-sm font-mono border border-slate-700" {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {output}
                    </ReactMarkdown>
                 </div>
             ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-700 min-h-[300px]">
                    <Hash className="w-20 h-20 mb-4 opacity-20" />
                    <p className="font-mono text-sm uppercase tracking-widest">Awaiting Pattern Specification</p>
                </div>
             )}
        </div>

      </div>
    </div>
  );
};

export default RegexEnforcer;