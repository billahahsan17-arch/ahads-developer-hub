
import React, { useState, useEffect } from 'react';
import { generateCalibrationQuiz } from '../services/atlasService';
import { Brain, RefreshCw, HelpCircle, AlertTriangle, Activity } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface QuizData {
    topic: string;
    difficulty: string;
    question: string;
    answer: string;
}

const Calibration: React.FC = () => {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState(0);

  // Load streak from storage on mount
  useEffect(() => {
    const savedStreak = localStorage.getItem('atlas_calibration_streak');
    if (savedStreak) {
        setStreak(parseInt(savedStreak, 10));
    }
    loadNewQuiz();
  }, []);

  // Persist streak whenever it changes
  useEffect(() => {
    localStorage.setItem('atlas_calibration_streak', streak.toString());
  }, [streak]);

  const loadNewQuiz = async () => {
    setLoading(true);
    setRevealed(false);
    
    // Simulate thinking delay for effect
    const rawResponse = await generateCalibrationQuiz();
    
    try {
        const data = JSON.parse(rawResponse);
        setQuiz(data);
    } catch (e) {
        console.error("Failed to parse quiz", e);
        setQuiz({
            topic: "Neural Core Glitch",
            difficulty: "System",
            question: "The Atlas Neural Core returned malformed data. This is a simulation artifact.",
            answer: "Please refresh the module to re-establish the uplink."
        });
    }
    setLoading(false);
  };

  const handleRate = (grade: 'S' | 'A' | 'F') => {
      if (grade === 'S' || grade === 'A') {
          setStreak(s => s + 1);
      } else {
          setStreak(0);
      }
      loadNewQuiz();
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6 bg-slate-950 font-sans text-slate-300">
        
        {/* Header HUD */}
        <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h1 className="text-xl font-black text-white tracking-wide uppercase">Neural Calibration</h1>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                        <Activity className="w-3 h-3" /> ACTIVE RECALL PROTOCOL
                    </div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-[10px] font-mono text-slate-500 uppercase">Current Streak</div>
                <div className={`text-2xl font-black ${streak > 0 ? 'text-emerald-400' : 'text-slate-600'}`}>{streak}</div>
            </div>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col">
            
            {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                    <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
                    <p className="text-blue-400 font-mono text-sm animate-pulse">Generating Elite Scenario...</p>
                </div>
            ) : quiz ? (
                <>
                    {/* Question Face */}
                    <div className="p-8 md:p-12 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {quiz.topic}
                            </span>
                            <span className="text-xs font-mono text-red-400 flex items-center gap-1 border border-red-900/50 px-2 py-1 rounded bg-red-950/20">
                                <AlertTriangle className="w-3 h-3" /> {quiz.difficulty}
                            </span>
                        </div>
                        
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-8 flex-1">
                            {quiz.question}
                        </h2>

                        {!revealed && (
                            <button 
                                onClick={() => setRevealed(true)}
                                className="w-full py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm font-bold uppercase tracking-widest text-slate-300 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                            >
                                <HelpCircle className="w-4 h-4" /> Reveal Verdict
                            </button>
                        )}
                    </div>

                    {/* Answer Reveal (Animated) */}
                    {revealed && (
                        <div className="bg-slate-950 border-t border-slate-800 p-8 md:p-12 animate-slide-up">
                            <div className="mb-6 prose prose-invert prose-sm max-w-none">
                                <h3 className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">Technical Solution</h3>
                                <ReactMarkdown>{quiz.answer}</ReactMarkdown>
                            </div>

                            <div className="grid grid-cols-4 gap-3 pt-6 border-t border-slate-900">
                                <button onClick={() => handleRate('S')} className="py-3 rounded bg-emerald-900/20 border border-emerald-900/50 hover:bg-emerald-600 hover:text-white text-emerald-500 font-black transition-all">S</button>
                                <button onClick={() => handleRate('A')} className="py-3 rounded bg-blue-900/20 border border-blue-900/50 hover:bg-blue-600 hover:text-white text-blue-500 font-black transition-all">A</button>
                                <button onClick={() => handleRate('A')} className="py-3 rounded bg-amber-900/20 border border-amber-900/50 hover:bg-amber-600 hover:text-white text-amber-500 font-black transition-all">B</button>
                                <button onClick={() => handleRate('F')} className="py-3 rounded bg-red-900/20 border border-red-900/50 hover:bg-red-600 hover:text-white text-red-500 font-black transition-all">F</button>
                            </div>
                            <div className="text-center mt-2 text-[10px] text-slate-600 font-mono uppercase">Rate your recall accuracy</div>
                        </div>
                    )}
                </>
            ) : (
                <div className="p-8 text-center text-red-500">Error loading quiz module.</div>
            )}
        </div>
    </div>
  );
};

export default Calibration;
