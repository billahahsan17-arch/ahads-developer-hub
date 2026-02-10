
import React, { RefObject } from 'react';
import { ChatMessage } from '../../types';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../CodeBlock';

interface MessageListProps {
  messages: ChatMessage[];
  loading: boolean;
  scrollRef: RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, loading, scrollRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" ref={scrollRef}>
        {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-30">
                <Bot className="w-16 h-16 mb-4" />
                <p className="font-mono text-sm uppercase tracking-widest">Neural Link Established</p>
            </div>
        )}
        {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-700' : 'bg-gradient-to-br from-blue-600 to-purple-600'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${msg.role === 'user' ? 'bg-slate-800 text-white rounded-tr-none' : 'bg-slate-950/50 border border-slate-800 rounded-tl-none'}`}>
                    <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                            components={{
                                code: ({node, className, children, ...props}) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return match ? (
                                        <CodeBlock className={className}>{String(children).replace(/\n$/, '')}</CodeBlock>
                                    ) : (
                                        <code className="bg-slate-900 px-1 py-0.5 rounded text-xs font-mono" {...props}>{children}</code>
                                    )
                                }
                            }}
                        >
                            {msg.text}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        ))}
        {loading && (
            <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 animate-pulse">
                        <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-150"></div>
                </div>
            </div>
        )}
    </div>
  );
};

export default MessageList;
