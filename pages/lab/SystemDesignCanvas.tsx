import React, { useState, useRef } from 'react';
import { 
    Database, Server, Globe, Smartphone, Cloud, 
    Box, Shield, Cpu, HardDrive, Network, 
    ArrowRight, Trash2, Save, ZoomIn, ZoomOut, AlertOctagon,
    PenTool, Zap, Layers, Loader
} from 'lucide-react';
import { analyzeSystemDesignHybrid } from '../../services/atlasService';
import ReactMarkdown from 'react-markdown';

interface Node {
    id: string;
    type: string;
    label: string;
    x: number;
    y: number;
    icon: any;
}

const SystemDesignCanvas: React.FC = () => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [draggedNode, setDraggedNode] = useState<string | null>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const [analysis, setAnalysis] = useState<string>('');
    const [analyzing, setAnalyzing] = useState(false);

    const componentTypes = [
        { type: 'client', label: 'Client App', icon: Smartphone },
        { type: 'lb', label: 'Load Balancer', icon: Network },
        { type: 'api', label: 'API Server', icon: Server },
        { type: 'db', label: 'Database', icon: Database },
        { type: 'cache', label: 'Cache (Redis)', icon: Zap },
        { type: 'queue', label: 'Queue (Kafka)', icon: Layers },
        { type: 'cdn', label: 'CDN', icon: Globe },
        { type: 'worker', label: 'Worker', icon: Cpu },
        { type: 'storage', label: 'Object Store', icon: HardDrive },
        { type: 'firewall', label: 'Firewall', icon: Shield },
    ];

    const addNode = (typeObj: any) => {
        const newNode: Node = {
            id: Math.random().toString(36).substr(2, 9),
            type: typeObj.type,
            label: typeObj.label,
            x: 100 + Math.random() * 50,
            y: 100 + Math.random() * 50,
            icon: typeObj.icon
        };
        setNodes([...nodes, newNode]);
    };

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedNode(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (!draggedNode || !canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - 40; // Center offset
        const y = e.clientY - rect.top - 40;

        setNodes(nodes.map(n => n.id === draggedNode ? { ...n, x, y } : n));
        setDraggedNode(null);
    };

    const deleteNode = (id: string) => {
        setNodes(nodes.filter(n => n.id !== id));
    };

    const runAnalysis = async () => {
        setAnalyzing(true);
        const result = await analyzeSystemDesignHybrid(nodes);
        setAnalysis(result);
        setAnalyzing(false);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Toolbar */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <PenTool className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h1 className="font-bold text-white tracking-tight">System Architect Canvas</h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-xs font-mono text-slate-500 mr-4">
                        NODES: {nodes.length}
                    </div>
                    <button className="p-2 hover:bg-slate-800 rounded text-slate-400"><ZoomOut className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-slate-800 rounded text-slate-400"><ZoomIn className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-slate-800 rounded text-emerald-400"><Save className="w-4 h-4" /></button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Palette */}
                <div className="w-72 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-3 overflow-y-auto">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Components</div>
                    {componentTypes.map((comp) => (
                        <button 
                            key={comp.type}
                            onClick={() => addNode(comp)}
                            className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:bg-slate-700 transition-all text-left group"
                        >
                            <comp.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
                            <span className="text-sm font-medium text-slate-300">{comp.label}</span>
                        </button>
                    ))}
                    
                    <div className="mt-auto pt-6 border-t border-slate-800">
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-amber-500 uppercase">
                                    <AlertOctagon className="w-3 h-3" /> Architecture Audit
                                </div>
                                <button 
                                    onClick={runAnalysis}
                                    disabled={analyzing}
                                    className="p-1.5 bg-amber-900/20 text-amber-400 rounded hover:bg-amber-900/40 transition-colors disabled:opacity-50"
                                >
                                    {analyzing ? <Loader className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                                </button>
                            </div>
                            
                            <div className="text-xs text-slate-400 leading-relaxed max-h-48 overflow-y-auto custom-scrollbar prose prose-invert prose-p:my-1 prose-ul:my-1">
                                {analysis ? (
                                    <ReactMarkdown>{analysis}</ReactMarkdown>
                                ) : (
                                    <span className="italic text-slate-600">Add nodes and click analyze...</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Canvas Area */}
                <div 
                    ref={canvasRef}
                    className="flex-1 bg-[#020617] relative overflow-hidden cursor-crosshair"
                    style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {nodes.map((node) => (
                        <div
                            key={node.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, node.id)}
                            style={{ left: node.x, top: node.y }}
                            className="absolute flex flex-col items-center gap-2 group cursor-grab active:cursor-grabbing"
                        >
                            <div className="w-16 h-16 bg-slate-900 rounded-xl border border-indigo-500/30 shadow-xl flex items-center justify-center relative group-hover:border-indigo-500 transition-colors z-10">
                                <node.icon className="w-8 h-8 text-indigo-400" />
                                <button 
                                    onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }}
                                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded">{node.label}</span>
                        </div>
                    ))}
                    
                    {nodes.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                            <div className="text-center">
                                <Box className="w-24 h-24 mx-auto mb-4 text-slate-500" />
                                <p className="text-2xl font-black text-slate-600 uppercase tracking-widest">Canvas Ready</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SystemDesignCanvas;