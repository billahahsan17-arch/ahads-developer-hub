
import React, { useState, useRef } from 'react';
import { Eye, Upload, Image as ImageIcon, AlertTriangle, Scan, X, Cpu } from 'lucide-react';
import { analyzeVisualData } from '../services/atlasService';
import ReactMarkdown from 'react-markdown';

const Oculus: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('Analyze this architecture diagram or code snippet for flaws.');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setAnalysis('');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleScan = async () => {
        if (!image) return;
        setLoading(true);
        // Strip the data:image/png;base64, prefix for the API
        const base64Data = image.split(',')[1];
        const result = await analyzeVisualData(base64Data, prompt);
        setAnalysis(result);
        setLoading(false);
    };

    const clearImage = () => {
        setImage(null);
        setAnalysis('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="min-h-full bg-slate-950 p-4 md:p-8 font-sans text-slate-300">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8 flex items-center gap-4 border-b border-slate-800 pb-6">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 shadow-lg shadow-pink-900/10">
                    <Eye className="w-8 h-8 text-pink-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase">The Oculus</h1>
                    <p className="text-slate-500 font-mono text-sm">Visual Intelligence Subsystem // Powered by Atlas Vision</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Zone */}
                <div className="space-y-6">
                    <div 
                        className={`border-2 border-dashed rounded-2xl h-[400px] flex flex-col items-center justify-center transition-all ${image ? 'border-pink-500/50 bg-slate-900' : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-600'}`}
                    >
                        {image ? (
                            <div className="relative w-full h-full p-4">
                                <img src={image} alt="Scan Target" className="w-full h-full object-contain rounded-lg" />
                                <button 
                                    onClick={clearImage}
                                    className="absolute top-6 right-6 p-2 bg-slate-950/80 text-red-400 rounded-full hover:bg-red-900/20 border border-slate-800 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="text-center p-8">
                                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Upload className="w-8 h-8 text-slate-500" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Upload Visual Data</h3>
                                <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">Drag & drop code screenshots, whiteboard diagrams, or error logs here.</p>
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-pink-500/20"
                                >
                                    Select Image
                                </button>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleFileChange} 
                                    accept="image/*" 
                                    className="hidden" 
                                />
                            </div>
                        )}
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                        <label className="text-xs font-mono text-slate-500 uppercase font-bold mb-2 block">Scan Directive (Prompt)</label>
                        <textarea 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-pink-500/50 h-24 resize-none"
                        />
                        <button 
                            onClick={handleScan}
                            disabled={!image || loading}
                            className="w-full mt-4 py-3 bg-slate-100 hover:bg-white text-slate-900 font-bold uppercase tracking-widest rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <Scan className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
                            {loading ? 'Processing Visual Data...' : 'Initiate Scan'}
                        </button>
                    </div>
                </div>

                {/* Analysis Output */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden min-h-[400px]">
                    {/* Decorative Grid */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(#ec4899 1px, transparent 1px), linear-gradient(90deg, #ec4899 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
                    
                    {analysis ? (
                        <div className="relative z-10 animate-fade-in">
                            <div className="flex items-center gap-2 mb-6 text-pink-400 font-mono text-xs uppercase tracking-widest border-b border-slate-800 pb-4">
                                <Cpu className="w-4 h-4" /> Oculus Output Log
                            </div>
                            <div className="prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown>{analysis}</ReactMarkdown>
                            </div>
                        </div>
                    ) : (
                        <div className="relative z-10 h-full flex flex-col items-center justify-center text-slate-600">
                            <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                            <p className="font-mono text-sm uppercase tracking-widest">Awaiting Visual Input</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Oculus;
