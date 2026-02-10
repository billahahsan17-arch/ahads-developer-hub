
import React, { useState } from 'react';
import { FileDiff, Split, Columns } from 'lucide-react';

const DiffChecker: React.FC = () => {
    const [left, setLeft] = useState('const foo = 1;');
    const [right, setRight] = useState('const foo = 2;');
    const [diffs, setDiffs] = useState<any[]>([]);

    const computeDiff = () => {
        // Very basic line diff for demo purposes
        const linesL = left.split('\n');
        const linesR = right.split('\n');
        const max = Math.max(linesL.length, linesR.length);
        const res = [];

        for(let i=0; i<max; i++) {
            const l = linesL[i] || '';
            const r = linesR[i] || '';
            if (l !== r) {
                res.push({ line: i+1, left: l, right: r, status: 'MODIFIED' });
            } else {
                res.push({ line: i+1, left: l, right: r, status: 'SAME' });
            }
        }
        setDiffs(res);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-black text-white flex items-center gap-3">
                    <FileDiff className="w-6 h-6 text-orange-500" /> Diff Checker
                </h1>
                <button onClick={computeDiff} className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-bold transition-all">Compare</button>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-6 overflow-hidden mb-6">
                <textarea 
                    value={left} 
                    onChange={(e) => setLeft(e.target.value)} 
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm resize-none focus:border-orange-500/50 outline-none"
                    placeholder="Original Text"
                />
                <textarea 
                    value={right} 
                    onChange={(e) => setRight(e.target.value)} 
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm resize-none focus:border-orange-500/50 outline-none"
                    placeholder="Modified Text"
                />
            </div>

            <div className="h-64 bg-[#0d1117] border border-slate-800 rounded-xl overflow-y-auto custom-scrollbar p-4 font-mono text-xs">
                {diffs.map((d, i) => (
                    <div key={i} className={`flex ${d.status === 'MODIFIED' ? 'bg-orange-900/20' : ''}`}>
                        <div className="w-8 text-slate-600 border-r border-slate-800 pr-2 text-right select-none">{d.line}</div>
                        <div className={`flex-1 pl-4 ${d.status === 'MODIFIED' ? 'text-red-400' : 'text-slate-400'}`}>{d.left}</div>
                        <div className="w-4 border-r border-slate-800"></div>
                        <div className={`flex-1 pl-4 ${d.status === 'MODIFIED' ? 'text-green-400' : 'text-slate-400'}`}>{d.right}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiffChecker;
