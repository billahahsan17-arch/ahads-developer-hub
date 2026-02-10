
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Mic, MicOff, Video, VideoOff, Clock, Play, StopCircle, CheckCircle, Monitor, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

const QUESTIONS = [
    { id: 1, text: "Explain the difference between vertical and horizontal scaling, and when you would choose one over the other in a high-traffic system.", time: 120 },
    { id: 2, text: "Write a function to traverse a binary tree level-by-level (BFS). Explain the time and space complexity.", time: 300 },
    { id: 3, text: "Design a rate limiter for a distributed API. How do you handle race conditions in a clustered environment?", time: 180 }
];

const MockInterview: React.FC = () => {
    const [phase, setPhase] = useState<'SETUP' | 'ACTIVE' | 'FEEDBACK'>('SETUP');
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [cameraOn, setCameraOn] = useState(false);
    const [micOn, setMicOn] = useState(false);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [code, setCode] = useState('');

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && isActive) {
            handleNext();
        }
    }, [isActive, timeLeft]);

    useEffect(() => {
        if (videoRef.current && videoStream) {
            videoRef.current.srcObject = videoStream;
        }
    }, [videoStream, cameraOn]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setVideoStream(stream);
            setCameraOn(true);
            setMicOn(true);
        } catch (err) {
            console.error("Camera access denied", err);
            alert("Camera access is required for the simulation.");
        }
    };

    const stopCamera = () => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            setVideoStream(null);
            setCameraOn(false);
        }
    };

    const startSession = () => {
        setPhase('ACTIVE');
        setCurrentQIndex(0);
        setTimeLeft(QUESTIONS[0].time);
        setIsActive(true);
    };

    const handleNext = () => {
        if (currentQIndex < QUESTIONS.length - 1) {
            setCurrentQIndex(prev => prev + 1);
            setTimeLeft(QUESTIONS[currentQIndex + 1].time);
        } else {
            setPhase('FEEDBACK');
            setIsActive(false);
            stopCamera();
        }
    };

    const formatTime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300 overflow-hidden">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-900/20 rounded-lg border border-red-500/30">
                        <Monitor className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Interview Sim <span className="text-red-500">LIVE</span></h1>
                        <p className="text-[10px] font-mono text-slate-500">Latency: 12ms // Recording: {isActive ? 'ON' : 'OFF'}</p>
                    </div>
                </div>
                {isActive && (
                    <div className="flex items-center gap-4 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                        <Clock className={`w-4 h-4 ${timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
                        <span className={`font-mono font-bold text-xl ${timeLeft < 30 ? 'text-red-500' : 'text-white'}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Environment & Question */}
                <div className="w-1/2 flex flex-col border-r border-slate-800">
                    
                    {/* Webcam Feed */}
                    <div className="h-1/2 bg-black relative flex items-center justify-center border-b border-slate-800 group">
                        {cameraOn ? (
                            <video ref={videoRef} autoPlay muted className="h-full w-full object-cover transform scale-x-[-1]" />
                        ) : (
                            <div className="text-center opacity-30">
                                <Camera className="w-12 h-12 mx-auto mb-2" />
                                <p className="text-xs font-mono uppercase">Camera Offline</p>
                            </div>
                        )}
                        
                        {/* Overlay Controls */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-3 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors">
                                {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                            </button>
                            <button className="p-3 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors">
                                {cameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* REC Indicator */}
                        {isActive && (
                            <div className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1 bg-red-900/50 rounded border border-red-500/50">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-bold text-red-200 uppercase">REC</span>
                            </div>
                        )}
                    </div>

                    {/* Question / Context Area */}
                    <div className="flex-1 bg-slate-900 p-8 overflow-y-auto relative">
                        <AnimatePresence mode="wait">
                            {phase === 'SETUP' && (
                                <MotionDiv 
                                    key="setup"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center h-full text-center space-y-6"
                                >
                                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
                                        <Play className="w-8 h-8 text-emerald-500 ml-1" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-2">Ready to Begin?</h2>
                                        <p className="text-sm text-slate-400 max-w-xs mx-auto">
                                            Enable camera and microphone for the full pressure simulation. You will have 3 questions.
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        {!cameraOn && (
                                            <button onClick={startCamera} className="px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-800 text-sm font-bold text-white transition-all">
                                                Enable Devices
                                            </button>
                                        )}
                                        <button 
                                            onClick={startSession}
                                            disabled={!cameraOn}
                                            className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold text-white transition-all shadow-lg shadow-emerald-900/20"
                                        >
                                            Start Interview
                                        </button>
                                    </div>
                                </MotionDiv>
                            )}

                            {phase === 'ACTIVE' && (
                                <MotionDiv 
                                    key="active"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-500">
                                        <span>Question {currentQIndex + 1} of {QUESTIONS.length}</span>
                                        <span>Difficulty: Hard</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white leading-relaxed">
                                        {QUESTIONS[currentQIndex].text}
                                    </h2>
                                    <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg flex gap-3">
                                        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                        <p className="text-xs text-amber-200/80 leading-relaxed">
                                            Focus on communicating your thought process clearly. The AI is analyzing your verbal confidence and pacing.
                                        </p>
                                    </div>
                                </MotionDiv>
                            )}

                            {phase === 'FEEDBACK' && (
                                <MotionDiv 
                                    key="feedback"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center h-full text-center space-y-6"
                                >
                                    <CheckCircle className="w-16 h-16 text-emerald-500" />
                                    <h2 className="text-2xl font-bold text-white">Session Complete</h2>
                                    <p className="text-sm text-slate-400">
                                        Simulation ended. Review your performance metrics in the Flight Recorder.
                                    </p>
                                    <button onClick={() => setPhase('SETUP')} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-sm transition-all">
                                        Reset Simulator
                                    </button>
                                </MotionDiv>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Panel: Whiteboard / Editor */}
                <div className="w-1/2 bg-[#0d1117] flex flex-col">
                    <div className="h-10 bg-[#010409] border-b border-slate-800 flex items-center px-4 justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scratchpad.ts</span>
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                        </div>
                    </div>
                    <textarea 
                        className="flex-1 bg-transparent p-6 font-mono text-sm text-slate-300 focus:outline-none resize-none leading-relaxed"
                        placeholder="// Type your solution or notes here..."
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck={false}
                    />
                    {phase === 'ACTIVE' && (
                        <div className="p-4 border-t border-slate-800 bg-[#010409] flex justify-end">
                            <button 
                                onClick={handleNext}
                                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-xs uppercase tracking-widest transition-all"
                            >
                                {currentQIndex === QUESTIONS.length - 1 ? 'Submit & Finish' : 'Next Question'} <StopCircle className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default MockInterview;
