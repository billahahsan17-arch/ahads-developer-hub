
import React, { useState } from 'react';
import { Ticket, Copy, Check, Loader, Briefcase, Bug, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateJiraTicket } from '../../services/atlasService';

const JiraGenerator: React.FC = () => {
    const [type, setType] = useState<'BUG' | 'STORY'>('BUG');
    const [context, setContext] = useState('');
    const [techStack, setTechStack] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!context.trim()) return;
        setLoading(true);
        setOutput('');

        // Merge Context + Stack for the service
        const fullContext = `${context}. \nTechnical Stack: ${techStack || 'Not specified'}`;

        try {
            // Uses Hybrid Service
            const result = await generateJiraTicket(type, fullContext);
            setOutput(result);
        } catch (e) {
            setOutput("Error: Ticket generation failed.");
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
                    <div className="p-2 bg-blue-900/20 rounded-lg border border-blue-500/30">
                        <Briefcase className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Ticket Generator</h1>
                        <p className="text-[10px] font-mono text-slate-500">Agile Workflow Automation</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 max-w-6xl mx-auto w-full space-y-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full min-h-[500px]">
                    
                    {/* Input Panel */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex gap-4 p-1 bg-slate-900 rounded-lg border border-slate-800 w-fit">
                            <button 
                                onClick={() => setType('BUG')}
                                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold uppercase transition-all ${type === 'BUG' ? 'bg-red-900/20 text-red-400 border border-red-500/30' : 'text-slate-500 hover:text-white'}`}
                            >
                                <Bug className="w-3 h-3" /> Bug Report
                            </button>
                            <button 
                                onClick={() => setType('STORY')}
                                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold uppercase transition-all ${type === 'STORY' ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-500 hover:text-white'}`}
                            >
                                <Lightbulb className="w-3 h-3" /> Feature Story
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Context / Rough Notes</label>
                            <textarea 
                                value={context}
                                onChange={(e) => setContext(e.target.value)}
                                placeholder="e.g. 'Login fails on Safari when user has adblock on. Only happens in Prod.'"
                                className="w-full h-32 bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none placeholder-slate-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tech Stack / Environment</label>
                            <input 
                                value={techStack}
                                onChange={(e) => setTechStack(e.target.value)}
                                placeholder="e.g. React, Node.js, AWS Cognito"
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 placeholder-slate-600"
                            />
                        </div>

                        <button 
                            onClick={handleGenerate}
                            disabled={loading || !context.trim()}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Ticket className="w-4 h-4" />}
                            {loading ? 'Drafting Ticket...' : 'Generate Ticket'}
                        </button>
                    </div>

                    {/* Output Panel */}
                    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative shadow-xl">
                        <div className="px-6 py-4 bg-slate-950/50 border-b border-slate-800 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Preview</span>
                            {output && (
                                <button onClick={copyToClipboard} className="flex items-center gap-1 text-blue-400 hover:text-white transition-colors text-xs font-bold uppercase">
                                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            )}
                        </div>
                        
                        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-slate-900">
                            {output ? (
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <ReactMarkdown>{output}</ReactMarkdown>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-50">
                                    <Ticket className="w-16 h-16 mb-4" />
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

export default JiraGenerator;
