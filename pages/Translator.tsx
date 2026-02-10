
import React, { useState } from 'react';
import { Languages, ArrowRight, ArrowLeftRight, FileCode, CheckCircle, Loader } from 'lucide-react';
import { translateCode } from '../services/atlasService';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../components/CodeBlock';

const Translator: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [sourceLang, setSourceLang] = useState('python');
  const [targetLang, setTargetLang] = useState('rust');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputCode.trim()) return;
    setLoading(true);
    const result = await translateCode(inputCode, sourceLang, targetLang);
    setOutput(result);
    setLoading(false);
  };

  const languageOptions = [
      // System
      { value: 'rust', label: 'Rust (System)' },
      { value: 'cpp', label: 'C++ (System)' },
      { value: 'zig', label: 'Zig (System)' },
      // Web
      { value: 'typescript', label: 'TypeScript (Web)' },
      { value: 'javascript', label: 'JavaScript (Web)' },
      // Backend
      { value: 'go', label: 'Go (Cloud)' },
      { value: 'java', label: 'Java (Cloud)' },
      { value: 'elixir', label: 'Elixir (Cloud)' },
      // Data/AI
      { value: 'python', label: 'Python (Data/AI)' },
      { value: 'mojo', label: 'Mojo (AI)' },
      { value: 'sql', label: 'SQL (Data)' },
      // Security
      { value: 'ruby', label: 'Ruby (Sec)' },
      { value: 'php', label: 'PHP (Sec)' },
      { value: 'shell', label: 'Shell (Sec)' },
      // Graphics
      { value: 'wgsl', label: 'WGSL (Gfx)' },
      { value: 'csharp', label: 'C# (Gfx)' },
      // Infra
      { value: 'swift', label: 'Swift (Infra)' },
  ];

  return (
    <div className="min-h-full bg-slate-950 p-4 md:p-8 font-sans text-slate-300">
       <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
             <div className="p-3 bg-teal-900/20 rounded-xl border border-teal-500/30">
                <Languages className="w-8 h-8 text-teal-500" />
            </div>
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">The Translator</h1>
                <p className="text-slate-500 font-mono text-sm">Polyglot Code Conversion Engine</p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-220px)]">
        
        {/* Source Panel */}
        <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex justify-between items-center">
                 <select 
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-teal-500"
                >
                    {languageOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <div className="text-[10px] font-mono text-slate-500 uppercase">Input Stream</div>
            </div>
            <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder={`// Paste ${sourceLang} code here...`}
                className="flex-1 w-full bg-slate-900 p-6 font-mono text-sm focus:outline-none resize-none custom-scrollbar text-slate-300 placeholder-slate-700"
            />
        </div>

        {/* Action Button (Desktop Center) */}
        <div className="lg:hidden">
             <button
                onClick={handleTranslate}
                disabled={loading || !inputCode.trim()}
                className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold uppercase tracking-widest rounded-xl"
            >
                {loading ? 'Translating...' : 'Translate'}
            </button>
        </div>

        {/* Target Panel */}
        <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative">
            <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex justify-between items-center z-10">
                 <select 
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-teal-500"
                >
                     {languageOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                
                <div className="flex items-center gap-2">
                     <button
                        onClick={handleTranslate}
                        disabled={loading || !inputCode.trim()}
                        className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wide rounded-lg transition-all shadow-lg hover:shadow-teal-500/20 disabled:opacity-50"
                    >
                        {loading ? <Loader className="w-3 h-3 animate-spin" /> : <ArrowLeftRight className="w-3 h-3" />}
                        Translate
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-900 relative">
                {output ? (
                    <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                            components={{
                                code: ({node, className, children, ...props}) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return match ? (
                                        <CodeBlock className={className}>{String(children).replace(/\n$/, '')}</CodeBlock>
                                    ) : (
                                        <code className="bg-slate-800 text-teal-200 px-1 py-0.5 rounded text-xs font-mono" {...props}>
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 opacity-50">
                        <FileCode className="w-16 h-16 mb-4" />
                        <p className="font-mono text-sm uppercase">Ready for Translation</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Translator;
