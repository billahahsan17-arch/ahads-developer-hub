
import React, { useState } from 'react';
import { Globe, Send, Code, Plus, Trash2, Copy, Check } from 'lucide-react';
import CodeBlock from '../../components/CodeBlock';

interface HeaderItem {
    id: string;
    key: string;
    value: string;
}

const HTTPInspector: React.FC = () => {
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('https://api.example.com/v1/users');
    const [headers, setHeaders] = useState<HeaderItem[]>([
        { id: '1', key: 'Authorization', value: 'Bearer <token>' },
        { id: '2', key: 'Content-Type', value: 'application/json' },
    ]);
    const [body, setBody] = useState('{\n  "query": "atlas",\n  "limit": 10\n}');
    const [activeTab, setActiveTab] = useState<'curl' | 'js' | 'python' | 'go'>('curl');

    const addHeader = () => {
        setHeaders([...headers, { id: Date.now().toString(), key: '', value: '' }]);
    };

    const removeHeader = (id: string) => {
        setHeaders(headers.filter(h => h.id !== id));
    };

    const updateHeader = (id: string, field: 'key' | 'value', val: string) => {
        setHeaders(headers.map(h => h.id === id ? { ...h, [field]: val } : h));
    };

    const generateCode = () => {
        const headerStrings = headers
            .filter(h => h.key && h.value)
            .map(h => ({ k: h.key, v: h.value }));

        switch (activeTab) {
            case 'curl':
                let curl = `curl -X ${method} "${url}" \\\n`;
                headerStrings.forEach(h => curl += `     -H "${h.k}: ${h.v}" \\\n`);
                if (method !== 'GET' && method !== 'DELETE') {
                    curl += `     -d '${body.replace(/\n/g, '')}'`;
                }
                return curl;

            case 'js':
                return `fetch("${url}", {
  method: "${method}",
  headers: {
${headerStrings.map(h => `    "${h.k}": "${h.v}"`).join(',\n')}
  }${method !== 'GET' ? `,\n  body: JSON.stringify(${body})` : ''}
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`;

            case 'python':
                return `import requests

url = "${url}"
headers = {
${headerStrings.map(h => `    "${h.k}": "${h.v}"`).join(',\n')}
}
${method !== 'GET' ? `payload = ${body}` : ''}

response = requests.${method.toLowerCase()}(url, headers=headers${method !== 'GET' ? ', json=payload' : ''})

print(response.status_code)
print(response.json())`;

            case 'go':
                return `package main

import (
	"fmt"
	"net/http"
    ${method !== 'GET' ? '"strings"' : ''}
	"io/ioutil"
)

func main() {
	url := "${url}"
	method := "${method}"
    ${method !== 'GET' ? `\n	payload := strings.NewReader(\`${body}\`)` : ''}

	client := &http.Client{}
	req, err := http.NewRequest(method, url, ${method !== 'GET' ? 'payload' : 'nil'})

	if err != nil {
		fmt.Println(err)
		return
	}
${headerStrings.map(h => `	req.Header.Add("${h.k}", "${h.v}")`).join('\n')}

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(body))
}`;
            default: return '';
        }
    };

    return (
        <div className="h-full bg-slate-950 p-6 md:p-10 font-sans text-slate-300 overflow-y-auto custom-scrollbar">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-sky-900/20 rounded-xl border border-sky-500/30">
                            <Globe className="w-8 h-8 text-sky-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">HTTP Inspector</h1>
                            <p className="text-slate-500 font-mono text-sm">Request Builder & Protocol Lab</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left: Request Builder */}
                    <div className="lg:col-span-7 space-y-6">
                        
                        {/* URL Bar */}
                        <div className="flex gap-0 rounded-lg shadow-lg overflow-hidden">
                            <select 
                                value={method} 
                                onChange={e => setMethod(e.target.value)}
                                className="bg-slate-800 text-white font-bold text-sm px-4 py-3 border-r border-slate-700 outline-none hover:bg-slate-700 transition-colors"
                            >
                                <option>GET</option>
                                <option>POST</option>
                                <option>PUT</option>
                                <option>PATCH</option>
                                <option>DELETE</option>
                            </select>
                            <input 
                                type="text" 
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                className="flex-1 bg-slate-900 text-white px-4 font-mono text-sm outline-none placeholder-slate-600"
                                placeholder="https://api.example.com/..."
                            />
                        </div>

                        {/* Headers */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Headers</h3>
                                <button onClick={addHeader} className="text-xs text-sky-400 hover:text-white flex items-center gap-1">
                                    <Plus className="w-3 h-3" /> Add
                                </button>
                            </div>
                            <div className="space-y-2">
                                {headers.map(h => (
                                    <div key={h.id} className="flex gap-2">
                                        <input 
                                            placeholder="Key"
                                            value={h.key}
                                            onChange={e => updateHeader(h.id, 'key', e.target.value)}
                                            className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-white outline-none focus:border-sky-500/50"
                                        />
                                        <input 
                                            placeholder="Value"
                                            value={h.value}
                                            onChange={e => updateHeader(h.id, 'value', e.target.value)}
                                            className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-sky-200 outline-none focus:border-sky-500/50"
                                        />
                                        <button onClick={() => removeHeader(h.id)} className="p-2 text-slate-600 hover:text-red-400 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Body (Conditional) */}
                        {method !== 'GET' && method !== 'DELETE' && (
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-64">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Request Body (JSON)</h3>
                                <textarea 
                                    value={body}
                                    onChange={e => setBody(e.target.value)}
                                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 resize-none outline-none focus:border-sky-500/50 custom-scrollbar"
                                />
                            </div>
                        )}
                    </div>

                    {/* Right: Code Generation */}
                    <div className="lg:col-span-5 flex flex-col h-full min-h-[500px]">
                        <div className="bg-slate-900 border border-slate-800 rounded-xl flex-1 flex flex-col overflow-hidden shadow-2xl">
                            <div className="flex border-b border-slate-800">
                                {['curl', 'js', 'python', 'go'].map(lang => (
                                    <button
                                        key={lang}
                                        onClick={() => setActiveTab(lang as any)}
                                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                                            activeTab === lang 
                                            ? 'bg-sky-600/10 text-sky-400 border-b-2 border-sky-500' 
                                            : 'text-slate-500 hover:text-white hover:bg-slate-800'
                                        }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="flex-1 p-4 bg-[#0d1117] overflow-y-auto custom-scrollbar relative">
                                <CodeBlock className={`language-${activeTab === 'curl' ? 'bash' : activeTab === 'js' ? 'javascript' : activeTab}`}>
                                    {generateCode()}
                                </CodeBlock>
                            </div>
                        </div>

                        {/* Status Code Cheat Sheet */}
                        <div className="mt-6 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Common Status Codes</h3>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="flex items-center gap-2"><span className="font-mono font-bold text-emerald-400">200</span> OK</div>
                                <div className="flex items-center gap-2"><span className="font-mono font-bold text-emerald-400">201</span> Created</div>
                                <div className="flex items-center gap-2"><span className="font-mono font-bold text-amber-400">400</span> Bad Request</div>
                                <div className="flex items-center gap-2"><span className="font-mono font-bold text-amber-400">401</span> Unauthorized</div>
                                <div className="flex items-center gap-2"><span className="font-mono font-bold text-amber-400">403</span> Forbidden</div>
                                <div className="flex items-center gap-2"><span className="font-mono font-bold text-red-400">404</span> Not Found</div>
                                <div className="flex items-center gap-2"><span className="font-mono font-bold text-red-400">500</span> Server Error</div>
                                <div className="flex items-center gap-2"><span className="font-mono font-bold text-red-400">503</span> Unavailable</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HTTPInspector;
