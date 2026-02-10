
import React, { useState } from 'react';
import { Baby, MessageCircle, Sparkles, Loader, BookOpen } from 'lucide-react';
import { simplifyConcept } from '../../services/atlasService';
import ReactMarkdown from 'react-markdown';

const EliJunior: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [explanation, setExplanation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSimplify = async () => {
        if (!topic.trim()) return;
        setLoading(true);
        const data = await simplifyConcept(topic);
        setExplanation(data);
        setLoading(false);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-900/20 rounded-lg border border-pink-500/30">
                        <Baby className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">ELI5 Engine</h1>
                        <p className="text-[10px] font-mono text-slate-500">Explain Like I'm Junior</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full space-y-8 overflow-y-auto custom-scrollbar">
                
                <div className="flex flex-col items-center justify-center text-center space-y-6 min-h-[30vh]">
                    <div className="bg-slate-900 border border-slate-800 rounded-full p-4 shadow-2xl">
                        <Sparkles className="w-8 h-8 text-pink-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                        Complexity is the enemy.<br />
                        <span className="text-slate-500">Simplicity is mastery.</span>
                    </h2>
                    
                    <div className="w-full max-w-xl relative">
                        <input 
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSimplify()}
                            placeholder="Enter a complex topic (e.g. Kubernetes, Redux, OAuth)..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-full px-6 py-4 text-white focus:outline-none focus:border-pink-500 shadow-lg text-sm font-mono"
                        />
                        <button 
                            onClick={handleSimplify}
                            disabled={loading || !topic}
                            className="absolute right-2 top-2 bottom-2 bg-pink-600 hover:bg-pink-500 text-white rounded-full px-4 flex items-center gap-2 transition-all disabled:opacity-50"
                        >
                            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <MessageCircle className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {explanation && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl animate-slide-up relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                            <BookOpen className="w-32 h-32 text-pink-500" />
                        </div>
                        <div className="prose prose-invert prose-lg max-w-none relative z-10">
                            <ReactMarkdown>{explanation}</ReactMarkdown>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default EliJunior;
