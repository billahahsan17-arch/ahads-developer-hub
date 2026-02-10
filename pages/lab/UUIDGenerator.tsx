
import React, { useState } from 'react';
import { Key, Copy, RefreshCw } from 'lucide-react';

const UUIDGenerator: React.FC = () => {
    const [uuids, setUuids] = useState<string[]>([]);
    const [count, setCount] = useState(5);

    const generate = () => {
        const newUuids = Array.from({ length: count }, () => crypto.randomUUID());
        setUuids(newUuids);
    };

    return (
        <div className="h-full bg-slate-950 p-8 font-sans text-slate-300">
            <h1 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                <Key className="w-6 h-6 text-yellow-500" /> UUID Generator
            </h1>
            
            <div className="flex gap-4 mb-8">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3">
                    <span className="text-xs font-bold text-slate-500">COUNT</span>
                    <input 
                        type="number" 
                        min="1" max="50" 
                        value={count} 
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="bg-transparent w-12 text-white font-mono text-center outline-none" 
                    />
                </div>
                <button onClick={generate} className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-bold transition-all flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Generate
                </button>
            </div>

            <div className="space-y-2">
                {uuids.map((uuid, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3 rounded-lg group">
                        <span className="font-mono text-yellow-200">{uuid}</span>
                        <button onClick={() => navigator.clipboard.writeText(uuid)} className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                {uuids.length === 0 && <div className="text-slate-600 italic">Press generate...</div>}
            </div>
        </div>
    );
};

export default UUIDGenerator;
