
import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw } from 'lucide-react';

const EpochConverter: React.FC = () => {
    const [now, setNow] = useState(Math.floor(Date.now() / 1000));
    const [input, setInput] = useState<string>('');
    const [converted, setConverted] = useState<string>('');

    useEffect(() => {
        const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!input) {
            setConverted('');
            return;
        }
        const ts = parseInt(input);
        if (!isNaN(ts)) {
            // Assume seconds if length <= 10, else ms
            const date = new Date(ts > 9999999999 ? ts : ts * 1000);
            setConverted(date.toUTCString() + ' | ' + date.toLocaleString());
        } else {
            setConverted('Invalid Timestamp');
        }
    }, [input]);

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300 p-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-amber-900/20 rounded-xl border border-amber-500/30">
                    <Clock className="w-8 h-8 text-amber-500" />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-white uppercase">Epoch Time</h1>
                    <p className="text-slate-500 font-mono text-xs">Unix Timestamp Tools</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Current Unix Epoch</div>
                    <div className="text-5xl font-black text-white font-mono tracking-tighter mb-4">{now}</div>
                    <button onClick={() => setInput(now.toString())} className="text-xs text-blue-400 hover:text-white">Use This</button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Convert Timestamp</label>
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. 1678900000"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-mono mb-4 focus:border-amber-500 outline-none"
                    />
                    <div className="p-4 bg-black/30 rounded border border-slate-800 min-h-[60px] flex items-center justify-center">
                        <span className="font-mono text-sm text-emerald-400">{converted || '...'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EpochConverter;
