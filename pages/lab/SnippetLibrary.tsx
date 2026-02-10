
import React, { useState, useEffect } from 'react';
import { Bookmark, Plus, Trash2, Copy, Search, Code, Check } from 'lucide-react';

interface Snippet {
    id: string;
    title: string;
    lang: string;
    code: string;
    tags: string[];
}

const SnippetLibrary: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newLang, setNewLang] = useState('javascript');
  const [filter, setFilter] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('atlas_snippets');
    if (saved) setSnippets(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('atlas_snippets', JSON.stringify(snippets));
  }, [snippets]);

  const addSnippet = () => {
      if (!newTitle.trim() || !newCode.trim()) return;
      const snippet: Snippet = {
          id: Date.now().toString(),
          title: newTitle,
          lang: newLang,
          code: newCode,
          tags: []
      };
      setSnippets([snippet, ...snippets]);
      setIsAdding(false);
      setNewTitle('');
      setNewCode('');
  };

  const deleteSnippet = (id: string) => {
      setSnippets(snippets.filter(s => s.id !== id));
  };

  const copyToClipboard = (code: string, id: string) => {
      navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSnippets = snippets.filter(s => 
      s.title.toLowerCase().includes(filter.toLowerCase()) || 
      s.lang.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="h-full bg-slate-950 p-6 md:p-10 font-sans text-slate-300 overflow-y-auto custom-scrollbar">
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <Bookmark className="w-8 h-8 text-amber-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Snippet Vault</h1>
                        <p className="text-slate-500 font-mono text-sm">Personal Code Knowledge Base</p>
                    </div>
                </div>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition-all"
                >
                    <Plus className="w-4 h-4" /> New Snippet
                </button>
            </div>

            {isAdding && (
                <div className="mb-8 bg-slate-900 border border-slate-800 rounded-xl p-6 animate-fade-in shadow-xl">
                    <input 
                        type="text" 
                        placeholder="Snippet Title" 
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 mb-4 text-white focus:border-amber-500 outline-none"
                    />
                    <select 
                        value={newLang}
                        onChange={(e) => setNewLang(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 mb-4 text-slate-300 outline-none"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="rust">Rust</option>
                        <option value="go">Go</option>
                        <option value="sql">SQL</option>
                        <option value="bash">Bash</option>
                    </select>
                    <textarea 
                        placeholder="// Paste code here..." 
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                        className="w-full h-48 bg-slate-950 border border-slate-700 rounded-lg p-3 mb-4 font-mono text-sm text-slate-300 focus:border-amber-500 outline-none resize-none"
                    />
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                        <button onClick={addSnippet} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg">Save</button>
                    </div>
                </div>
            )}

            <div className="mb-6 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search snippets..." 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:border-amber-500/50 outline-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSnippets.length === 0 && (
                    <div className="col-span-2 text-center py-12 text-slate-600 font-mono text-sm">
                        NO_DATA_FOUND
                    </div>
                )}
                {filteredSnippets.map((snip) => (
                    <div key={snip.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-all group flex flex-col">
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                            <div className="flex items-center gap-3">
                                <Code className="w-4 h-4 text-amber-500" />
                                <span className="font-bold text-slate-200">{snip.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-slate-500 uppercase border border-slate-800 px-1.5 py-0.5 rounded">{snip.lang}</span>
                                <button onClick={() => deleteSnippet(snip.id)} className="text-slate-600 hover:text-red-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>
                        <div className="p-4 bg-[#0d1117] flex-1 relative group/code">
                            <pre className="font-mono text-xs text-blue-100 overflow-x-auto custom-scrollbar">
                                {snip.code}
                            </pre>
                            <button 
                                onClick={() => copyToClipboard(snip.code, snip.id)}
                                className="absolute top-2 right-2 p-1.5 bg-slate-800 rounded-lg text-slate-400 hover:text-white opacity-0 group-hover/code:opacity-100 transition-opacity"
                            >
                                {copiedId === snip.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default SnippetLibrary;
