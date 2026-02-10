
import React, { useState, useEffect } from 'react';
import { Moon, Battery, Maximize2, Minimize2, Type, EyeOff } from 'lucide-react';

const OLEDOptimizer: React.FC = () => {
    const [text, setText] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [time, setTime] = useState(new Date());
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setWordCount(text.trim().split(/\s+/).filter(w => w.length > 0).length);
    }, [text]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    return (
        <div className="h-full flex flex-col bg-black font-mono text-[#333]">
            {/* Ultra Minimal Header */}
            <div className="h-12 border-b border-[#111] flex items-center justify-between px-6 flex-shrink-0 transition-opacity duration-500 hover:opacity-100 opacity-20">
                <div className="flex items-center gap-3">
                    <Moon className="w-4 h-4 text-[#444]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#444]">OLED Zen Mode</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-[#333]">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    <button onClick={toggleFullscreen} className="text-[#444] hover:text-white transition-colors">
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative">
                
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing..."
                    className="w-full max-w-3xl h-[80vh] bg-black text-[#888] text-lg leading-relaxed focus:outline-none resize-none p-8 selection:bg-[#222] selection:text-[#aaa]"
                    spellCheck={false}
                />

                {/* Ambient Status - Fade out when typing could be a nice addition, keeping it static low contrast for now */}
                <div className="absolute bottom-4 right-6 flex items-center gap-6 opacity-10 pointer-events-none select-none">
                    <div className="flex items-center gap-2">
                        <Type className="w-3 h-3" />
                        <span className="text-xs">{wordCount} words</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Battery className="w-3 h-3" />
                        <span className="text-xs">Power Saving Active</span>
                    </div>
                </div>

                {text.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                        <div className="text-center space-y-4">
                            <EyeOff className="w-16 h-16 mx-auto text-[#333]" />
                            <p className="text-xs uppercase tracking-[0.3em] text-[#333]">True Black // Zero Distraction</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OLEDOptimizer;
