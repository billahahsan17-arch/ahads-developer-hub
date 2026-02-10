
import React, { useState } from 'react';
import { Radio, Lock, Unlock, Shield, Server, Activity } from 'lucide-react';

interface Port {
    port: number;
    service: string;
    status: 'OPEN' | 'CLOSED' | 'FILTERED';
}

const COMMON_PORTS = [
    { port: 21, service: 'FTP' },
    { port: 22, service: 'SSH' },
    { port: 25, service: 'SMTP' },
    { port: 53, service: 'DNS' },
    { port: 80, service: 'HTTP' },
    { port: 443, service: 'HTTPS' },
    { port: 3306, service: 'MySQL' },
    { port: 5432, service: 'PostgreSQL' },
    { port: 6379, service: 'Redis' },
    { port: 8080, service: 'HTTP-Alt' },
];

const PortScanner: React.FC = () => {
    const [target, setTarget] = useState('');
    const [results, setResults] = useState<Port[]>([]);
    const [scanning, setScanning] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleScan = () => {
        if (!target.trim()) return;
        setScanning(true);
        setResults([]);
        setProgress(0);

        let p = 0;
        const interval = setInterval(() => {
            p += 10;
            setProgress(p);
            
            if (p >= 100) {
                clearInterval(interval);
                setScanning(false);
                // Generate Results
                const scanResults = COMMON_PORTS.map(cp => ({
                    ...cp,
                    status: Math.random() > 0.7 ? 'OPEN' : 'CLOSED'
                })) as Port[];
                setResults(scanResults);
            }
        }, 200);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-900/20 rounded-lg border border-orange-500/30">
                        <Radio className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Port Scanner</h1>
                        <p className="text-[10px] font-mono text-slate-500">Network Surface Analyzer</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full space-y-8">
                <div className="flex gap-4">
                    <input 
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        placeholder="IP Address or Hostname (e.g. 192.168.1.1)"
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 font-mono"
                    />
                    <button 
                        onClick={handleScan}
                        disabled={scanning || !target}
                        className="px-8 bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50"
                    >
                        {scanning ? `${progress}%` : 'Scan'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((port) => (
                        <div key={port.port} className={`p-4 rounded-xl border flex items-center justify-between ${
                            port.status === 'OPEN' 
                            ? 'bg-emerald-900/10 border-emerald-500/30' 
                            : 'bg-slate-900 border-slate-800 opacity-60'
                        }`}>
                            <div>
                                <div className="text-xl font-mono font-black text-white">{port.port}</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase">{port.service}</div>
                            </div>
                            <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                port.status === 'OPEN' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'
                            }`}>
                                {port.status}
                            </div>
                        </div>
                    ))}
                </div>

                {!scanning && results.length === 0 && (
                    <div className="text-center py-20 opacity-30">
                        <Shield className="w-16 h-16 mx-auto mb-4" />
                        <p className="font-mono text-sm uppercase">Target Secure</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PortScanner;
