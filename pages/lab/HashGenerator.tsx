
import React, { useState, useEffect } from 'react';
import { Lock, Copy, RefreshCw } from 'lucide-react';

const HashGenerator: React.FC = () => {
    const [input, setInput] = useState('');
    const [hashes, setHashes] = useState<Record<string, string>>({});

    useEffect(() => {
        generateHashes();
    }, [input]);

    const generateHashes = async () => {
        if (!input) {
            setHashes({});
            return;
        }
        const encoder = new TextEncoder();
        const data = encoder.encode(input);

        const algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
        const results: Record<string, string> = {};

        for (const algo of algos) {
            const buffer = await crypto.subtle.digest(algo, data);
            const hashArray = Array.from(new Uint8Array(buffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            results[algo] = hashHex;
        }
        setHashes(results);
    };

    return (
        <div className="h-full bg-slate-950 p-8 font-sans text-slate-300">
            <h1 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                <Lock className="w-6 h-6 text-emerald-500" /> Hash Generator
            </h1>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Input Text</label>
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:border-emerald-500 outline-none"
                    placeholder="Type here..."
                />
            </div>

            <div className="space-y-4">
                {Object.entries(hashes).map(([algo, hash]) => (
                    <div key={algo} className="bg-[#0d1117] border border-slate-800 rounded-lg p-4 relative group">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{algo}</div>
                        <div className="font-mono text-sm text-emerald-400 break-all">{hash}</div>
                        <button 
                            onClick={() => navigator.clipboard.writeText(hash as string)}
                            className="absolute top-4 right-4 p-2 bg-slate-800 rounded hover:bg-slate-700 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HashGenerator;
