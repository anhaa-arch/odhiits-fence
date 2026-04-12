import React, { useState, useEffect } from 'react';
import { Calculator, Download, Send, Phone, Info, Award, ShieldCheck, Zap, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { fenceTypes } from '../../data/pricing';
import { galleryItems } from '../../data/gallery';

const EstimateCanvas = ({ config, estimate, loadScenario, scenarios }) => {
  const [displayPrice, setDisplayPrice] = useState(0);
  const selectedTypeData = fenceTypes.find(t => t.id === config.selectedType) || fenceTypes[0];

  // Count-up animation for total price
  useEffect(() => {
    let start = displayPrice;
    const end = estimate.totalPrice;
    if (start === end) return;

    let totalDuration = 800; // ms
    let frameDuration = 1000 / 60;
    let totalFrames = Math.round(totalDuration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutQuad = t => t * (2 - t);
      const current = start + (end - start) * easeOutQuad(progress);
      
      setDisplayPrice(Math.round(current));

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [estimate.totalPrice]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price) + ' ₮';
  };

  return (
    <div className="flex-grow p-10 flex flex-col h-full bg-slate-950 overflow-y-auto no-scrollbar relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />

      {/* Scenarios Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
         {scenarios.map(sc => (
           <button
             key={sc.id}
             onClick={() => loadScenario(sc.id)}
             className="glass-metal p-6 rounded-[2rem] border border-slate-800 hover:border-primary/50 transition-all text-left group"
           >
              <div className="flex items-center justify-between mb-4">
                 <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Zap size={16} className="text-slate-500 group-hover:text-primary" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Preset</span>
              </div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2">{sc.name}</h4>
              <p className="text-[10px] text-slate-500 font-bold leading-tight">{sc.description}</p>
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 relative z-10 mb-12">
         {/* Main Estimate Display */}
         <div className="xl:col-span-2 space-y-10">
            <div className="glass-metal p-12 rounded-[3.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
               {/* Grid overlay */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
               
               {/* Technical Sketch Visual */}
               <div className="absolute top-12 right-12 w-48 h-48 opacity-20 pointer-events-none hidden md:block">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-primary fill-none stroke-current" strokeWidth="0.5">
                     <rect x="10" y="10" width="80" height="80" strokeDasharray="4 2" />
                     <path d="M10 10 L20 10 M10 10 L10 20" strokeWidth="2" />
                     <path d="M90 10 L80 10 M90 10 L90 20" strokeWidth="2" />
                     <path d="M10 90 L20 90 M10 90 L10 80" strokeWidth="2" />
                     <path d="M90 90 L80 90 M90 90 L90 80" strokeWidth="2" />
                     <circle cx="50" cy="10" r="2" fill="currentColor" />
                     <text x="50" y="5" fontSize="4" textAnchor="middle" className="fill-slate-500 font-mono font-black">{estimate.totalLength}m</text>
                     <text x="95" y="50" fontSize="4" textAnchor="middle" transform="rotate(90 95 50)" className="fill-slate-500 font-mono font-black">SEGMENT A</text>
                  </svg>
               </div>
               
               <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
                  <div className="space-y-10">
                     <div>
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">LIVE ESTIMATE</span>
                        <h2 className="text-6xl md:text-8xl font-black heading-industrial text-white tracking-tighter leading-none mb-4">
                           {formatPrice(displayPrice)}
                        </h2>
                        <p className="text-slate-500 text-xs font-bold font-mono">ESTIMATED PRODUCTION COST • 2024 V.1</p>
                     </div>

                     <div className="grid grid-cols-2 gap-12">
                        <div>
                           <p className="text-[10px] font-black text-slate-600 uppercase mb-2">Нийт урт</p>
                           <p className="text-3xl font-black text-white italic">{estimate.totalLength}<span className="text-xs text-slate-500 ml-1">метр</span></p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-600 uppercase mb-2">Талбай</p>
                           <p className="text-3xl font-black text-white italic">{estimate.totalArea}</p>
                        </div>
                     </div>
                  </div>

                  {/* Right side data list */}
                  <div className="w-full md:w-64 space-y-6 pt-4">
                     {[
                        { label: 'Материал', val: formatPrice(estimate.basePrice) },
                        { label: 'Хаалга', val: formatPrice(estimate.gatePrice) },
                        { label: 'Суурилуулалт', val: formatPrice(estimate.laborPrice) },
                        { label: 'Метрийн үнэ', val: formatPrice(estimate.unitPrice), highlight: true }
                     ].map((item, i) => (
                        <div key={i} className={`flex justify-between items-end pb-3 border-b border-slate-800 ${item.highlight ? 'border-primary/30 pt-4' : ''}`}>
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                           <span className={`font-bold text-xs ${item.highlight ? 'text-primary' : 'text-slate-300'}`}>{item.val}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Real View Preview */}
            <div className="glass-metal p-10 rounded-[3rem] border border-slate-800 relative overflow-hidden group">
               <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                  <div className="w-full md:w-1/2 aspect-[16/9] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative">
                     <img 
                       src={selectedTypeData.image} 
                       alt="Real View" 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-6">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest bg-primary/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-primary/20">Бодит жишээ: {selectedTypeData.name}</span>
                     </div>
                  </div>
                  <div className="w-full md:w-1/2 space-y-6">
                     <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">PROVISIONAL VIEW</h4>
                     <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider leading-tight">Таны сонгосон <br /> ODHIITS хашаа</h3>
                     <p className="text-xs text-slate-500 font-bold leading-relaxed">{selectedTypeData.description}</p>
                     <div className="pt-4 border-t border-slate-800 mt-6">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Recommended for:</p>
                        <p className="text-[10px] font-bold text-slate-600">{selectedTypeData.recommendedFor}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Supporting Cards Sidebar */}
         <div className="space-y-8">
            <div className="glass-metal p-8 rounded-[2.5rem] border border-slate-800">
               <h5 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Info size={14} /> Төслийн зөвлөгөө
               </h5>
               <div className="space-y-6">
                  <div className="flex gap-4">
                     <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-primary/50">
                        <ShieldCheck size={20} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-white mb-1 uppercase">12 САРЫН БАТАЛГАА</p>
                        <p className="text-[9px] text-slate-600 font-bold leading-tight">Бид хийсэн бүх ажилдаа чанарын баталгаа өгдөг.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-primary/50">
                        <Calculator size={20} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-white mb-1 uppercase">МЭРГЭЖЛИЙН ХЭМЖИЛТ</p>
                        <p className="text-[9px] text-slate-600 font-bold leading-tight">Талбайн хэмжилтийг манай инженерүүд газар дээр нь хийнэ.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="glass-metal p-8 rounded-[2.5rem] border border-slate-800 bg-gradient-to-b from-primary/5 to-transparent">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-slate-950 shadow-lg shadow-primary/20">
                     <Phone size={24} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-500 uppercase">EXPERTS HOTLINE</p>
                     <p className="text-xl font-black text-white tracking-widest">88056490</p>
                  </div>
               </div>
               <p className="text-[10px] text-slate-500 font-bold mb-6 italic leading-relaxed">ODHIITS Studio нь таны төслийн бүх шатанд зөвлөгөө өгөхөд бэлэн байна.</p>
               <a href="tel:88056490" className="block text-center bg-white text-slate-950 font-black py-4 rounded-2xl uppercase tracking-widest text-[10px] hover:bg-primary transition-colors">
                  Яг одоо залгах
               </a>
            </div>

            {/* CTA Final Buttons Inline */}
            <div className="space-y-4 pt-10">
               <button className="w-full bg-primary hover:bg-white text-slate-950 font-black py-6 rounded-3xl transition-all duration-500 shadow-xl shadow-primary/20 flex items-center justify-center gap-4 uppercase tracking-widest text-sm translate-y-2 hover:translate-y-0 active:scale-95">
                  <Send size={20} />
                  Илгээх
               </button>
               <button className="w-full bg-slate-900 border border-slate-800 hover:border-primary/50 text-white font-black py-6 rounded-3xl transition-all duration-500 flex items-center justify-center gap-4 uppercase tracking-widest text-sm translate-y-2 hover:translate-y-0 active:scale-95">
                  <Download size={20} />
                  PDF татах
               </button>
            </div>
         </div>
      </div>

      {/* Reference Wall Gallery Section */}
      <div className="pt-20 pb-32 relative z-10 border-t border-slate-900 mt-20">
         <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
               <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">INSPIRATION</span>
               <h2 className="text-4xl font-black heading-industrial text-white tracking-wider">Reference <span className="text-primary italic">Wall</span></h2>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-all cursor-pointer">
                  <ExternalLink size={20} />
               </div>
            </div>
         </div>

         <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {galleryItems.map(item => (
               <div key={item.id} className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-800 hover:border-primary/30 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/5">
                  <img src={item.image} alt={item.label} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <span className="text-[8px] font-black text-primary uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{item.tag}</span>
                     <h5 className="text-[10px] font-black text-white uppercase tracking-wider">{item.label}</h5>
                  </div>
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md p-2 rounded-xl opacity-0 hover:scale-110 transition-all group-hover:opacity-100 cursor-pointer">
                     <ImageIcon size={14} className="text-primary" />
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default EstimateCanvas;
