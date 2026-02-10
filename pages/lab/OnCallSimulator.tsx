
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Terminal, CheckCircle, XCircle, Clock, Server, Activity } from 'lucide-react';

interface Scene {
    id: string;
    text: string;
    options:Option[];
    type: 'DECISION' | 'SUCCESS' | 'FAILURE';
}

interface Option {
    label: string;
    nextId: string;
    type: 'SAFE' | 'RISKY' | 'NEUTRAL';
}

const SCENARIOS: Record<string, Scene> = {
    start: {
        id: 'start',
        type: 'DECISION',
        text: "PAGERDUTY ALERT [03:14 AM]: Critical CPU Spike (99%) on Primary DB Cluster (us-east-1). 500 Error rate is climbing. What do you do first?",
        options: [
            { label: "Acknowledge the alert and open monitoring dashboards.", nextId: 'dashboard', type: 'SAFE' },
            { label: "Immediately restart the database service.", nextId: 'restart_fail', type: 'RISKY' },
            { label: "Ignore it, auto-scaling should handle it.", nextId: 'ignore_fail', type: 'RISKY' }
        ]
    },
    dashboard: {
        id: 'dashboard',
        type: 'DECISION',
        text: "You see a massive spike in write operations. The 'orders' table is locked. It seems like a bad migration or a DDoS. Connections are maxed out.",
        options: [
            { label: "Check the active queries (`SHOW PROCESSLIST`).", nextId: 'queries', type: 'SAFE' },
            { label: "Scale up the instance size immediately.", nextId: 'scale_slow', type: 'NEUTRAL' },
            { label: "Block all traffic from external IPs.", nextId: 'block_traffic', type: 'RISKY' }
        ]
    },
    queries: {
        id: 'queries',
        type: 'DECISION',
        text: "You find a query: `SELECT * FROM orders WHERE status != 'completed'` running 500 times per second without an index. It's locking the table.",
        options: [
            { label: "Kill the specific long-running queries.", nextId: 'kill_success', type: 'SAFE' },
            { label: "Deploy a hotfix to add an index.", nextId: 'index_fail', type: 'RISKY' },
        ]
    },
    restart_fail: {
        id: 'restart_fail',
        type: 'FAILURE',
        text: "FAILURE: Restarting the DB cleared the cache, causing a 'Thundering Herd' problem when it came back up. The site is now fully down.",
        options: []
    },
    ignore_fail: {
        id: 'ignore_fail',
        type: 'FAILURE',
        text: "FAILURE: Auto-scaling couldn't keep up with the lock contention. The connection pool exhausted, and the application crashed.",
        options: []
    },
    scale_slow: {
        id: 'scale_slow',
        type: 'FAILURE',
        text: "FAILURE: Scaling an RDS instance takes 15 minutes. By the time it finished, customers had already churned. Too slow.",
        options: []
    },
    block_traffic: {
        id: 'block_traffic',
        type: 'FAILURE',
        text: "FAILURE: You blocked legitimate user traffic. The CEO is calling you now.",
        options: []
    },
    index_fail: {
        id: 'index_fail',
        type: 'FAILURE',
        text: "FAILURE: Adding an index on a massive table locks it for writing. You just froze the entire production database.",
        options: []
    },
    kill_success: {
        id: 'kill_success',
        type: 'SUCCESS',
        text: "SUCCESS: Killing the bad queries released the locks. CPU dropped to 20%. You identified the bad microservice and rolled it back. Service restored.",
        options: []
    }
};

const OnCallSimulator: React.FC = () => {
    const [currentSceneId, setCurrentSceneId] = useState('start');
    const [history, setHistory] = useState<string[]>(['start']);
    const [timer, setTimer] = useState(0);
    const [active, setActive] = useState(false);

    useEffect(() => {
        let interval: any;
        if (active) {
            interval = setInterval(() => setTimer(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [active]);

    const handleOption = (nextId: string) => {
        if (!active) setActive(true);
        setCurrentSceneId(nextId);
        setHistory([...history, nextId]);
        
        if (SCENARIOS[nextId].type !== 'DECISION') {
            setActive(false);
        }
    };

    const reset = () => {
        setCurrentSceneId('start');
        setHistory(['start']);
        setTimer(0);
        setActive(false);
    };

    const scene = SCENARIOS[currentSceneId];

    return (
        <div className="h-full flex flex-col bg-black text-green-500 font-mono p-4 md:p-12 overflow-y-auto custom-scrollbar relative">
            {/* CRT Effect Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
            
            <div className="max-w-3xl mx-auto w-full relative z-20">
                <div className="flex justify-between items-end border-b-2 border-green-800 pb-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold glitch-text">INCIDENT_COMMAND</h1>
                        <p className="text-xs text-green-700">DO NOT PANIC. TRUST YOUR TRAINING.</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 text-xl font-bold">
                            <Clock className="w-5 h-5" />
                            {new Date(timer * 1000).toISOString().substr(14, 5)}
                        </div>
                        <div className="text-xs text-green-700">T-MINUS UNTIL SLA BREACH</div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Log History */}
                    <div className="space-y-4 opacity-50">
                        {history.slice(0, -1).map((histId, idx) => (
                            <div key={idx} className="pl-4 border-l border-green-900">
                                <div className="text-xs text-green-700 mb-1">LOG_ENTRY_{idx}</div>
                                <div>{SCENARIOS[histId].text}</div>
                            </div>
                        ))}
                    </div>

                    {/* Current Scene */}
                    <div className="bg-green-900/10 border border-green-500/50 p-6 rounded-lg animate-fade-in shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                {scene.type === 'FAILURE' ? <XCircle className="w-6 h-6 text-red-500" /> : 
                                 scene.type === 'SUCCESS' ? <CheckCircle className="w-6 h-6 text-emerald-400" /> : 
                                 <AlertTriangle className="w-6 h-6 text-amber-500 animate-pulse" />}
                            </div>
                            <div className="flex-1">
                                <p className="text-lg leading-relaxed">{scene.text}</p>
                            </div>
                        </div>
                    </div>

                    {/* Options */}
                    {scene.type === 'DECISION' ? (
                        <div className="grid gap-4 mt-8">
                            {scene.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleOption(opt.nextId)}
                                    className="text-left p-4 border border-green-800 hover:bg-green-900/30 hover:border-green-500 transition-all rounded group flex items-center justify-between"
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="text-green-700 font-bold group-hover:text-green-400">[{idx + 1}]</span>
                                        {opt.label}
                                    </span>
                                    <Activity className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-8 text-center">
                            <button 
                                onClick={reset}
                                className="px-8 py-3 bg-green-900/50 border border-green-500 hover:bg-green-800 text-green-100 font-bold rounded uppercase tracking-widest transition-all"
                            >
                                {scene.type === 'SUCCESS' ? 'RESOLVE TICKET' : 'SYSTEM REBOOT'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OnCallSimulator;
