
import React from 'react';
import { Sparkles, Zap, Brain, Navigation } from 'lucide-react';
import AtlasRobot from '../AtlasRobot';

export type ChatMode = 'velocity' | 'reasoning' | 'navigation';

interface ChatHeaderProps {
  mode: ChatMode;
  setMode: (mode: ChatMode) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ mode, setMode }) => {
  const ModeCard = ({ m, icon: Icon, title, desc, color }: any) => (
    <button 
        onClick={() => setMode(m)}
        className={`flex-1 p-3 rounded-xl border transition-all text-left group ${mode === m ? `bg-${color}-900/20 border-${color}-500/50` : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
    >
        <div className={`flex items-center gap-2 mb-1 ${mode === m ? `text-${color}-400` : 'text-slate-400'}`}>
            <Icon className="w-4 h-4" />
            <span className="font-bold text-sm uppercase tracking-wider">{title}</span>
        </div>
        <p className="text-[10px] text-slate-500 font-mono leading-tight">{desc}</p>
    </button>
  );

  return (
    <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg shadow-blue-500/20">
                {/* Use the Robot Icon here for the AI Persona */}
                <AtlasRobot className="w-8 h-8 text-white" strokeWidth={2} animated={true} />
            </div>
            <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Atlas Intelligence</h1>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Neural Core v4.0</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <ModeCard m="velocity" icon={Zap} title="Velocity" desc="Low latency. Rapid response." color="amber" />
            <ModeCard m="reasoning" icon={Brain} title="Reasoning" desc="Deep Think. Complex analysis." color="purple" />
            <ModeCard m="navigation" icon={Navigation} title="Navigation" desc="Real-time data & grounding." color="emerald" />
        </div>
    </div>
  );
};

export default ChatHeader;
