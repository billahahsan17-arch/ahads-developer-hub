
import React, { useState } from 'react';
import { Image, Sparkles, Download, Loader, Maximize, Palette } from 'lucide-react';
import { generateProImage } from '../services/atlasService';

const Imagine: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
    const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '3:4'>('1:1');

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        const result = await generateProImage(prompt, size, aspectRatio);
        if (result) setImageUrl(result);
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-950 p-4 md:p-8 font-sans text-slate-300 overflow-hidden">
             <div className="max-w-7xl mx-auto w-full mb-8 flex items-center justify-between border-b border-slate-800 pb-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-900/20 rounded-xl border border-purple-500/30">
                        <Palette className="w-8 h-8 text-purple-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight uppercase">Imagine Studio</h1>
                        <p className="text-slate-500 font-mono text-sm">High-Fidelity Image Synthesis // Atlas Vision Engine</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
                
                {/* Configuration - Scrollable */}
                <div className="lg:col-span-4 flex flex-col min-h-0 order-2 lg:order-1">
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Visual Description</label>
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="A futuristic city on Mars, neon lights, 4k highly detailed..."
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm min-h-[150px] focus:outline-none focus:border-purple-500 resize-none text-white mb-6"
                            />

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Resolution</label>
                                    <div className="flex flex-col gap-2">
                                        {['1K', '2K', '4K'].map((s) => (
                                            <button 
                                                key={s}
                                                onClick={() => setSize(s as any)}
                                                className={`px-3 py-2 rounded text-xs font-bold transition-all ${size === s ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                            >
                                                {s} Ultra
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Aspect Ratio</label>
                                    <div className="flex flex-col gap-2">
                                        {['1:1', '16:9', '3:4'].map((ar) => (
                                            <button 
                                                key={ar}
                                                onClick={() => setAspectRatio(ar as any)}
                                                className={`px-3 py-2 rounded text-xs font-bold transition-all ${aspectRatio === ar ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                            >
                                                {ar}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleGenerate}
                                disabled={loading || !prompt}
                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-purple-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                                {loading ? 'Synthesizing...' : 'Generate Art'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Canvas - Full Height */}
                <div className="lg:col-span-8 order-1 lg:order-2 h-full min-h-[400px]">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl h-full flex items-center justify-center relative overflow-hidden group">
                        {imageUrl ? (
                            <>
                                <img src={imageUrl} alt="Generated" className="w-full h-full object-contain p-4" />
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <a 
                                        href={imageUrl} 
                                        download={`atlas-imagine-${Date.now()}.png`}
                                        className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                                    >
                                        <Download className="w-6 h-6" />
                                    </a>
                                </div>
                            </>
                        ) : (
                            <div className="text-center opacity-20">
                                <Image className="w-32 h-32 mx-auto mb-4" />
                                <div className="font-mono text-xl tracking-[0.3em]">CANVAS EMPTY</div>
                            </div>
                        )}
                        
                        {loading && (
                            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-20">
                                <div className="text-center">
                                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-purple-400 font-mono animate-pulse">Running Diffusion Process...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Imagine;
