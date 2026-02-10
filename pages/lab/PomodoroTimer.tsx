
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Bell } from 'lucide-react';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound here ideally
      if (mode === 'FOCUS') {
          setSessions(s => s + 1);
          setMode('BREAK');
          setTimeLeft(5 * 60);
      } else {
          setMode('FOCUS');
          setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setMode('FOCUS');
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'FOCUS' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="h-full flex items-center justify-center bg-slate-950">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className={`absolute inset-0 opacity-20 pointer-events-none transition-colors duration-1000 ${mode === 'FOCUS' ? 'bg-red-500/20' : 'bg-emerald-500/20'}`} />
            
            <div className="relative z-10 text-center">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 text-xs font-bold uppercase tracking-widest ${
                    mode === 'FOCUS' ? 'bg-red-900/30 border-red-500/50 text-red-400' : 'bg-emerald-900/30 border-emerald-500/50 text-emerald-400'
                }`}>
                    {mode === 'FOCUS' ? <Brain className="w-4 h-4" /> : <Coffee className="w-4 h-4" />}
                    {mode === 'FOCUS' ? 'Deep Work' : 'Rest Cycle'}
                </div>

                <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center">
                    {/* Progress Circle SVG */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="128" cy="128" r="120" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                        <circle 
                            cx="128" cy="128" r="120" 
                            stroke={mode === 'FOCUS' ? '#ef4444' : '#10b981'} 
                            strokeWidth="8" 
                            fill="transparent" 
                            strokeDasharray={2 * Math.PI * 120} 
                            strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-linear"
                        />
                    </svg>
                    <div className="absolute text-6xl font-black text-white font-mono tracking-tighter">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="flex justify-center gap-4 mb-8">
                    <button 
                        onClick={toggleTimer}
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                            isActive 
                                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                                : 'bg-white text-slate-900 hover:scale-105 shadow-lg shadow-white/10'
                        }`}
                    >
                        {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                    </button>
                    <button 
                        onClick={resetTimer}
                        className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </div>

                <div className="text-center">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Total Sessions</div>
                    <div className="flex justify-center gap-1">
                        {Array.from({length: sessions}).map((_, i) => (
                            <div key={i} className="w-2 h-6 bg-red-500 rounded-sm" />
                        ))}
                        <div className="w-2 h-6 bg-slate-800 rounded-sm animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PomodoroTimer;
