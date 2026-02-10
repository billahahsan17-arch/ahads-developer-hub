
import React, { useState } from 'react';
import { DollarSign, MessageSquare, Send, Loader, Shield, Briefcase } from 'lucide-react';
import { generateNegotiation } from '../../services/atlasService';
import ReactMarkdown from 'react-markdown';

const SalaryScript: React.FC = () => {
    const [offer, setOffer] = useState('');
    const [leverage, setLeverage] = useState('');
    const [strategy, setStrategy] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!offer.trim()) return;
        setLoading(true);
        const result = await generateNegotiation(offer, leverage);
        setStrategy(result);
        setLoading(false);
    };

    return (
        <div className="h-full bg-slate-950 p-6 md:p-10 font-sans text-slate-300 overflow-y-auto custom-scrollbar">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-900/20 rounded-xl border border-emerald-500/20">
                            <DollarSign className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">Negotiation Strategist</h1>
                            <p className="text-slate-500 font-mono text-sm">Salary Logic & Script Generator</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Current Offer</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <input 
                                    type="text" 
                                    value={offer}
                                    onChange={(e) => setOffer(e.target.value)}
                                    placeholder="120000"
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white font-mono focus:border-emerald-500 outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Leverage / Counter</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <input 
                                    type="text" 
                                    value={leverage}
                                    onChange={(e) => setLeverage(e.target.value)}
                                    placeholder="e.g. Offer from Google, Strong market data"
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-emerald-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleGenerate}
                        disabled={loading || !offer.trim()}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
                        {loading ? 'Calculating Leverage...' : 'Generate Strategy'}
                    </button>
                </div>

                {strategy && (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 relative overflow-hidden animate-slide-up">
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                            <MessageSquare className="w-64 h-64 text-emerald-500" />
                        </div>
                        
                        <div className="relative z-10 prose prose-invert prose-lg max-w-none prose-headings:text-emerald-300 prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white">
                            <ReactMarkdown>{strategy}</ReactMarkdown>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
                            <button className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest hover:text-white transition-colors">
                                <Send className="w-4 h-4" /> Export to Clipboard
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default SalaryScript;
