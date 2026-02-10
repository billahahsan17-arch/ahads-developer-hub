
import React, { useState, useEffect, useRef } from 'react';
import { BarChart2, Play, RotateCcw, Sliders, Activity } from 'lucide-react';

type AlgorithmType = 'BUBBLE' | 'SELECTION' | 'INSERTION';

const AlgoViz: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [size, setSize] = useState(50);
    const [speed, setSpeed] = useState(50);
    const [algorithm, setAlgorithm] = useState<AlgorithmType>('BUBBLE');
    const [isSorting, setIsSorting] = useState(false);
    const [compareIndices, setCompareIndices] = useState<number[]>([]);
    const [swapIndices, setSwapIndices] = useState<number[]>([]);
    const [sortedIndices, setSortedIndices] = useState<number[]>([]);
    
    // Refs for mutable access inside async functions
    const arrayRef = useRef<number[]>([]);
    const speedRef = useRef(50);
    const abortRef = useRef(false);

    useEffect(() => {
        resetArray();
    }, [size]);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    const resetArray = () => {
        abortRef.current = true; // Stop any running sort
        setIsSorting(false);
        setSortedIndices([]);
        setCompareIndices([]);
        setSwapIndices([]);
        
        const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5);
        setArray(newArray);
        arrayRef.current = newArray;
        abortRef.current = false;
    };

    const delay = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const getDelay = () => {
        // Speed 1 (slow) -> 200ms, Speed 100 (fast) -> 1ms
        return Math.max(1, 200 - (speedRef.current * 2));
    };

    // --- ALGORITHMS ---

    const bubbleSort = async () => {
        const arr = [...arrayRef.current];
        const n = arr.length;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (abortRef.current) return;

                setCompareIndices([j, j + 1]);
                await delay(getDelay());

                if (arr[j] > arr[j + 1]) {
                    setSwapIndices([j, j + 1]);
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    
                    setArray([...arr]);
                    arrayRef.current = arr;
                    await delay(getDelay());
                }
                setSwapIndices([]);
            }
            setSortedIndices(prev => [...prev, n - i - 1]);
        }
        setCompareIndices([]);
        setSortedIndices(Array.from({ length: n }, (_, i) => i));
    };

    const selectionSort = async () => {
        const arr = [...arrayRef.current];
        const n = arr.length;

        for (let i = 0; i < n; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (abortRef.current) return;
                setCompareIndices([minIdx, j]);
                await delay(getDelay());

                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }

            if (minIdx !== i) {
                setSwapIndices([i, minIdx]);
                let temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
                setArray([...arr]);
                arrayRef.current = arr;
                await delay(getDelay());
            }
            setSortedIndices(prev => [...prev, i]);
            setSwapIndices([]);
        }
        setCompareIndices([]);
        setSortedIndices(Array.from({ length: n }, (_, i) => i));
    };

    const insertionSort = async () => {
        const arr = [...arrayRef.current];
        const n = arr.length;

        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;

            setCompareIndices([i, j]);
            await delay(getDelay());

            while (j >= 0 && arr[j] > key) {
                if (abortRef.current) return;
                
                setSwapIndices([j + 1, j]);
                arr[j + 1] = arr[j];
                setArray([...arr]);
                arrayRef.current = arr;
                await delay(getDelay());
                
                j = j - 1;
                if(j >= 0) setCompareIndices([i, j]);
            }
            arr[j + 1] = key;
            setArray([...arr]);
            arrayRef.current = arr;
            setSwapIndices([]);
        }
        setSortedIndices(Array.from({ length: n }, (_, i) => i));
        setCompareIndices([]);
    };

    const handleSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        abortRef.current = false;

        if (algorithm === 'BUBBLE') await bubbleSort();
        if (algorithm === 'SELECTION') await selectionSort();
        if (algorithm === 'INSERTION') await insertionSort();

        setIsSorting(false);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-900/20 rounded-lg border border-blue-500/30">
                        <BarChart2 className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight text-sm uppercase">AlgoViz Engine</h1>
                        <p className="text-[10px] font-mono text-slate-500">Visualization Kernel v1.0</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg">
                        {(['BUBBLE', 'SELECTION', 'INSERTION'] as AlgorithmType[]).map(algo => (
                            <button
                                key={algo}
                                onClick={() => !isSorting && setAlgorithm(algo)}
                                disabled={isSorting}
                                className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${
                                    algorithm === algo 
                                    ? 'bg-blue-600 text-white shadow-lg' 
                                    : 'text-slate-400 hover:text-white disabled:opacity-50'
                                }`}
                            >
                                {algo}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Visualizer */}
            <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
                
                {/* Chart Area */}
                <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-4 md:p-8 flex items-end justify-center gap-[1px] relative overflow-hidden shadow-inner">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                    
                    {array.map((val, idx) => {
                        let colorClass = 'bg-slate-500'; // Default
                        if (sortedIndices.includes(idx)) colorClass = 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
                        else if (swapIndices.includes(idx)) colorClass = 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]';
                        else if (compareIndices.includes(idx)) colorClass = 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)]';
                        else colorClass = 'bg-blue-600 opacity-80';

                        return (
                            <div 
                                key={idx}
                                style={{ height: `${val}%`, width: `${100/size}%` }}
                                className={`rounded-t-sm transition-colors duration-100 ${colorClass}`}
                            />
                        );
                    })}
                </div>

                {/* Controls */}
                <div className="h-20 bg-slate-900 border border-slate-800 rounded-xl flex items-center px-6 gap-8 flex-shrink-0">
                    
                    <button 
                        onClick={handleSort}
                        disabled={isSorting || sortedIndices.length === array.length}
                        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSorting ? <Activity className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                        {isSorting ? 'Processing...' : 'Run Sort'}
                    </button>

                    <button 
                        onClick={resetArray}
                        className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-all"
                        title="Reset Array"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>

                    <div className="h-8 w-px bg-slate-800 mx-2"></div>

                    <div className="flex flex-col gap-1 flex-1 max-w-xs">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
                            <span>Data Size</span>
                            <span>{size} Items</span>
                        </div>
                        <input 
                            type="range" 
                            min="10" max="100" 
                            value={size} 
                            onChange={(e) => setSize(Number(e.target.value))}
                            disabled={isSorting}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50"
                        />
                    </div>

                    <div className="flex flex-col gap-1 flex-1 max-w-xs">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
                            <span>Speed</span>
                            <span>{speed}%</span>
                        </div>
                        <input 
                            type="range" 
                            min="1" max="99" 
                            value={speed} 
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AlgoViz;
