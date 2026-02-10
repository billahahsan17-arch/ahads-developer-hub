
import React, { useState } from 'react';
import { Database, Play, Table, RefreshCw, Terminal, Search, Check, AlertTriangle } from 'lucide-react';

const MOCK_TABLES = {
    users: [
        { id: 1, name: 'Alice Chen', role: 'engineer', email: 'alice@atlas.dev' },
        { id: 2, name: 'Bob Smith', role: 'pm', email: 'bob@atlas.dev' },
        { id: 3, name: 'Charlie Kim', role: 'designer', email: 'charlie@atlas.dev' },
    ],
    orders: [
        { id: 101, user_id: 1, amount: 450.00, status: 'completed' },
        { id: 102, user_id: 1, amount: 120.50, status: 'processing' },
        { id: 103, user_id: 2, amount: 999.00, status: 'completed' },
    ]
};

const SQLSandbox: React.FC = () => {
    const [query, setQuery] = useState('SELECT * FROM users');
    const [results, setResults] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTable, setActiveTable] = useState<string>('users');

    const executeQuery = () => {
        setError(null);
        setResults(null);
        
        const q = query.trim().toLowerCase();

        // Very basic mock parser for demo purposes
        if (q.startsWith('select')) {
            if (q.includes('from users')) {
                setResults(MOCK_TABLES.users);
            } else if (q.includes('from orders')) {
                setResults(MOCK_TABLES.orders);
            } else {
                setError('Table not found. Available tables: users, orders.');
            }
        } else {
            setError('Only SELECT statements are supported in Sandbox Mode.');
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
                        <Database className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">SQL Sandbox</h1>
                        <p className="text-[10px] font-mono text-slate-500">In-Memory SQLite Engine</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                
                {/* Schema Sidebar */}
                <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-6">
                    <div>
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Table className="w-3 h-3" /> Database Schema
                        </h3>
                        <div className="space-y-2">
                            {Object.keys(MOCK_TABLES).map(table => (
                                <button 
                                    key={table}
                                    onClick={() => setActiveTable(table)}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono transition-colors ${activeTable === table ? 'bg-cyan-900/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'}`}
                                >
                                    <span>{table}</span>
                                    <span className="text-[9px] opacity-50">{(MOCK_TABLES as any)[table].length} rows</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-auto p-4 bg-slate-950 rounded-lg border border-slate-800 text-[10px] text-slate-500 leading-relaxed font-mono">
                        <span className="text-cyan-500 font-bold block mb-1">PRO TIP:</span>
                        This environment is read-only. Queries are executed against an ephemeral in-memory dataset.
                    </div>
                </div>

                {/* Main Query & Results */}
                <div className="flex-1 flex flex-col min-w-0">
                    
                    {/* Editor */}
                    <div className="h-1/3 bg-[#0d1117] border-b border-slate-800 flex flex-col">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/50 bg-[#010409]">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Query Editor</span>
                            <button 
                                onClick={executeQuery}
                                className="flex items-center gap-2 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold uppercase tracking-wider transition-all"
                            >
                                <Play className="w-3 h-3" /> Run Query
                            </button>
                        </div>
                        <textarea 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 bg-transparent p-4 font-mono text-sm text-cyan-100 focus:outline-none resize-none"
                            spellCheck={false}
                        />
                    </div>

                    {/* Results */}
                    <div className="flex-1 bg-slate-950 p-6 overflow-hidden flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                            <Terminal className="w-4 h-4 text-slate-500" />
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Query Output</h3>
                        </div>

                        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden relative shadow-inner">
                            {error ? (
                                <div className="absolute inset-0 flex items-center justify-center text-red-400 font-mono text-sm p-8 text-center bg-red-900/5">
                                    <div className="space-y-2">
                                        <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-80" />
                                        <p>{error}</p>
                                    </div>
                                </div>
                            ) : results ? (
                                <div className="overflow-auto h-full custom-scrollbar">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-950 sticky top-0 z-10">
                                            <tr>
                                                {results.length > 0 && Object.keys(results[0]).map(key => (
                                                    <th key={key} className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800 whitespace-nowrap">
                                                        {key}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="font-mono text-xs">
                                            {results.map((row, idx) => (
                                                <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                                                    {Object.values(row).map((val: any, i) => (
                                                        <td key={i} className="px-4 py-3 text-slate-300 whitespace-nowrap">
                                                            {val}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 opacity-50">
                                    <Search className="w-12 h-12 mb-4" />
                                    <p className="font-mono text-xs uppercase tracking-widest">Ready to Execute</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SQLSandbox;
