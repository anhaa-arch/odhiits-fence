import React, { useState, useMemo } from 'react';
import { fenceOptions, heightMultipliers } from '../data/fenceOptions';
import { getFenceLength, calculateFencePrice } from '../utils/fenceCalculations';
import { Phone, MessageCircle, Check, Info, Ruler, Map, ShieldCheck, ChevronRight } from 'lucide-react';

const FenceValuationModule = () => {
  const [selectedFenceId, setSelectedFenceId] = useState(fenceOptions[0].id);
  const [landSize, setLandSize] = useState(0.7);
  const [height, setHeight] = useState(1.5);
  const [hasGate, setHasGate] = useState(true);

  // Selected fence object
  const selectedFence = useMemo(() => 
    fenceOptions.find(f => f.id === selectedFenceId), 
  [selectedFenceId]);

  // Calculations
  const calculations = useMemo(() => {
    const length = getFenceLength(landSize, hasGate);
    const factor = heightMultipliers[height];
    const priceData = calculateFencePrice(selectedFence, length, height, factor);
    
    return {
      length,
      ...priceData
    };
  }, [selectedFence, landSize, height, hasGate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price) + ' ₮';
  };

  return (
    <section id="calculator" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-700/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-700/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-700 font-black uppercase tracking-[0.4em] text-[10px] block bg-emerald-50 w-fit px-4 py-1.5 rounded-full mx-auto border border-emerald-100 shadow-sm">
            Үнэлгээний модуль
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Хашааны үнийг <br /> <span className="text-emerald-700">ойролцоогоор тооцоолох</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            Та өөрийн газрын хэмжээ болон хүссэн хашаагаа сонгон урьдчилсан үнийн саналтай танилцана уу.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Fence Selection Cards */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between mb-2 px-2">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-700" />
                  Хашааны төрлөө сонгоно уу
                </h3>
              </div>
              
              {/* Responsive container for cards */}
              <div className="flex overflow-x-auto pb-6 no-scrollbar -mx-4 px-4 xl:mx-0 xl:px-0 xl:grid xl:grid-cols-1 xl:overflow-visible xl:gap-6">
                {fenceOptions.map((option) => (
                  <div 
                    key={option.id}
                    onClick={() => setSelectedFenceId(option.id)}
                    className={`flex-shrink-0 w-[300px] xl:w-full cursor-pointer transition-all duration-500 rounded-3xl overflow-hidden border-2 ${
                      selectedFenceId === option.id 
                        ? 'bg-white border-emerald-700 shadow-2xl shadow-emerald-900/10 scale-[1.02]' 
                        : 'bg-white/60 border-slate-100 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-full md:w-48 aspect-video md:aspect-square bg-slate-100 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                        <img 
                          src={option.image} 
                          alt={option.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => { e.target.src = 'https://placehold.co/400x400/047857/ffffff?text=ODHIITS'; }}
                        />
                        {selectedFenceId === option.id && (
                          <div className="absolute top-3 left-3 bg-emerald-700 text-white p-1.5 rounded-full shadow-lg border border-white/20">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xl font-black text-slate-900 leading-tight">{option.name}</h4>
                            <p className="text-emerald-700 font-black text-sm">{formatPrice(option.basePricePerM2)} / м²</p>
                          </div>
                          {selectedFenceId === option.id && (
                            <span className="bg-emerald-700 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg shadow-emerald-900/10 hidden md:block">
                              Сонгосон
                            </span>
                          )}
                        </div>
                        
                        <p className="text-slate-500 text-xs font-medium leading-relaxed">
                          {option.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                          {option.specs.map((spec, i) => (
                            <span key={i} className="bg-slate-50 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-lg border border-slate-100">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="md:hidden w-full pt-4 mt-4 border-t border-slate-100 flex justify-between items-center px-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Дэлгэрэнгүй</span>
                        <ChevronRight size={16} className="text-slate-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Form and Results */}
          <div className="lg:col-span-12 xl:col-span-5 sticky top-24 space-y-8">
            {/* Input Form Card */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-700/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              
              {/* Land Size Selection */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 ml-4">
                  <Map size={14} className="text-emerald-700" />
                  Газрын хэмжээ
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[0.7, 0.6, 0.5, 0.4].map(size => (
                    <button
                      key={size}
                      onClick={() => setLandSize(size)}
                      className={`py-4 rounded-2xl font-black text-xs transition-all border ${
                        landSize === size 
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-lg shadow-emerald-900/10' 
                          : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {size} га
                    </button>
                  ))}
                </div>
              </div>

              {/* Height Selection */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 ml-4">
                  <Ruler size={14} className="text-emerald-700" />
                  Хашааны өндөр (м)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {Object.keys(heightMultipliers).map(h => (
                    <button
                      key={h}
                      onClick={() => setHeight(parseFloat(h))}
                      className={`py-3 rounded-xl font-black text-[10px] transition-all border ${
                        height === parseFloat(h)
                          ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                          : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {h}м
                    </button>
                  ))}
                </div>
              </div>

              {/* Gate Checkbox */}
              <div className="pt-4">
                <label className="group flex items-center gap-4 cursor-pointer p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-700/30 transition-all">
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    hasGate ? 'bg-emerald-700 border-emerald-700 text-white' : 'bg-white border-slate-200'
                  }`}>
                    {hasGate && <Check size={14} strokeWidth={3} />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={hasGate} 
                    onChange={() => setHasGate(!hasGate)} 
                  />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-widest">
                    4м хаалга орсон
                  </span>
                </label>
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
              
              <div className="relative z-10 space-y-10">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                    Урьдчилсан нийт үнэ
                  </p>
                  <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
                    {formatPrice(calculations.totalPrice)}
                  </h3>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Нийт урт (ойролцоогоор)</span>
                    <span className="text-xl font-black text-white">{calculations.length} м</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">1.5м өндөр дээр 1 м² үнэ</span>
                    <span className="text-sm font-bold text-slate-300">{formatPrice(calculations.basePricePerM2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Сонгосон өндөр дээр 1 м² үнэ</span>
                    <span className="text-sm font-bold text-emerald-400">{formatPrice(calculations.finalPricePerM2)}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <a 
                    href="tel:96461919" 
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-6 rounded-2xl transition-all flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-950/20"
                  >
                    <Phone size={18} />
                    Утсаар захиалга өгөх
                  </a>
                  <a 
                    href="https://www.facebook.com/odhiits" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-black py-6 rounded-2xl transition-all border border-white/10 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em]"
                  >
                    <MessageCircle size={18} />
                    Facebook чатаар холбогдох
                  </a>
                </div>

                <div className="flex gap-4 pt-4">
                  <Info size={16} className="text-slate-500 flex-shrink-0" />
                  <p className="text-[10px] text-slate-500 leading-relaxed italic">
                    Энэ тооцоо нь ойролцоогоор бөгөөд газар дээрх үзлэг, нарийн зураг төсөл гарснаар өөрчлөгдөж болно.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FenceValuationModule;
