import React, { useState } from 'react';
import { useFenceConfig } from '../../hooks/useFenceConfig';
import { fenceTypes } from '../../data/pricing';
import { galleryItems } from '../../data/gallery';
import { ArrowRight, ArrowLeft, Send, CheckCircle2, Zap, Phone, Image as ImageIcon } from 'lucide-react';

const MobileWizard = () => {
  const { config, setParam, loadScenario, estimate, scenarios } = useFenceConfig();
  const [step, setStep] = useState(0); // 0: Scenarios, 1: Type, 2: Dimensions, 3: Result
  const selectedTypeData = fenceTypes.find(t => t.id === config.selectedType) || fenceTypes[0];

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price) + ' ₮';
  };

  const renderStep = () => {
    switch(step) {
      case 0: // Scenarios / Start
        return (
          <div className="space-y-10 py-10 pt-20">
            <div className="space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] block">ODHIITS STUDIO</span>
              <h2 className="text-4xl font-black heading-industrial text-white leading-tight">Хашааны үнийг <br /><span className="text-primary italic">тооцоолох</span></h2>
              <p className="text-slate-500 text-sm font-bold">Та өөрийн төсөлд тохирох сценарийг сонгох эсвэл шинээр эхлэх боломжтой.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {scenarios.map(sc => (
                <button 
                  key={sc.id}
                  onClick={() => { loadScenario(sc.id); nextStep(); }}
                  className="glass-metal p-6 rounded-[2rem] border border-slate-800 text-left flex items-center justify-between group active:scale-[0.98] transition-transform"
                >
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">{sc.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold">{sc.description}</p>
                  </div>
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20">
                     <Zap size={16} />
                  </div>
                </button>
              ))}
              <button 
                onClick={nextStep}
                className="w-full bg-slate-900 border border-slate-800 text-white font-black py-6 rounded-3xl uppercase tracking-widest text-xs flex items-center justify-center gap-4 active:scale-95 transition-transform"
              >
                 Шинээр эхлэх <ArrowRight size={16} />
              </button>
            </div>
          </div>
        );

      case 1: // Type & Quality (Visual Cards)
        return (
          <div className="space-y-12 py-10 pt-20">
            <div className="space-y-6">
               <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-l-2 border-primary pl-4">Хашааны төрөл сонгох</label>
               <div className="grid grid-cols-1 gap-6">
                 {fenceTypes.map(type => (
                   <button
                     key={type.id}
                     onClick={() => setParam('selectedType', type.id)}
                     className={`relative h-48 rounded-[2.5rem] overflow-hidden border-2 transition-all active:scale-[0.98] ${
                       config.selectedType === type.id 
                        ? 'border-primary shadow-2xl shadow-primary/20' 
                        : 'border-slate-800'
                     }`}
                   >
                     <img src={type.image} alt={type.name} className={`w-full h-full object-cover transition-transform duration-1000 ${config.selectedType === type.id ? 'scale-110' : 'opacity-40'}`} />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-8">
                        <div className="flex items-center justify-between">
                           <div className="text-left">
                              <h4 className={`text-lg font-black uppercase tracking-wider ${config.selectedType === type.id ? 'text-primary' : 'text-white'}`}>{type.name}</h4>
                              <p className="text-[9px] font-bold text-slate-400 mt-1">{type.description}</p>
                           </div>
                           {config.selectedType === type.id && (
                             <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-slate-950 shadow-lg">
                                <CheckCircle2 size={18} strokeWidth={3} />
                             </div>
                           )}
                        </div>
                     </div>
                   </button>
                 ))}
               </div>
            </div>

            <div className="space-y-6">
               <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-l-2 border-primary pl-4">Чанарын ангилал</label>
               <div className="grid grid-cols-3 gap-3">
                 {['standard', 'premium', 'industrial'].map(level => (
                   <button
                     key={level}
                     onClick={() => setParam('qualityLevel', level)}
                     className={`p-4 rounded-2xl border text-[9px] font-black uppercase tracking-widest transition-all active:scale-90 ${
                       config.qualityLevel === level 
                        ? 'border-primary bg-primary text-slate-950 shadow-lg' 
                        : 'border-slate-800 bg-slate-900/30 text-slate-500'
                     }`}
                   >
                     {level}
                   </button>
                 ))}
               </div>
            </div>
          </div>
        );

      case 2: // Dimensions & Gates
        return (
          <div className="space-y-12 py-10 pt-20">
            <div className="space-y-4 text-center">
               <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Parameter Set 02</span>
               <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Талбайн <br />хэмжээ оруулна уу</h3>
            </div>

            <div className="space-y-8">
               <div className="flex flex-wrap justify-center gap-3">
                 {['0.5', '0.7', '1.0'].map(val => (
                   <button
                     key={val}
                     onClick={() => {
                       setParam('isCustom', false);
                       setParam('areaValue', val);
                     }}
                     className={`px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all active:scale-95 ${
                       !config.isCustom && config.areaValue === val 
                        ? 'bg-primary text-slate-950 border-primary shadow-lg shadow-primary/20' 
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                     }`}
                   >
                     {val} га
                   </button>
                 ))}
                 <button
                   onClick={() => setParam('isCustom', true)}
                   className={`px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all active:scale-95 ${
                     config.isCustom 
                      ? 'bg-primary text-slate-950 border-primary shadow-lg shadow-primary/20' 
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                   }`}
                 >
                   Бусад
                 </button>
               </div>

               {config.isCustom && (
                 <div className="px-4">
                    <input 
                      type="number"
                      value={config.customLength}
                      onChange={(e) => setParam('customLength', e.target.value)}
                      placeholder="Нийт урт (м)..."
                      className="w-full bg-slate-900 border-2 border-slate-800 rounded-3xl px-8 py-6 text-xl font-black focus:border-primary outline-none transition-all placeholder:text-slate-800 text-center"
                    />
                 </div>
               )}
            </div>

            <div className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800 mx-4">
               <div className="flex items-center justify-between mb-6">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Хаалганы тоо</p>
                  <p className="text-2xl font-black text-white">{config.gateCount}</p>
               </div>
               <div className="flex gap-4">
                  <button onClick={() => setParam('gateCount', Math.max(0, config.gateCount - 1))} className="flex-1 bg-slate-950 border border-slate-800 font-black py-4 rounded-2xl text-xl transition-all active:scale-90">-</button>
                  <button onClick={() => setParam('gateCount', config.gateCount + 1)} className="flex-1 bg-slate-950 border border-slate-800 font-black py-4 rounded-2xl text-xl transition-all active:scale-90">+</button>
               </div>
            </div>
          </div>
        );

      case 3: // Result (Visual Summary)
        return (
          <div className="space-y-10 py-10 pb-40">
            <div className="text-center space-y-4 pt-10">
               <h2 className="text-4xl font-black text-white tracking-widest uppercase">Үр дүн</h2>
            </div>

            {/* Visual Preview Card */}
            <div className="px-4">
               <div className="relative h-56 rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl">
                  <img src={selectedTypeData.image} alt="Result Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-8">
                     <div>
                        <span className="text-[9px] font-black text-primary uppercase tracking-widest mb-1 block">Таны сонголт:</span>
                        <h4 className="text-xl font-black text-white uppercase tracking-wider">{selectedTypeData.name}</h4>
                     </div>
                  </div>
               </div>
            </div>

            <div className="glass-metal p-10 rounded-[3rem] border border-slate-800 relative shadow-2xl overflow-hidden mx-4">
               <div className="space-y-8">
                  <div className="text-center pb-8 border-b border-slate-800/50">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">НИЙТ ТӨЛБӨР</p>
                     <h3 className="text-4xl font-black text-primary tracking-tighter">{formatPrice(estimate.totalPrice)}</h3>
                     <p className="text-[9px] text-slate-600 font-bold mt-4 uppercase tracking-[0.2em] font-mono">ID: ODH-{Math.floor(Math.random() * 90000 + 10000)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                     <div>
                        <p className="text-[10px] font-black text-slate-600 uppercase mb-2">Нийт урт</p>
                        <p className="text-xl font-black text-white italic">{estimate.totalLength} м</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-600 uppercase mb-2">Метрийн үнэ</p>
                        <p className="text-xl font-black text-white italic">{formatPrice(estimate.unitPrice)}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Contact Actions */}
            <div className="px-4 space-y-4">
               <button className="w-full bg-primary text-slate-950 font-black py-6 rounded-3xl uppercase tracking-widest flex items-center justify-center gap-4 text-sm active:scale-95 transition-transform shadow-xl shadow-primary/20">
                  <Send size={18} />
                  Тооцоог илгээх
               </button>
               <a href="tel:88056490" className="w-full bg-slate-900 border border-slate-800 text-white font-black py-6 rounded-3xl uppercase tracking-widest flex items-center justify-center gap-4 text-sm active:scale-95 transition-transform">
                  <Phone size={18} />
                  Зөвлөгөө авах
               </a>
            </div>

            {/* Reference Wall (Horizontal Scroll) */}
            <div className="space-y-6 pt-10">
               <div className="px-6 flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Reference Wall</h4>
                  <span className="text-[9px] text-slate-600 border border-slate-800 px-2 py-1 rounded">Хийгдсэн ажлууд</span>
               </div>
               <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-10">
                  {galleryItems.map(item => (
                    <div key={item.id} className="min-w-[200px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-800 relative group active:scale-95 transition-transform">
                       <img src={item.image} alt={item.label} className="w-full h-full object-cover opacity-60" />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                          <span className="text-[8px] font-black text-primary uppercase tracking-widest mb-1">{item.tag}</span>
                          <h5 className="text-[10px] font-black text-white uppercase tracking-wider">{item.label}</h5>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col overflow-x-hidden relative selection:bg-primary/20">
      <div className="flex-grow">
        {renderStep()}
      </div>

      {/* Navigation Buttons Fixed at bottom */}
      {step > 0 && (
        <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex gap-4 z-50">
          <button 
            onClick={prevStep}
            className="w-20 h-20 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-800 flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <ArrowLeft size={24} />
          </button>
          
          {step < 3 && (
            <button 
              onClick={nextStep}
              className="flex-grow h-20 bg-primary/10 backdrop-blur-md rounded-[2.5rem] border border-primary/20 flex items-center justify-center text-primary font-black uppercase tracking-widest gap-4 active:scale-95 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.1)]"
            >
              Дараах <ArrowRight size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileWizard;
