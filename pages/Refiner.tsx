
import React, { useState } from 'react';
import { Cpu, Zap, CheckCircle, Shield, AlertOctagon, Terminal, Activity } from 'lucide-react';
import { auditCode } from '../services/atlasService';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../components/CodeBlock';

const Refiner: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [language, setLanguage] = useState('typescript');
  const [result, setResult] = useState<{ analysis: string, code: string, securityScore: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    if (!inputCode.trim()) return;
    setLoading(true);
    const res = await auditCode(inputCode, language);
    setResult(res);
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
      if (score >= 90) return 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10';
      if (score >= 70) return 'text-amber-500 border-amber-500/30 bg-amber-500/10';
      return 'text-red-500 border-red-500/30 bg-red-500/10';
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 p-4 md:p-8 font-sans text-slate-300 overflow-hidden">
       <div className="max-w-7xl mx-auto w-full mb-8 flex items-center justify-between border-b border-slate-800 pb-6 flex-shrink-0">
        <div className="flex items-center gap-4">
             <div className="p-3 bg-red-900/20 rounded-xl border border-red-500/30">
                <Shield className="w-8 h-8 text-red-500" />
            </div>
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">The Auditor</h1>
                <p className="text-slate-500 font-mono text-sm">Security, Performance & Logic Analysis Engine</p>
            </div>
        </div>
        {result && (
             <div className={`hidden md:flex flex-col items-center px-4 py-2 rounded-lg border ${getScoreColor(result.securityScore)}`}>
                 <span className="text-[10px] font-bold uppercase tracking-widest">Security Score</span>
                 <span className="text-3xl font-black leading-none">{result.securityScore}</span>
             </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0">
        
        {/* Input Panel */}
        <div className="flex flex-col space-y-4 h-full min-h-0">
            <div className="flex items-center justify-between flex-shrink-0">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Source Code</label>
                <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-red-500"
                >
                    <optgroup label="System">
                        <option value="rust">Rust</option>
                        <option value="cpp">C++</option>
                        <option value="zig">Zig</option>
                    </optgroup>
                    <optgroup label="Web">
                        <option value="typescript">TypeScript</option>
                        <option value="javascript">JavaScript</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                    </optgroup>
                    <optgroup label="Backend">
                        <option value="go">Go</option>
                        <option value="java">Java</option>
                        <option value="elixir">Elixir</option>
                    </optgroup>
                    <optgroup label="Data & AI">
                        <option value="python">Python</option>
                        <option value="sql">SQL</option>
                        <option value="mojo">Mojo</option>
                    </optgroup>
                    <optgroup label="Security">
                        <option value="ruby">Ruby</option>
                        <option value="php">PHP</option>
                        <option value="shell">Shell / Bash</option>
                    </optgroup>
                    <optgroup label="Graphics">
                        <option value="wgsl">WGSL</option>
                        <option value="csharp">C#</option>
                    </optgroup>
                    <optgroup label="Infra">
                        <option value="swift">Swift</option>
                    </optgroup>
                </select>
            </div>
            <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="// Paste code for audit..."
                className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm focus:outline-none focus:border-red-500/50 resize-none custom-scrollbar text-slate-300 placeholder-slate-600"
            />
            <button
                onClick={handleAudit}
                disabled={loading || !inputCode.trim()}
                className="w-full py-4 bg-red-700 hover:bg-red-600 text-white font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/20 flex items-center justify-center gap-2 flex-shrink-0"
            >
                {loading ? <Activity className="w-5 h-5 animate-spin" /> : <AlertOctagon className="w-5 h-5" />}
                {loading ? 'Running Deep Scan...' : 'Initiate Security Audit'}
            </button>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col space-y-4 h-full min-h-0">
             <div className="flex items-center justify-between flex-shrink-0">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Audit Report</label>
                {result && (
                    <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                        <CheckCircle className="w-3 h-3" /> Audit Complete
                    </div>
                )}
            </div>
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-y-auto custom-scrollbar relative">
                {result ? (
                     <div className="space-y-8">
                         {/* Analysis Section */}
                         <div className="prose prose-invert prose-sm max-w-none border-b border-slate-800 pb-6">
                            <h3 className="text-red-400 font-mono text-xs uppercase tracking-widest mb-4">Vulnerability & Logic Analysis</h3>
                            <ReactMarkdown>{result.analysis}</ReactMarkdown>
                         </div>
                         
                         {/* Code Section */}
                         <div>
                            <h3 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">Refactored Implementation</h3>
                            <CodeBlock className={`language-${language}`}>{result.code}</CodeBlock>
                         </div>
                     </div>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 opacity-50">
                        <Terminal className="w-16 h-16 mb-4" />
                        <p className="font-mono text-sm uppercase">Awaiting Code Input</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Refiner;
