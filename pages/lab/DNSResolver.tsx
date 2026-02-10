
import React, { useState } from 'react';
import { Globe, Search, Server, Activity, ShieldCheck } from 'lucide-react';

interface DNSRecord {
    type: string;
    value: string;
    ttl: number;
}

const DNSResolver: React.FC = () => {
    const [domain, setDomain] = useState('');
    const [results, setResults] = useState<DNSRecord[] | null>(null);
    const [loading, setLoading] = useState(false);

    const handleResolve = () => {
        if (!domain.trim()) return;
        setLoading(true);
        setResults(null);

        // Simulate Network Request
        setTimeout(() => {
            const mockRecords: DNSRecord[] = [
                { type: 'A', value: `192.0.2.${Math.floor(Math.random() * 255)}`, ttl: 3600 },
                { type: 'AAAA', value: `2001:0db8:85a3:0000:0000:8a2e:0370:${Math.floor(Math.random() * 9999)}`, ttl: 3600 },
                { type: 'MX', value: `mail.${domain} (10)`, ttl: 14400 },
                { type: 'NS', value: `ns1.${domain}`, ttl: 86400 },
                { type: 'TXT', value: `"v=spf1 include:_spf.google.com ~all"`, ttl: 3600 },
            ];
            setResults(mockRecords);
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-900/20 rounded-lg border border-blue-500/30">
                        <Globe className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">DNS Resolver</h1>
                        <p className="text-[10px] font-mono text-slate-500">Global Propagation Simulator</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full space-y-8">
                <div className="flex gap-4">
                    <input 
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="example.com"
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 font-mono"
                        onKeyDown={(e) => e.key === 'Enter' && handleResolve()}
                    />
                    <button 
                        onClick={handleResolve}
                        disabled={loading || !domain}
                        className="px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50"
                    >
                        {loading ? 'Resolving...' : 'Lookup'}
                    </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden min-h-[400px] relative">
                    {loading && (
                        <div className="absolute inset-0 bg-slate-900/80 z-20 flex items-center justify-center flex-col gap-4">
                            <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
                            <p className="text-xs font-mono text-blue-400">Querying Root Servers...</p>
                        </div>
                    )}

                    {!results && !loading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700">
                            <Server className="w-16 h-16 mb-4 opacity-20" />
                            <p className="font-mono text-sm uppercase tracking-widest">Ready for Query</p>
                        </div>
                    )}

                    {results && (
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4 border-b border-slate-800 pb-4">
                                <ShieldCheck className="w-4 h-4" /> DNSSEC Validated
                            </div>
                            {results.map((r, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                                    <div className="flex items-center gap-4">
                                        <span className="w-12 text-xs font-bold text-blue-400 bg-blue-900/10 px-2 py-1 rounded text-center">{r.type}</span>
                                        <span className="font-mono text-sm text-slate-200">{r.value}</span>
                                    </div>
                                    <span className="text-xs font-mono text-slate-500">TTL: {r.ttl}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DNSResolver;
