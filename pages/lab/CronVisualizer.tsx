
import React, { useState } from 'react';
import { Clock, Calendar, AlertCircle } from 'lucide-react';

const CronVisualizer: React.FC = () => {
    const [cron, setCron] = useState('* * * * *');
    
    // Very basic parser for visualization display purposes
    const parseCron = (str: string) => {
        const parts = str.trim().split(/\s+/);
        if (parts.length !== 5) return null;
        return {
            minute: parts[0],
            hour: parts[1],
            day: parts[2],
            month: parts[3],
            weekday: parts[4]
        };
    };

    const parsed = parseCron(cron);

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-900/20 rounded-lg border border-purple-500/30">
                        <Clock className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Cron Visualizer</h1>
                        <p className="text-[10px] font-mono text-slate-500">Schedule Parser</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full flex flex-col justify-center">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    <input 
                        value={cron}
                        onChange={(e) => setCron(e.target.value)}
                        className="w-full text-center text-4xl font-mono bg-transparent border-b-2 border-purple-500/50 focus:border-purple-500 outline-none pb-4 mb-12 text-white"
                    />

                    {parsed ? (
                        <div className="grid grid-cols-5 gap-4 text-center">
                            <CronPart label="Minute" val={parsed.minute} />
                            <CronPart label="Hour" val={parsed.hour} />
                            <CronPart label="Day (Month)" val={parsed.day} />
                            <CronPart label="Month" val={parsed.month} />
                            <CronPart label="Day (Week)" val={parsed.weekday} />
                        </div>
                    ) : (
                        <div className="text-center text-red-400 flex items-center justify-center gap-2">
                            <AlertCircle className="w-5 h-5" /> Invalid Format
                        </div>
                    )}

                    <div className="mt-12 p-6 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center gap-4 text-sm text-slate-400">
                        <Calendar className="w-5 h-5" />
                        <span>Next Run: <strong>{new Date().toLocaleTimeString()}</strong> (Simulated)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CronPart = ({ label, val }: { label: string, val: string }) => (
    <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-xl font-bold text-white border border-slate-700">
            {val}
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
);

export default CronVisualizer;
