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
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white md:text-slate-900 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-2/3 bg-slate-100 flex items-center justify-center overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain max-h-[50vh] md:max-h-full"
          />
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/3 p-8 flex flex-col justify-between bg-white">
          <div>
            <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              Бүтээгдэхүүний дэлгэрэнгүй
            </span>
            <h2 className="text-3xl font-black text-slate-900 mb-4">{product.name}</h2>
            <div className="h-1.5 w-16 bg-emerald-600 rounded-full mb-6"></div>
            <p className="text-slate-600 leading-relaxed mb-8">
              {product.description || "Батхөнгор хийц ХХК-ийн чанартай төмөр хийц, бат бэх стандарт загвар."}
              <br /><br />
              Бид таны хүссэн хэмжээ, загвар, өнгөний шийдлээр бүрэн захиалгаар хийж гүйцэтгэнэ.
            </p>
          </div>

          <div className="space-y-4">
            <a 
              href="tel:88056490"
              className="flex items-center justify-center gap-3 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-900/10"
            >
              <Phone size={20} />
              <span>Яг одоо захиалах</span>
            </a>
            <p className="text-center text-xs text-slate-400 font-medium uppercase tracking-widest">
              Утас: 88056490
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
