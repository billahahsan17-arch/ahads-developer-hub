
import React, { useState, useEffect, useRef } from 'react';
import { Activity, Server, Database, Shield, Zap, AlertOctagon, RefreshCw, TrendingUp, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface Service {
    id: string;
    name: string;
    type: 'API' | 'DB' | 'AUTH' | 'WORKER';
    health: number; // 0-100
    load: number; // 0-100
    status: 'ONLINE' | 'DEGRADED' | 'DOWN';
}

const ChaosConsole: React.FC = () => {
    const [services, setServices] = useState<Service[]>([
        { id: 's1', name: 'API Gateway', type: 'API', health: 100, load: 20, status: 'ONLINE' },
        { id: 's2', name: 'Auth Service', type: 'AUTH', health: 100, load: 15, status: 'ONLINE' },
        { id: 's3', name: 'Primary DB', type: 'DB', health: 100, load: 30, status: 'ONLINE' },
        { id: 's4', name: 'Async Worker', type: 'WORKER', health: 100, load: 10, status: 'ONLINE' },
    ]);
    
    const [globalLatency, setGlobalLatency] = useState(45); // ms
    const [errorRate, setErrorRate] = useState(0.01); // %
    const [activeChaos, setActiveChaos] = useState<string[]>([]);
    const [logs, setLogs] = useState<string[]>(['System initialized. Monitoring active.']);
    const [uptime, setUptime] = useState(100);
    const [gameOver, setGameOver] = useState(false);

    // Game Loop
    useEffect(() => {
        if (gameOver) return;

        const interval = setInterval(() => {
            setServices(prev => prev.map(s => {
                let changeHealth = 0;
                let changeLoad = Math.random() * 2 - 1; // Natural fluctuation

                // Apply Chaos Effects
                if (activeChaos.includes('latency_spike')) changeLoad += 5;
                if (activeChaos.includes('db_lock') && s.type === 'DB') changeHealth -= 5;
                if (activeChaos.includes('ddos') && s.type === 'API') changeLoad += 15;
                if (activeChaos.includes('pod_kill') && Math.random() > 0.9) changeHealth -= 20;

                // Recovery logic
                if (s.load < 50) changeHealth += 1;

                const newLoad = Math.min(100, Math.max(0, s.load + changeLoad));
                const newHealth = Math.min(100, Math.max(0, s.health + changeHealth));
                
                let status: Service['status'] = 'ONLINE';
                if (newHealth < 50) status = 'DEGRADED';
                if (newHealth <= 0) status = 'DOWN';

                return { ...s, load: newLoad, health: newHealth, status };
            }));

            // Global Metrics Update
            if (activeChaos.includes('latency_spike')) setGlobalLatency(l => Math.min(5000, l + 50));
            else setGlobalLatency(l => Math.max(45, l - 10));

            // Check Game Over
            if (services.every(s => s.status === 'DOWN')) {
                setGameOver(true);
                addLog('CRITICAL: CASCADING FAILURE COMPLETE. SYSTEM OFFLINE.');
            }

        }, 1000);

        return () => clearInterval(interval);
    }, [activeChaos, gameOver, services]);

    const addLog = (msg: string) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 10)]);
    };

    const injectChaos = (type: string) => {
        if (gameOver) return;
        if (activeChaos.includes(type)) return;
        setActiveChaos([...activeChaos, type]);
        addLog(`WARNING: Injecting fault ${type.toUpperCase()}...`);
    };

    const applyFix = (type: string) => {
        if (gameOver) return;
        
        switch (type) {
            case 'scale':
                setServices(s => s.map(srv => ({ ...srv, load: Math.max(0, srv.load - 30) })));
                addLog('ACTION: Auto-scaling triggered. Load dispersed.');
                break;
            case 'circuit_breaker':
                setActiveChaos(activeChaos.filter(c => c !== 'latency_spike'));
                setGlobalLatency(45);
                addLog('ACTION: Circuit breakers tripped. Dependency isolated.');
                break;
            case 'restart':
                setServices(s => s.map(srv => ({ ...srv, health: 100, status: 'ONLINE' })));
                setActiveChaos(activeChaos.filter(c => c !== 'db_lock' && c !== 'pod_kill'));
                addLog('ACTION: Rolling restart initiated. Services healthy.');
                break;
            case 'firewall':
                setActiveChaos(activeChaos.filter(c => c !== 'ddos'));
                addLog('ACTION: WAF rules updated. Traffic scrubbed.');
                break;
        }
    };

    const resetSim = () => {
        setServices([
            { id: 's1', name: 'API Gateway', type: 'API', health: 100, load: 20, status: 'ONLINE' },
            { id: 's2', name: 'Auth Service', type: 'AUTH', health: 100, load: 15, status: 'ONLINE' },
            { id: 's3', name: 'Primary DB', type: 'DB', health: 100, load: 30, status: 'ONLINE' },
            { id: 's4', name: 'Async Worker', type: 'WORKER', health: 100, load: 10, status: 'ONLINE' },
        ]);
        setActiveChaos([]);
        setGlobalLatency(45);
        setGameOver(false);
        setLogs(['System reset. Ready for testing.']);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-900/20 rounded-lg border border-red-500/30">
                        <Activity className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Chaos Console</h1>
                        <p className="text-[10px] font-mono text-slate-500">Resilience Engineering Simulator</p>
                    </div>
                </div>
                <div className="flex gap-4 text-xs font-mono">
                    <div className={`px-3 py-1 rounded border ${globalLatency > 1000 ? 'bg-red-900/20 border-red-500 text-red-400' : 'bg-slate-800 border-slate-700 text-emerald-400'}`}>
                        LATENCY: {globalLatency}ms
                    </div>
                    <div className="px-3 py-1 rounded border bg-slate-800 border-slate-700 text-blue-400">
                        HEALTH: {Math.round(services.reduce((acc, s) => acc + s.health, 0) / 4)}%
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="max-w-6xl mx-auto space-y-8">
                    
                    {/* System Topology */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {services.map(s => (
                            <MotionDiv 
                                key={s.id}
                                layout
                                className={`p-4 rounded-xl border relative overflow-hidden transition-all ${
                                    s.status === 'DOWN' ? 'bg-red-950/50 border-red-500' : 
                                    s.status === 'DEGRADED' ? 'bg-amber-900/20 border-amber-500' : 
                                    'bg-slate-900 border-slate-800'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className="flex items-center gap-2">
                                        {s.type === 'DB' ? <Database className="w-4 h-4" /> : <Server className="w-4 h-4" />}
                                        <span className="font-bold text-sm text-white">{s.name}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                        s.status === 'ONLINE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                                    }`}>
                                        {s.status}
                                    </span>
                                </div>
                                
                                <div className="space-y-2 relative z-10">
                                    <div>
                                        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                            <span>Health</span>
                                            <span>{Math.round(s.health)}%</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-500 ${s.health > 50 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                                                style={{ width: `${s.health}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                            <span>Load</span>
                                            <span>{Math.round(s.load)}%</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-500 ${s.load < 80 ? 'bg-blue-500' : 'bg-amber-500'}`} 
                                                style={{ width: `${s.load}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Warning Flash */}
                                {s.status !== 'ONLINE' && (
                                    <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none" />
                                )}
                            </MotionDiv>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* Chaos Controls */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Inject Failure
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => injectChaos('latency_spike')} className="p-3 bg-slate-950 border border-slate-800 hover:border-red-500 hover:text-red-400 rounded-lg text-xs font-bold transition-all text-left">
                                    Inject Latency
                                    <div className="text-[10px] font-normal text-slate-500 mt-1">Simulate network lag</div>
                                </button>
                                <button onClick={() => injectChaos('db_lock')} className="p-3 bg-slate-950 border border-slate-800 hover:border-red-500 hover:text-red-400 rounded-lg text-xs font-bold transition-all text-left">
                                    Deadlock DB
                                    <div className="text-[10px] font-normal text-slate-500 mt-1">Halt database writes</div>
                                </button>
                                <button onClick={() => injectChaos('ddos')} className="p-3 bg-slate-950 border border-slate-800 hover:border-red-500 hover:text-red-400 rounded-lg text-xs font-bold transition-all text-left">
                                    DDoS Attack
                                    <div className="text-[10px] font-normal text-slate-500 mt-1">Spike traffic load</div>
                                </button>
                                <button onClick={() => injectChaos('pod_kill')} className="p-3 bg-slate-950 border border-slate-800 hover:border-red-500 hover:text-red-400 rounded-lg text-xs font-bold transition-all text-left">
                                    Kill Random Pod
                                    <div className="text-[10px] font-normal text-slate-500 mt-1">Simulate crash</div>
                                </button>
                            </div>
                        </div>

                        {/* Mitigation Controls */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Shield className="w-4 h-4" /> SRE Countermeasures
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => applyFix('scale')} className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 rounded-lg text-xs font-bold transition-all text-left">
                                    Auto-Scale Group
                                    <div className="text-[10px] font-normal text-slate-500 mt-1">Add compute capacity</div>
                                </button>
                                <button onClick={() => applyFix('circuit_breaker')} className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 rounded-lg text-xs font-bold transition-all text-left">
                                    Trip Circuit Breaker
                                    <div className="text-[10px] font-normal text-slate-500 mt-1">Stop cascading failure</div>
                                </button>
                                <button onClick={() => applyFix('firewall')} className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 rounded-lg text-xs font-bold transition-all text-left">
                                    Enable WAF
                                    <div className="text-[10px] font-normal text-slate-500 mt-1">Block malicious IPs</div>
                                </button>
                                <button onClick={() => applyFix('restart')} className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 rounded-lg text-xs font-bold transition-all text-left">
                                    Rolling Restart
                                    <div className="text-[10px] font-normal text-slate-500 mt-1">Fresh instances</div>
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Console Output */}
                    <div className="bg-black rounded-xl border border-slate-800 p-4 h-48 font-mono text-xs overflow-y-auto custom-scrollbar flex flex-col-reverse">
                        {gameOver && (
                            <div className="text-red-500 font-bold mb-2">
                                SYSTEM FAILURE. ALL SERVICES UNRESPONSIVE. <button onClick={resetSim} className="underline ml-2">REBOOT SYSTEM</button>
                            </div>
                        )}
                        {logs.map((log, i) => (
                            <div key={i} className={`mb-1 ${log.includes('CRITICAL') ? 'text-red-500 font-bold' : log.includes('WARNING') ? 'text-amber-500' : log.includes('ACTION') ? 'text-blue-400' : 'text-slate-500'}`}>
                                {log}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChaosConsole;
