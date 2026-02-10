
import React, { useState } from 'react';
import { Database, Plus, Trash2, RefreshCw, Box, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface Block {
    id: string;
    start: number;
    size: number;
    type: 'FREE' | 'ALLOCATED';
    data?: string;
}

const TOTAL_SIZE = 64;

const MemoryAllocator: React.FC = () => {
    const [blocks, setBlocks] = useState<Block[]>([
        { id: 'init', start: 0, size: TOTAL_SIZE, type: 'FREE' }
    ]);
    const [allocSize, setAllocSize] = useState(4);
    const [allocName, setAllocName] = useState('data');
    const [error, setError] = useState<string | null>(null);

    const malloc = () => {
        setError(null);
        // First Fit Strategy
        const freeBlockIndex = blocks.findIndex(b => b.type === 'FREE' && b.size >= allocSize);
        
        if (freeBlockIndex === -1) {
            setError('Out of Memory (OOM) or No Contiguous Block Large Enough (Fragmentation)');
            return;
        }

        const freeBlock = blocks[freeBlockIndex];
        
        const newBlock: Block = {
            id: Math.random().toString(36).substr(2, 5),
            start: freeBlock.start,
            size: allocSize,
            type: 'ALLOCATED',
            data: allocName || 'void*'
        };

        const nextBlocks = [...blocks];
        
        if (freeBlock.size === allocSize) {
            // Perfect fit, replace
            nextBlocks[freeBlockIndex] = newBlock;
        } else {
            // Split block
            const remaining: Block = {
                id: Math.random().toString(36).substr(2, 5),
                start: freeBlock.start + allocSize,
                size: freeBlock.size - allocSize,
                type: 'FREE'
            };
            nextBlocks.splice(freeBlockIndex, 1, newBlock, remaining);
        }

        setBlocks(nextBlocks);
    };

    const free = (id: string) => {
        setError(null);
        let nextBlocks = blocks.map(b => b.id === id ? { ...b, type: 'FREE', data: undefined } as Block : b);
        
        // Coalesce adjacent free blocks
        const coalesced: Block[] = [];
        if (nextBlocks.length > 0) {
            let current = nextBlocks[0];
            for (let i = 1; i < nextBlocks.length; i++) {
                const next = nextBlocks[i];
                if (current.type === 'FREE' && next.type === 'FREE') {
                    current.size += next.size; // Merge
                } else {
                    coalesced.push(current);
                    current = next;
                }
            }
            coalesced.push(current);
        }
        setBlocks(coalesced);
    };

    const reset = () => {
        setBlocks([{ id: 'init', start: 0, size: TOTAL_SIZE, type: 'FREE' }]);
        setError(null);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-900/20 rounded-lg border border-pink-500/30">
                        <Database className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Memory Allocator</h1>
                        <p className="text-[10px] font-mono text-slate-500">Heap Visualization & Fragmentation Sim</p>
                    </div>
                </div>
                <button onClick={reset} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                    <RefreshCw className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 p-6 md:p-10 flex flex-col gap-8 overflow-hidden">
                
                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-6 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                    <div className="flex-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Variable Name</label>
                        <input 
                            type="text" 
                            value={allocName}
                            onChange={(e) => setAllocName(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-pink-500 outline-none"
                            placeholder="e.g. ptr1"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Block Size (Bytes)</label>
                        <div className="flex items-center gap-4">
                            <input 
                                type="range" 
                                min="1" max="16" 
                                value={allocSize}
                                onChange={(e) => setAllocSize(Number(e.target.value))}
                                className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                            />
                            <span className="font-mono text-white text-sm w-8">{allocSize}</span>
                        </div>
                    </div>
                    <div className="flex items-end">
                        <button 
                            onClick={malloc}
                            className="w-full md:w-auto px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-pink-900/20 flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> malloc({allocSize})
                        </button>
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <MotionDiv 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg text-red-400 text-xs font-mono font-bold text-center"
                    >
                        CRITICAL_FAILURE: {error}
                    </MotionDiv>
                )}

                {/* Memory Visualization */}
                <div className="flex-1 bg-[#0d1117] border border-slate-800 rounded-xl p-8 relative overflow-y-auto custom-scrollbar">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> Heap Memory Map (Total: {TOTAL_SIZE} units)
                    </h3>
                    
                    <div className="flex flex-wrap gap-1">
                        <AnimatePresence>
                            {blocks.map((block) => (
                                <MotionDiv
                                    key={block.id}
                                    layout
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className={`relative h-24 rounded border flex flex-col items-center justify-center cursor-pointer transition-all hover:brightness-110 ${
                                        block.type === 'ALLOCATED' 
                                        ? 'bg-pink-600/20 border-pink-500/50 text-pink-300' 
                                        : 'bg-slate-800/30 border-slate-700/50 text-slate-600 border-dashed hover:bg-slate-800/50'
                                    }`}
                                    style={{ flexGrow: block.size, minWidth: '40px' }} // Proportional width
                                    onClick={() => block.type === 'ALLOCATED' && free(block.id)}
                                    title={block.type === 'ALLOCATED' ? 'Click to free()' : 'Free Space'}
                                >
                                    {block.type === 'ALLOCATED' ? (
                                        <>
                                            <Box className="w-4 h-4 mb-1 opacity-80" />
                                            <span className="text-[10px] font-bold uppercase truncate max-w-full px-1">{block.data}</span>
                                            <span className="text-[9px] opacity-60">{block.size}B</span>
                                            <div className="absolute inset-0 flex items-center justify-center bg-red-900/80 text-white opacity-0 hover:opacity-100 transition-opacity font-bold text-xs">
                                                <Trash2 className="w-4 h-4" />
                                            </div>
                                        </>
                                    ) : (
                                        <span className="text-[10px] font-mono">{block.size}B</span>
                                    )}
                                </MotionDiv>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                            <div className="text-[10px] font-mono text-slate-500 uppercase">Allocated</div>
                            <div className="text-2xl font-black text-pink-400">
                                {blocks.reduce((acc, b) => b.type === 'ALLOCATED' ? acc + b.size : acc, 0)} <span className="text-sm text-slate-600">Bytes</span>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                            <div className="text-[10px] font-mono text-slate-500 uppercase">Fragmentation</div>
                            <div className="text-2xl font-black text-white">
                                {blocks.filter(b => b.type === 'FREE').length} <span className="text-sm text-slate-600">Chunks</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MemoryAllocator;
