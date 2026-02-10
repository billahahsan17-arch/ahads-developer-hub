
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sliders, Activity, Headphones, Power } from 'lucide-react';

interface Channel {
    id: string;
    name: string;
    type: 'white' | 'pink' | 'brown';
    volume: number; // 0-1
    active: boolean;
    color: string;
}

const AmbientMixer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [masterVolume, setMasterVolume] = useState(0.5);
    const [channels, setChannels] = useState<Channel[]>([
        { id: 'c1', name: 'Neural Static (White)', type: 'white', volume: 0.1, active: true, color: 'bg-slate-500' },
        { id: 'c2', name: 'Heavy Rain (Pink)', type: 'pink', volume: 0.3, active: true, color: 'bg-blue-500' },
        { id: 'c3', name: 'Server Hum (Brown)', type: 'brown', volume: 0.4, active: true, color: 'bg-amber-700' },
    ]);

    // Audio Context Refs
    const audioCtxRef = useRef<AudioContext | null>(null);
    const gainNodesRef = useRef<Map<string, GainNode>>(new Map());
    const masterGainRef = useRef<GainNode | null>(null);

    useEffect(() => {
        return () => {
            if (audioCtxRef.current) {
                audioCtxRef.current.close();
            }
        };
    }, []);

    const initAudio = () => {
        if (!audioCtxRef.current) {
            const Ctx = window.AudioContext || (window as any).webkitAudioContext;
            audioCtxRef.current = new Ctx();
            
            const master = audioCtxRef.current.createGain();
            master.gain.value = masterVolume;
            master.connect(audioCtxRef.current.destination);
            masterGainRef.current = master;

            channels.forEach(ch => startChannel(ch));
        } else if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
        setIsPlaying(true);
    };

    const stopAudio = () => {
        if (audioCtxRef.current) {
            audioCtxRef.current.suspend();
        }
        setIsPlaying(false);
    };

    const createNoiseBuffer = (ctx: AudioContext, type: 'white' | 'pink' | 'brown') => {
        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);

        if (type === 'white') {
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
        } else if (type === 'pink') {
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.075076;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                output[i] *= 0.11; // (roughly) compensate for gain
                b6 = white * 0.115926;
            }
        } else if (type === 'brown') {
            let lastOut = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                output[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = output[i];
                output[i] *= 3.5; // (roughly) compensate for gain
            }
        }
        return buffer;
    };

    const startChannel = (ch: Channel) => {
        if (!audioCtxRef.current || !masterGainRef.current) return;

        const ctx = audioCtxRef.current;
        const buffer = createNoiseBuffer(ctx, ch.type);
        
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const gain = ctx.createGain();
        gain.gain.value = ch.active ? ch.volume : 0;

        source.connect(gain);
        gain.connect(masterGainRef.current);
        source.start();

        gainNodesRef.current.set(ch.id, gain);
    };

    const toggleChannel = (id: string) => {
        const newChannels = channels.map(c => c.id === id ? { ...c, active: !c.active } : c);
        setChannels(newChannels);
        
        const node = gainNodesRef.current.get(id);
        const ch = newChannels.find(c => c.id === id);
        if (node && ch) {
            // Smooth transition
            node.gain.setTargetAtTime(ch.active ? ch.volume : 0, audioCtxRef.current!.currentTime, 0.1);
        }
    };

    const updateVolume = (id: string, vol: number) => {
        const newChannels = channels.map(c => c.id === id ? { ...c, volume: vol } : c);
        setChannels(newChannels);

        const node = gainNodesRef.current.get(id);
        const ch = newChannels.find(c => c.id === id);
        if (node && ch && ch.active) {
            node.gain.setTargetAtTime(vol, audioCtxRef.current!.currentTime, 0.05);
        }
    };

    const updateMaster = (vol: number) => {
        setMasterVolume(vol);
        if (masterGainRef.current) {
            masterGainRef.current.gain.setTargetAtTime(vol, audioCtxRef.current!.currentTime, 0.05);
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
                        <Headphones className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Deep Work Frequency</h1>
                        <p className="text-[10px] font-mono text-slate-500">Synthetic Audio Generator</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-[10px] font-mono uppercase text-slate-500 tracking-widest hidden md:block">
                        Status: {isPlaying ? <span className="text-emerald-400">OSCILLATING</span> : <span className="text-slate-600">STANDBY</span>}
                    </div>
                    <button 
                        onClick={isPlaying ? stopAudio : initAudio}
                        className={`p-3 rounded-full border transition-all ${
                            isPlaying 
                            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                    >
                        <Power className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 p-6 md:p-12 flex flex-col items-center justify-center">
                
                {/* Visualizer (Fake for now, but animated) */}
                <div className="w-full max-w-2xl h-32 bg-slate-900/50 rounded-xl border border-slate-800 mb-12 flex items-center justify-center gap-1 overflow-hidden relative">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div 
                            key={i} 
                            className={`w-2 bg-indigo-500/50 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
                            style={{ 
                                height: isPlaying ? `${Math.random() * 80 + 10}%` : '4px',
                                animationDelay: `${i * 0.05}s`,
                                opacity: isPlaying ? 0.8 : 0.2
                            }}
                        />
                    ))}
                    {!isPlaying && (
                        <div className="absolute text-sm font-mono text-slate-600 uppercase tracking-widest">
                            Signal Inactive
                        </div>
                    )}
                </div>

                {/* Master Control */}
                <div className="w-full max-w-2xl mb-12 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <div className="flex items-center gap-4 mb-2">
                        <Volume2 className="w-5 h-5 text-indigo-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Master Gain</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" max="1" step="0.01"
                        value={masterVolume}
                        onChange={(e) => updateMaster(Number(e.target.value))}
                        className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>

                {/* Channels */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                    {channels.map(ch => (
                        <div key={ch.id} className={`bg-slate-900 border transition-all rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden ${ch.active ? 'border-slate-700 shadow-xl' : 'border-slate-800 opacity-60'}`}>
                            {/* Background Active Glow */}
                            <div className={`absolute top-0 left-0 w-full h-1 ${ch.active ? ch.color : 'bg-slate-800'}`} />
                            
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-white text-sm">{ch.name}</h3>
                                    <p className="text-[10px] font-mono text-slate-500 uppercase">{ch.type} Noise</p>
                                </div>
                                <button 
                                    onClick={() => toggleChannel(ch.id)}
                                    className={`p-2 rounded-lg transition-colors ${ch.active ? 'text-white bg-slate-800' : 'text-slate-600 bg-slate-950'}`}
                                >
                                    {ch.active ? <Activity className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <Sliders className="w-4 h-4 text-slate-600" />
                                <input 
                                    type="range" 
                                    min="0" max="0.5" step="0.01"
                                    value={ch.volume}
                                    onChange={(e) => updateVolume(ch.id, Number(e.target.value))}
                                    disabled={!ch.active}
                                    className={`w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer ${ch.active ? 'accent-white' : 'accent-slate-700'}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AmbientMixer;
