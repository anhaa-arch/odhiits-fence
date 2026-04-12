import React, { useState } from 'react';
import { galleryItems } from '../data/gallery';
import { ChevronRight } from 'lucide-react';

const GallerySection = () => {
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const categories = [
    { id: 'all', name: 'Бүгд' },
    { id: 'fence', name: 'Хашаа' },
    { id: 'gate', name: 'Хаалга' }
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container-custom px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
             <span className="text-emerald-700 font-black uppercase tracking-[0.4em] text-[10px] block">Манай бүтээлүүд</span>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-none">Хашаа, хаалганы <br /> <span className="text-emerald-700">загварууд</span></h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                  filter === cat.id 
                    ? 'bg-emerald-700 border-emerald-700 text-white shadow-lg' 
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-emerald-700 hover:text-emerald-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="group card-light flex flex-col h-full bg-slate-50/30">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                   <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-emerald-800 border border-emerald-100 shadow-sm">
                      {item.typeLabel}
                   </span>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex-grow flex flex-col bg-white">
                <h4 className="text-sm md:text-base font-black text-slate-900 mb-2 transition-colors group-hover:text-emerald-700">{item.name}</h4>
                <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed mb-6 flex-grow">{item.text}</p>
                
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                   <button className="text-[10px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                      Үнэ үзэх <ChevronRight size={14} />
                   </button>
                   <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">OD-G-{item.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gallery Support text */}
        <div className="mt-20 text-center">
           <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 italic leading-relaxed">Та өөрийн хүссэн загвараар захиалах боломжтой бөгөөд <br /> зураг төслийг манай инженерүүд гаргаж өгнө.</p>
           <div className="h-px w-24 bg-emerald-700/20 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
