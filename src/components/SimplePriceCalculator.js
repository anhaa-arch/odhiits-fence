import React, { useState, useMemo } from 'react';
import { fenceOptions, calculatePrice } from '../data/fenceOptions';
import { Calculator, CheckCircle, Send, Shield, Zap, Map, Ruler, Info } from 'lucide-react';

const SimplePriceCalculator = () => {
  const [config, setConfig] = useState({
    selectedType: fenceOptions[0].id,
    landSize: 'custom',
    customLength: '',
    height: 1.5,
    thickness: 0.8,
    gateCount: 1
  });

  const [hasGate, setHasGate] = useState(true);

  const landSizeOptions = [
    { id: 'custom', name: 'Өөрөөр оруулах', length: '' },
    { id: '0.2', name: '0.2 га газар', length: 180 },
    { id: '0.3', name: '0.3 га газар', length: 220 },
    { id: '0.4', name: '0.4 га газар', length: 250 },
    { id: '0.5', name: '0.5 га газар', length: 280 },
    { id: '0.6', name: '0.6 га газар', length: 310 },
    { id: '0.7', name: '0.7 га газар', length: 340 },
    { id: '1.0', name: '1.0 га газар', length: 400 },
  ];

  const selectedOption = useMemo(() => {
    return fenceOptions.find(t => t.id === config.selectedType) || fenceOptions[0];
  }, [config.selectedType]);

  const handleLandSizeChange = (val) => {
    const option = landSizeOptions.find(o => o.id === val);
    setConfig(prev => ({ 
      ...prev, 
      landSize: val,
      customLength: option ? option.length : prev.customLength
    }));
  };

  const estimate = useMemo(() => {
    const length = parseFloat(config.customLength) || 0;
    const height = parseFloat(config.height) || 1.5;
    const area = length * height;
    
    const totalPrice = calculatePrice(
      selectedOption.pricePerM2,
      selectedOption.baseThickness,
      config.thickness,
      area
    );

    // Threshold changed to 100m as per user request
    const isGateFree = length >= 100;
    const gateUnitPrice = 450000;
    const gateCost = (hasGate && !isGateFree) ? (config.gateCount || 1) * gateUnitPrice : 0;
    
    const finalTotal = totalPrice + gateCost;

    return {
      totalLength: length,
      totalArea: area.toFixed(1),
      sectionCount: Math.ceil(length / 2),
      totalPrice: Math.round(finalTotal),
      unitPrice: Math.round(finalTotal / (length || 1)),
      fencePrice: Math.round(totalPrice),
      gatePrice: gateCost,
      isGateFree
    };
  }, [config, selectedOption, hasGate]);

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
           <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Хашааны үнийг <br /> <span className="text-emerald-700">нарийвчлан тооцоолох</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form Side */}
          <div className="card-light p-8 md:p-12 space-y-10">
            {/* Fence Type */}
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 ml-4">
                  <Shield size={14} className="text-emerald-700" />
                  Хашааны загвар (Багцын сонголт)
               </label>
               <select 
                 value={config.selectedType}
                 onChange={(e) => handleChange('selectedType', e.target.value)}
                 className="input-light h-[64px] appearance-none cursor-pointer"
               >
                 {fenceOptions.map(t => (
                   <option key={t.id} value={t.id}>{t.name}</option>
                 ))}
               </select>
            </div>

            {/* Land Size / Length */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 ml-4">
                    <Map size={14} className="text-emerald-700" />
                    Газрын хэмжээ
                 </label>
                 <select 
                   value={config.landSize}
                   onChange={(e) => handleLandSizeChange(e.target.value)}
                   className="input-light h-[64px]"
                 >
                   {landSizeOptions.map(o => (
                     <option key={o.id} value={o.id}>{o.name}</option>
                   ))}
                 </select>
               </div>

               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 ml-4">
                    <Calculator size={14} className="text-emerald-700" />
                    Нийт урт (метр)
                 </label>
                 <input 
                   type="number"
                   value={config.customLength}
                   onChange={(e) => {
                     const val = e.target.value;
                     handleChange('customLength', val === '' ? '' : parseFloat(val));
                   }}
                   className="input-light h-[64px]"
                   placeholder="Урт..."
                 />
               </div>
            </div>

            {/* Height and Thickness */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 ml-4">
                    <Ruler size={14} className="text-emerald-700" />
                    Өндөр: {config.height}м
                 </label>
                 <input 
                    type="range"
                    min="1.0"
                    max="3.0"
                    step="0.1"
                    value={config.height}
                    onChange={(e) => handleChange('height', parseFloat(e.target.value))}
                    className="w-full accent-emerald-700 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                 />
                 <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest px-1">
                    <span>1.0м</span>
                    <span>3.0м</span>
                 </div>
               </div>

               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 ml-4">
                    <Zap size={14} className="text-emerald-700" />
                    Зузаан: {config.thickness.toFixed(1)}мм
                 </label>
                 <input 
                    type="range"
                    min="0.8"
                    max="1.5"
                    step="0.1"
                    value={config.thickness}
                    onChange={(e) => handleChange('thickness', parseFloat(e.target.value))}
                    className="w-full accent-emerald-700 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                 />
                 <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest px-1">
                    <span>0.8мм</span>
                    <span>1.5мм</span>
                 </div>
               </div>
            </div>

            {/* Gate Section */}
            <div className="space-y-6 pt-4">
               <div className="flex items-center justify-between">
                  <label className="flex items-center gap-4 cursor-pointer group">
                     <input 
                       type="checkbox"
                       checked={hasGate}
                       onChange={(e) => setHasGate(e.target.checked)}
                       className="w-6 h-6 rounded-lg text-emerald-700 border-slate-300 focus:ring-emerald-700"
                     />
                     <span className="text-sm font-black text-slate-900 uppercase tracking-widest group-hover:text-emerald-700 transition-colors">Хаалга нэмэх үү?</span>
                  </label>
                  {estimate.isGateFree && (
                     <span className="bg-emerald-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-emerald-900/20 animate-bounce">
                        БЭЛЭГ (0₮)
                     </span>
                  )}
               </div>

               {hasGate && (
                 <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
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
          <div className="space-y-8 sticky top-24">
            {/* Bagt Specs Info */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl overflow-hidden relative group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
               <div className="relative z-10 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                     <Info size={20} />
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Сонгосон иж бүрдэл</p>
                     <p className="text-white font-bold leading-relaxed">{selectedOption.bagtInfo}</p>
                     <div className="flex flex-wrap gap-2 pt-2">
                        {selectedOption.specs.map(s => (
                           <span key={s} className="bg-slate-800 text-slate-400 text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">{s}</span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-emerald-700 p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-600 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none opacity-50" />
               <div className="relative z-10 space-y-10">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Урьдчилсан нийт үнэ</p>
                     <h3 className="text-5xl md:text-6xl font-black tracking-tighter italic">
                       {formatPrice(estimate.totalPrice)}
                     </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                    <div className="space-y-1">
                       <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Нийт талбай</p>
                       <p className="text-2xl font-black">{estimate.totalArea} <span className="text-xs font-medium uppercase tracking-[0.1em]">м²</span></p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Нийт хэсэг [2м]</p>
                       <p className="text-2xl font-black">{estimate.sectionCount} <span className="text-xs font-medium uppercase tracking-[0.1em]">ш</span></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-6">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-4">
                        <span className="opacity-60">Хашаа (м²-аар)</span>
                        <span>{formatPrice(estimate.fencePrice)}</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-4">
                        <span className="opacity-60">Хаалга</span>
                        <span>{estimate.isGateFree ? 'ҮНЭГҮЙ (Системээс)' : formatPrice(estimate.gatePrice)}</span>
                     </div>
                  </div>

                  <a 
                    href="#contact" 
                    className="w-full bg-white text-emerald-900 font-black py-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 text-sm uppercase tracking-widest shadow-xl hover:shadow-emerald-900/40 active:scale-95"
                  >
                     <Send size={18} />
                     Захиалга өгөх
                  </a>
               </div>
            </div>

            <div className="card-light p-10 space-y-4 bg-white/50 border-dashed border-slate-300">
               <div className="flex gap-4">
                  <CheckCircle size={20} className="text-emerald-700 flex-shrink-0" />
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                     {estimate.isGateFree 
                        ? "🎉 100м-ээс дээш хашаа захиалж байгаа тул гүйдэг хаалга бэлэг болгон дагалдаж байна." 
                        : "Таны захиалга бэлэн болмогц манай инженерүүд очиж баталгаажуулна."}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimplePriceCalculator;
