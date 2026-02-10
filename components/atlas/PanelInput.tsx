
import React from 'react';
import { Terminal, Send, Globe, Volume2, VolumeX } from 'lucide-react';

interface PanelInputProps {
  input: string;
  setInput: (val: string) => void;
  handleSend: () => void;
  loading: boolean;
  useSearch: boolean;
  setUseSearch: (val: boolean) => void;
  useVoice: boolean;
  setUseVoice: (val: boolean) => void;
}

const PanelInput: React.FC<PanelInputProps> = ({ 
    input, setInput, handleSend, loading, 
    useSearch, setUseSearch, useVoice, setUseVoice 
}) => {
  return (
    <div className="flex-shrink-0">
        {/* Toggle Controls */}
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-700 flex justify-end gap-2">
            <button 
                onClick={() => setUseSearch(!useSearch)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${useSearch ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <Globe className="w-3 h-3" /> Net-Link {useSearch ? 'ON' : 'OFF'}
            </button>
            
            <button 
                onClick={() => setUseVoice(!useVoice)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${useVoice ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-slate-500 hover:text-slate-300'}`}
            >
                {useVoice ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />} Voice {useVoice ? 'ON' : 'OFF'}
            </button>
        </div>

        {/* Input Field */}
        <div className="p-4 border-t border-slate-700 bg-slate-950 pb-8 md:pb-4">
            <div className="relative">
            <Terminal className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
                type="text"
                className="w-full bg-slate-800 border border-slate-700 rounded text-gray-100 pl-10 pr-12 py-2.5 text-sm focus:outline-none focus:border-blue-500 font-mono transition-all"
                placeholder="Query Neural Core..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                autoFocus
                disabled={loading}
            />
            <button 
                onClick={handleSend} 
                disabled={loading} 
                className="absolute right-2 top-2 p-1 text-blue-500 hover:bg-blue-500/10 rounded disabled:opacity-30"
            >
                <Send className="w-4 h-4" />
            </button>
            </div>
        </div>
    </div>
  );
};

export default PanelInput;
