import React, { useState } from 'react';
import { FlaskConical, Beaker, CheckCircle, Loader, Play } from 'lucide-react';
import { generateUnitTests } from '../services/atlasService';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../components/CodeBlock';

const TestSuite: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [framework, setFramework] = useState('Jest (TypeScript)');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!inputCode.trim()) return;
    setLoading(true);
    const result = await generateUnitTests(inputCode, framework);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="min-h-full bg-slate-950 p-4 md:p-8 font-sans text-slate-300">
       <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
             <div className="p-3 bg-lime-900/20 rounded-xl border border-lime-500/30">
                <FlaskConical className="w-8 h-8 text-lime-500" />
            </div>
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">The Test Suite</h1>
                <p className="text-slate-500 font-mono text-sm">Automated QA & Unit Test Generator</p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
        
        {/* Input Panel */}
        <div className="flex flex-col space-y-4 h-full">
            <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Source Code</label>
                <select 
                    value={framework}
                    onChange={(e) => setFramework(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-lime-500"
                >
                    <option value="Jest (TypeScript)">Jest (TypeScript)</option>
                    <option value="PyTest (Python)">PyTest (Python)</option>
                    <option value="JUnit (Java)">JUnit (Java)</option>
                    <option value="Go Test">Go Test</option>
                    <option value="Rust Test">Rust Test</option>
                    <option value="Mocha (Node.js)">Mocha (Node.js)</option>
                </select>
            </div>
            <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="// Paste the function or class you want to test..."
                className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm focus:outline-none focus:border-lime-500/50 resize-none custom-scrollbar text-slate-300 placeholder-slate-600"
            />
            <button
                onClick={handleGenerate}
                disabled={loading || !inputCode.trim()}
                className="w-full py-4 bg-lime-600 hover:bg-lime-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-lime-500/20 flex items-center justify-center gap-2"
            >
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Beaker className="w-5 h-5" />}
                {loading ? 'Synthesizing Tests...' : 'Generate Test Suite'}
            </button>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col space-y-4 h-full">
             <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Generated Tests</label>
                {output && (
                    <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                        <CheckCircle className="w-3 h-3" /> QA Ready
                    </div>
                )}
            </div>
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-y-auto custom-scrollbar relative">
                {output ? (
                     <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                            components={{
                                code: ({node, className, children, ...props}) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return match ? (
                                        <CodeBlock className={className}>{String(children).replace(/\n$/, '')}</CodeBlock>
                                    ) : (
                                        <code className="bg-slate-800 text-lime-200 px-1 py-0.5 rounded text-xs font-mono" {...props}>
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
                        <Play className="w-16 h-16 mb-4" />
                        <p className="font-mono text-sm uppercase">Awaiting Code Input</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default TestSuite;