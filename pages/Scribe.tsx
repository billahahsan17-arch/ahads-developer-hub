import React, { useState } from 'react';
import { BookOpen, PenTool, FileText, Check, Loader } from 'lucide-react';
import { generateAutoDocs } from '../services/atlasService';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../components/CodeBlock';

const Scribe: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [documentation, setDocumentation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!inputCode.trim()) return;
    setLoading(true);
    const result = await generateAutoDocs(inputCode);
    setDocumentation(result);
    setLoading(false);
  };

  return (
    <div className="min-h-full bg-slate-950 p-4 md:p-8 font-sans text-slate-300">
       <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
             <div className="p-3 bg-cyan-900/20 rounded-xl border border-cyan-500/30">
                <PenTool className="w-8 h-8 text-cyan-500" />
            </div>
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">The Scribe</h1>
                <p className="text-slate-500 font-mono text-sm">Automated Technical Documentation Generator</p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
        
        {/* Input Area */}
        <div className="flex flex-col space-y-4">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-1 shadow-lg flex-1 flex flex-col">
                <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 rounded-t-xl flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase">Source Code</span>
                </div>
                <textarea
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="// Paste your function, class, or module here..."
                    className="flex-1 w-full bg-slate-950/50 p-4 font-mono text-sm focus:outline-none resize-none custom-scrollbar text-slate-300 placeholder-slate-700 rounded-b-xl"
                />
            </div>
            <button
                onClick={handleGenerate}
                disabled={loading || !inputCode.trim()}
                className="w-full py-3 bg-cyan-700 hover:bg-cyan-600 text-white font-bold uppercase tracking-widest rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20"
            >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <BookOpen className="w-4 h-4" />}
                {loading ? 'Drafting Docs...' : 'Generate Documentation'}
            </button>
        </div>

        {/* Output Area */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col relative min-h-[600px]">
             <div className="px-6 py-4 bg-slate-950/50 border-b border-slate-800 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Documentation Preview
                </span>
                {documentation && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-900/20 px-2 py-1 rounded-full border border-emerald-500/30">
                        <Check className="w-3 h-3" /> Ready
                    </span>
                )}
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-slate-900 text-slate-300">
                {documentation ? (
                    <div className="prose prose-invert prose-slate max-w-none prose-headings:font-bold prose-h1:text-3xl prose-code:bg-slate-800 prose-code:text-cyan-400 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800">
                        <ReactMarkdown
                             components={{
                                code: ({node, className, children, ...props}) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return match ? (
                                        <CodeBlock className={className}>{String(children).replace(/\n$/, '')}</CodeBlock>
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {documentation}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-700">
                        <BookOpen className="w-24 h-24 mb-4 opacity-10" />
                        <p className="font-mono text-sm text-slate-600 uppercase tracking-widest">No Document Generated</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Scribe;