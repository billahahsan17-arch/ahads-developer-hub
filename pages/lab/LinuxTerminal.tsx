
import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const LinuxTerminal: React.FC = () => {
    const [history, setHistory] = useState<string[]>(['Welcome to Atlas Linux v4.0', 'Type "help" for commands.']);
    const [input, setInput] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const cmd = input.trim();
            const args = cmd.split(' ');
            let output = '';

            switch (args[0]) {
                case 'help':
                    output = 'Available: help, clear, echo, ls, pwd, whoami, date, uname';
                    break;
                case 'clear':
                    setHistory([]);
                    setInput('');
                    return;
                case 'ls':
                    output = 'bin  etc  home  opt  tmp  var  usr  atlas_core.sys';
                    break;
                case 'pwd':
                    output = '/home/engineer';
                    break;
                case 'whoami':
                    output = 'root';
                    break;
                case 'date':
                    output = new Date().toString();
                    break;
                case 'uname':
                    output = 'Linux atlas-kernel 5.15.0-generic #42-Ubuntu SMP';
                    break;
                case 'echo':
                    output = args.slice(1).join(' ');
                    break;
                case '':
                    break;
                default:
                    output = `bash: ${args[0]}: command not found`;
            }

            setHistory([...history, `root@atlas:~$ ${cmd}`, output].filter(Boolean));
            setInput('');
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#0d1117] font-mono text-sm text-green-400 p-4">
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap">{line}</div>
                ))}
                <div ref={endRef} />
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800">
                <span className="text-blue-400">root@atlas:~$</span>
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="flex-1 bg-transparent border-none outline-none text-green-400"
                    autoFocus
                />
            </div>
        </div>
    );
};

export default LinuxTerminal;
