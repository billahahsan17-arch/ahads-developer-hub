
import React, { useState } from 'react';
import { Loader, Zap, ArrowRight, Copy, Check } from 'lucide-react';
import { generateGenericAI } from '../../services/atlasService';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../components/CodeBlock';

interface UniversalGeneratorProps {
    toolId: string;
    title: string;
    description: string;
    inputLabel: string;
    inputPlaceholder: string;
    promptTemplate: string;
    icon: any;
    outputMode: 'code' | 'text' | 'markdown';
    language?: string; // For code blocks
}

const UniversalGenerator: React.FC<UniversalGeneratorProps> = ({
    toolId, title, description, inputLabel, inputPlaceholder, promptTemplate, icon: Icon, outputMode, language
}) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setOutput('');

        try {
            const result = await generateGenericAI(toolId, promptTemplate, input);
            // Cleanup markdown blocks if they are wrapping the whole output and we want just the content
            const cleaned = outputMode === 'code' ? result.replace(/```\w*\n|```/g, '') : result;
            setOutput(cleaned);
        } catch (e) {
            setOutput("System Error: Neural Link Failed.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
                        <Icon className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">{title}</h1>
                        <p className="text-[10px] font-mono text-slate-500">{description}</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 max-w-6xl mx-auto w-full space-y-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full min-h-[500px]">
                    
                    {/* Input Panel */}
                    <div className="flex flex-col space-y-4">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{inputLabel}</label>
                        <textarea 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={inputPlaceholder}
                            className="w-full h-48 bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 resize-none placeholder-slate-600 custom-scrollbar transition-colors"
                        />
                        <button 
                            onClick={handleGenerate}
                            disabled={loading || !input.trim()}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                            {loading ? 'Synthesizing...' : 'Generate Output'}
                        </button>
                    </div>

                    {/* Output Panel */}
                    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative shadow-xl">
                        <div className="px-6 py-4 bg-slate-950/50 border-b border-slate-800 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Neural Result</span>
                            {output && (
                                <button onClick={copyToClipboard} className="flex items-center gap-1 text-indigo-400 hover:text-white transition-colors text-xs font-bold uppercase">
                                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            )}
                        </div>
                        
                        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-slate-900">
                            {output ? (
                                outputMode === 'code' ? (
                                    <CodeBlock className={`language-${language || 'text'}`}>{output}</CodeBlock>
                                ) : outputMode === 'markdown' ? (
                                    <div className="prose prose-invert prose-sm max-w-none">
                                        <ReactMarkdown>{output}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{output}</p>
                                )
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-50">
                                    <Icon className="w-16 h-16 mb-4" />
                                    <p className="font-mono text-sm uppercase">Awaiting Input</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UniversalGenerator;
