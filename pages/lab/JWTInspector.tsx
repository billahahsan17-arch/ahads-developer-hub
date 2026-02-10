
import React, { useState, useEffect } from 'react';
import { Lock, Unlock, AlertTriangle, CheckCircle, Shield, FileJson } from 'lucide-react';

interface JWTPart {
    raw: string;
    decoded: object | null;
    error: string | null;
}

const JWTInspector: React.FC = () => {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState<JWTPart>({ raw: '', decoded: null, error: null });
    const [payload, setPayload] = useState<JWTPart>({ raw: '', decoded: null, error: null });
    const [signature, setSignature] = useState('');
    const [issues, setIssues] = useState<string[]>([]);

    useEffect(() => {
        analyzeToken(token);
    }, [token]);

    const decodePart = (part: string): JWTPart => {
        try {
            const decodedStr = atob(part.replace(/-/g, '+').replace(/_/g, '/'));
            const decodedObj = JSON.parse(decodedStr);
            return { raw: part, decoded: decodedObj, error: null };
        } catch (e) {
            return { raw: part, decoded: null, error: 'Invalid Base64 or JSON' };
        }
    };

    const analyzeToken = (jwt: string) => {
        setIssues([]);
        const parts = jwt.split('.');
        
        if (parts.length !== 3) {
            setHeader({ raw: '', decoded: null, error: null });
            setPayload({ raw: '', decoded: null, error: null });
            setSignature('');
            if (jwt.length > 0) setIssues(['Token must have 3 parts (Header.Payload.Signature)']);
            return;
        }

        const h = decodePart(parts[0]);
        const p = decodePart(parts[1]);
        const s = parts[2];

        setHeader(h);
        setPayload(p);
        setSignature(s);

        // Security Analysis
        const detectedIssues: string[] = [];

        // 1. Algorithm Check
        if (h.decoded && (h.decoded as any).alg === 'none') {
            detectedIssues.push('CRITICAL: Algorithm is set to "none". Token is unsecured.');
        } else if (h.decoded && (h.decoded as any).alg === 'HS256' && jwt.length < 100) {
            detectedIssues.push('WARNING: Token seems short for HS256. Ensure strong secret.');
        }

        // 2. Expiration Check
        if (p.decoded) {
            const exp = (p.decoded as any).exp;
            if (!exp) {
                detectedIssues.push('WARNING: No "exp" (Expiration) claim found. Token never expires.');
            } else {
                const now = Math.floor(Date.now() / 1000);
                if (exp < now) {
                    detectedIssues.push(`INFO: Token expired at ${new Date(exp * 1000).toLocaleTimeString()}.`);
                }
            }
            
            // 3. IAT Check
            if (!(p.decoded as any).iat) {
                detectedIssues.push('INFO: No "iat" (Issued At) claim found.');
            }
        }

        setIssues(detectedIssues);
    };

    const PrettyJSON = ({ data }: { data: object | null }) => {
        if (!data) return <span className="text-slate-500 italic">No data</span>;
        return (
            <pre className="font-mono text-xs text-blue-300 whitespace-pre-wrap leading-relaxed">
                {JSON.stringify(data, null, 2)}
            </pre>
        );
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300 p-6 md:p-10 overflow-y-auto custom-scrollbar">
            
            <div className="max-w-6xl mx-auto w-full space-y-8">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-rose-900/20 rounded-xl border border-rose-500/30">
                            <Lock className="w-8 h-8 text-rose-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight uppercase">JWT Inspector</h1>
                            <p className="text-slate-500 font-mono text-sm">Token Analysis & Security Auditing</p>
                        </div>
                    </div>
                </div>

                {/* Input */}
                <div className="bg-slate-900 rounded-xl p-1 border border-slate-800 shadow-xl">
                    <textarea 
                        value={token}
                        onChange={(e) => setToken(e.target.value.trim())}
                        placeholder="Paste JSON Web Token (eyJ...)"
                        className="w-full h-32 bg-slate-950 border border-slate-900 rounded-lg p-4 font-mono text-sm text-white focus:outline-none focus:border-rose-500 transition-colors resize-none custom-scrollbar break-all"
                    />
                </div>

                {/* Analysis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Header */}
                    <div className="bg-slate-900 border border-red-900/30 rounded-xl overflow-hidden flex flex-col">
                        <div className="bg-red-900/20 px-4 py-2 border-b border-red-900/30 flex items-center justify-between">
                            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Header</span>
                            <FileJson className="w-3 h-3 text-red-400" />
                        </div>
                        <div className="p-4 flex-1 overflow-auto custom-scrollbar bg-[#0d1117]">
                            {header.error ? (
                                <span className="text-red-500 text-xs">{header.error}</span>
                            ) : (
                                <PrettyJSON data={header.decoded} />
                            )}
                        </div>
                    </div>

                    {/* Payload */}
                    <div className="bg-slate-900 border border-purple-900/30 rounded-xl overflow-hidden flex flex-col">
                        <div className="bg-purple-900/20 px-4 py-2 border-b border-purple-900/30 flex items-center justify-between">
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Payload</span>
                            <FileJson className="w-3 h-3 text-purple-400" />
                        </div>
                        <div className="p-4 flex-1 overflow-auto custom-scrollbar bg-[#0d1117]">
                            {payload.error ? (
                                <span className="text-red-500 text-xs">{payload.error}</span>
                            ) : (
                                <PrettyJSON data={payload.decoded} />
                            )}
                        </div>
                    </div>

                    {/* Signature */}
                    <div className="bg-slate-900 border border-cyan-900/30 rounded-xl overflow-hidden flex flex-col">
                        <div className="bg-cyan-900/20 px-4 py-2 border-b border-cyan-900/30 flex items-center justify-between">
                            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Signature</span>
                            <Shield className="w-3 h-3 text-cyan-400" />
                        </div>
                        <div className="p-4 flex-1 overflow-auto custom-scrollbar bg-[#0d1117] break-all text-xs font-mono text-cyan-300/70">
                            {signature ? signature : <span className="italic text-slate-600">Awaiting input...</span>}
                        </div>
                    </div>
                </div>

                {/* Security Report */}
                {issues.length > 0 ? (
                    <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-6 animate-fade-in">
                        <div className="flex items-center gap-2 mb-4 text-red-400">
                            <AlertTriangle className="w-5 h-5" />
                            <h3 className="font-bold uppercase tracking-widest text-sm">Security Vulnerabilities Detected</h3>
                        </div>
                        <ul className="space-y-2">
                            {issues.map((issue, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-red-200/80 font-mono bg-red-900/10 p-2 rounded">
                                    <span className="mt-1 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                                    {issue}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    token && !header.error && !payload.error && (
                        <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-6 flex items-center justify-center gap-3 animate-fade-in">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">No Critical Structure Flaws Found</span>
                        </div>
                    )
                )}

            </div>
        </div>
    );
};

export default JWTInspector;
