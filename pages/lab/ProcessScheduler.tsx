
import React, { useState, useEffect } from 'react';
import { Cpu, Play, RotateCcw, Clock, Layers, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

interface Process {
    id: string;
    arrivalTime: number;
    burstTime: number;
    remainingTime: number;
    startTime: number | null;
    finishTime: number | null;
    color: string;
    status: 'WAITING' | 'RUNNING' | 'COMPLETED';
}

interface TimelineEvent {
    processId: string | null; // null for idle
    startTime: number;
    duration: number;
    color: string;
}

const COLORS = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500'];

const ProcessScheduler: React.FC = () => {
    const [processes, setProcesses] = useState<Process[]>([]);
    const [algorithm, setAlgorithm] = useState<'FCFS' | 'SJF' | 'RR'>('FCFS');
    const [quantum, setQuantum] = useState(2);
    const [currentTime, setCurrentTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
    const [avgWait, setAvgWait] = useState(0);
    const [avgTurnaround, setAvgTurnaround] = useState(0);

    // Initial Setup
    useEffect(() => {
        resetSimulation();
    }, []);

    const resetSimulation = () => {
        setIsRunning(false);
        setCurrentTime(0);
        setTimeline([]);
        setAvgWait(0);
        setAvgTurnaround(0);
        
        const initialProcs: Process[] = Array.from({ length: 4 }).map((_, i) => ({
            id: `P${i + 1}`,
            arrivalTime: i * 2, // Staggered arrival
            burstTime: Math.floor(Math.random() * 6) + 2,
            remainingTime: 0, // Set in loop below
            startTime: null,
            finishTime: null,
            color: COLORS[i % COLORS.length],
            status: 'WAITING'
        }));
        
        initialProcs.forEach(p => p.remainingTime = p.burstTime);
        setProcesses(initialProcs);
    };

    // Simulation Step
    useEffect(() => {
        let interval: any;
        if (isRunning) {
            interval = setInterval(() => {
                stepSimulation();
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, processes, currentTime, algorithm, quantum, timeline]);

    const stepSimulation = () => {
        // Check completion
        if (processes.every(p => p.status === 'COMPLETED')) {
            setIsRunning(false);
            calculateMetrics();
            return;
        }

        let nextProc: Process | undefined;
        const availableProcs = processes.filter(p => p.arrivalTime <= currentTime && p.status !== 'COMPLETED');

        if (availableProcs.length === 0) {
            // Idle time
            updateTimeline(null, 1, 'bg-slate-800');
            setCurrentTime(t => t + 1);
            return;
        }

        // Selection Logic
        if (algorithm === 'FCFS') {
            nextProc = availableProcs.sort((a, b) => a.arrivalTime - b.arrivalTime)[0];
        } else if (algorithm === 'SJF') {
            nextProc = availableProcs.sort((a, b) => a.remainingTime - b.remainingTime)[0];
        } else if (algorithm === 'RR') {
            // Round Robin logic implies a queue state, simplified here by using arrival time cyclic priority
            // In a real OS, we'd maintain a separate ready queue structure. 
            // For visualization, we'll pick the one that has been waiting longest or just cycle.
            // Simplified: Sort by arrival, but rotate based on recent execution? 
            // Let's stick to FCFS for available, but enforce quantum limit.
            nextProc = availableProcs.sort((a, b) => a.arrivalTime - b.arrivalTime)[0];
        }

        if (!nextProc) return;

        // Execute
        const execTime = algorithm === 'RR' ? Math.min(nextProc.remainingTime, quantum) : 1;
        
        const updatedProcesses = processes.map(p => {
            if (p.id === nextProc!.id) {
                const newRemaining = p.remainingTime - execTime;
                const status = newRemaining === 0 ? 'COMPLETED' : 'WAITING';
                return {
                    ...p,
                    remainingTime: newRemaining,
                    status,
                    startTime: p.startTime === null ? currentTime : p.startTime,
                    finishTime: newRemaining === 0 ? currentTime + execTime : null
                } as Process;
            }
            return p;
        });

        // Update Timeline
        updateTimeline(nextProc.id, execTime, nextProc.color);
        
        setProcesses(updatedProcesses);
        setCurrentTime(t => t + execTime);
    };

    const updateTimeline = (pid: string | null, duration: number, color: string) => {
        setTimeline(prev => {
            const last = prev[prev.length - 1];
            // Merge contiguous blocks
            if (last && last.processId === pid) {
                return [...prev.slice(0, -1), { ...last, duration: last.duration + duration }];
            }
            return [...prev, { processId: pid, startTime: currentTime, duration, color }];
        });
    };

    const calculateMetrics = () => {
        let totalWait = 0;
        let totalTurnaround = 0;
        processes.forEach(p => {
            if (p.finishTime !== null) {
                const turn = p.finishTime - p.arrivalTime;
                const wait = turn - p.burstTime;
                totalTurnaround += turn;
                totalWait += wait;
            }
        });
        setAvgWait(parseFloat((totalWait / processes.length).toFixed(2)));
        setAvgTurnaround(parseFloat((totalTurnaround / processes.length).toFixed(2)));
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
                        <Cpu className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Process Scheduler</h1>
                        <p className="text-[10px] font-mono text-slate-500">OS Kernel Simulator</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-800 rounded-lg p-1">
                        {(['FCFS', 'SJF', 'RR'] as const).map(alg => (
                            <button
                                key={alg}
                                onClick={() => { setAlgorithm(alg); resetSimulation(); }}
                                className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${algorithm === alg ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                {alg}
                            </button>
                        ))}
                    </div>
                    <div className="h-6 w-px bg-slate-800"></div>
                    <button 
                        onClick={() => setIsRunning(!isRunning)}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${isRunning ? 'bg-amber-900/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-900/20 text-emerald-400 border border-emerald-500/30'}`}
                    >
                        {isRunning ? 'Pause' : 'Start'}
                    </button>
                    <button onClick={resetSimulation} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-8 flex flex-col gap-8 overflow-hidden">
                
                {/* Gantt Chart Area */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> CPU Execution Timeline
                    </h3>
                    <div className="h-16 w-full bg-slate-950 rounded border border-slate-800 flex overflow-hidden relative">
                        {timeline.map((block, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ width: 0 }}
                                animate={{ width: `${(block.duration / 20) * 100}%` }} // Scale factor
                                className={`h-full border-r border-slate-900/50 flex items-center justify-center text-[10px] font-bold text-white shadow-inner ${block.color}`}
                                style={{ minWidth: '40px' }} // Min width for visibility
                            >
                                {block.processId || 'IDLE'}
                            </MotionDiv>
                        ))}
                    </div>
                    <div className="mt-2 flex justify-between text-[10px] font-mono text-slate-500">
                        <span>T=0</span>
                        <span>T={currentTime}</span>
                    </div>
                </div>

                {/* Process Table */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
                    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800">
                                    <th className="pb-3 pl-2">PID</th>
                                    <th className="pb-3">Arrival</th>
                                    <th className="pb-3">Burst</th>
                                    <th className="pb-3">Remaining</th>
                                    <th className="pb-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-mono text-slate-300">
                                {processes.map(p => (
                                    <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                        <td className="py-3 pl-2 flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${p.color}`} />
                                            {p.id}
                                        </td>
                                        <td className="py-3">{p.arrivalTime}</td>
                                        <td className="py-3">{p.burstTime}</td>
                                        <td className="py-3">
                                            <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div className={`h-full ${p.color}`} style={{ width: `${(p.remainingTime / p.burstTime) * 100}%` }} />
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                                p.status === 'COMPLETED' ? 'bg-emerald-900/20 text-emerald-400' :
                                                p.status === 'RUNNING' ? 'bg-blue-900/20 text-blue-400' :
                                                'bg-slate-800 text-slate-500'
                                            }`}>
                                                {p.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Metrics Panel */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-center gap-6">
                        <div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                <Clock className="w-3 h-3" /> Avg Waiting Time
                            </div>
                            <div className="text-3xl font-black text-white">{avgWait || '--'} <span className="text-sm text-slate-500 font-normal">ms</span></div>
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                <BarChart className="w-3 h-3" /> Avg Turnaround
                            </div>
                            <div className="text-3xl font-black text-white">{avgTurnaround || '--'} <span className="text-sm text-slate-500 font-normal">ms</span></div>
                        </div>
                        <div className="mt-4 p-4 bg-slate-950 rounded-lg border border-slate-800">
                            <p className="text-xs text-slate-400 leading-relaxed">
                                <strong>Algorithm Note:</strong> {algorithm === 'FCFS' ? 'First-Come, First-Served is simple but suffers from the Convoy Effect.' : 
                                algorithm === 'SJF' ? 'Shortest Job First minimizes waiting time but requires knowing burst time in advance.' : 
                                'Round Robin provides fairness via time slicing (Quantum) but increases context switch overhead.'}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProcessScheduler;
