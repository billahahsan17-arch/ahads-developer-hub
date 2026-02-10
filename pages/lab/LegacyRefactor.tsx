
import React, { useState } from 'react';
import { RotateCcw, Check, Play, AlertTriangle, Code2, Trophy } from 'lucide-react';
import { auditCode } from '../../services/atlasService';
import CodeBlock from '../../components/CodeBlock';
import ReactMarkdown from 'react-markdown';

const LEVELS = [
    {
        id: 1,
        title: "The Nested Nightmare",
        description: "This function calculates a total, but it's nested 4 levels deep and uses unclear variable names. Flatten it and modernize the syntax.",
        language: 'javascript',
        legacyCode: `function calc(data) {
  var t = 0;
  for(var i=0; i<data.length; i++) {
    if(data[i].active == true) {
      if(data[i].items) {
        for(var j=0; j<data[i].items.length; j++) {
          if(data[i].items[j].price > 10) {
            t = t + data[i].items[j].price;
          }
        }
      }
    }
  }
  return t;
}`,
        targetLength: 150
    },
    {
        id: 2,
        title: "Callback Hell",
        description: "Refactor this legacy Node.js callback chain into clean Async/Await syntax.",
        language: 'javascript',
        legacyCode: `function getUserData(id, cb) {
  db.findUser(id, function(err, user) {
    if(err) return cb(err);
    if(user) {
      db.findPosts(user.id, function(err, posts) {
        if(err) return cb(err);
        db.findComments(posts[0].id, function(err, comments) {
          if(err) return cb(err);
          cb(null, { user: user, comments: comments });
        });
      });
    }
  });
}`,
        targetLength: 200
    }
];

const LegacyRefactor: React.FC = () => {
    const [level, setLevel] = useState(0);
    const [code, setCode] = useState(LEVELS[0].legacyCode);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [score, setScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const currentLevel = LEVELS[level];

    const handleLevelChange = (newLevel: number) => {
        setLevel(newLevel);
        setCode(LEVELS[newLevel].legacyCode);
        setFeedback(null);
        setScore(null);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setFeedback(null);
        
        // Use local AI to audit the code
        const result = await auditCode(code, currentLevel.language);
        
        // Basic heuristic checks for game logic
        const lineCount = code.split('\n').length;
        const charCount = code.length;
        const improvement = Math.max(0, 100 - (charCount / currentLevel.legacyCode.length) * 100);
        
        setScore(Math.round(result.securityScore));
        
        let feedbackText = `### Refactor Analysis\n\n`;
        feedbackText += `*   **Security Score:** ${result.securityScore}/100\n`;
        feedbackText += `*   **Conciseness:** Reduced size by ${improvement.toFixed(0)}%\n`;
        
        if (result.analysis.includes('CRITICAL')) {
            feedbackText += `\n**⚠️ Issues Detected:**\nThe Refiner found critical flaws in your logic. Review the Static Analysis Report.`;
        } else if (result.securityScore > 80 && improvement > 20) {
            feedbackText += `\n**✅ Excellent:** Code is cleaner, shorter, and safer.`;
        } else {
            feedbackText += `\n**Warning:** Optimization minimal. Try using modern array methods (map/reduce/filter) or async/await.`;
        }

        setFeedback(feedbackText);
        setLoading(false);
    };

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            
            {/* Header */}
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-900/20 rounded-lg border border-orange-500/30">
                        <RotateCcw className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Legacy Refactor</h1>
                        <p className="text-[10px] font-mono text-slate-500">Clean Code Challenge // Level {level + 1}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {LEVELS.map((l, i) => (
                        <button 
                            key={l.id}
                            onClick={() => handleLevelChange(i)}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                                level === i ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-500 hover:text-white'
                            }`}
                        >
                            Lvl {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                
                {/* Left: Challenge Context */}
                <div className="w-1/3 bg-[#0d1117] border-r border-slate-800 flex flex-col">
                    <div className="p-6 border-b border-slate-800">
                        <h2 className="text-xl font-black text-white mb-2">{currentLevel.title}</h2>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {currentLevel.description}
                        </p>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Original Spaghetti</div>
                        <div className="opacity-60 pointer-events-none select-none">
                            <CodeBlock className={`language-${currentLevel.language}`}>
                                {currentLevel.legacyCode}
                            </CodeBlock>
                        </div>
                    </div>
                </div>

                {/* Right: Editor & Feedback */}
                <div className="w-2/3 flex flex-col bg-slate-950">
                    <div className="flex-1 p-6 relative">
                        <textarea 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-full bg-slate-900 border border-slate-800 rounded-xl p-6 font-mono text-sm text-slate-200 focus:outline-none focus:border-orange-500/50 resize-none custom-scrollbar"
                            spellCheck={false}
                        />
                        <button 
                            onClick={handleSubmit}
                            disabled={loading}
                            className="absolute bottom-10 right-10 flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-widest rounded-lg shadow-lg shadow-orange-900/20 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Analyzing...' : 'Submit Refactor'} <Play className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Feedback Panel */}
                    {feedback && (
                        <div className="h-64 bg-[#010409] border-t border-slate-800 p-6 overflow-y-auto custom-scrollbar animate-slide-up">
                            <div className="flex items-center gap-3 mb-4">
                                {score && score > 80 ? <Trophy className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-amber-500" />}
                                <h3 className="font-bold text-white uppercase tracking-wider">AI Evaluation</h3>
                            </div>
                            <div className="prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown>{feedback}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default LegacyRefactor;
