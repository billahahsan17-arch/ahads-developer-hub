
import React, { useState, useEffect } from 'react';
import { Grid, Network, Wifi, ArrowRight } from 'lucide-react';

const SubnetCalculator: React.FC = () => {
    const [ip, setIp] = useState('192.168.1.0');
    const [cidr, setCidr] = useState(24);
    const [info, setInfo] = useState<any>(null);

    useEffect(() => {
        calculate();
    }, [ip, cidr]);

    const ipToInt = (ip: string) => {
        return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
    };

    const intToIp = (int: number) => {
        return [
            (int >>> 24) & 255,
            (int >>> 16) & 255,
            (int >>> 8) & 255,
            int & 255
        ].join('.');
    };

    const calculate = () => {
        try {
            const mask = ~((1 << (32 - cidr)) - 1) >>> 0;
            const ipInt = ipToInt(ip);
            const netInt = ipInt & mask;
            const broadcastInt = netInt | (~mask >>> 0);
            
            const hosts = Math.pow(2, 32 - cidr) - 2;
            const usableHosts = hosts > 0 ? hosts : 0;

            setInfo({
                network: intToIp(netInt),
                broadcast: intToIp(broadcastInt),
                netmask: intToIp(mask),
                firstHost: intToIp(netInt + 1),
                lastHost: intToIp(broadcastInt - 1),
                hosts: usableHosts.toLocaleString(),
                class: getIpClass(parseInt(ip.split('.')[0]))
            });
        } catch (e) {
            setInfo(null);
        }
    };

    const getIpClass = (firstOctet: number) => {
        if (firstOctet < 128) return 'A';
        if (firstOctet < 192) return 'B';
        if (firstOctet < 224) return 'C';
        return 'D/E';
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center px-6 gap-3 flex-shrink-0">
                <div className="p-2 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <Grid className="w-5 h-5 text-blue-500" />
                </div>
                <h1 className="font-bold text-white uppercase text-sm">Subnet Calculator</h1>
            </div>

            <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">IP Address</label>
                            <input 
                                value={ip}
                                onChange={(e) => setIp(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-mono"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">CIDR (/{cidr})</label>
                            <input 
                                type="range" min="1" max="32" 
                                value={cidr}
                                onChange={(e) => setCidr(Number(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {info && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
                        <Card label="Network Address" value={info.network} icon={Network} />
                        <Card label="Broadcast" value={info.broadcast} icon={Wifi} />
                        <Card label="Netmask" value={info.netmask} />
                        <Card label="First Usable" value={info.firstHost} />
                        <Card label="Last Usable" value={info.lastHost} />
                        <Card label="Usable Hosts" value={info.hosts} highlight />
                        <Card label="Class" value={info.class} />
                        <Card label="CIDR Notation" value={`/${cidr}`} />
                    </div>
                )}
                
                {/* Visualizer */}
                <div className="bg-[#0d1117] border border-slate-800 rounded-xl p-6 overflow-hidden">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Binary Visualization</h3>
                    <div className="font-mono text-sm space-y-2">
                        <div className="flex gap-4">
                            <span className="text-slate-500 w-16">IP</span>
                            <span className="text-blue-300">{ipToInt(ip).toString(2).padStart(32, '0').match(/.{1,8}/g)?.join('.')}</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-slate-500 w-16">Mask</span>
                            <span className="text-emerald-300">{ipToInt(info?.netmask || '0.0.0.0').toString(2).padStart(32, '0').match(/.{1,8}/g)?.join('.')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Card = ({ label, value, icon: Icon, highlight }: any) => (
    <div className={`p-4 rounded-lg border ${highlight ? 'bg-blue-900/10 border-blue-500/30' : 'bg-slate-900 border-slate-800'}`}>
        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
            {Icon && <Icon className="w-3 h-3" />} {label}
        </div>
        <div className={`text-lg font-mono font-bold ${highlight ? 'text-blue-400' : 'text-slate-200'}`}>{value}</div>
    </div>
);

export default SubnetCalculator;
