
import React, { useState } from 'react';
import { Grid, CheckCircle } from 'lucide-react';

const GridDrill: React.FC = () => {
    const [cols, setCols] = useState(3);
    const [gap, setGap] = useState(10);
    
    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center px-6">
                <Grid className="w-5 h-5 text-emerald-500 mr-3" />
                <h1 className="font-bold text-white uppercase text-sm">Grid Garden (Lite)</h1>
            </div>
            
            <div className="flex-1 flex flex-col p-8 gap-8">
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden grid p-4"
                     style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: `${gap}px` }}>
                    {Array.from({length: 6}).map((_, i) => (
                        <div key={i} className="bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 font-mono border border-slate-700">
                            Item {i+1}
                        </div>
                    ))}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex gap-8">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Columns: {cols}</label>
                        <input type="range" min="1" max="6" value={cols} onChange={e => setCols(Number(e.target.value))} className="accent-emerald-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Gap: {gap}px</label>
                        <input type="range" min="0" max="50" value={gap} onChange={e => setGap(Number(e.target.value))} className="accent-emerald-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GridDrill;
