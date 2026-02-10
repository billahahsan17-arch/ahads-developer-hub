
import React, { useState, useRef } from 'react';
import { Bug, Upload, X, Loader, Search, AlertTriangle, Terminal } from 'lucide-react';
import { analyzeVisualData } from '../../services/atlasService';
import ReactMarkdown from 'react-markdown';

const ScreenshotDebugger: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setAnalysis('');
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;
        setLoading(true);
        setError(null);

        const prompt = `
        You are a Principal Software Engineer debugging a critical issue.
        Analyze this screenshot. It likely contains an error message, stack trace, or a broken UI state.
        
        Provide a structured breakdown:
        1. **The Symptom**: What exactly is failing? Identify the specific error message or visual defect.
        2. **The Root Cause**: Explain WHY this is happening. Infer from error codes, stack frames, or visual context.
        3. **The Fix**: Provide specific code steps or configuration changes to resolve it.
        4. **Prevention**: How to ensure this doesn't happen again.
        
        Format as Markdown. Be concise and technical.
        `;

        try {
            const base64 = image.split(',')[1];
            const result = await analyzeVisualData(base64, prompt);
            setAnalysis(result);
        } catch (e: any) {
            setError(e.message || "Analysis failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-900/20 rounded-lg border border-red-500/30">
                        <Bug className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Screenshot Debugger</h1>
                        <p className="text-[10px] font-mono text-slate-500">Visual Error Analysis Engine</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
                
                {/* Left: Input Zone */}
                <div className="flex flex-col gap-6 h-full">
                    <div className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all ${image ? 'border-red-500/30 bg-slate-900' : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900'}`}>
                        {image ? (
                            <>
                                <img src={image} alt="Error Screenshot" className="max-w-full max-h-full object-contain p-4" />
                                <button 
                                    onClick={() => { setImage(null); setAnalysis(''); }}
                                    className="absolute top-4 right-4 p-2 bg-slate-950/80 rounded-full text-white hover:bg-red-900/50 transition-colors border border-slate-800"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </>
                        ) : (
                            <div className="text-center p-8">
                                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                                    <AlertTriangle className="w-8 h-8 text-amber-500" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Upload Error Context</h3>
                                <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
                                    Screenshots of console logs, stack traces, crash modals, or UI glitches.
                                </p>
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-bold transition-all shadow-lg shadow-red-900/20"
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

                    <button 
                        onClick={handleAnalyze}
                        disabled={!image || loading}
                        className="w-full py-4 bg-slate-100 hover:bg-white text-slate-950 font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl"
                    >
                        {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                        {loading ? 'Diagnosing...' : 'Analyze Error'}
                    </button>
                </div>

                {/* Right: Output Zone */}
                <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Diagnostic Report</span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-slate-900 relative">
                        {analysis ? (
                            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-red-400 prose-code:text-red-200 prose-code:bg-red-950/30 prose-code:px-1 prose-code:rounded">
                                <ReactMarkdown>{analysis}</ReactMarkdown>
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 opacity-50">
                                <Terminal className="w-16 h-16 mb-4" />
                                <p className="font-mono text-sm uppercase tracking-widest">Awaiting Visual Logs</p>
                            </div>
                        )}
                        {error && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 text-red-400 p-8 text-center border-l-4 border-red-500">
                                {error}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ScreenshotDebugger;
