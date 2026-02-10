
import React, { useState } from 'react';
import { Layout, CheckCircle } from 'lucide-react';

const FlexDrill: React.FC = () => {
    const [justify, setJustify] = useState('flex-start');
    const [align, setAlign] = useState('stretch');
    
    return (
        <div className="h-full flex flex-col bg-slate-950 font-sans text-slate-300">
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center px-6">
                <Layout className="w-5 h-5 text-blue-500 mr-3" />
                <h1 className="font-bold text-white uppercase text-sm">Flexbox Gym</h1>
            </div>
            
            <div className="flex-1 flex flex-col p-8 gap-8">
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden flex p-4"
                     style={{ display: 'flex', justifyContent: justify, alignItems: align }}>
                    <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">1</div>
                    <div className="w-16 h-24 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold mx-2">2</div>
                    <div className="w-16 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">3</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex gap-8">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">justify-content</label>
                        <select className="bg-slate-800 text-white rounded p-2 text-sm" value={justify} onChange={e => setJustify(e.target.value)}>
                            <option value="flex-start">flex-start</option>
                            <option value="center">center</option>
                            <option value="flex-end">flex-end</option>
                            <option value="space-between">space-between</option>
                            <option value="space-around">space-around</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">align-items</label>
                        <select className="bg-slate-800 text-white rounded p-2 text-sm" value={align} onChange={e => setAlign(e.target.value)}>
                            <option value="stretch">stretch</option>
                            <option value="flex-start">flex-start</option>
                            <option value="center">center</option>
                            <option value="flex-end">flex-end</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FlexDrill;
