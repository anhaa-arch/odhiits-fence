import React from 'react';
import { X, Phone } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative glass-metal rounded-[2.5rem] overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 neon-border p-2">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-slate-950/20 hover:bg-slate-950/40 backdrop-blur-md rounded-full text-white transition-colors border border-slate-700"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-2/3 bg-slate-900 flex items-center justify-center overflow-hidden rounded-[2rem]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain max-h-[50vh] md:max-h-full transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/3 p-8 flex flex-col justify-between">
          <div>
            <span className="inline-block bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-6 border border-primary/20">
              Бүтээгдэхүүний дэлгэрэнгүй
            </span>
            <h2 className="text-3xl font-black heading-industrial text-white mb-6 leading-tight">{product.name}</h2>
            <div className="h-1.5 w-16 bg-primary rounded-full mb-8"></div>
            <p className="text-slate-400 leading-relaxed mb-8 text-lg">
              {product.description || "ODHIITS инженерийн шийдэл бүхий бат бөх төмөр хашаа."}
              <br /><br />
              Бид таны хүссэн хэмжээ, загвар, өнгөний шийдлээр бүрэн захиалгаар хийж гүйцэтгэнэ.
            </p>
          </div>

          <div className="space-y-6">
            <a 
              href="tel:88056490"
              className="flex items-center justify-center gap-3 w-full bg-primary hover:bg-primary/90 text-slate-950 font-black py-5 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-primary/20 transform hover:-translate-y-1"
            >
              <Phone size={20} />
              <span>Яг одоо захиалах</span>
            </a>
            <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
              Утас: 88056490
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
