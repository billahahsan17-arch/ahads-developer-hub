
import React, { useState, useRef } from 'react';
import { Database, Upload, X, Loader, FileCode, ArrowRight } from 'lucide-react';
import { analyzeVisualData } from '../../services/atlasService';
import CodeBlock from '../../components/CodeBlock';

const DBDigitizer: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [sql, setSql] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setSql('');
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDigitize = async () => {
        if (!image) return;
        setLoading(true);
        setError(null);

        const prompt = `
        You are a Senior Database Architect.
        Analyze this image (ER diagram, whiteboard sketch, or schema screenshot).
        
        Task:
        1. Identify all tables, columns, keys (PK/FK), and data types.
        2. Infer relationships between tables.
        3. Generate valid PostgreSQL \`CREATE TABLE\` statements.
        4. Add comments explaining relationships.
        
        Output ONLY the SQL code. No markdown formatting blocks (like \`\`\`sql), just the raw code.
        `;

        try {
            const base64 = image.split(',')[1];
            let result = await analyzeVisualData(base64, prompt);
            
            // Clean up any markdown if the model hallucinates it despite instructions
            result = result.replace(/```sql|```/g, '').trim();
            
            setSql(result);
        } catch (e: any) {
            setError(e.message || "Digitization failed. Ensure API Key is active.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
                        <Database className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">DB Digitizer</h1>
                        <p className="text-[10px] font-mono text-slate-500">Analog to SQL Converter</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
                
                {/* Left: Input Zone */}
                <div className="flex flex-col gap-6 h-full">
                    <div className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all ${image ? 'border-indigo-500/30 bg-slate-900' : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900'}`}>
                        {image ? (
                            <>
                                <img src={image} alt="Schema" className="max-w-full max-h-full object-contain p-4" />
                                <button 
                                    onClick={() => { setImage(null); setSql(''); }}
                                    className="absolute top-4 right-4 p-2 bg-slate-950/80 rounded-full text-white hover:bg-red-900/50 transition-colors border border-slate-800"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </>
                        ) : (
                            <div className="text-center p-8">
                                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                                    <Upload className="w-8 h-8 text-slate-500" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Upload Schema</h3>
                                <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
                                    Upload whiteboard photos, napkin sketches, or diagram screenshots.
                                </p>
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-900/20"
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
                        onClick={handleDigitize}
                        disabled={!image || loading}
                        className="w-full py-4 bg-slate-100 hover:bg-white text-slate-950 font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl"
                    >
                        {loading ? <Loader className="w-5 h-5 animate-spin" /> : <FileCode className="w-5 h-5" />}
                        {loading ? 'Analyzing Structure...' : 'Generate SQL'}
                    </button>
                </div>

                {/* Right: Output Zone */}
                <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Generated DDL</span>
                        {sql && (
                            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                                PostgreSQL Compatible <ArrowRight className="w-3 h-3" />
                            </span>
                        )}
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-[#0d1117] relative">
                        {sql ? (
                            <CodeBlock className="language-sql">{sql}</CodeBlock>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 opacity-50">
                                <Database className="w-16 h-16 mb-4" />
                                <p className="font-mono text-sm uppercase tracking-widest">Awaiting Schema Input</p>
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

export default DBDigitizer;
