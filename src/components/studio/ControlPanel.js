import React from 'react';
import { fenceTypes } from '../../data/pricing';
import { Settings, Ruler, DoorClosed, Shield, Layers, ChevronRight, CheckCircle2 } from 'lucide-react';

const ControlPanel = ({ config, setParam }) => {
  return (
    <aside className="w-[380px] bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col h-full overflow-hidden">
      <div className="p-8 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings className="text-primary" size={20} />
          </div>
          <h2 className="text-xl font-black heading-industrial text-white">Студи тохиргоо</h2>
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">Parameter Control Grid</p>
      </div>

      <div className="flex-grow overflow-y-auto no-scrollbar p-8 space-y-10 pb-24">
        {/* Step 1: Fence Type */}
        <div className="space-y-6">
          <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
             <Layers size={14} className="text-primary" />
             Хашааны төрөл
          </label>
          <div className="grid grid-cols-3 gap-3">
             {fenceTypes.map(type => (
               <button
                 key={type.id}
                 onClick={() => setParam('selectedType', type.id)}
                 className={`group relative rounded-3xl border overflow-hidden transition-all duration-500 ${
                   config.selectedType === type.id 
                    ? 'border-primary shadow-[0_0_20px_rgba(34,211,238,0.15)]' 
                    : 'border-slate-800 hover:border-slate-700'
                 }`}
               >
                 <div className="aspect-[16/7] w-full relative overflow-hidden">
                    <img 
                      src={type.image} 
                      alt={type.name} 
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                        config.selectedType === type.id ? 'opacity-100 scale-105' : 'opacity-40'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {config.selectedType === type.id && (
                       <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-slate-950 shadow-lg animate-in zoom-in">
                          <CheckCircle2 size={14} strokeWidth={3} />
                       </div>
                    )}
                 </div>
                 
                 <div className="p-4 bg-slate-900/80 backdrop-blur-md relative z-10">
                    <h4 className={`text-xs font-black uppercase tracking-wider transition-colors ${
                      config.selectedType === type.id ? 'text-primary' : 'text-slate-100'
                    }`}>
                       {type.name}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-500 leading-tight mt-1 line-clamp-1">{type.description}</p>
                 </div>
               </button>
             ))}
          </div>
        </div>

        {/* Step 2: Dimensions */}
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
             <Ruler size={14} className="text-primary" />
             Талбайн хэмжээ
          </label>
          <div className="flex flex-wrap gap-2">
             {['0.5', '0.7', '1.0'].map(val => (
               <button
                 key={val}
                 onClick={() => {
                   setParam('isCustom', false);
                   setParam('areaValue', val);
                 }}
                 className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                   !config.isCustom && config.areaValue === val 
                    ? 'bg-primary text-slate-950 border-primary shadow-lg shadow-primary/20' 
                    : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-700'
                 }`}
               >
                 {val} га
               </button>
             ))}
             <button
               onClick={() => setParam('isCustom', true)}
               className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                 config.isCustom 
                  ? 'bg-primary text-slate-950 border-primary shadow-lg shadow-primary/20' 
                  : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-700'
               }`}
             >
               Бусад
             </button>
          </div>
          
          {config.isCustom && (
            <input 
              type="number"
              value={config.customLength}
              onChange={(e) => setParam('customLength', e.target.value)}
              placeholder="Уртаа (метр) оруулна уу"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-5 text-sm font-bold focus:border-primary outline-none transition-all placeholder:text-slate-800"
            />
          )}
        </div>

        {/* Step 3: Gates */}
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
             <DoorClosed size={14} className="text-primary" />
             Хаалганы тоо
          </label>
          <div className="flex items-center gap-6 p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
             <div className="flex-grow">
                <p className="text-[10px] font-black text-slate-500 uppercase">Ширхэг</p>
                <p className="text-xl font-black text-white">{config.gateCount}</p>
             </div>
             <div className="flex gap-2">
                <button onClick={() => setParam('gateCount', Math.max(0, config.gateCount - 1))} className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white hover:border-primary transition-all active:scale-90">-</button>
                <button onClick={() => setParam('gateCount', config.gateCount + 1)} className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white hover:border-primary transition-all active:scale-90">+</button>
             </div>
          </div>
        </div>

        {/* Step 4: Quality */}
        <div className="space-y-4">
          <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
             <Shield size={14} className="text-primary" />
             Чанарын ангилал
          </label>
          <div className="grid grid-cols-3 gap-2">
             {['standard', 'premium', 'industrial'].map(level => (
               <button
                 key={level}
                 onClick={() => setParam('qualityLevel', level)}
                 className={`py-4 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all ${
                   config.qualityLevel === level 
                    ? 'border-primary bg-primary text-slate-950 shadow-lg shadow-primary/20 scale-[1.05]' 
                    : 'border-slate-800 bg-slate-950/50 text-slate-500 hover:border-slate-700'
                 }`}
               >
                 {level}
               </button>
             ))}
          </div>
        </div>

        {/* Lab Info Card with Before/After */}
        <div className="pt-10">
           <div className="p-8 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-6">
                 <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">ODHIITS Lab</h4>
                 <Settings size={16} className="text-slate-600 animate-spin-slow" />
              </div>
              
              {/* Before/After Comparison Visual */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                 <div className="space-y-2">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1 h-1 bg-red-500 rounded-full" /> Өмнө нь: Энгийн хашаа
                    </p>
                    <div className="h-20 rounded-2xl overflow-hidden border border-slate-800 grayscale">
                       <img src="/images/lab/before.jpg" alt="Before" className="w-full h-full object-cover opacity-30" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <p className="text-[8px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1 h-1 bg-primary rounded-full animate-pulse" /> Одоо: ODHIITS систем
                    </p>
                    <div className="h-20 rounded-2xl overflow-hidden border border-primary/30">
                       <img src="/images/lab/after.jpg" alt="After" className="w-full h-full object-cover" />
                    </div>
                 </div>
              </div>

              <p className="text-[10px] text-slate-400 font-bold leading-relaxed mb-6">Бид 10+ жилийн туршлага дээрээ үндэслэн чанарын маш том ялгааг амлаж байна.</p>
              <button className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest hover:text-primary transition-all">
                 Бусад жишээ <ChevronRight size={14} />
              </button>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default ControlPanel;
