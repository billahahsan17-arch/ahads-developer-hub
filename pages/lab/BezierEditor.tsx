
import React, { useState } from 'react';
import { Activity, Play, Copy } from 'lucide-react';

const BezierEditor: React.FC = () => {
    const [p1, setP1] = useState({ x: 0.25, y: 0.1 });
    const [p2, setP2] = useState({ x: 0.25, y: 1.0 });
    const [key, setKey] = useState(0);

    const cssValue = `cubic-bezier(${p1.x}, ${p1.y}, ${p2.x}, ${p2.y})`;

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-900/20 rounded-lg border border-pink-500/30">
                        <Activity className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Bezier Tool</h1>
                        <p className="text-[10px] font-mono text-slate-500">CSS Animation Curve Generator</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                {/* Visualizer */}
                <div className="aspect-square bg-slate-900 rounded-xl border border-slate-800 relative p-8 shadow-2xl">
                    <div className="w-full h-full border border-slate-700 relative bg-slate-950/50">
                        {/* Curve Rendering logic omitted for brevity, simplified sliders used */}
                        <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-mono text-xs">
                            Graph Visualization requires Canvas
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-8">
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-white">Preview Animation</h3>
                            <button onClick={() => setKey(k => k + 1)} className="p-2 bg-slate-800 rounded-full hover:text-white">
                                <Play className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800 relative">
                            <div 
                                key={key}
                                className="h-full w-4 bg-pink-500 absolute top-0 left-0"
                                style={{ 
                                    animation: `move 1s ${cssValue} forwards`,
                                }}
                            />
                            <style>{`
                                @keyframes move {
                                    from { left: 0%; }
                                    to { left: calc(100% - 1rem); }
                                }
                            `}</style>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-xs text-slate-500 uppercase font-bold">
                            <span>X1: {p1.x}</span>
                            <input type="range" min="0" max="1" step="0.01" value={p1.x} onChange={e => setP1({...p1, x: Number(e.target.value)})} className="accent-pink-500" />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 uppercase font-bold">
                            <span>Y1: {p1.y}</span>
                            <input type="range" min="-1" max="2" step="0.01" value={p1.y} onChange={e => setP1({...p1, y: Number(e.target.value)})} className="accent-pink-500" />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 uppercase font-bold">
                            <span>X2: {p2.x}</span>
                            <input type="range" min="0" max="1" step="0.01" value={p2.x} onChange={e => setP2({...p2, x: Number(e.target.value)})} className="accent-pink-500" />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 uppercase font-bold">
                            <span>Y2: {p2.y}</span>
                            <input type="range" min="-1" max="2" step="0.01" value={p2.y} onChange={e => setP2({...p2, y: Number(e.target.value)})} className="accent-pink-500" />
                        </div>
                    </div>

                    <div className="bg-[#0d1117] p-4 rounded-lg border border-slate-800 font-mono text-sm flex justify-between items-center text-pink-300">
                        {cssValue}
                        <button onClick={() => navigator.clipboard.writeText(cssValue)} className="hover:text-white"><Copy className="w-4 h-4" /></button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BezierEditor;
