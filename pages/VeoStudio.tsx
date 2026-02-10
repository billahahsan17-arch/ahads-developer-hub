import React, { useState, useRef } from 'react';
import { Film, Upload, Play, Loader, AlertTriangle, Key } from 'lucide-react';
import { generateVeoVideo } from '../services/atlasService';

const VeoStudio: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const checkKeyAndGenerate = async () => {
        if (!prompt.trim() && !image) return;
        
        // Handle Key Selection Requirement
        const aistudio = (window as any).aistudio;
        if (aistudio) {
             const hasKey = await aistudio.hasSelectedApiKey();
             if (!hasKey) {
                 await aistudio.openSelectKey();
             }
        }

        setLoading(true);
        setStatus('Initializing Veo-3.1 Engine...');
        
        try {
            const imageBase64 = image ? image.split(',')[1] : undefined;
            const url = await generateVeoVideo(prompt, aspectRatio, imageBase64);
            
            if (url) {
                setVideoUrl(url);
                setStatus('Render Complete.');
            } else {
                setStatus('Generation Failed.');
            }
        } catch (e: any) {
            if (e.message === "KEY_NOT_FOUND" && (window as any).aistudio) {
                setStatus('API Key Invalid. Please select a Paid GCP Key.');
                await (window as any).aistudio.openSelectKey();
            } else {
                setStatus('System Error.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-950 p-4 md:p-8 font-sans text-slate-300 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full mb-8 flex items-center justify-between border-b border-slate-800 pb-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-900/20 rounded-xl border border-red-500/30">
                        <Film className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight uppercase">Veo Studio</h1>
                        <p className="text-slate-500 font-mono text-sm">Cinematic Video Generation // 1080p</p>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs text-amber-500 bg-amber-900/10 px-3 py-1.5 rounded-full border border-amber-900/30">
                    <Key className="w-3 h-3" /> Requires Paid GCP API Key
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
                
                {/* Controls - Scrollable */}
                <div className="lg:col-span-4 flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Prompt Directive</label>
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe the scene, lighting, and motion..."
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm min-h-[120px] focus:outline-none focus:border-red-500 resize-none text-white mb-4"
                            />

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Aspect Ratio</label>
                                    <select 
                                        value={aspectRatio}
                                        onChange={(e) => setAspectRatio(e.target.value as any)}
                                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-white"
                                    >
                                        <option value="16:9">Landscape (16:9)</option>
                                        <option value="9:16">Portrait (9:16)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Reference Image</label>
                                    <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full h-[38px] bg-slate-950 border border-slate-700 border-dashed rounded flex items-center justify-center cursor-pointer hover:border-slate-500 transition-colors"
                                    >
                                        {image ? <span className="text-xs text-emerald-400">Image Loaded</span> : <Upload className="w-4 h-4 text-slate-500" />}
                                    </div>
                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                </div>
                            </div>

                            <button 
                                onClick={checkKeyAndGenerate}
                                disabled={loading || (!prompt && !image)}
                                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-red-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
                                {loading ? 'Rendering...' : 'Generate Video'}
                            </button>

                            {status && (
                                <div className="mt-4 text-center font-mono text-xs text-slate-400 animate-pulse">
                                    {status}
                                </div>
                            )}
                        </div>
                        
                        {image && (
                            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Source Frame</label>
                                <img src={image} className="w-full rounded border border-slate-700 opacity-70" alt="Reference" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Viewport - Full Height */}
                <div className="lg:col-span-8 bg-black rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden relative shadow-2xl h-full min-h-[400px]">
                     {videoUrl ? (
                         <video 
                            src={videoUrl} 
                            controls 
                            autoPlay 
                            loop 
                            className="w-full h-full object-contain"
                         />
                     ) : (
                         <div className="text-center opacity-30">
                             <Film className="w-24 h-24 text-slate-600 mx-auto mb-4" />
                             <p className="font-mono text-slate-500 uppercase tracking-[0.2em]">Viewport Idle</p>
                         </div>
                     )}
                     
                     <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                </div>

            </div>
        </div>
    );
};

export default VeoStudio;