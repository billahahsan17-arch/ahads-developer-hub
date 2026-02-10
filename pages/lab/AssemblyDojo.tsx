
import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, AlertTriangle, Cpu, MemoryStick, Flag } from 'lucide-react';
import { AILabExplainer } from './AILabExplainer';

// --- State and Reducer ---

type VmState = {
    registers: { [key: string]: number };
    stack: number[];
    flags: { Z: boolean, S: boolean };
    pc: number; // Program Counter
    lines: string[];
    running: boolean;
    error: string | null;
    lastChanged: string[]; // Track what changed for animations
};

type Action = 
    | { type: 'EXECUTE_LINE', payload: { line: string, labelMap: { [key: string]: number } } }
    | { type: 'SET_RUNNING', payload: boolean }
    | { type: 'RESET', payload: { lines: string[], registers: { [key: string]: number } } }
    | { type: 'TICK' }
    | { type: 'SET_ERROR', payload: string | null };

const vmReducer = (state: VmState, action: Action): VmState => {
    switch (action.type) {
        case 'EXECUTE_LINE': {
            const { line, labelMap } = action.payload;
            const nextState: VmState = {
                ...state,
                pc: state.pc + 1,
                error: null,
                lastChanged: [],
            };

            try {
                const parts = line.trim().split(/\\s+/);
                const op = parts[0].toUpperCase();
                const args = parts.slice(1);

                const parseArg = (arg: string): number => {
                    if (!arg) throw new Error("Missing operand");
                    if (state.registers.hasOwnProperty(arg)) return state.registers[arg];
                    const num = parseInt(arg, 10);
                    if (isNaN(num)) throw new Error(\`Invalid operand: \${arg}\`);
                    return num;
                };

                switch (op) {
                    case 'MOV': {
                        const [dest, src] = args;
                        if (!state.registers.hasOwnProperty(dest)) throw new Error(\`Invalid register: \${dest}\`);
                        nextState.registers = { ...state.registers, [dest]: parseArg(src) };
                        nextState.lastChanged.push(dest);
                        break;
                    }
                    case 'ADD':
                    case 'SUB': {
                        const [dest, src] = args;
                        if (!state.registers.hasOwnProperty(dest)) throw new Error(\`Invalid register: \${dest}\`);
                        const value = parseArg(src);
                        const result = op === 'ADD' ? state.registers[dest] + value : state.registers[dest] - value;
                        nextState.registers = { ...state.registers, [dest]: result };
                        nextState.flags = { Z: result === 0, S: result < 0 };
                        nextState.lastChanged.push(dest, 'Z', 'S');
                        break;
                    }
                    case 'MUL': {
                        const sourceReg = args[0];
                        const multiplier = parseArg(sourceReg);
                        const result = state.registers.AX * multiplier;
                        nextState.registers = { ...state.registers, AX: result };
                        nextState.flags = { Z: result === 0, S: result < 0 };
                        nextState.lastChanged.push('AX', 'Z', 'S');
                        break;
                    }
                    case 'DIV': {
                        const sourceReg = args[0];
                        const divisor = parseArg(sourceReg);
                        if (divisor === 0) throw new Error("Division by zero");
                        const result = Math.floor(state.registers.AX / divisor);
                        nextState.registers = { ...state.registers, AX: result };
                        nextState.flags = { Z: result === 0, S: result < 0 };
                        nextState.lastChanged.push('AX', 'Z', 'S');
                        break;
                    }
                    case 'CMP': {
                        const result = parseArg(args[0]) - parseArg(args[1]);
                        nextState.flags = { Z: result === 0, S: result < 0 };
                        nextState.lastChanged.push('Z', 'S');
                        break;
                    }
                    case 'JMP':
                    case 'JE':
                    case 'JNE': {
                        const targetPc = labelMap[args[0]];
                        if (targetPc === undefined) throw new Error(\`Label not found: \${args[0]}\`);
                        const shouldJump = (op === 'JMP') || (op === 'JE' && state.flags.Z) || (op === 'JNE' && !state.flags.Z);
                        if (shouldJump) nextState.pc = targetPc;
                        break;
                    }
                    case 'PUSH':
                        nextState.stack = [...state.stack, parseArg(args[0])];
                        nextState.lastChanged.push('stack');
                        break;
                    case 'POP': {
                        if (state.stack.length === 0) throw new Error("Stack underflow");
                        const value = state.stack[state.stack.length - 1];
                        const dest = args[0];
                        if (!state.registers.hasOwnProperty(dest)) throw new Error(\`Invalid register: \${dest}\`);
                        nextState.stack = state.stack.slice(0, -1);
                        nextState.registers = { ...state.registers, [dest]: value };
                        nextState.lastChanged.push('stack', dest);
                        break;
                    }
                    case 'CALL': {
                        const targetPc = labelMap[args[0]];
                        if (targetPc === undefined) throw new Error(\`Label not found: \${args[0]}\`);
                        nextState.stack = [...state.stack, state.pc]; // Push return address
                        nextState.pc = targetPc;
                        nextState.lastChanged.push('stack');
                        break;
                    }
                    case 'RET': {
                        if (state.stack.length === 0) throw new Error("Stack underflow (RET)");
                        const returnAddr = state.stack[state.stack.length - 1];
                        nextState.stack = state.stack.slice(0, -1);
                        nextState.pc = returnAddr;
                        nextState.lastChanged.push('stack');
                        break;
                    }
                    case 'NOP':
                        // Do nothing
                        break;
                    default:
                        // Ignore comments and empty lines
                        if (op && !op.endsWith(':')) {
                            throw new Error(\`Unknown instruction: \${op}\`);
                        }
                }
                return nextState;

            } catch (e: any) {
                return { ...state, running: false, error: e.message };
            }
        }
        case 'TICK':
             if (!state.running || state.error) return state;
             const currentLine = state.lines[state.pc];
             if (!currentLine) {
                 return { ...state, running: false };
             }
             // This is a bit of a hack, we need the labelMap in the reducer
             // In a real scenario, this might be pre-calculated and stored in state
             const labelMap = state.lines.reduce((acc, line, idx) => {
                const trimmed = line.trim();
                if (trimmed.endsWith(':')) {
                    acc[trimmed.slice(0, -1)] = idx;
                }
                return acc;
            }, {} as { [key: string]: number });
            
             return vmReducer(state, { type: 'EXECUTE_LINE', payload: { line: currentLine, labelMap } });
        
        case 'SET_RUNNING':
            return { ...state, running: action.payload, error: null };
        case 'RESET':
            return {
                ...state,
                registers: action.payload.registers,
                stack: [],
                flags: { Z: false, S: false },
                pc: 0,
                running: false,
                error: null,
                lines: action.payload.lines,
                lastChanged: Object.keys(action.payload.registers),
            };
        case 'SET_ERROR':
            return { ...state, running: false, error: action.payload };
        default:
            return state;
    }
};

// --- Components ---

const CodeEditor = ({ code, setCode, isRunning }: { code: string, setCode: (c: string) => void, isRunning: boolean }) => (
    <div className="relative">
        <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 bg-slate-900/70 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            spellCheck="false"
            readOnly={isRunning}
        />
        {isRunning && <div className="absolute inset-0 bg-slate-900/50" />}
    </div>
);

const VmDisplay = ({ vmState }: { vmState: VmState }) => {
    const renderValue = (val: any) => {
        if (typeof val === 'boolean') {
            return <span className={val ? 'text-green-400' : 'text-red-400'}>{val ? 'T' : 'F'}</span>;
        }
        return val;
    };

    const Highlightable = ({ id, children }: { id: string, children: React.ReactNode }) => {
        const hasChanged = vmState.lastChanged.includes(id);
        return (
            <motion.div
                animate={{ backgroundColor: hasChanged ? ['#4f46e5', 'transparent'] : 'transparent' }}
                transition={{ duration: 0.8 }}
                className="rounded-md px-2 py-1"
            >
                {children}
            </motion.div>
        );
    };

    return (
        <div className="space-y-6 p-6 bg-slate-900/70 border border-slate-700 rounded-lg">
            <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-2 flex items-center"><Cpu className="w-4 h-4 mr-2" />Registers</h3>
                <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                    {Object.entries(vmState.registers).map(([name, value]) => (
                        <div key={name} className="flex justify-between">
                            <span className="text-slate-500">{name}:</span>
                            <Highlightable id={name}><span className="text-white font-bold">{renderValue(value)}</span></Highlightable>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-2 flex items-center"><Flag className="w-4 h-4 mr-2" />Flags</h3>
                <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                    {Object.entries(vmState.flags).map(([name, value]) => (
                        <div key={name} className="flex justify-between">
                            <span className="text-slate-500">{name}:</span>
                            <Highlightable id={name}><span className="text-white font-bold">{renderValue(value)}</span></Highlightable>
                        </div>
                    ))}
                </div>
            </div>
             <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-2 flex items-center"><MemoryStick className="w-4 h-4 mr-2" />Stack</h3>
                <Highlightable id="stack">
                    <div className="h-40 bg-slate-800/50 rounded-md p-2 flex flex-col-reverse gap-1 overflow-y-auto">
                        {vmState.stack.map((value, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-indigo-500/20 text-indigo-300 text-center text-xs font-mono rounded-sm px-2 py-1"
                            >
                                {value}
                            </motion.div>
                        ))}
                    </div>
                </Highlightable>
            </div>
        </div>
    );
};

const AssemblyDojo = () => {
    const initialCode = \`
; Fibonacci sequence calculator
; Result will be in AX

MOV CX, 10      ; Calculate fib(10)
MOV AX, 0       ; fib(0)
MOV BX, 1       ; fib(1)

fib_loop:
    CMP CX, 0
    JE end

    ; New fib number
    PUSH AX
    MOV AX, BX
    POP DX
    ADD AX, DX
    MOV BX, DX

    SUB CX, 1
    JMP fib_loop

end:
    NOP ; End of program
\`.trim();

    const [code, setCode] = useState(initialCode);
    
    const initialVmState: VmState = {
        registers: { AX: 0, BX: 0, CX: 0, DX: 0 },
        stack: [],
        flags: { Z: false, S: false },
        pc: 0,
        lines: code.split('\\n'),
        running: false,
        error: null,
        lastChanged: ['AX', 'BX', 'CX', 'DX'],
    };
    
    const [vmState, dispatch] = useReducer(vmReducer, initialVmState);

    const labelMap = useMemo(() => {
        return code.split('\\n').reduce((acc, line, idx) => {
            const trimmed = line.trim();
            if (trimmed.endsWith(':')) {
                acc[trimmed.slice(0, -1)] = idx;
            }
            return acc;
        }, {} as { [key: string]: number });
    }, [code]);

    const resetVm = useCallback(() => {
        dispatch({ type: 'RESET', payload: { lines: code.split('\\n'), registers: { AX: 0, BX: 0, CX: 0, DX: 0 } } });
    }, [code]);

    useEffect(resetVm, [resetVm]);

    // VM execution loop
    useEffect(() => {
        if (!vmState.running) return;

        const tick = () => {
            if (vmState.pc >= vmState.lines.length) {
                dispatch({ type: 'SET_RUNNING', payload: false });
                return;
            }
            
            const line = vmState.lines[vmState.pc];
            if (!line || line.trim().startsWith(';') || line.trim().length === 0 || line.trim().endsWith(':')) {
                 dispatch({ type: 'TICK' }); // Skip empty/comment lines
            } else {
                 dispatch({ type: 'EXECUTE_LINE', payload: { line, labelMap } });
            }
        };

        const intervalId = setInterval(tick, 200);
        return () => clearInterval(intervalId);

    }, [vmState.running, vmState.pc, vmState.lines, labelMap]);


    const toggleExecution = () => {
        if (vmState.pc >= vmState.lines.length) {
            resetVm();
        }
        dispatch({ type: 'SET_RUNNING', payload: !vmState.running });
    };
    
    const stepExecution = () => {
        if (vmState.running || vmState.pc >= vmState.lines.length) return;
        const line = vmState.lines[vmState.pc];
        dispatch({ type: 'EXECUTE_LINE', payload: { line, labelMap } });
    };

    return (
        <div className="space-y-6">
            <AILabExplainer 
                title="The Assembly Dojo"
                description="A simplified CPU simulator to understand low-level code execution. Write assembly-like instructions to see how registers, flags, and the stack interact. This dojo helps visualize program flow, memory management, and fundamental computation."
                features={[
                    "Interactive code editor with syntax highlighting.",
                    "Live visualization of CPU registers (AX, BX, CX, DX).",
                    "Stack visualization for PUSH, POP, CALL, and RET operations.",
                    "Conditional jumps based on Zero (Z) and Sign (S) flags.",
                    "Controls for continuous run, pause, step, and reset.",
                ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <CodeEditor code={code} setCode={setCode} isRunning={vmState.running} />
                    <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
                        <button onClick={toggleExecution} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-all">
                            {vmState.running ? <Pause size={16}/> : <Play size={16}/>}
                            {vmState.running ? 'Pause' : 'Run'}
                        </button>
                        <button onClick={stepExecution} disabled={vmState.running} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-semibold transition-all disabled:opacity-50">
                            <ChevronRight size={16}/> Step
                        </button>
                        <button onClick={resetVm} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-semibold transition-all">
                           <RotateCcw size={16}/> Reset
                        </button>
                    </div>
                     {vmState.error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 p-3 bg-red-900/50 border border-red-500/30 rounded-lg text-red-300 text-sm font-mono"
                        >
                            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                            {vmState.error}
                        </motion.div>
                    )}
                </div>

                <VmDisplay vmState={vmState} />
            </div>
        </div>
    );
};

export default AssemblyDojo;
