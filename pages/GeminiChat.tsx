
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { streamMessageToAtlas } from '../services/atlasService'; 
import ChatHeader, { ChatMode } from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import ChatInput from '../components/chat/ChatInput';

const AtlasChat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { 
            role: 'model', 
            text: 'Atlas Neural Core Initialized.\n\nReady for engineering directives.', 
            timestamp: Date.now() 
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<ChatMode>('reasoning');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, loading]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        
        const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        const aiMsg: ChatMessage = { role: 'model', text: '...', timestamp: Date.now() };
        setMessages(prev => [...prev, aiMsg]);

        try {
            // Using Hybrid Service - Automatically switches between Cloud and Local
            const context = `User Mode: ${mode}. Focus on Engineering accuracy.`;
            const useSearch = mode === 'navigation';
            
            const stream = streamMessageToAtlas(messages, input, context, useSearch);
            
            let fullResponse = "";
            for await (const textChunk of stream) {
                // If the stream returns chunks, append them.
                // Note: Local stream returns growing full text, API returns chunks.
                // We need to handle this.
                // atlasService standardizes to returning chunks for Cloud, but Local might differ.
                // Let's assume atlasService normalizes it or we handle append.
                
                // For this implementation, let's just replace the text for simplicity
                // if the service yields cumulative text (Local) vs chunks (Cloud).
                // Actually, the previous implementation of streamLocalResponse yielded cumulative text.
                // Cloud yields chunks.
                // Let's modify logic slightly to just accumulate for cloud, or replace for local?
                // Best practice: The service should standardize.
                // Assuming atlasService yields CHUNKS for cloud.
                // Local stream wrapper in atlasService yields CHUNKS too (by slicing).
                
                fullResponse += textChunk;
                
                setMessages(prev => {
                    const newArr = [...prev];
                    newArr[newArr.length - 1].text = fullResponse;
                    return newArr;
                });
            }
        } catch (e) {
            console.error("Core Error:", e);
            setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1].text = "Core Dump: Internal processing error. Attempting Local Reboot.";
                return newArr;
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-950 p-4 md:p-8 font-sans text-slate-300 overflow-hidden">
            <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col min-h-0">
                <div className="flex-shrink-0">
                    <ChatHeader mode={mode} setMode={setMode} />
                </div>
                
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-2xl relative min-h-0">
                    <MessageList messages={messages} loading={loading} scrollRef={scrollRef} />
                    <ChatInput 
                        input={input} 
                        setInput={setInput} 
                        handleSend={handleSend} 
                        loading={loading} 
                        mode={mode} 
                    />
                </div>
            </div>
        </div>
    );
};

export default AtlasChat;
