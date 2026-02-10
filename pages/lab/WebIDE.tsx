
import React, { useState, useEffect } from 'react';
import { Code2, Play, LayoutTemplate, Monitor, Maximize2, Minimize2 } from 'lucide-react';

const WebIDE: React.FC = () => {
    const [html, setHtml] = useState('<h1>Hello Atlas</h1>\n<p>Start coding...</p>');
    const [css, setCss] = useState('body {\n  font-family: sans-serif;\n  color: #fff;\n  background: #111;\n  padding: 2rem;\n}\nh1 { color: #3b82f6; }');
    const [js, setJs] = useState('console.log("System Online");');
    const [srcDoc, setSrcDoc] = useState('');
    const [activeTab, setActiveTab] = useState<'HTML' | 'CSS' | 'JS'>('HTML');
    const [layout, setLayout] = useState<'SPLIT' | 'PREVIEW'>('SPLIT');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                  <head>
                    <style>${css}</style>
                  </head>
                  <body>
                    ${html}
                    <script>${js}</script>
                  </body>
                </html>
            `);
        }, 500); // Debounce updates

        return () => clearTimeout(timeout);
    }, [html, css, js]);

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            {/* Header */}
            <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <Code2 className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-white text-xs uppercase tracking-widest">Web Playground</span>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setLayout(layout === 'SPLIT' ? 'PREVIEW' : 'SPLIT')}
                        className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                        title={layout === 'SPLIT' ? "Maximize Preview" : "Split View"}
                    >
                        {layout === 'SPLIT' ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                
                {/* Editors */}
                <div className={`flex flex-col border-r border-slate-800 transition-all duration-300 ${layout === 'PREVIEW' ? 'w-0 hidden' : 'w-full lg:w-1/2'}`}>
                    {/* Tabs */}
                    <div className="flex border-b border-slate-800 bg-[#0d1117]">
                        {(['HTML', 'CSS', 'JS'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors ${
                                    activeTab === tab 
                                    ? 'border-blue-500 text-blue-400 bg-slate-900' 
                                    : 'border-transparent text-slate-500 hover:bg-slate-900 hover:text-slate-300'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Active Editor */}
                    <div className="flex-1 relative bg-[#0d1117]">
                        {activeTab === 'HTML' && (
                            <textarea
                                value={html}
                                onChange={(e) => setHtml(e.target.value)}
                                className="absolute inset-0 w-full h-full bg-transparent p-4 font-mono text-sm text-blue-100 resize-none outline-none custom-scrollbar"
                                spellCheck={false}
                            />
                        )}
                        {activeTab === 'CSS' && (
                            <textarea
                                value={css}
                                onChange={(e) => setCss(e.target.value)}
                                className="absolute inset-0 w-full h-full bg-transparent p-4 font-mono text-sm text-emerald-100 resize-none outline-none custom-scrollbar"
                                spellCheck={false}
                            />
                        )}
                        {activeTab === 'JS' && (
                            <textarea
                                value={js}
                                onChange={(e) => setJs(e.target.value)}
                                className="absolute inset-0 w-full h-full bg-transparent p-4 font-mono text-sm text-yellow-100 resize-none outline-none custom-scrollbar"
                                spellCheck={false}
                            />
                        )}
                    </div>
                </div>

                {/* Preview */}
                <div className={`flex-1 flex flex-col bg-white transition-all duration-300 ${layout === 'PREVIEW' ? 'w-full' : 'w-full lg:w-1/2'}`}>
                    <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center px-4 justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                            <Monitor className="w-3 h-3" /> Live Preview
                        </span>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                    </div>
                    <iframe
                        srcDoc={srcDoc}
                        title="output"
                        sandbox="allow-scripts"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                        className="flex-1 bg-white"
                    />
                </div>

            </div>
        </div>
    );
};

export default WebIDE;
