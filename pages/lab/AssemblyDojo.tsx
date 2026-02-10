import React, { useState, useEffect } from 'react';
import { Cpu, Play, RotateCcw, StepForward, Terminal, Save, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface CPUState {
    registers: {
        AX: number;
        BX: number;
        CX: number;
        DX: number;
    };
    stack: number[];
    pc: number; // Program Counter
    flags: {
        Z: boolean; // Zero flag
        S: boolean; // Sign flag
    }
}

const AssemblyDojo: React.FC = () => {
    const [code, setCode] = useState('MOV AX, 10\nMOV BX, 5\nADD AX, BX\nPUSH AX\nMOV CX, 3\nSUB AX, CX');
    const [cpu, setCpu] = useState<CPUState>({
        registers: { AX: 0, BX: 0, CX: 0, DX: 0 },
        stack: [],
        pc: 0,
        flags: { Z: false, S: false }
    });
    const [logs, setLogs] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const resetCPU = () => {
        setCpu({
            registers: { AX: 0, BX: 0, CX: 0, DX: 0 },
            stack: [],
            pc: 0,
            flags: { Z: false, S: false }
        });
        setLogs([]);
        setError(null);
    };

    const parseVal = (arg: string, currentCpu: CPUState): number => {
        const val = parseInt(arg);
        if (!isNaN(val)) return val;
        // Check if register
        const upper = arg.toUpperCase();
        if (['AX','BX','CX','DX'].includes(upper)) {
            return currentCpu.registers[upper as keyof typeof currentCpu.registers];
        }
        throw new Error(`Invalid Operand: ${arg}`);
    };

    const step = () => {
        const lines = code.split('\n').filter(l => l.trim().length > 0);
        if (cpu.pc >= lines.length) return;

        const line = lines[cpu.pc].trim().toUpperCase();
        const parts = line.split(/[ ,]+/); // split by space or comma
        const op = parts[0];
        const arg1 = parts[1];
        const arg2 = parts[2];

        const nextCpu = { ...cpu, pc: cpu.pc + 1 };
        let logMsg = `[PC:${cpu.pc}] ${line}`;

        try {
            switch(op) {
                case 'MOV':
                    if (['AX','BX','CX','DX'].includes(arg1)) {
                        const val = parseVal(arg2, cpu);
                        nextCpu.registers[arg1 as keyof typeof nextCpu.registers] = val;
                    }
                    break;
                case 'ADD':
                    if (['AX','BX','CX','DX'].includes(arg1)) {
                        const val1 = cpu.registers[arg1 as keyof typeof cpu.registers];
                        const val2 = parseVal(arg2, cpu);
                        const res = val1 + val2;
                        nextCpu.registers[arg1 as keyof typeof nextCpu.registers] = res;
                        nextCpu.flags.Z = res === 0;
                        nextCpu.flags.S = res < 0;
                    }
                    break;
                case 'SUB':
                    if (['AX','BX','CX','DX'].includes(arg1)) {
                        const val1 = cpu.registers[arg1 as keyof typeof cpu.registers];
                        const val2 = parseVal(arg2, cpu);
                        const res = val1 - val2;
                        nextCpu.registers[arg1 as keyof typeof nextCpu.registers] = res;
                        nextCpu.flags.Z = res === 0;
                        nextCpu.flags.S = res < 0;
                    }
                    break;
                case 'PUSH':
                    const valPush = parseVal(arg1, cpu);
                    nextCpu.stack = [valPush, ...nextCpu.stack];
                    break;
                case 'POP':
                    if (nextCpu.stack.length === 0) throw new Error("Stack Underflow");
                    if (['AX','BX','CX','DX'].includes(arg1)) {
                        const valPop = nextCpu.stack[0];
                        nextCpu.stack = nextCpu.stack.slice(1);
                        nextCpu.registers[arg1 as keyof typeof nextCpu.registers] = valPop;
                    }
                    break;
                default:
                    throw new Error(`Unknown Opcode: ${op}`);
            }
            setCpu(nextCpu);
            setLogs(prev => [logMsg, ...prev]);
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-900/20 rounded-lg border border-amber-500/30">
                        <Cpu className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Assembly Dojo</h1>
                        <p className="text-[10px] font-mono text-slate-500">16-bit CPU Simulator</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={step} className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded transition-all">
                        <StepForward className="w-3 h-3" /> Step
                    </button>
                    <button onClick={resetCPU} className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                
                {/* Editor */}
                <div className="w-1/3 bg-[#0d1117] border-r border-slate-800 flex flex-col">
                    <div className="px-4 py-2 border-b border-slate-800 bg-[#010409] flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Instruction Buffer</span>
                        <div className="text-[10px] font-mono text-amber-500">PC: {cpu.pc}</div>
                    </div>
                    <div className="flex-1 relative">
                        {/* Line Highlight */}
                        <div 
                            className="absolute left-0 w-full h-6 bg-slate-800/50 border-l-2 border-amber-500 pointer-events-none transition-all duration-100"
                            style={{ top: `${cpu.pc * 24 + 16}px` }} // 24px line height approx + padding
                        />
                        <textarea 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="absolute inset-0 w-full h-full bg-transparent p-4 font-mono text-sm text-slate-300 resize-none outline-none leading-relaxed custom-scrollbar z-10"
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* State Visualization */}
                <div className="flex-1 bg-slate-900 p-8 overflow-y-auto custom-scrollbar">
                    
                    {/* Registers */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {Object.entries(cpu.registers).map(([reg, val]) => (
                            <div key={reg} className="bg-slate-800 border border-slate-700 rounded-lg p-4 relative overflow-hidden">
                                <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">{reg}</div>
                                <div className="text-2xl font-mono text-white tracking-tight">{val}</div>
                                <div className="text-[10px] font-mono text-slate-600 mt-1">0x{Number(val).toString(16).toUpperCase().padStart(4, '0')}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-64">
                        {/* Stack Visualization */}
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Layers className="w-3 h-3" /> Stack Memory
                            </h3>
                            <div className="flex-1 flex flex-col-reverse gap-1 overflow-y-auto custom-scrollbar pr-2">
                                <AnimatePresence>
                                    {cpu.stack.map((val, i) => (
                                        <MotionDiv 
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="bg-slate-800 border border-slate-700 p-2 rounded text-center font-mono text-sm text-amber-200"
                                        >
                                            {val}
                                        </MotionDiv>
                                    ))}
                                </AnimatePresence>
                                {cpu.stack.length === 0 && (
                                    <div className="text-center text-slate-700 font-mono text-xs py-4">Stack Empty</div>
                                )}
                            </div>
                        </div>

                        {/* Logs / Console */}
                        <div className="bg-black border border-slate-800 rounded-xl p-4 font-mono text-xs flex flex-col">
                            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-900">
                                <span className="text-slate-500 uppercase font-bold">Execution Log</span>
                                {error && <span className="text-red-500 font-bold">ERROR</span>}
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1">
                                {error && <div className="text-red-400 bg-red-900/10 p-1 rounded">> {error}</div>}
                                {logs.map((log, i) => (
                                    <div key={i} className="text-slate-400 opacity-80">> {log}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-xs font-mono text-slate-400">
                        <strong>Supported Instructions:</strong> MOV, ADD, SUB, PUSH, POP. <br/>
                        <strong>Registers:</strong> AX, BX, CX, DX. (16-bit signed integers).
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AssemblyDojo;