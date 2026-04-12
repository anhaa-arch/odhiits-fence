import React, { useState, useEffect } from 'react';
import { fenceTypes, pricingConfig } from '../data/pricing';
import { Calculator, Ruler, Map, Check, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const FencePriceCalculator = () => {
  const [area, setArea] = useState('0.5');
  const [customLength, setCustomLength] = useState('');
  const [selectedType, setSelectedType] = useState(fenceTypes[0].id);
  const [hasGate, setHasGate] = useState(false);
  const [gateCount, setGateCount] = useState(1);
  const [calculatedLength, setCalculatedLength] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCustom, setIsCustom] = useState(false);
  
  // Mobile Stepper State
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  useEffect(() => {
    let length = 0;
    if (isCustom) {
      length = parseFloat(customLength) || 0;
    } else {
      const areaInSqm = parseFloat(area) * 10000;
      length = Math.sqrt(areaInSqm) * 4;
    }
    setCalculatedLength(Math.round(length));

    const fenceType = fenceTypes.find(t => t.id === selectedType);
    const materialCost = length * fenceType.pricePerMeter;
    const itemsCost = 4 * pricingConfig.cornerPostExtra;
    const gateCost = hasGate ? gateCount * pricingConfig.gateBasePrice : 0;
    const subtotal = materialCost + itemsCost + gateCost;
    const laborCost = subtotal * pricingConfig.laborPercent;
    
    setTotalPrice(Math.round(subtotal + laborCost));
  }, [area, customLength, selectedType, hasGate, gateCount, isCustom]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price) + ' ₮';
  };

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const renderMobileStepper = () => (
    <div className="lg:hidden space-y-8">
      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 flex-grow rounded-full transition-all duration-500 ${
              step > i ? 'bg-primary' : 'bg-slate-800'
            }`} 
          />
        ))}
        <span className="text-[10px] font-black text-slate-500 ml-2 uppercase tracking-widest">{step}/{totalSteps}</span>
      </div>

      <div className="min-h-[300px] animate-in fade-in slide-in-from-right-4 duration-300">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">1</span>
              Хашааны төрөл сонгох
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {fenceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type.id);
                    setTimeout(nextStep, 300);
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all flex items-center justify-between text-left group ${
                    selectedType === type.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-slate-800 bg-slate-900/50'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className={`font-black uppercase tracking-wider text-sm ${selectedType === type.id ? 'text-primary' : 'text-slate-300'}`}>
                      {type.name}
                    </span>
                    <span className="text-xs text-slate-500 mt-1">{type.pricePerMeter.toLocaleString()} ₮/м</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedType === type.id ? 'border-primary bg-primary text-slate-950' : 'border-slate-700'
                  }`}>
                    {selectedType === type.id && <Check size={14} strokeWidth={4} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">2</span>
              Талбайн хэмжээ
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {['0.5', '0.7', '1.0'].map(val => (
                  <button
                    key={val}
                    onClick={() => {
                      setIsCustom(false);
                      setArea(val);
                    }}
                    className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${
                      !isCustom && area === val ? 'bg-primary/10 border-primary text-primary' : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    <span className="font-bold">{val} га</span>
                    <span className="text-xs opacity-60">~{Math.sqrt(parseFloat(val) * 10000) * 4}м</span>
                  </button>
                ))}
                <button
                  onClick={() => setIsCustom(true)}
                  className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${
                    isCustom ? 'bg-primary/10 border-primary text-primary' : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  <span className="font-bold">Гараар оруулах</span>
                  <Ruler size={18} />
                </button>
              </div>

              {isCustom && (
                <div className="pt-4 animate-in zoom-in-95 duration-200">
                  <input 
                    type="number"
                    value={customLength}
                    onChange={(e) => setCustomLength(e.target.value)}
                    placeholder="Нийт уртыг (м) оруулна уу"
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">3</span>
              Нэмэлт сонголт
            </h3>
            <div className="glass-metal p-6 rounded-2xl border border-slate-800">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-bold text-slate-200 text-lg">Хаалга оруулах уу?</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only"
                    checked={hasGate}
                    onChange={(e) => setHasGate(e.target.checked)}
                  />
                  <div className={`block w-14 h-8 rounded-full transition-colors ${hasGate ? 'bg-primary' : 'bg-slate-800'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${hasGate ? 'translate-x-6' : ''}`}></div>
                </div>
              </label>
              
              {hasGate && (
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Тоо ширхэг</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setGateCount(Math.max(1, gateCount - 1))} className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center">-</button>
                    <span className="text-xl font-black">{gateCount}</span>
                    <button onClick={() => setGateCount(gateCount + 1)} className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center">+</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 text-center">
             <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator className="text-primary" size={40} />
             </div>
             <h3 className="text-2xl font-black text-white">Урьдчилсан үнэ</h3>
             <div className="p-8 rounded-[2rem] bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl">
                <p className="text-slate-500 font-black uppercase tracking-widest text-xs mb-2">Нийт дүн</p>
                <div className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tighter">
                  {formatPrice(totalPrice)}
                </div>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800/50">
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 uppercase font-black">Урт</p>
                    <p className="font-bold text-slate-200">{calculatedLength} м</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase font-black">Төрөл</p>
                    <p className="font-bold text-slate-200">{fenceTypes.find(t => t.id === selectedType).name.split(' ')[0]}</p>
                  </div>
                </div>
             </div>
             <button className="w-full bg-primary text-slate-950 font-black py-5 rounded-2xl shadow-xl shadow-primary/20 mt-6 active:scale-95 transition-transform">
                Үнийн санал авах
             </button>
          </div>
        )}
      </div>

      {step < 4 && (
        <div className="flex gap-4 pt-6 border-t border-slate-900 sticky bottom-20 bg-slate-950/80 backdrop-blur-md pb-4">
          {step > 1 && (
            <button 
              onClick={prevStep}
              className="flex-1 bg-slate-900 text-white font-bold py-5 px-6 rounded-2xl border border-slate-800 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Буцах
            </button>
          )}
          <button 
            onClick={nextStep}
            className="flex-[2] bg-primary text-slate-950 font-black py-5 px-8 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/10"
          >
            Дараах <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <section id="pricing-calc" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -ml-48 -mb-48" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 px-4">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">ОДХИЙЦ ТООЦООЛУУР</span>
          <h2 className="text-4xl md:text-6xl font-black heading-industrial mb-6 text-white leading-tight">
            Хашааны <span className="text-primary text-glow-primary">үнэ</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Талбайн хэмжээ болон хашааны төрлөө сонгоод урьдчилсан үнийн саналаа шууд аваарай.
          </p>
        </div>

        {renderMobileStepper()}

        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Inputs Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-metal p-10 rounded-[2.5rem] neon-border border border-slate-800 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Area Input */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    <Map size={16} className="text-primary" />
                    Талбайн хэмжээ (га)
                  </label>
                  <select 
                    value={isCustom ? 'custom' : area}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setIsCustom(true);
                      } else {
                        setIsCustom(false);
                        setArea(e.target.value);
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold"
                  >
                    <option value="0.5">0.5 га (ойролцоогоор 282м)</option>
                    <option value="0.7">0.7 га (ойролцоогоор 334м)</option>
                    <option value="1.0">1.0 га (ойролцоогоор 400м)</option>
                    <option value="custom">Гараар оруулах (метр)</option>
                  </select>
                </div>

                {/* Length Input (if custom) */}
                <div className={`space-y-4 transition-all duration-300 ${isCustom ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  <label className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    <Ruler size={16} className="text-primary" />
                    Нийт урт (метр)
                  </label>
                  <input 
                    type="number"
                    value={customLength}
                    onChange={(e) => setCustomLength(e.target.value)}
                    placeholder="Жишээ: 150"
                    disabled={!isCustom}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold"
                  />
                </div>

                {/* Fence Type */}
                <div className="space-y-4 md:col-span-2">
                  <label className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                    <Check size={16} className="text-primary" />
                    Хашааны төрөл
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {fenceTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`p-6 rounded-2xl border transition-all text-left ${
                          selectedType === type.id 
                            ? 'border-primary bg-primary/10 mix-blend-screen' 
                            : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
                        }`}
                      >
                        <h4 className={`font-black uppercase tracking-wider text-[11px] mb-2 ${selectedType === type.id ? 'text-primary' : 'text-slate-400'}`}>
                          {type.name}
                        </h4>
                        <p className="text-lg font-black text-white">{type.pricePerMeter.toLocaleString()} ₮/м</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gate Options */}
                <div className="md:col-span-2 pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-slate-900/40 rounded-3xl border border-slate-800">
                    <div className="space-y-1">
                      <h4 className="font-black text-slate-200">Нэмэлт хаалга суурилуулах</h4>
                      <p className="text-xs text-slate-500">Автомат болон энгийн хаалганы сонголт</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="sr-only"
                            checked={hasGate}
                            onChange={(e) => setHasGate(e.target.checked)}
                          />
                          <div className={`block w-16 h-9 rounded-full transition-colors ${hasGate ? 'bg-primary' : 'bg-slate-800'}`}></div>
                          <div className={`absolute left-1.5 top-1.5 bg-white w-6 h-6 rounded-full transition-transform ${hasGate ? 'translate-x-7' : ''}`}></div>
                        </div>
                      </label>
                      
                      {hasGate && (
                        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
                          <input 
                            type="number" 
                            min="1"
                            value={gateCount}
                            onChange={(e) => setGateCount(parseInt(e.target.value) || 1)}
                            className="w-20 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none font-bold text-center"
                          />
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">ш</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-4 p-8 bg-slate-900/30 border border-slate-800 rounded-3xl text-slate-500 text-sm">
              <AlertCircle size={20} className="flex-shrink-0 text-primary/50 mt-1" />
              <p className="leading-relaxed">
                Энэхүү тооцоо нь урьдчилсан бөгөөд газрын хөрсний нөхцөл, байршил болон тээврийн зардлаас хамаарч бодит үнэ бага зэрэг зөрүүтэй гарч болно. <br />
                <span className="text-slate-400 font-bold">Оновчтой үнийн санал авахын тулд манай мэргэжилтэнтэй холбогдоорой.</span>
              </p>
            </div>
          </div>

          {/* Result Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-metal p-10 rounded-[2.5rem] neon-border sticky top-32 border border-slate-800 shadow-2xl">
              <h3 className="text-2xl font-black heading-industrial mb-10 text-white border-b border-slate-800 pb-6 uppercase tracking-widest">
                Үр <span className="text-primary italic">дүн</span>
              </h3>
              
              <div className="space-y-8 mb-12">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Бүтээгдэхүүн</p>
                  <p className="font-bold text-white text-lg">
                    {fenceTypes.find(t => t.id === selectedType).name}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Нийт урт</p>
                  <p className="text-3xl font-black text-white tracking-tighter">{calculatedLength} <span className="text-sm font-bold text-slate-500">метp</span></p>
                </div>
                {hasGate && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Хаалга</p>
                    <p className="font-bold text-white">{gateCount} ш суурилуулалт</p>
                  </div>
                )}
                <div className="pt-8 border-t border-slate-800/80">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3">Нийт төлбөр</p>
                  <div className="text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                    {formatPrice(totalPrice)}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-4 italic">* Одоогийн байдлаарх урьдчилсан үнэ</p>
                </div>
              </div>

              <button className="w-full bg-primary hover:bg-white text-slate-950 font-black py-6 rounded-2xl transition-all duration-500 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 uppercase tracking-widest text-sm translate-y-2 hover:translate-y-0">
                <Calculator size={22} strokeWidth={3} />
                Захиалга хийх
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FencePriceCalculator;
