
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
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [micEnabled, setMicEnabled] = useState(false);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [code, setCode] = useState('');

    // Timer logic
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && isActive) {
            handleNext();
        }
    }, [isActive, timeLeft]);

    // Video stream management
    useEffect(() => {
        if (videoRef.current && videoStream) {
            videoRef.current.srcObject = videoStream;
        }
    }, [videoStream, cameraEnabled]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setVideoStream(stream);
            setCameraEnabled(true);
            setMicEnabled(true);
        } catch (err) {
            console.error("Camera access denied", err);
            alert("Camera access is required for the simulation. Please enable permissions and refresh.");
        }
    };

    const stopCamera = () => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            setVideoStream(null);
            setCameraEnabled(false);
            setMicEnabled(false);
        }
    };
    
    const toggleMic = () => {
        if (videoStream) {
            const audioTrack = videoStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setMicEnabled(audioTrack.enabled);
            }
        }
    };

    const toggleCamera = () => {
        if (videoStream) {
            const videoTrack = videoStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setCameraEnabled(videoTrack.enabled);
            }
        }
    };

    const startSession = () => {
        if (!videoStream) {
            alert("Please enable your camera to start the session.");
            return;
        }
        setIsActive(true);
        setTimeLeft(QUESTIONS[currentQIndex].time);
        setPhase('ACTIVE');
    };
    
    const handleStop = () => {
        setIsActive(false);
        stopCamera();
        setPhase('FEEDBACK');
    };

    const handleNext = () => {
        if (currentQIndex < QUESTIONS.length - 1) {
            setCurrentQIndex(prevIndex => prevIndex + 1);
            setTimeLeft(QUESTIONS[prevIndex + 1].time);
        } else {
            handleStop(); // End session if it's the last question
        }
    };

    const resetSession = () => {
        setPhase('SETUP');
        setCurrentQIndex(0);
        setTimeLeft(0);
        setIsActive(false);
        setCode('');
        stopCamera();
    };
    
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const renderSetup = () => (
        <MotionDiv key="setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-2xl p-8 flex flex-col items-center text-center">
            <Monitor size={48} className="text-blue-400 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Mock Interview Setup</h1>
            <p className="text-gray-400 mb-6">Prepare for your technical interview. Enable your camera and microphone to begin.</p>
            
            <div className="w-full max-w-lg bg-gray-900 rounded-lg p-4 mb-6">
                {videoStream ? (
                    <video ref={videoRef} autoPlay muted className="w-full h-auto rounded-md" />
                ) : (
                    <div className="w-full h-64 flex items-center justify-center bg-black rounded-md">
                        <Camera size={40} className="text-gray-600" />
                    </div>
                )}
            </div>

            {videoStream ? (
                <div className="flex flex-col items-center">
                    <div className="flex space-x-4 mb-6">
                        <button onClick={toggleCamera} className={`p-3 rounded-full ${cameraEnabled ? 'bg-green-500' : 'bg-red-500'}`}>{cameraEnabled ? <Video size={24}/> : <VideoOff size={24}/>}</button>
                        <button onClick={toggleMic} className={`p-3 rounded-full ${micEnabled ? 'bg-green-500' : 'bg-red-500'}`}>{micEnabled ? <Mic size={24}/> : <MicOff size={24}/>}</button>
                    </div>
                    <button onClick={startSession} className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-lg flex items-center space-x-2 transition-transform transform hover:scale-105">
                        <Play size={20} />
                        <span>Start Session</span>
                    </button>
                </div>
            ) : (
                <button onClick={startCamera} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg flex items-center space-x-2 transition-transform transform hover:scale-105">
                    <Camera size={20} />
                    <span>Enable Camera & Mic</span>
                </button>
            )}
        </MotionDiv>
    );

    const renderActive = () => (
        <MotionDiv key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-screen flex p-4 space-x-4">
            {/* Left Panel: Question and Controls */}
            <div className="w-1/3 flex flex-col bg-gray-800 rounded-lg p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-blue-300">Question {currentQIndex + 1} of {QUESTIONS.length}</h2>
                <p className="text-gray-300 flex-grow">{QUESTIONS[currentQIndex].text}</p>
                <div className="mt-auto">
                    <div className="flex items-center justify-center text-6xl font-mono bg-gray-900 rounded-lg p-4 mb-6">
                        <Clock size={48} className="mr-4 text-yellow-400" />
                        <span>{formatTime(timeLeft)}</span>
                    </div>
                    <div className="flex justify-between">
                        <button onClick={handleStop} className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold flex items-center space-x-2">
                            <StopCircle size={20} />
                            <span>End Session</span>
                        </button>
                        <button onClick={handleNext} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
                            Next Question &rarr;
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel: Video and Code */}
            <div className="w-2/3 flex flex-col space-y-4">
                <div className="h-1/3 bg-gray-800 rounded-lg p-2 relative">
                    <video ref={videoRef} autoPlay className="w-full h-full object-cover rounded-md" />
                     <div className="absolute bottom-2 left-2 flex space-x-2">
                        <button onClick={toggleCamera} className={`p-2 rounded-full ${cameraEnabled ? 'bg-green-500/80' : 'bg-red-500/80'}`}>{cameraEnabled ? <Video size={18}/> : <VideoOff size={18}/>}</button>
                        <button onClick={toggleMic} className={`p-2 rounded-full ${micEnabled ? 'bg-green-500/80' : 'bg-red-500/80'}`}>{micEnabled ? <Mic size={18}/> : <MicOff size={18}/>}</button>
                    </div>
                </div>
                <div className="h-2/3 flex flex-col bg-gray-800 rounded-lg shadow-xl">
                    <div className="bg-gray-900 p-2 rounded-t-lg">
                        <span className="text-sm font-medium text-gray-400">Notes / Code</span>
                    </div>
                    <textarea 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="You can write your code or notes here..."
                        className="flex-grow w-full bg-gray-800 text-gray-200 p-4 font-mono text-sm rounded-b-lg resize-none focus:outline-none"
                    />
                </div>
            </div>
        </MotionDiv>
    );

    const renderFeedback = () => (
        <MotionDiv key="feedback" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-2xl p-8 flex flex-col items-center text-center">
            <CheckCircle size={48} className="text-green-400 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Session Complete!</h1>
            <p className="text-gray-400 mb-6">Well done! In a full version, you would receive detailed feedback on your performance here.</p>
            <div className="w-full bg-gray-900 rounded p-4 mb-6 text-left">
                <h3 className="font-semibold mb-2 text-blue-300">Your Notes:</h3>
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono max-h-48 overflow-y-auto">{code || "No notes taken."}</pre>
            </div>
            <button onClick={resetSession} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-transform transform hover:scale-105">
                Start a New Session
            </button>
        </MotionDiv>
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-2 md:p-4">
             <AnimatePresence mode="wait">
                {phase === 'SETUP' && renderSetup()}
                {phase === 'ACTIVE' && renderActive()}
                {phase === 'FEEDBACK' && renderFeedback()}
            </AnimatePresence>
        </div>
    );
};

export default MockInterview;
