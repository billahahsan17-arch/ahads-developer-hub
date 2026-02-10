import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
  const [copied, setCopied] = useState(false);
  
  // Extract language from className (e.g., "language-rust")
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'terminal';

  const handleCopy = () => {
    if (typeof children === 'string') {
      navigator.clipboard.writeText(children);
    } else if (Array.isArray(children)) {
      navigator.clipboard.writeText(children.join(''));
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Language color mapping for the badge
  const getLangColor = (lang: string) => {
      switch(lang) {
          case 'rust': return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
          case 'go': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
          case 'python': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
          case 'typescript': return 'text-blue-300 border-blue-400/30 bg-blue-400/10';
          case 'javascript': return 'text-yellow-300 border-yellow-400/30 bg-yellow-400/10';
          case 'cpp': return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
          default: return 'text-slate-400 border-slate-500/30 bg-slate-500/10';
      }
  };

  const badgeClass = getLangColor(language);

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-slate-700 bg-[#0d1117] shadow-2xl group relative font-mono text-sm">
      {/* Window Chrome */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700 backdrop-blur-sm">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-sm" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-sm" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-sm" />
        </div>
        
        <div className={`text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider font-bold flex items-center gap-1.5 ${badgeClass}`}>
            {language === 'terminal' && <Terminal className="w-3 h-3" />}
            {language}
        </div>

        <button 
            onClick={handleCopy}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Copy Code"
        >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="!bg-transparent !m-0 !p-0 font-mono text-blue-100/90 leading-relaxed whitespace-pre">
           {children}
        </pre>
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-lg pointer-events-none transition-colors duration-500"></div>
    </div>
  );
};

export default CodeBlock;