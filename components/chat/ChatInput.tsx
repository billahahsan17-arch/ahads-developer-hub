
import React from 'react';
import { Send } from 'lucide-react';
import { ChatMode } from './ChatHeader';

interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  handleSend: () => void;
  loading: boolean;
  mode: ChatMode;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, handleSend, loading, mode }) => {
  return (
    <div className="p-4 bg-slate-950 border-t border-slate-800">
        <div className="relative">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Message Atlas (${mode} mode)...`}
                disabled={loading}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:border-blue-500 text-slate-200 placeholder-slate-600 transition-all"
            />
            <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center text-white transition-all disabled:opacity-50 disabled:bg-slate-800"
            >
                <Send className="w-5 h-5" />
            </button>
        </div>
    </div>
  );
};

export default ChatInput;
