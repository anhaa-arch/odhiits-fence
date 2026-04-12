import React from 'react';
import { Phone, Maximize2, ShoppingCart } from 'lucide-react';

const ProductCard = ({ name, image, description, priceHint, tag, onZoom }) => {
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
          <div className="flex justify-between items-end gap-4">
            <h3 className="text-xl md:text-2xl font-black text-white leading-tight drop-shadow-2xl">
              {name}
            </h3>
            {tag && (
              <span className="bg-primary/90 backdrop-blur-sm text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-[0.1em] mb-1 shadow-lg">
                {tag}
              </span>
            )}
          </div>
        </div>
        
        {/* Quick Actions Overlay */}
        <div className="absolute top-6 left-6 right-6 flex justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
          <div className="bg-slate-950/80 backdrop-blur-xl p-3 rounded-2xl text-primary border border-slate-800 shadow-2xl">
            <Maximize2 size={18} strokeWidth={3} />
          </div>
          <div className="bg-primary backdrop-blur-xl p-3 rounded-2xl text-slate-950 shadow-2xl">
            <ShoppingCart size={18} strokeWidth={3} />
          </div>
        </div>
      </div>
      
      {/* Bottom Info Section */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-slate-500 text-xs md:text-sm font-bold leading-relaxed mb-6 line-clamp-2 flex-grow">
          {description}
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Үнийн санал</p>
            {priceHint && (
              <div className="text-primary font-black text-sm uppercase tracking-wider">
                {priceHint}
              </div>
            )}
          </div>
          
          <a 
            href="tel:88056490"
            className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-white border border-slate-800 hover:border-white text-white hover:text-slate-950 text-[10px] font-black py-5 px-4 rounded-2xl transition-all duration-500 uppercase tracking-widest shadow-xl"
          >
            <Phone size={14} strokeWidth={3} />
            Одоо холбогдох
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

