
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChatMessage } from '../types';
import { Atlas } from '../services/atlasService';
import ChatHeader, { ChatMode } from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import ChatInput from '../components/chat/ChatInput';

// --- ARCHITECTURAL REFINEMENT: CUSTOM HOOK FOR CHAT LOGIC ---
const useChatLogic = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [streamingResponse, setStreamingResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastRequest, setLastRequest] = useState<{ messages: ChatMessage[], input: string, mode: ChatMode } | null>(null);

    useEffect(() => { // Set initial welcome message
        setMessages([{ 
            id: crypto.randomUUID(),
            role: 'model', 
            text: 'Atlas Neural Core Initialized. I am an Elite Engineering Companion AI, ready for complex software engineering directives. How can I assist you?', 
            timestamp: Date.now() 
        }]);
    }, []);

    // --- ADVANCED PERSONA-DRIVEN PROMPT ENGINEERING ---
    const generateSystemPrompt = (mode: ChatMode, history: ChatMessage[]) => {
        const modeExplanation = {
            reasoning: "Prioritize in-depth analysis, logical deduction, and explaining complex topics. Use analogies where helpful.",
            coding: "Focus on generating clean, efficient, and well-documented code. Always specify the language in markdown blocks.",
            navigation: "Act as a search and navigation assistant for the web. Be concise and provide direct links or summaries.",
        }[mode];

        return `
            You are Atlas, an Elite Engineering Companion AI. Your purpose is to assist software engineers with complex tasks.
            Your capabilities include: Code generation and debugging, technical analysis, system design, documentation, and web navigation.
            
            CURRENT MODE: ${mode.toUpperCase()}. ${modeExplanation}

            RULES:
            - Be concise, technical, and accurate.
            - Always use markdown for formatting. Use code blocks with language identifiers for all code.
            - Do not refuse requests; if a task is impossible, explain the technical constraints.
            - The following is the chat history. Use it for context.
        `;
    };

    const handleSend = useCallback(async (input: string, mode: ChatMode) => {
        if (!input.trim() || isLoading) return;
        
        const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', text: input, timestamp: Date.now() };
        const currentMessages = [...messages, userMsg];
        setMessages(currentMessages);
        setLastRequest({ messages: currentMessages, input, mode }); // Save for retry

        setIsLoading(true);
        setError(null);
        setStreamingResponse('');

        const systemPrompt = generateSystemPrompt(mode, messages);
        const useSearch = mode === 'navigation';

        try {
            const stream = Atlas.stream(currentMessages, systemPrompt, useSearch);
            for await (const textChunk of stream) {
                setStreamingResponse(prev => prev + textChunk);
            }
            // Finalize the stream into a message
            setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'model', text: streamingResponse, timestamp: Date.now() }]);
        } catch (e: any) {
            console.error("Core Error:", e);
            setError(e.message || "Core Dump: Internal processing error. Please check the console and retry.");
        } finally {
            setIsLoading(false);
            setStreamingResponse('');
        }
    }, [messages, isLoading, streamingResponse]);

    const retryLastRequest = useCallback(() => {
        if (lastRequest) {
            // Reset state before retrying
            setError(null);
            const userMessageExists = messages.some(m => m.id === lastRequest.messages[lastRequest.messages.length - 1].id);
            if (userMessageExists) {
                setMessages(lastRequest.messages);
            }
            handleSend(lastRequest.input, lastRequest.mode);
        }
    }, [lastRequest, messages, handleSend]);

    return { messages, streamingResponse, isLoading, error, handleSend, retryLastRequest };
};


const GeminiChat: React.FC = () => {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState<ChatMode>('reasoning');
    const scrollRef = useRef<HTMLDivElement>(null);
    const { messages, streamingResponse, isLoading, error, handleSend, retryLastRequest } = useChatLogic();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, streamingResponse, isLoading, error]);

    const onSend = () => {
        handleSend(input, mode);
        setInput('');
    };

    const onRetry = () => {
        retryLastRequest();
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-950 p-4 md:p-8 font-sans text-slate-300 overflow-hidden">
            <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col min-h-0">
                <div className="flex-shrink-0">
                    <ChatHeader mode={mode} setMode={setMode} isLoading={isLoading} />
                </div>
                
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-inner relative min-h-0">
                    <MessageList 
                        messages={messages} 
                        streamingResponse={streamingResponse}
                        isLoading={isLoading}
                        error={error}
                        onRetry={onRetry}
                        scrollRef={scrollRef} 
                    />
                    <ChatInput 
                        input={input} 
                        setInput={setInput} 
                        handleSend={onSend} 
                        loading={isLoading} 
                        mode={mode} 
                    />
                </div>
            </div>
        </div>
    );
};

export default GeminiChat;
