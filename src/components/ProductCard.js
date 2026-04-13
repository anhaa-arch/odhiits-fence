import React from 'react';
import { Phone, Maximize2, Info } from 'lucide-react';

const ProductCard = ({ name, image, description, bagtInfo, priceHint, tag, onZoom }) => {
  return (
    <div className="glass-metal rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:border-primary/50 group relative border border-slate-800 flex flex-col h-full min-w-[260px] active:scale-[0.98]">
      {/* Top Image Section with Overlay */}
      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={onZoom}>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        {/* Gradient Overlay for Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
          <div className="flex justify-between items-end gap-4 text-left">
            <h3 className="text-xl md:text-2xl font-black text-white leading-tight drop-shadow-2xl uppercase tracking-tighter italic">
              {name}
            </h3>
          </div>
        </div>
        
        {/* Tags */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
           {tag && (
              <span className="bg-primary backdrop-blur-sm text-slate-950 text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg w-fit">
                {tag}
              </span>
           )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 transform scale-90 group-hover:scale-100 transition-transform">
            <Maximize2 size={32} className="text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>
      
      {/* Bottom Info Section */}
      <div className="p-8 flex flex-col flex-grow text-left space-y-6">
        <div className="space-y-4 flex-grow">
           <div className="flex items-center gap-2 text-primary">
              <Info size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">Багцын иж бүрдэл:</span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 bg-slate-800/40 rounded-[2rem] border border-slate-800 shadow-inner">
                 <div className="bg-primary/20 p-4 rounded-2xl text-primary">
                    <Shield size={24} />
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Иж бүрдэл</h4>
                    <p className="text-white font-black text-sm leading-tight">{bagtInfo}</p>
                 </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-800/40 rounded-[2rem] border border-slate-800 shadow-inner">
                 <div className="bg-primary/20 p-4 rounded-2xl text-primary">
                    <Zap size={24} />
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Үзүүлэлт</h4>
                    <p className="text-white/80 text-xs font-bold leading-relaxed">
                       Зузаан: 0.8мм - 1.5мм<br />
                       Хэмжээ: 2м секцээр
                    </p>
                 </div>
              </div>
            </div>
        </div>
        
        <div className="space-y-6 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Үнийн санал</p>
            {priceHint && (
              <div className="text-primary font-black text-sm uppercase tracking-wider italic">
                {priceHint}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onZoom}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-[9px] font-black py-4 rounded-xl transition-all duration-300 uppercase tracking-widest"
            >
               Дэлгэрэнгүй
            </button>
            <a 
              href="tel:96461919"
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-white text-slate-950 hover:text-slate-950 text-[9px] font-black py-4 rounded-xl transition-all duration-300 uppercase tracking-widest shadow-lg shadow-primary/10"
            >
              <Phone size={12} strokeWidth={3} />
              Захиалга
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
