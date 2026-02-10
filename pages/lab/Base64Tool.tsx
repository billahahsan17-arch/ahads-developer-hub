
import React, { useState } from 'react';
import { Code2, ArrowRightLeft } from 'lucide-react';

const Base64Tool: React.FC = () => {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState<'ENCODE' | 'DECODE'>('ENCODE');
    const [output, setOutput] = useState('');

    const handleProcess = () => {
        try {
            if (mode === 'ENCODE') {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
        } catch (e) {
            setOutput('Error: Invalid Input');
        }
    };

    return (
        <div className="h-full bg-slate-950 p-8 font-sans text-slate-300">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-black text-white flex items-center gap-3">
                    <Code2 className="w-6 h-6 text-purple-500" /> Base64 Converter
                </h1>
                <button 
                    onClick={() => setMode(mode === 'ENCODE' ? 'DECODE' : 'ENCODE')}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-700 transition-all"
                >
                    <ArrowRightLeft className="w-3 h-3" /> Switch to {mode === 'ENCODE' ? 'Decode' : 'Encode'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[500px]">
                <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Input ({mode === 'ENCODE' ? 'Text' : 'Base64'})</label>
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm focus:border-purple-500 outline-none resize-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Output</label>
                    <div className="flex-1 bg-[#0d1117] border border-slate-800 rounded-xl p-4 font-mono text-sm text-purple-300 break-all overflow-y-auto">
                        {mode === 'ENCODE' ? (
                            input ? btoa(input) : ''
                        ) : (
                            (() => {
                                try { return input ? atob(input) : ''; } catch { return 'Invalid Base64'; }
                            })()
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Base64Tool;
