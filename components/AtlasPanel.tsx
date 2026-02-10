
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, GripVertical } from 'lucide-react';
import { ChatMessage } from '../types';
import { streamMessageToAtlas } from '../services/atlasService';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import PanelHeader from './atlas/PanelHeader';
import ModuleTicker from './atlas/ModuleTicker';
import PanelInput from './atlas/PanelInput';

interface AtlasPanelProps {
  isOpen: boolean;
  onClose: () => void;
  context: string;
  width: number;
  isResizing: boolean;
  onResizeStart: () => void;
}

const AtlasPanel: React.FC<AtlasPanelProps> = ({ 
    isOpen, 
    onClose, 
    context, 
    width, 
    isResizing, 
    onResizeStart 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
        role: 'model', 
        text: 'Atlas Neural Core Initialized.\n\nConnected to Hybrid Intelligence Layer.', 
        timestamp: Date.now() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [useVoice, setUseVoice] = useState(false);
  const [useSearch, setUseSearch] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]); 

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const atlasMsg: ChatMessage = { role: 'model', text: '...', timestamp: Date.now() };
      setMessages(prev => [...prev, atlasMsg]);

      const stream = streamMessageToAtlas(messages, input, `Context: ${context}. User prefers concise engineering answers.`, useSearch);
      
      let fullResponse = "";
      for await (const textChunk of stream) {
        fullResponse += textChunk;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.role === 'model') lastMsg.text = fullResponse;
          return newMessages;
        });
      }

    } catch (err) {
      console.error(err);
      setMessages(prev => {
          const newArr = [...prev];
          newArr[newArr.length - 1].text = "Core Error: Connection interrupted.";
          return newArr;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
        className={`fixed right-0 top-0 bottom-0 bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col z-50 font-mono ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ 
            width: `${width}px`,
            // PERFORMANCE: Disable transition during resize to prevent "rubber banding"
            transitionProperty: 'transform, width',
            transitionDuration: isResizing ? '0s' : '500ms', 
            transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)', 
            willChange: 'transform, width' 
        }}
    >
      {/* --- RESIZE HANDLE --- */}
      <div 
        onMouseDown={(e) => {
            e.preventDefault();
            onResizeStart();
        }}
        className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 transition-colors z-50 group flex items-center justify-center -ml-0.5"
        title="Drag to resize"
      >
          {/* Visual Grip Indicator (Visible on Hover) */}
          <div className="h-8 w-4 bg-slate-800 border border-slate-600 rounded-l absolute right-0 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity shadow-lg">
              <GripVertical className="w-3 h-3 text-slate-400" />
          </div>
      </div>

      <PanelHeader onClose={onClose} />
      
      <ModuleTicker />
      
      <div className="px-4 py-2 bg-slate-800/30 border-b border-slate-700 flex items-center gap-2 text-[10px] text-gray-400 font-mono overflow-hidden whitespace-nowrap flex-shrink-0">
         <Terminal className="w-3 h-3 flex-shrink-0" />
         <span className="truncate">CTX: {context}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-900 custom-scrollbar" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`text-[10px] mb-1 uppercase tracking-wider ${msg.role === 'user' ? 'text-gray-500' : 'text-blue-500'}`}>
               {msg.role === 'user' ? 'Operator' : 'Atlas Core'}
            </div>
            <div className={`max-w-[95%] rounded-lg p-4 text-sm font-medium border ${
              msg.role === 'user' 
                ? 'bg-slate-800 text-gray-100 border-slate-700 rounded-tr-none' 
                : 'bg-blue-950/10 text-slate-300 border-blue-500/20 rounded-tl-none shadow-[0_0_15px_rgba(59,130,246,0.05)] w-full'
            }`}>
              {msg.role === 'user' ? (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              ) : (
                <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed">
                    <ReactMarkdown
                        components={{
                            code: ({node, className, children, ...props}) => {
                                const match = /language-(\w+)/.exec(className || '');
                                return match ? (
                                    <CodeBlock className={className}>{String(children).replace(/\n$/, '')}</CodeBlock>
                                ) : (
                                    <code className="bg-slate-800 text-blue-200 px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {msg.text}
                    </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <PanelInput 
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        loading={loading}
        useSearch={useSearch}
        setUseSearch={setUseSearch}
        useVoice={useVoice}
        setUseVoice={setUseVoice}
      />
    </div>
  );
};

export default AtlasPanel;
