import React from 'react';
import { Phone, Maximize2 } from 'lucide-react';

const ProductCard = ({ name, image, description, onZoom }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5 h-full flex flex-col group relative">
      <div className="relative h-64 overflow-hidden cursor-pointer" onClick={onZoom}>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Maximize2 size={24} />
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-slate-800 leading-tight">
            {name}
          </h3>
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
            ШИНЭ
          </span>
        </div>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
        
        <div className="mt-auto flex items-center justify-between gap-4">
          <a 
            href="tel:88056490"
            className="flex-grow flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-700 text-white text-sm font-bold py-3 px-4 rounded-xl transition-all duration-300"
          >
            <Phone size={14} />
            Захиалга өгөх
          </a>
          <button 
            onClick={onZoom}
            className="p-3 bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-all duration-300"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

