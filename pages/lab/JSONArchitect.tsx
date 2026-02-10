import React, { useState, useEffect } from 'react';
import { FileJson, FileCode, ChevronRight, ChevronDown, Check, AlertTriangle, Copy, Braces } from 'lucide-react';
import CodeBlock from '../../components/CodeBlock';

interface TreeNodeProps {
    label: string;
    value: any;
    depth?: number;
}

// Recursive Tree Node Component extracted to fix prop types
const TreeNode: React.FC<TreeNodeProps> = ({ label, value, depth = 0 }) => {
    const [expanded, setExpanded] = useState(true);
    const isObj = typeof value === 'object' && value !== null;
    const isArr = Array.isArray(value);
    const type = isArr ? 'array' : isObj ? 'object' : typeof value;
    const size = isObj ? Object.keys(value).length : 0;

    if (!isObj) {
        return (
            <div className="flex items-start gap-2 font-mono text-sm py-0.5 hover:bg-slate-800/50 rounded px-2">
                <span className="text-slate-500 select-none" style={{ width: depth * 20 }}></span>
                <span className="text-sky-300">{label}:</span>
                <span className={
                    type === 'string' ? 'text-emerald-300' : 
                    type === 'number' ? 'text-amber-300' : 
                    type === 'boolean' ? 'text-purple-300' : 'text-slate-400'
                }>
                    {type === 'string' ? `"${value}"` : String(value)}
                </span>
            </div>
        );
    }

    return (
        <div>
            <div 
                className="flex items-center gap-2 font-mono text-sm py-0.5 hover:bg-slate-800/50 rounded px-2 cursor-pointer group"
                onClick={() => setExpanded(!expanded)}
            >
                <span className="text-slate-500 select-none" style={{ width: depth * 20 }}></span>
                <span className="text-slate-500 group-hover:text-white transition-colors">
                    {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </span>
                <span className="text-sky-300">{label}</span>
                <span className="text-slate-600 text-xs ml-2">
                    {isArr ? `Array[${value.length}]` : `{${size}}`}
                </span>
            </div>
            {expanded && (
                <div>
                    {Object.entries(value).map(([k, v]) => (
                        <TreeNode key={k} label={k} value={v} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const JSONArchitect: React.FC = () => {
    const [jsonInput, setJsonInput] = useState('{\n  "project": "Atlas",\n  "version": 4.0,\n  "modules": ["Core", "Lab"],\n  "active": true\n}');
    const [parsed, setParsed] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [tsInterface, setTsInterface] = useState('');
    const [mode, setMode] = useState<'TREE' | 'TYPES'>('TREE');

    useEffect(() => {
        try {
            const obj = JSON.parse(jsonInput);
            setParsed(obj);
            setError(null);
            generateTypes(obj);
        } catch (e: any) {
            setError(e.message);
            setParsed(null);
        }
    }, [jsonInput]);

    const formatJSON = () => {
        if (parsed) {
            setJsonInput(JSON.stringify(parsed, null, 2));
        }
    };

    const minifyJSON = () => {
        if (parsed) {
            setJsonInput(JSON.stringify(parsed));
        }
    };

    const generateTypes = (obj: any) => {
        let output = `interface RootObject {\n`;
        
        const getType = (val: any): string => {
            if (val === null) return 'null';
            if (Array.isArray(val)) {
                if (val.length === 0) return 'any[]';
                const types = [...new Set(val.map(getType))];
                return `(${types.join(' | ')})[]`;
            }
            if (typeof val === 'object') return 'object'; // Simplified for recursive depth
            return typeof val;
        };

        for (const key in obj) {
            output += `  ${key}: ${getType(obj[key])};\n`;
        }
        output += `}`;
        setTsInterface(output);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-900/20 rounded-lg border border-sky-500/30">
                        <FileJson className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">JSON Architect</h1>
                        <p className="text-[10px] font-mono text-slate-500">Validator, Formatter & Type Generator</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={formatJSON} disabled={!!error} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded border border-slate-700 transition-all disabled:opacity-50">
                        Format
                    </button>
                    <button onClick={minifyJSON} disabled={!!error} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded border border-slate-700 transition-all disabled:opacity-50">
                        Minify
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                
                {/* Editor */}
                <div className="w-1/2 flex flex-col border-r border-slate-800">
                    <div className="flex-1 bg-[#0d1117] relative">
                        <textarea 
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            className="absolute inset-0 w-full h-full bg-transparent text-slate-300 font-mono text-sm p-6 resize-none outline-none custom-scrollbar"
                            spellCheck={false}
                        />
                    </div>
                    {error ? (
                        <div className="bg-red-900/20 border-t border-red-500/30 p-3 flex items-center gap-3 text-red-400 text-xs font-mono">
                            <AlertTriangle className="w-4 h-4" />
                            {error}
                        </div>
                    ) : (
                        <div className="bg-emerald-900/10 border-t border-emerald-500/20 p-3 flex items-center gap-3 text-emerald-400 text-xs font-mono">
                            <Check className="w-4 h-4" />
                            Valid JSON
                        </div>
                    )}
                </div>

                {/* Visualizer / Tools */}
                <div className="w-1/2 flex flex-col bg-slate-900">
                    <div className="flex border-b border-slate-800">
                        <button 
                            onClick={() => setMode('TREE')}
                            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mode === 'TREE' ? 'bg-slate-800 text-white border-b-2 border-sky-500' : 'text-slate-500 hover:bg-slate-800/50'}`}
                        >
                            <Braces className="w-4 h-4" /> Tree View
                        </button>
                        <button 
                            onClick={() => setMode('TYPES')}
                            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mode === 'TYPES' ? 'bg-slate-800 text-white border-b-2 border-sky-500' : 'text-slate-500 hover:bg-slate-800/50'}`}
                        >
                            <FileCode className="w-4 h-4" /> TypeScript
                        </button>
                    </div>

                    <div className="flex-1 overflow-auto custom-scrollbar p-6">
                        {parsed ? (
                            mode === 'TREE' ? (
                                <div className="space-y-1">
                                    <TreeNode label="root" value={parsed} />
                                </div>
                            ) : (
                                <div className="relative group">
                                    <CodeBlock className="language-typescript text-xs">
                                        {tsInterface}
                                    </CodeBlock>
                                </div>
                            )
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                                <FileJson className="w-16 h-16 mb-4" />
                                <p className="font-mono text-sm uppercase">Waiting for Valid JSON</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default JSONArchitect;