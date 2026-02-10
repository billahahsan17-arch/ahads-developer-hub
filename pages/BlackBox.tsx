
import React, { useState, useEffect } from 'react';
import { Save, Terminal, Activity, Calendar, Hash, Sparkles, HardDrive, Cpu, AlertTriangle, Brain, Trash2, AlertOctagon, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { analyzeEngineeringLog } from '../services/atlasService';
import { LogEntry } from '../types';

export default function BlackBox() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<LogEntry | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('atlas_blackbox_logs');
    if (saved) {
        setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('atlas_blackbox_logs', JSON.stringify(entries));
  }, [entries]);

  const handleCommit = () => {
    if (!currentInput.trim()) return;
    
    const newEntry: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        content: currentInput,
        tags: ['ENGINEERING', 'LOG'],
        level: 'INFO'
    };
    
    const updated = [newEntry, ...entries];
    setEntries(updated);
    setCurrentInput('');
    setSelectedEntry(newEntry);
  };

  const handleClearLogs = () => {
      if(window.confirm('Purge all flight data? This cannot be undone.')) {
          setEntries([]);
          setSelectedEntry(null);
          localStorage.removeItem('atlas_blackbox_logs');
      }
  }

  const handleAnalyze = async (entry: LogEntry) => {
    setAnalyzing(true);
    const result = await analyzeEngineeringLog(entry.content);
    
    const updated = entries.map(e => {
        if (e.id === entry.id) {
            return { ...e, analysis: result };
        }
        return e;
    });
    setEntries(updated);
    if (selectedEntry?.id === entry.id) {
        setSelectedEntry({ ...entry, analysis: result });
    }
    setAnalyzing(false);
  };

  const getLevelIcon = (level?: string) => {
      switch(level) {
          case 'CRITICAL': return <AlertOctagon className="w-3 h-3 text-red-500" />;
          case 'ERROR': return <AlertTriangle className="w-3 h-3 text-orange-500" />;
          case 'WARNING': return <AlertTriangle className="w-3 h-3 text-yellow-500" />;
          default: return <Info className="w-3 h-3 text-blue-500" />;
      }
  };

  const getLevelBorder = (level?: string) => {
      switch(level) {
          case 'CRITICAL': return 'border-red-500/50 bg-red-900/10';
          case 'ERROR': return 'border-orange-500/50 bg-orange-900/10';
          default: return 'border-slate-800 bg-slate-900/50';
      }
  };

  return (
    <div className="min-h-full bg-slate-950 p-4 md:p-8 font-sans text-slate-300">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-slate-900 rounded border border-slate-700">
                    <HardDrive className="w-6 h-6 text-emerald-500" />
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight">THE BLACK BOX</h1>
            </div>
            <p className="text-slate-500 font-mono text-sm max-w-xl">
                Persistent engineering flight recorder. Log architectures, failures, and breakthroughs. Data is local-only.
            </p>
        </div>
        <div className="text-right hidden md:block">
            <div className="text-xs font-mono text-slate-500 uppercase mb-1">Total Commits</div>
            <div className="text-2xl font-bold text-white">{entries.length}</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Editor & Input */}
        <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-2xl relative group focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-t-xl opacity-50"></div>
                <textarea 
                    className="w-full h-64 bg-slate-950/50 p-6 text-slate-200 font-mono text-sm focus:outline-none resize-none rounded-lg custom-scrollbar placeholder-slate-700"
                    placeholder="// Write today's engineering log... (Markdown supported)"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                />
                <div className="flex justify-between items-center px-4 py-3 bg-slate-900 rounded-b-lg border-t border-slate-800">
                    <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                        <Terminal className="w-3 h-3" />
                        READY_TO_COMMIT
                    </div>
                    <button 
                        onClick={handleCommit}
                        disabled={!currentInput.trim()}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/20"
                    >
                        <Save className="w-3 h-3" /> Commit Log
                    </button>
                </div>
            </div>

            {/* Entry View */}
            {selectedEntry && (
                <div className="animate-fade-in space-y-4">
                    <div className={`border rounded-xl p-6 relative overflow-hidden ${getLevelBorder(selectedEntry.level)}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="text-xs font-mono text-slate-500 border border-slate-700 px-2 py-0.5 rounded bg-slate-950 flex items-center gap-2">
                                    {getLevelIcon(selectedEntry.level)}
                                    {new Date(selectedEntry.timestamp).toLocaleString()}
                                </div>
                                <div className="text-xs font-mono text-blue-500">#{selectedEntry.id}</div>
                            </div>
                            <button 
                                onClick={() => handleAnalyze(selectedEntry)}
                                disabled={analyzing}
                                className="flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-white transition-colors"
                            >
                                {analyzing ? <Activity className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                {analyzing ? 'PROCESSING...' : 'ANALYZE WITH ATLAS'}
                            </button>
                        </div>
                        
                        <div className="prose prose-invert prose-sm max-w-none mb-6">
                            <ReactMarkdown>{selectedEntry.content}</ReactMarkdown>
                        </div>

                        {/* Analysis Result */}
                        {selectedEntry.analysis && (
                            <div className="mt-6 border-t border-slate-800 pt-6 animate-slide-up">
                                <div className="flex items-center gap-2 text-purple-400 mb-3 text-xs font-black uppercase tracking-widest">
                                    <Brain className="w-3 h-3" /> Neural Insight
                                </div>
                                <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4 text-sm text-slate-300 leading-relaxed">
                                    <ReactMarkdown>{selectedEntry.analysis}</ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>

        {/* Timeline Sidebar */}
        <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Flight Recorder History
                </h3>
                {entries.length > 0 && (
                    <button onClick={handleClearLogs} className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Purge
                    </button>
                )}
            </div>
            
            <div className="space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                {entries.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl text-slate-600 font-mono text-xs">
                        NO FLIGHT DATA FOUND
                    </div>
                )}
                {entries.map((entry) => (
                    <div 
                        key={entry.id}
                        onClick={() => setSelectedEntry(entry)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] group ${selectedEntry?.id === entry.id ? 'bg-slate-800 border-blue-500/50 shadow-lg shadow-blue-900/10' : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
                                {getLevelIcon(entry.level)}
                                {new Date(entry.timestamp).toLocaleDateString()}
                            </span>
                            {entry.analysis && <Sparkles className="w-3 h-3 text-purple-500" />}
                        </div>
                        <div className="text-sm font-medium text-slate-300 line-clamp-2 font-mono leading-relaxed">
                            {entry.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};
