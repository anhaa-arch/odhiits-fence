import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { fences } from '../data/fences';
import { gates } from '../data/gates';
import { Filter, SlidersHorizontal, ChevronRight } from 'lucide-react';

const ProductsSection = ({ onProductClick }) => {
  const [activeTab, setActiveTab] = useState('fence');
  const [filter, setFilter] = useState('all');

  const tabs = [
    { id: 'fence', name: 'Хашаа', data: fences },
    { id: 'gate', name: 'Хаалга', data: gates },
    { id: 'other', name: 'Бусад', data: [] }
  ];

  const chips = [
    { id: 'all', name: 'Бүгд' },
    { id: 'standard', name: 'Стандарт' },
    { id: 'premium', name: 'Премиум' },
    { id: 'industrial', name: 'Индастриал' }
  ];

  const rawData = tabs.find(t => t.id === activeTab)?.data || [];
  const filteredData = filter === 'all' 
    ? rawData 
    : rawData.filter(item => item.tag?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="products" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Vertical Line */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-slate-900 hidden lg:block" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-10">
          <div className="relative pl-0 lg:pl-16">
            <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">ODHIITS CATALOG 2024</span>
            <h2 className="text-5xl md:text-8xl font-black heading-industrial leading-none tracking-tighter">
              Бүтээлч <br /> <span className="text-primary italic">Шийдлүүд</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6">
             <div className="flex gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-xl shrink-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-8 py-3 rounded-xl font-black uppercase tracking-wider text-[10px] transition-all duration-500 ${
                      activeTab === tab.id 
                        ? 'bg-primary text-slate-950 shadow-xl shadow-primary/20' 
                        : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 space-y-10 pl-16">
            <div className="space-y-6">
               <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-slate-500 border-l-2 border-primary pl-4">
                  Шүүлтүүр
               </h4>
               <div className="space-y-3">
                  {chips.map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => setFilter(chip.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all duration-300 border flex items-center justify-between group ${
                        filter === chip.id 
                          ? 'bg-primary/10 border-primary text-primary' 
                          : 'bg-transparent border-slate-900 text-slate-500 hover:border-slate-800 hover:text-white'
                      }`}
                    >
                      {chip.name}
                      <ChevronRight size={14} className={`transition-transform duration-300 ${filter === chip.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                    </button>
                  ))}
               </div>
            </div>

            <div className="p-6 glass-metal rounded-[2rem] border border-slate-800 mt-12">
               <SlidersHorizontal className="text-primary mb-4" size={24} />
               <h5 className="font-black text-white text-xs uppercase tracking-widest mb-2">Хувийн загвар</h5>
               <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Та өөрийн хүссэн загвараа зуруулан хийлгэх боломжтой.</p>
               <button className="text-primary text-[10px] font-black uppercase underline tracking-widest hover:text-white transition-colors">Зөвлөгөө авах</button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-grow">
             {/* Mobile Filter Horizontal Scroll */}
             <div className="lg:hidden flex gap-2 overflow-x-auto pb-6 no-scrollbar snap-x px-1">
                {chips.map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setFilter(chip.id)}
                    className={`flex-shrink-0 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest snap-start transition-all ${
                      filter === chip.id ? 'bg-primary text-slate-950' : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    {chip.name}
                  </button>
                ))}
             </div>

             <div className="relative">
                <div className="flex lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-8 overflow-x-auto lg:overflow-visible pb-12 lg:pb-0 snap-x no-scrollbar scrolling-touch">
                  {filteredData.map((item) => (
                    <div key={item.id} className="min-w-[85vw] md:min-w-[400px] lg:min-w-0 snap-center lg:snap-align-none">
                      <ProductCard 
                        name={item.name}
                        image={item.image}
                        description={item.description}
                        priceHint={item.priceHint}
                        tag={item.tag}
                        onZoom={() => onProductClick(item)}
                      />
                    </div>
                  ))}
                  
                  {(filteredData.length === 0 && activeTab !== 'other') && (
                    <div className="col-span-full py-32 text-center glass-metal rounded-[3rem] border border-dashed border-slate-800 w-full">
                      <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">Энэ ангилалд бүтээгдэхүүн олдсонгүй</p>
                    </div>
                  )}

                  {activeTab === 'other' && (
                    <div className="col-span-full py-40 text-center glass-metal rounded-[3rem] border border-slate-800/50 w-full relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="relative z-10 space-y-4">
                        <SlidersHorizontal size={48} className="mx-auto text-primary/20 mb-6" />
                        <h3 className="text-2xl font-black text-white uppercase tracking-[0.2em]">Тун удахгүй</h3>
                        <p className="text-slate-500 text-sm max-w-md mx-auto">Бид шинэ загварууд болон бусад төмөр хийцүүдийг каталогтоо нэмж байна.</p>
                      </div>
                    </div>
                  )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
