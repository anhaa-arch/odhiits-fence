import React from 'react';
import { X, Phone, MessageSquare, Shield, Zap } from 'lucide-react';

const ZoomModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 transition-all duration-500">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl transition-opacity animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-500">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-10 bg-slate-950/50 backdrop-blur-md text-white p-3 rounded-2xl border border-slate-800 hover:bg-white hover:text-slate-950 transition-all duration-300"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="lg:w-1/2 aspect-[4/3] lg:aspect-auto relative overflow-hidden bg-slate-800">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent">
             <span className="bg-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-950 shadow-lg">
                {product.tag}
             </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
              {product.name}
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
               <div className="bg-slate-800 p-3 rounded-2xl text-primary">
                  <Shield size={20} />
               </div>
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Багцын мэдээлэл</h4>
                  <p className="text-white font-bold leading-relaxed">{product.bagtInfo || product.description}</p>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <div className="bg-slate-800 p-3 rounded-2xl text-primary">
                  <Zap size={20} />
               </div>
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Техник үзүүлэлт</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                     Манай бүх хашаанууд 0.8мм-ээс 1.5мм хүртэлх зузааны сонголттой бөгөөд 2 метрийн хэсгээр үйлдвэрлэгддэг.
                  </p>
               </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 space-y-6">
             <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Нэгж м² үнэ</p>
                <p className="text-3xl font-black text-primary italic">{product.priceHint}</p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="tel:96461919"
                  className="flex items-center justify-center gap-3 bg-white text-slate-950 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-all shadow-xl"
                >
                  <Phone size={16} />
                  Утсаар захиалах
                </a>
                <a 
                  href="https://www.facebook.com/odhiits/posts/948170711133231:1448460110106681"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-slate-800 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-slate-700 hover:bg-slate-700 transition-all"
                >
                  <MessageSquare size={16} />
                  Chat-ээр захиалах
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomModal;
