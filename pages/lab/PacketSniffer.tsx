
import React, { useState, useEffect, useRef } from 'react';
import { Network, Wifi, Activity, Pause, Play, Trash2, Shield, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface Packet {
    id: string;
    timestamp: number;
    protocol: 'TCP' | 'UDP' | 'HTTP' | 'ICMP';
    src: string;
    dst: string;
    len: number;
    info: string;
    flags?: string[];
}

const PacketSniffer: React.FC = () => {
    const [packets, setPackets] = useState<Packet[]>([]);
    const [isCapturing, setIsCapturing] = useState(false);
    const [filter, setFilter] = useState('');
    const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Simulation Loop
    useEffect(() => {
        let interval: any;
        if (isCapturing) {
            interval = setInterval(() => {
                if (Math.random() > 0.3) generateRandomPacket();
            }, 800);
        }
        return () => clearInterval(interval);
    }, [isCapturing]);

    // Auto-scroll
    useEffect(() => {
        if (isCapturing && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [packets, isCapturing]);

    const generateRandomPacket = () => {
        const protocols: Packet['protocol'][] = ['TCP', 'UDP', 'HTTP', 'ICMP'];
        const proto = protocols[Math.floor(Math.random() * protocols.length)];
        
        let info = '';
        let flags = [];
        let src = `192.168.1.${Math.floor(Math.random() * 255)}`;
        let dst = `10.0.0.${Math.floor(Math.random() * 255)}`;

        if (proto === 'TCP') {
            const flagTypes = ['SYN', 'ACK', 'FIN', 'PSH', 'RST'];
            const flag = flagTypes[Math.floor(Math.random() * flagTypes.length)];
            flags.push(flag);
            const seq = Math.floor(Math.random() * 10000);
            info = `${src.split('.')[3]} > 80 [${flag}] Seq=${seq} Win=65535 Len=0`;
        } else if (proto === 'HTTP') {
            const methods = ['GET /api/v1/status', 'POST /auth/login', '200 OK', '404 Not Found'];
            info = methods[Math.floor(Math.random() * methods.length)] + ' HTTP/1.1';
        } else if (proto === 'ICMP') {
            info = 'Echo (ping) request id=0x1234 seq=1 ttl=64';
        } else {
            info = `Source port: ${Math.floor(Math.random() * 65535)}  Destination port: 53`;
        }

        const newPacket: Packet = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            protocol: proto,
            src,
            dst,
            len: Math.floor(Math.random() * 1500),
            info,
            flags
        };

        setPackets(prev => [...prev.slice(-99), newPacket]); // Keep last 100
    };

    const clearCapture = () => {
        setPackets([]);
        setSelectedPacket(null);
    };

    const getProtocolColor = (p: string) => {
        switch(p) {
            case 'TCP': return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
            case 'UDP': return 'text-orange-400 bg-orange-900/20 border-orange-500/30';
            case 'HTTP': return 'text-emerald-400 bg-emerald-900/20 border-emerald-500/30';
            case 'ICMP': return 'text-pink-400 bg-pink-900/20 border-pink-500/30';
            default: return 'text-slate-400';
        }
    };

    const filteredPackets = packets.filter(p => 
        p.protocol.includes(filter.toUpperCase()) || 
        p.src.includes(filter) || 
        p.info.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-900/20 rounded-lg border border-blue-500/30">
                        <Network className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Packet Sniffer</h1>
                        <p className="text-[10px] font-mono text-slate-500">Network Traffic Analyzer</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="bg-slate-800 border border-slate-700 rounded-lg flex items-center px-3 py-1.5 gap-2">
                        <Search className="w-3 h-3 text-slate-500" />
                        <input 
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Filter (e.g. TCP, 192.168)"
                            className="bg-transparent border-none outline-none text-xs font-mono w-40 text-white placeholder-slate-600"
                        />
                    </div>
                    <button 
                        onClick={() => setIsCapturing(!isCapturing)}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${isCapturing ? 'bg-red-900/20 text-red-400 border border-red-500/30 hover:bg-red-900/40' : 'bg-emerald-900/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/40'}`}
                    >
                        {isCapturing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        {isCapturing ? 'Stop Capture' : 'Start Capture'}
                    </button>
                    <button onClick={clearCapture} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                
                {/* Packet List */}
                <div className="flex-1 flex flex-col bg-[#020617]">
                    <div className="grid grid-cols-12 bg-slate-900 border-b border-slate-800 px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <div className="col-span-1">No.</div>
                        <div className="col-span-2">Time</div>
                        <div className="col-span-2">Source</div>
                        <div className="col-span-2">Destination</div>
                        <div className="col-span-1">Proto</div>
                        <div className="col-span-1">Len</div>
                        <div className="col-span-3">Info</div>
                    </div>
                    
                    <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar">
                        {filteredPackets.map((p, idx) => (
                            <div 
                                key={p.id}
                                onClick={() => setSelectedPacket(p)}
                                className={`grid grid-cols-12 px-4 py-1.5 text-xs font-mono border-b border-slate-800/50 cursor-pointer hover:bg-slate-800 transition-colors ${selectedPacket?.id === p.id ? 'bg-blue-900/20' : ''}`}
                            >
                                <div className="col-span-1 text-slate-500">{idx + 1}</div>
                                <div className="col-span-2 text-slate-400">{new Date(p.timestamp).toLocaleTimeString().split(' ')[0]}.{Math.floor(p.timestamp % 1000)}</div>
                                <div className="col-span-2 text-slate-300">{p.src}</div>
                                <div className="col-span-2 text-slate-300">{p.dst}</div>
                                <div className="col-span-1"><span className={`px-1 rounded ${getProtocolColor(p.protocol)}`}>{p.protocol}</span></div>
                                <div className="col-span-1 text-slate-500">{p.len}</div>
                                <div className="col-span-3 text-slate-400 truncate" title={p.info}>{p.info}</div>
                            </div>
                        ))}
                        {filteredPackets.length === 0 && (
                            <div className="p-8 text-center text-slate-600 font-mono text-xs uppercase tracking-widest">
                                {isCapturing ? 'Listening for traffic...' : 'No packets captured'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Packet Details (Inspector) */}
                <AnimatePresence mode="wait">
                    {selectedPacket && (
                        <MotionDiv 
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 320, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="bg-slate-900 border-l border-slate-800 flex flex-col overflow-hidden"
                        >
                            <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-slate-500" />
                                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Packet Details</span>
                            </div>
                            
                            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar font-mono text-xs">
                                <div className="space-y-4">
                                    <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
                                        <div className="text-slate-500 mb-1">Frame 1: {selectedPacket.len} bytes on wire</div>
                                        <div className="text-slate-500">Arrival Time: {new Date(selectedPacket.timestamp).toISOString()}</div>
                                    </div>

                                    <div>
                                        <div className="text-emerald-500 font-bold mb-1">Ethernet II, Src: {selectedPacket.src}, Dst: {selectedPacket.dst}</div>
                                        <div className="pl-4 border-l border-slate-700 text-slate-400">
                                            <div>Destination: {selectedPacket.dst}</div>
                                            <div>Source: {selectedPacket.src}</div>
                                            <div>Type: IPv4 (0x0800)</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-blue-400 font-bold mb-1">Internet Protocol Version 4, Src: {selectedPacket.src}, Dst: {selectedPacket.dst}</div>
                                        <div className="pl-4 border-l border-slate-700 text-slate-400">
                                            <div>Version: 4</div>
                                            <div>Header Length: 20 bytes</div>
                                            <div>Total Length: {selectedPacket.len}</div>
                                            <div>Protocol: {selectedPacket.protocol}</div>
                                        </div>
                                    </div>

                                    {selectedPacket.protocol === 'TCP' && (
                                        <div>
                                            <div className="text-blue-300 font-bold mb-1">Transmission Control Protocol, Src Port: 443, Dst Port: 53212</div>
                                            <div className="pl-4 border-l border-slate-700 text-slate-400">
                                                <div>Source Port: 443</div>
                                                <div>Destination Port: 53212</div>
                                                <div>Sequence Number: {Math.floor(Math.random() * 100000)}</div>
                                                <div>Flags: {selectedPacket.flags?.join(', ') || 'None'}</div>
                                                <div>Window: 65535</div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-6">
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Hex Dump</div>
                                        <div className="grid grid-cols-8 gap-1 text-[10px] text-slate-500 opacity-70">
                                            {Array.from({ length: 32 }).map((_, i) => (
                                                <span key={i}>{Math.floor(Math.random() * 255).toString(16).padStart(2, '0')}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MotionDiv>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default PacketSniffer;
