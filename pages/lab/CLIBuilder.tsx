
import React, { useState } from 'react';
import { Terminal, Settings, Copy, Check, Command, Box, FileArchive, Video, Cloud } from 'lucide-react';
import CodeBlock from '../../components/CodeBlock';

type Tool = 'tar' | 'ffmpeg' | 'docker' | 'kubectl';

const CLIBuilder: React.FC = () => {
    const [activeTool, setActiveTool] = useState<Tool>('tar');
    
    // State for TAR
    const [tarAction, setTarAction] = useState('create'); // create, extract
    const [tarGzip, setTarGzip] = useState(true);
    const [tarFile, setTarFile] = useState('archive.tar.gz');
    const [tarSource, setTarSource] = useState('./folder');

    // State for FFmpeg
    const [ffInput, setFfInput] = useState('input.mp4');
    const [ffOutput, setFfOutput] = useState('output.mp4');
    const [ffCodec, setFfCodec] = useState('libx264');
    const [ffCrf, setFfCrf] = useState(23);
    const [ffScale, setFfScale] = useState('');

    // State for Docker
    const [dockAction, setDockAction] = useState('run');
    const [dockImage, setDockImage] = useState('nginx:latest');
    const [dockPort, setDockPort] = useState('8080:80');
    const [dockVol, setDockVol] = useState('');
    const [dockBg, setDockBg] = useState(true);

    const generateCommand = () => {
        switch (activeTool) {
            case 'tar':
                const flags = tarAction === 'create' ? '-c' : '-x';
                const z = tarGzip ? 'z' : '';
                const f = 'f';
                return `tar ${flags}${z}v${f} ${tarFile} ${tarAction === 'create' ? tarSource : '-C ./destination'}`;
            
            case 'ffmpeg':
                let cmd = `ffmpeg -i ${ffInput} -c:v ${ffCodec} -crf ${ffCrf}`;
                if (ffScale) cmd += ` -vf scale=${ffScale}`;
                cmd += ` ${ffOutput}`;
                return cmd;

            case 'docker':
                if (dockAction === 'run') {
                    let d = `docker run`;
                    if (dockBg) d += ` -d`;
                    if (dockPort) d += ` -p ${dockPort}`;
                    if (dockVol) d += ` -v ${dockVol}`;
                    d += ` ${dockImage}`;
                    return d;
                }
                return `docker ${dockAction} ${dockImage}`;

            case 'kubectl':
                return `kubectl get pods --all-namespaces`; // Placeholder for complexity
                
            default: return '';
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300 overflow-y-auto custom-scrollbar">
            
            <div className="max-w-5xl mx-auto w-full p-6 md:p-10 space-y-8">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                            <Terminal className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight uppercase">CLI Constructor</h1>
                            <p className="text-slate-500 font-mono text-sm">Command Line Argument Generator</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Sidebar Tabs */}
                    <div className="space-y-2">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2">Tools</div>
                        <button onClick={() => setActiveTool('tar')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTool === 'tar' ? 'bg-orange-900/20 text-orange-400 border border-orange-500/30' : 'hover:bg-slate-900 text-slate-400'}`}>
                            <FileArchive className="w-4 h-4" /> Tar / Archive
                        </button>
                        <button onClick={() => setActiveTool('ffmpeg')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTool === 'ffmpeg' ? 'bg-green-900/20 text-green-400 border border-green-500/30' : 'hover:bg-slate-900 text-slate-400'}`}>
                            <Video className="w-4 h-4" /> FFmpeg Media
                        </button>
                        <button onClick={() => setActiveTool('docker')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTool === 'docker' ? 'bg-blue-900/20 text-blue-400 border border-blue-500/30' : 'hover:bg-slate-900 text-slate-400'}`}>
                            <Box className="w-4 h-4" /> Docker
                        </button>
                        <button disabled className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-slate-600 cursor-not-allowed opacity-50">
                            <Cloud className="w-4 h-4" /> Kubernetes (WIP)
                        </button>
                    </div>

                    {/* Main Config Area */}
                    <div className="md:col-span-3 space-y-8">
                        
                        {/* Config Panel */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-2 mb-6 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-800 pb-2">
                                <Settings className="w-4 h-4" /> Configuration: {activeTool}
                            </div>

                            {activeTool === 'tar' && (
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" checked={tarAction === 'create'} onChange={() => setTarAction('create')} className="accent-orange-500" />
                                            <span className="text-sm font-bold text-white">Create Archive</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" checked={tarAction === 'extract'} onChange={() => setTarAction('extract')} className="accent-orange-500" />
                                            <span className="text-sm font-bold text-white">Extract Archive</span>
                                        </label>
                                    </div>
                                    
                                    <label className="flex items-center gap-2 cursor-pointer bg-slate-950/50 p-3 rounded border border-slate-800">
                                        <input type="checkbox" checked={tarGzip} onChange={() => setTarGzip(!tarGzip)} className="accent-orange-500" />
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-slate-200">Use Gzip Compression (-z)</div>
                                            <div className="text-xs text-slate-500">Standard for .tar.gz files</div>
                                        </div>
                                    </label>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Archive Name</label>
                                            <input value={tarFile} onChange={(e) => setTarFile(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm font-mono text-orange-200" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Target Directory</label>
                                            <input value={tarSource} onChange={(e) => setTarSource(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm font-mono text-white" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTool === 'ffmpeg' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Input File</label>
                                            <input value={ffInput} onChange={(e) => setFfInput(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm font-mono text-white" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Output File</label>
                                            <input value={ffOutput} onChange={(e) => setFfOutput(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm font-mono text-green-200" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Video Codec</label>
                                            <select value={ffCodec} onChange={(e) => setFfCodec(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm text-white">
                                                <option value="libx264">H.264 (libx264)</option>
                                                <option value="libx265">H.265 (libx265)</option>
                                                <option value="copy">Copy (No Re-encode)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 uppercase font-bold block mb-1">CRF Quality (0-51)</label>
                                            <input type="number" value={ffCrf} onChange={(e) => setFfCrf(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm font-mono text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Scale Filter (Optional)</label>
                                        <input value={ffScale} onChange={(e) => setFfScale(e.target.value)} placeholder="e.g. 1920:1080 or 1280:-1" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm font-mono text-white placeholder-slate-700" />
                                    </div>
                                </div>
                            )}

                            {activeTool === 'docker' && (
                                <div className="space-y-4">
                                    <div className="flex gap-4 mb-4">
                                        {['run', 'pull', 'build', 'stop'].map(a => (
                                            <button 
                                                key={a}
                                                onClick={() => setDockAction(a)}
                                                className={`px-3 py-1 rounded text-xs font-bold uppercase border ${dockAction === a ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}
                                            >
                                                {a}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    {dockAction === 'run' && (
                                        <>
                                            <label className="flex items-center gap-2 cursor-pointer bg-slate-950/50 p-3 rounded border border-slate-800">
                                                <input type="checkbox" checked={dockBg} onChange={() => setDockBg(!dockBg)} className="accent-blue-500" />
                                                <div className="flex-1">
                                                    <div className="text-sm font-bold text-slate-200">Detached Mode (-d)</div>
                                                    <div className="text-xs text-slate-500">Run container in background</div>
                                                </div>
                                            </label>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Image Name</label>
                                                    <input value={dockImage} onChange={(e) => setDockImage(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm font-mono text-blue-200" />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Port Mapping (Host:Container)</label>
                                                    <input value={dockPort} onChange={(e) => setDockPort(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm font-mono text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 uppercase font-bold block mb-1">Volume Mount (Host:Container)</label>
                                                <input value={dockVol} onChange={(e) => setDockVol(e.target.value)} placeholder="/home/user/data:/data" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm font-mono text-white placeholder-slate-700" />
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Result Block */}
                        <div className="bg-[#0d1117] rounded-xl border border-slate-800 p-6 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <Command className="w-4 h-4 text-emerald-500" /> Generated Command
                                </h3>
                            </div>
                            <CodeBlock className="language-bash">{generateCommand()}</CodeBlock>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CLIBuilder;
