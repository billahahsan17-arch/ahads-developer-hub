
import React, { useState } from 'react';
import { Eye, CheckCircle, XCircle } from 'lucide-react';

const ContrastChecker: React.FC = () => {
    const [color1, setColor1] = useState('#FFFFFF');
    const [color2, setColor2] = useState('#3B82F6');

    // Hex to RGB
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Luminance
    const lum = (r: number, g: number, b: number) => {
        const a = [r, g, b].map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    // Contrast Ratio
    const getRatio = () => {
        const c1 = hexToRgb(color1);
        const c2 = hexToRgb(color2);
        if (!c1 || !c2) return 0;
        const l1 = lum(c1.r, c1.g, c1.b);
        const l2 = lum(c2.r, c2.g, c2.b);
        const bright = Math.max(l1, l2);
        const dark = Math.min(l1, l2);
        return (bright + 0.05) / (dark + 0.05);
    }

    const ratio = getRatio();
    const ratioStr = ratio.toFixed(2);

    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                        <Eye className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white tracking-tight uppercase text-sm">Contrast Checker</h1>
                        <p className="text-[10px] font-mono text-slate-500">WCAG Accessibility Tool</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row">
                {/* Foreground */}
                <div className="flex-1 flex items-center justify-center relative transition-colors duration-300" style={{ backgroundColor: color1 }}>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <h1 style={{ color: color2 }} className="text-6xl font-black opacity-50">TEXT</h1>
                    </div>
                    <div className="bg-black/50 backdrop-blur-md p-6 rounded-xl border border-white/10 z-10 text-center">
                        <label className="text-white text-xs font-bold uppercase tracking-widest block mb-2">Background</label>
                        <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-20 h-10 cursor-pointer" />
                        <div className="text-white font-mono mt-2">{color1}</div>
                    </div>
                </div>

                {/* Background */}
                <div className="flex-1 flex items-center justify-center relative transition-colors duration-300" style={{ backgroundColor: color2 }}>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <h1 style={{ color: color1 }} className="text-6xl font-black opacity-50">TEXT</h1>
                    </div>
                    <div className="bg-black/50 backdrop-blur-md p-6 rounded-xl border border-white/10 z-10 text-center">
                        <label className="text-white text-xs font-bold uppercase tracking-widest block mb-2">Text Color</label>
                        <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-20 h-10 cursor-pointer" />
                        <div className="text-white font-mono mt-2">{color2}</div>
                    </div>
                </div>
            </div>

            {/* Score Bar */}
            <div className="h-24 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-12 px-8">
                <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Ratio</div>
                    <div className="text-4xl font-black text-white">{ratioStr}</div>
                </div>
                
                <ScoreCard label="AA Large" pass={ratio >= 3} />
                <ScoreCard label="AA Normal" pass={ratio >= 4.5} />
                <ScoreCard label="AAA Large" pass={ratio >= 4.5} />
                <ScoreCard label="AAA Normal" pass={ratio >= 7} />
            </div>
        </div>
    );
};

const ScoreCard = ({ label, pass }: { label: string, pass: boolean }) => (
    <div className={`flex flex-col items-center gap-1 ${pass ? 'text-emerald-500' : 'text-red-500 opacity-50'}`}>
        {pass ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
        <span className="text-[10px] font-bold uppercase">{label}</span>
    </div>
);

export default ContrastChecker;
