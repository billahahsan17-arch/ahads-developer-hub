
import React, { useState, useEffect } from 'react';
import { 
    MessageSquare, Star, Send, ShieldCheck, 
    BookOpen, Flame, PenTool, CheckCircle, XCircle,
    User, Calendar, ThumbsUp, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteReview, CodexPost } from '../types';
import { judgeSubmission } from '../services/atlasService';
import ReactMarkdown from 'react-markdown';

const MotionDiv = motion.div as any;

export default function Community() {
    const [activeTab, setActiveTab] = useState<'REVIEWS' | 'CODEX'>('REVIEWS');
    
    // --- REVIEW STATE ---
    const [reviews, setReviews] = useState<SiteReview[]>([]);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [reviewerName, setReviewerName] = useState('');

    // --- CODEX STATE ---
    const [codexPosts, setCodexPosts] = useState<CodexPost[]>([]);
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [isJudging, setIsJudging] = useState(false);
    const [verdict, setVerdict] = useState<{ approved: boolean, reason: string } | null>(null);

    // Load Data
    useEffect(() => {
        const savedReviews = localStorage.getItem('atlas_reviews');
        if (savedReviews) setReviews(JSON.parse(savedReviews));
        else {
            // Seed Mock Data
            setReviews([
                { id: 'r1', user: 'DevOne', rating: 5, comment: 'The most comprehensive roadmap I have ever seen.', timestamp: Date.now() - 10000000 },
                { id: 'r2', user: 'SystemArch', rating: 5, comment: 'The Lab tools are actually useful for real work.', timestamp: Date.now() - 5000000 },
            ]);
        }

        const savedCodex = localStorage.getItem('atlas_codex');
        if (savedCodex) setCodexPosts(JSON.parse(savedCodex));
        else {
            // Seed Mock Data
            setCodexPosts([
                { id: 'c1', title: 'Why Microservices Fail', content: 'Distributed systems trade consistency for availability...', author: 'SeniorEng', timestamp: Date.now() - 8000000, votes: 42, tags: ['Architecture'], atlasVerdict: 'APPROVED' },
            ]);
        }
    }, []);

    // Save Data
    useEffect(() => { localStorage.setItem('atlas_reviews', JSON.stringify(reviews)); }, [reviews]);
    useEffect(() => { localStorage.setItem('atlas_codex', JSON.stringify(codexPosts)); }, [codexPosts]);

    const submitReview = () => {
        if (!reviewText.trim() || !reviewerName.trim()) return;
        const newReview: SiteReview = {
            id: Date.now().toString(),
            user: reviewerName,
            rating,
            comment: reviewText,
            timestamp: Date.now()
        };
        setReviews([newReview, ...reviews]);
        setReviewText('');
        setReviewerName('');
    };

    const submitToCodex = async () => {
        if (!postTitle.trim() || !postContent.trim()) return;
        setIsJudging(true);
        setVerdict(null);

        const result = await judgeSubmission(postTitle, postContent);
        
        setIsJudging(false);
        setVerdict(result);

        if (result.approved) {
            const newPost: CodexPost = {
                id: Date.now().toString(),
                title: postTitle,
                content: postContent,
                author: 'Anonymous Engineer',
                timestamp: Date.now(),
                votes: 1,
                tags: ['Community'],
                atlasVerdict: 'APPROVED'
            };
            setCodexPosts([newPost, ...codexPosts]);
            setPostTitle('');
            setPostContent('');
        }
    };

    const votePost = (id: string) => {
        setCodexPosts(codexPosts.map(p => p.id === id ? { ...p, votes: p.votes + 1 } : p));
    };

    return (
        <div className="h-full bg-[#020617] text-slate-300 overflow-y-auto custom-scrollbar flex flex-col relative">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            <div className="max-w-6xl mx-auto w-full p-6 md:p-10 relative z-10 flex-1">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between border-b border-slate-800 pb-8 mb-8 gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                                <BookOpen className="w-8 h-8 text-indigo-400" />
                            </div>
                            <h1 className="text-4xl font-black text-white tracking-tight uppercase">Community Hub</h1>
                        </div>
                        <p className="text-slate-500 font-mono text-sm max-w-xl">
                            The gathering place for engineers. Leave your mark, or submit knowledge to the Codex. 
                            <span className="text-indigo-400"> Only quality survives.</span>
                        </p>
                    </div>
                    
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                        <button 
                            onClick={() => setActiveTab('REVIEWS')}
                            className={`px-6 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'REVIEWS' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            System Feedback
                        </button>
                        <button 
                            onClick={() => setActiveTab('CODEX')}
                            className={`px-6 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'CODEX' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            The Codex
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'REVIEWS' ? (
                        <MotionDiv 
                            key="reviews"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
                        >
                            {/* Input Form */}
                            <div className="lg:col-span-4 space-y-6">
                                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-indigo-500" /> Rate The Hub
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Rating</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <button 
                                                        key={s}
                                                        onClick={() => setRating(s)}
                                                        className={`p-2 rounded-lg transition-all ${rating >= s ? 'text-amber-400 bg-amber-900/10' : 'text-slate-700 bg-slate-800'}`}
                                                    >
                                                        <Star className="w-5 h-5 fill-current" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Identity</label>
                                            <input 
                                                value={reviewerName}
                                                onChange={e => setReviewerName(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
                                                placeholder="Codename or Real Name"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Feedback</label>
                                            <textarea 
                                                value={reviewText}
                                                onChange={e => setReviewText(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-indigo-500 outline-none transition-colors h-32 resize-none"
                                                placeholder="What modules helped? What's missing?"
                                            />
                                        </div>

                                        <button 
                                            onClick={submitReview}
                                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                                        >
                                            <Send className="w-4 h-4" /> Transmit
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews List */}
                            <div className="lg:col-span-8 space-y-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                                        Total Transmissions: {reviews.length}
                                    </div>
                                    <div className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-2">
                                        Avg Rating: {(reviews.reduce((acc, r) => acc + r.rating, 0) / Math.max(1, reviews.length)).toFixed(1)} <Star className="w-3 h-3 fill-current" />
                                    </div>
                                </div>
                                {reviews.map(review => (
                                    <div key={review.id} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-slate-700 transition-all">
                                        <div className="flex justify-between items-start mb-3 relative z-10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                                    <User className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-white">{review.user}</div>
                                                    <div className="text-[10px] text-slate-500 font-mono">{new Date(review.timestamp).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                {Array.from({length: 5}).map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-slate-800'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                                            {review.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </MotionDiv>
                    ) : (
                        <MotionDiv 
                            key="codex"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
                        >
                            {/* Input Form */}
                            <div className="lg:col-span-5 space-y-6">
                                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                                    {/* Judge Overlay */}
                                    <AnimatePresence>
                                        {isJudging && (
                                            <MotionDiv 
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="absolute inset-0 bg-slate-950/90 z-20 flex flex-col items-center justify-center text-center p-8"
                                            >
                                                <ShieldCheck className="w-16 h-16 text-indigo-500 mb-4 animate-pulse" />
                                                <h3 className="text-xl font-black text-white uppercase mb-2">Atlas is Judging</h3>
                                                <p className="text-sm text-indigo-300 font-mono">Analyzing technical merit and value...</p>
                                            </MotionDiv>
                                        )}
                                        {verdict && !verdict.approved && (
                                            <MotionDiv 
                                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                                className="mb-6 bg-red-900/20 border border-red-500/50 p-4 rounded-xl flex items-start gap-3"
                                            >
                                                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="text-sm font-bold text-red-400 uppercase tracking-wider mb-1">Entry Rejected</div>
                                                    <p className="text-xs text-red-200/80">{verdict.reason}</p>
                                                </div>
                                                <button onClick={() => setVerdict(null)} className="ml-auto text-red-400 hover:text-white"><XCircle className="w-4 h-4" /></button>
                                            </MotionDiv>
                                        )}
                                        {verdict && verdict.approved && (
                                            <MotionDiv 
                                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                                className="mb-6 bg-emerald-900/20 border border-emerald-500/50 p-4 rounded-xl flex items-start gap-3"
                                            >
                                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-1">Entry Accepted</div>
                                                    <p className="text-xs text-emerald-200/80">Added to the Permanent Codex.</p>
                                                </div>
                                                <button onClick={() => setVerdict(null)} className="ml-auto text-emerald-400 hover:text-white"><XCircle className="w-4 h-4" /></button>
                                            </MotionDiv>
                                        )}
                                    </AnimatePresence>

                                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <PenTool className="w-4 h-4 text-indigo-500" /> Contribute to Codex
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Topic Title</label>
                                            <input 
                                                value={postTitle}
                                                onChange={e => setPostTitle(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
                                                placeholder="e.g., Optimizing React Renders"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Content (Markdown)</label>
                                            <textarea 
                                                value={postContent}
                                                onChange={e => setPostContent(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-300 font-mono focus:border-indigo-500 outline-none transition-colors h-64 resize-none custom-scrollbar"
                                                placeholder="Share your knowledge. Be technical. Atlas judges quality."
                                            />
                                        </div>

                                        <button 
                                            onClick={submitToCodex}
                                            className="w-full py-3 bg-slate-100 hover:bg-white text-slate-900 font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                                        >
                                            <Flame className="w-4 h-4 text-red-500" /> Ignite (Submit)
                                        </button>
                                        
                                        <p className="text-[10px] text-slate-500 text-center">
                                            Atlas AI will analyze your submission. Only "Worthy" content is saved.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Posts List */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">
                                    <Filter className="w-3 h-3" /> Permanent Records
                                </div>
                                {codexPosts.map(post => (
                                    <div key={post.id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-indigo-500/30 transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{post.title}</h3>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => votePost(post.id)} className="flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-emerald-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                                                    <ThumbsUp className="w-3 h-3" /> {post.votes}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="prose prose-invert prose-sm max-w-none text-slate-400 mb-4 line-clamp-4">
                                            <ReactMarkdown>{post.content}</ReactMarkdown>
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono uppercase tracking-widest pt-4 border-t border-slate-800">
                                            <span className="flex items-center gap-2">
                                                <User className="w-3 h-3" /> {post.author}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Calendar className="w-3 h-3" /> {new Date(post.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </MotionDiv>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};
