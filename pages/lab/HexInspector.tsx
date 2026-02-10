import React, { useState } from 'react';
import { Binary, Upload, FileText, Search } from 'lucide-react';

const HexInspector: React.FC = () => {
    const [data, setData] = useState<Uint8Array>(new Uint8Array(0));
    const [ascii, setAscii] = useState<string>('');
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (evt) => {
                const buffer = evt.target?.result as ArrayBuffer;
                const bytes = new Uint8Array(buffer.slice(0, 1024)); // Cap at 1KB for performance in this demo
                setData(bytes);
                
                // Decode ASCII safe characters
                let asciiStr = '';
                for (let i = 0; i < bytes.length; i++) {
                    const byte = bytes[i];
                    asciiStr += (byte >= 32 && byte <= 126) ? String.fromCharCode(byte) : '.';
                }
                setAscii(asciiStr);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        setData(bytes);
        
        let asciiStr = '';
        for (let i = 0; i < bytes.length; i++) {
            const byte = bytes[i];
            asciiStr += (byte >= 32 && byte <= 126) ? String.fromCharCode(byte) : '.';
        }
        setAscii(asciiStr);
    };

    const renderRows = () => {
        const rows = [];
        const bytesPerLine = 16;
        for (let i = 0; i < data.length; i += bytesPerLine) {
            const chunk = data.slice(i, i + bytesPerLine);
            const hexChunk = Array.from(chunk).map(b => Number(b).toString(16).padStart(2, '0').toUpperCase()).join(' ');
            const asciiChunk = ascii.slice(i, i + bytesPerLine);
            
            rows.push(
                <div key={i} className="flex font-mono text-sm hover:bg-slate-800/50">
                    <div className="w-24 text-slate-500 select-none border-r border-slate-800 mr-4">
                        {i.toString(16).padStart(8, '0').toUpperCase()}
                    </div>
                    <div className="flex-1 text-emerald-400 mr-8 tracking-wider">
                        {hexChunk}
                    </div>
                    <div className="w-48 text-slate-300 tracking-widest opacity-80 border-l border-slate-800 pl-4">
                        {asciiChunk}
                    </div>
                </div>
            );
        }
        return rows;
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
                        <Binary className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Hex Inspector</h1>
                        <p className="text-[10px] font-mono text-slate-500">Binary Data Analyzer</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase rounded cursor-pointer transition-all border border-slate-700">
                        <Upload className="w-3 h-3" /> Upload File
                        <input type="file" className="hidden" onChange={handleFileUpload} />
                    </label>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                
                {/* Input Sidebar (Text) */}
                <div className="w-1/4 bg-[#0d1117] border-r border-slate-800 flex flex-col">
                    <div className="p-4 border-b border-slate-800 bg-[#010409]">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <FileText className="w-3 h-3" /> Input String
                        </span>
                    </div>
                    <textarea 
                        onChange={handleTextInput}
                        placeholder="Type text to convert to hex..."
                        className="flex-1 bg-transparent p-4 font-mono text-sm text-slate-300 focus:outline-none resize-none"
                    />
                </div>

                {/* Hex View */}
                <div className="flex-1 bg-slate-950 flex flex-col overflow-hidden">
                    <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-8 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                        <span className="w-24">Offset</span>
                        <span className="flex-1">Hexadecimal</span>
                        <span className="w-48 pl-4">Decoded Text</span>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                        {data.length > 0 ? renderRows() : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-50">
                                <Search className="w-16 h-16 mb-4" />
                                <p className="font-mono text-sm uppercase tracking-widest">No Data Loaded</p>
                            </div>
                        )}
                    </div>
                    
                    {fileName && (
                        <div className="h-8 bg-slate-900 border-t border-slate-800 flex items-center px-4 justify-between text-xs font-mono text-slate-500">
                            <span>File: {fileName}</span>
                            <span>Size: {data.length} Bytes (Preview 1KB)</span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default HexInspector;