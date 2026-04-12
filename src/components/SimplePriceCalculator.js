import React, { useState, useMemo } from 'react';
import { calculateEstimate } from '../logic/EstimateEngine';
import { fenceTypes } from '../data/pricing';
import { Calculator, CheckCircle, Info, Send, Shield } from 'lucide-react';

const SimplePriceCalculator = () => {
  const [config, setConfig] = useState({
    selectedType: fenceTypes[0].id,
    isCustom: true,
    customLength: 50,
    gateCount: 0,
    qualityLevel: 'standard',
    height: '1.8м'
  });

  const [hasGate, setHasGate] = useState(false);

  const estimate = useMemo(() => {
    // Only count gates if checkbox is checked
    const adjustedConfig = {
      ...config,
      gateCount: hasGate ? (config.gateCount || 1) : 0
    };
    return calculateEstimate(adjustedConfig);
  }, [config, hasGate]);

  const handleChange = (param, value) => {
    setConfig(prev => ({ ...prev, [param]: value }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price) + ' ₮';
  };

  return (
    <section id="calculator" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container-custom px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
           <span className="text-emerald-700 font-black uppercase tracking-[0.4em] text-[10px] block">Төсөв бодох</span>
           <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Хашааны үнийг <br /> <span className="text-emerald-700">ойролцоогоор тооцоолох</span></h2>
           <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto italic">Энэхүү тооцоолол нь урьдчилсан бөгөөд газар дээрх үзлэгээр нарийвчилна.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form Side */}
          <div className="card-light p-8 md:p-12 space-y-10">
            {/* Fence Type */}
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 ml-4">
                  <Shield size={14} className="text-emerald-700" />
                  Хашааны төрөл
               </label>
               <select 
                 value={config.selectedType}
                 onChange={(e) => handleChange('selectedType', e.target.value)}
                 className="input-light h-[64px] appearance-none cursor-pointer"
               >
                 {fenceTypes.map(t => (
                   <option key={t.id} value={t.id}>{t.name}</option>
                 ))}
               </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Length */}
               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 ml-4">
                    <Calculator size={14} className="text-emerald-700" />
                    Нийт урт (метр)
                 </label>
                 <input 
                   type="number"
                   value={config.customLength}
                   onChange={(e) => handleChange('customLength', e.target.value)}
                   className="input-light h-[64px]"
                   placeholder="Урт..."
                 />
               </div>

               {/* Height */}
               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 ml-4">
                    <Info size={14} className="text-emerald-700" />
                    Өндөр
                 </label>
                 <select 
                   value={config.height}
                   onChange={(e) => handleChange('height', e.target.value)}
                   className="input-light h-[64px]"
                 >
                   {['1.6м', '1.8м', '2.0м'].map(h => (
                     <option key={h} value={h}>{h}</option>
                   ))}
                 </select>
               </div>
            </div>

            {/* Gate Checkbox */}
            <div className="space-y-6 pt-4">
               <label className="flex items-center gap-4 cursor-pointer group">
                  <input 
                    type="checkbox"
                    checked={hasGate}
                    onChange={(e) => setHasGate(e.target.checked)}
                    className="w-6 h-6 rounded-lg text-emerald-700 border-slate-300 focus:ring-emerald-700"
                  />
                  <span className="text-sm font-black text-slate-900 uppercase tracking-widest group-hover:text-emerald-700 transition-colors">Хаалга нэмэх үү?</span>
               </label>

               {hasGate && (
                 <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-top-4">
                    <div className="flex items-center justify-between mb-6">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Хаалганы тоо</p>
                       <p className="text-2xl font-black text-emerald-700">{config.gateCount || 1}</p>
                    </div>
                    <div className="flex gap-4">
                       <button onClick={() => handleChange('gateCount', Math.max(1, (config.gateCount || 1) - 1))} className="flex-1 bg-white border border-slate-200 font-black py-4 rounded-xl text-xl hover:bg-slate-100 transition-all">-</button>
                       <button onClick={() => handleChange('gateCount', (config.gateCount || 1) + 1)} className="flex-1 bg-white border border-slate-200 font-black py-4 rounded-xl text-xl hover:bg-slate-100 transition-all">+</button>
                    </div>
                 </div>
               )}
            </div>
          </div>

          {/* Result Side */}
          <div className="space-y-8">
            <div className="bg-emerald-700 p-12 md:p-16 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
               {/* Background detail */}
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-600 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none opacity-50" />
               <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-800 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none opacity-50" />
               
               <div className="relative z-10 space-y-10">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Урьдчилсан нийт үнэ</p>
                     <h3 className="text-5xl md:text-6xl font-black tracking-tighter italic">
                       {formatPrice(estimate.totalPrice)}
                     </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-2">Нийт урт</p>
                       <p className="text-2xl font-black">{estimate.totalLength} <span className="text-xs font-medium">м</span></p>
                    </div>
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-2">1м дундаж үнэ</p>
                       <p className="text-2xl font-black">{formatPrice(estimate.unitPrice)}</p>
                    </div>
                  </div>

                  <button className="w-full bg-white text-emerald-950 font-black py-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 text-sm uppercase tracking-widest shadow-xl hover:shadow-emerald-900/40 active:scale-95">
                     <Send size={18} />
                     Үнийн санал авах
                  </button>
               </div>
            </div>

            <div className="card-light p-10 space-y-6 bg-white/50 border-dashed border-slate-300">
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 flex-shrink-0">
                     <CheckCircle size={24} />
                  </div>
                  <div>
                     <h5 className="text-xs font-black text-slate-800 mb-2 uppercase">Мэргэжлийн хэмжилт</h5>
                     <p className="text-[11px] text-slate-500 font-medium leading-relaxed leading-relaxed">ODHIITS-ийн инженерүүд газар дээр нь очиж нарийн хэмжилт хийж, эцсийн үнийн саналыг баталгаажуулна.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimplePriceCalculator;
