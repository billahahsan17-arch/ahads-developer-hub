
import React, { useState } from 'react';
import { Database, Plus, Trash2, Download, Table, Key, Link as LinkIcon, Code } from 'lucide-react';
import CodeBlock from '../../components/CodeBlock';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface Column {
    id: string;
    name: string;
    type: string;
    isPk: boolean;
    isFk: boolean;
    nullable: boolean;
}

interface DBTable {
    id: string;
    name: string;
    columns: Column[];
    x: number;
    y: number;
}

const DBSchemaArchitect: React.FC = () => {
    const [tables, setTables] = useState<DBTable[]>([
        {
            id: 't1', name: 'users', x: 50, y: 50,
            columns: [
                { id: 'c1', name: 'id', type: 'UUID', isPk: true, isFk: false, nullable: false },
                { id: 'c2', name: 'email', type: 'VARCHAR(255)', isPk: false, isFk: false, nullable: false },
                { id: 'c3', name: 'created_at', type: 'TIMESTAMP', isPk: false, isFk: false, nullable: false },
            ]
        }
    ]);
    const [dragId, setDragId] = useState<string | null>(null);

    const addTable = () => {
        const id = Math.random().toString(36).substr(2, 5);
        setTables([...tables, {
            id,
            name: `table_${tables.length + 1}`,
            x: 50 + (tables.length * 20),
            y: 50 + (tables.length * 20),
            columns: [{ id: Math.random().toString(36).substr(2, 5), name: 'id', type: 'SERIAL', isPk: true, isFk: false, nullable: false }]
        }]);
    };

    const addColumn = (tableId: string) => {
        setTables(tables.map(t => {
            if (t.id !== tableId) return t;
            return {
                ...t,
                columns: [...t.columns, { 
                    id: Math.random().toString(36).substr(2, 5), 
                    name: 'new_col', 
                    type: 'VARCHAR', 
                    isPk: false, 
                    isFk: false, 
                    nullable: true 
                }]
            };
        }));
    };

    const updateColumn = (tableId: string, colId: string, field: keyof Column, val: any) => {
        setTables(tables.map(t => {
            if (t.id !== tableId) return t;
            return {
                ...t,
                columns: t.columns.map(c => c.id === colId ? { ...c, [field]: val } : c)
            };
        }));
    };

    const deleteColumn = (tableId: string, colId: string) => {
        setTables(tables.map(t => {
            if (t.id !== tableId) return t;
            return { ...t, columns: t.columns.filter(c => c.id !== colId) };
        }));
    };

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDragId(id);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        if (!dragId) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - 100; // Offset
        const y = e.clientY - rect.top - 20;
        
        setTables(tables.map(t => t.id === dragId ? { ...t, x, y } : t));
        setDragId(null);
    };

    const generateSQL = () => {
        return tables.map(t => {
            const cols = t.columns.map(c => {
                let def = `  ${c.name} ${c.type}`;
                if (c.isPk) def += ' PRIMARY KEY';
                if (!c.nullable && !c.isPk) def += ' NOT NULL';
                return def;
            }).join(',\n');
            return `CREATE TABLE ${t.name} (\n${cols}\n);`;
        }).join('\n\n');
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
                        <Database className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Schema Architect</h1>
                        <p className="text-[10px] font-mono text-slate-500">Visual ERD & SQL Generator</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={addTable} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold uppercase tracking-wide border border-slate-700 transition-all">
                        <Plus className="w-3 h-3" /> Add Table
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                
                {/* Canvas */}
                <div 
                    className="flex-1 bg-[#0f172a] relative overflow-hidden cursor-crosshair"
                    style={{ 
                        backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', 
                        backgroundSize: '20px 20px' 
                    }}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {tables.map(table => (
                        <div
                            key={table.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, table.id)}
                            style={{ left: table.x, top: table.y }}
                            className="absolute w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl flex flex-col group cursor-move"
                        >
                            {/* Table Header */}
                            <div className="bg-slate-800 p-2 rounded-t-lg border-b border-slate-700 flex items-center gap-2">
                                <Table className="w-3 h-3 text-indigo-400" />
                                <input 
                                    className="bg-transparent text-sm font-bold text-white focus:outline-none w-full"
                                    value={table.name}
                                    onChange={(e) => setTables(tables.map(t => t.id === table.id ? { ...t, name: e.target.value } : t))}
                                />
                                <button 
                                    onClick={() => setTables(tables.filter(t => t.id !== table.id))}
                                    className="text-slate-500 hover:text-red-400"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>

                            {/* Columns */}
                            <div className="p-2 space-y-1">
                                {table.columns.map(col => (
                                    <div key={col.id} className="flex items-center gap-1 group/col">
                                        <div className="flex-shrink-0 w-4 flex justify-center">
                                            {col.isPk && <Key className="w-3 h-3 text-amber-400" />}
                                            {col.isFk && <LinkIcon className="w-3 h-3 text-blue-400" />}
                                        </div>
                                        <input 
                                            className="bg-slate-950 border border-slate-800 rounded px-1 py-0.5 text-xs text-white w-20 focus:border-indigo-500 outline-none"
                                            value={col.name}
                                            onChange={(e) => updateColumn(table.id, col.id, 'name', e.target.value)}
                                        />
                                        <input 
                                            className="bg-slate-950 border border-slate-800 rounded px-1 py-0.5 text-[10px] text-slate-400 w-16 uppercase focus:border-indigo-500 outline-none"
                                            value={col.type}
                                            onChange={(e) => updateColumn(table.id, col.id, 'type', e.target.value)}
                                        />
                                        <button 
                                            onClick={() => updateColumn(table.id, col.id, 'isPk', !col.isPk)}
                                            className={`text-[9px] font-bold px-1 rounded cursor-pointer ${col.isPk ? 'text-amber-400 bg-amber-900/20' : 'text-slate-600 hover:text-slate-400'}`}
                                        >
                                            PK
                                        </button>
                                        <button 
                                            onClick={() => deleteColumn(table.id, col.id)}
                                            className="ml-auto text-slate-700 hover:text-red-500 opacity-0 group-hover/col:opacity-100"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    onClick={() => addColumn(table.id)}
                                    className="w-full mt-2 py-1 text-[10px] text-slate-500 hover:text-indigo-400 hover:bg-slate-800 rounded border border-dashed border-slate-700 hover:border-indigo-500/50 transition-all flex items-center justify-center gap-1"
                                >
                                    <Plus className="w-3 h-3" /> Add Column
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SQL Preview Sidebar */}
                <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
                    <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Code className="w-3 h-3" /> Generated SQL
                        </span>
                        <button 
                            onClick={() => navigator.clipboard.writeText(generateSQL())}
                            className="text-indigo-400 hover:text-white"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto bg-[#0d1117] p-4">
                        <CodeBlock className="language-sql text-xs">
                            {generateSQL()}
                        </CodeBlock>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DBSchemaArchitect;
