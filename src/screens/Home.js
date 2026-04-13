import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import GallerySection from '../components/GallerySection';
import FenceValuationModule from '../components/FenceValuationModule';
import ServicesSection from '../components/ServicesSection';
import ProductsSection from '../components/ProductsSection';
import ZoomModal from '../components/ZoomModal';
import { ArrowRight, ChevronRight, Ruler } from 'lucide-react';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-700/10">
      <Header />
      
      <main className="flex-grow pt-[80px]">
        {/* Simple Hero Section */}
        <section id="home" className="relative py-24 md:py-48 overflow-hidden bg-white">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-700/5 rounded-full blur-[150px] -mr-48 -mt-48 pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-700/5 rounded-full blur-[120px] -ml-40 -mb-40 pointer-events-none" />
           
           <div className="container-custom px-6 md:px-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                 {/* Text Side */}
                 <div className="lg:col-span-7 space-y-10 text-center lg:text-left">
                    <div className="space-y-4">
                       <span className="text-emerald-700 font-black uppercase tracking-[0.5em] text-[10px] md:text-xs block bg-emerald-50 w-fit px-4 py-2 rounded-full mx-auto lg:mx-0 shadow-sm border border-emerald-100">
                          ODHIITS INDUSTRIAL SYSTEMS
                       </span>
                       <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                          Хашаа, хаалганы <br /> <span className="text-emerald-700 italic">мэргэжлийн шийдэл</span>
                       </h1>
                       <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                          Бид 10 гаруй жилийн туршлага дээрээ үндэслэн чанартай төмөр хашаа, автомат хаалгыг таны хүссэн загвараар үйлдвэрлэн суурилуулж байна.
                       </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                       <a href="#calculator" className="btn-primary min-w-[200px]">
                          Үнэ тооцоолох <ArrowRight size={16} />
                       </a>
                       <a href="#products" className="btn-secondary min-w-[200px]">
                          Загварууд үзэх <ChevronRight size={16} />
                       </a>
                    </div>
                 </div>

                 {/* Visual Side */}
                 <div className="lg:col-span-5 relative">
                    <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-950/20 border-8 border-white group">
                       <img 
                          src="/images/fences/fence-1.jpg" 
                          alt="Modern Fence Design" 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent flex items-end p-10">
                          <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                             <span className="text-[10px] font-black text-emerald-300 uppercase tracking-[0.3em]">Premium Collection</span>
                             <p className="text-lg font-black text-white uppercase italic">Загварлаг гэр хашаа 2024</p>
                          </div>
                       </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 hidden md:block animate-bounce-slow">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/10">
                             <Ruler size={24} />
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Мэргэжлийн инженер</p>
                             <p className="text-sm font-black text-slate-900 leading-none">Газар дээр нь хэмжилт</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Products Section */}
        <ProductsSection onProductClick={handleProductClick} />

        {/* Gallery Section */}
        <GallerySection onItemClick={handleProductClick} />

        {/* Calculator Section */}
        <FenceValuationModule />

        {/* Services Section */}
        <ServicesSection />

        {/* Simple Contact / Conversion Section */}
        <section id="contact" className="py-32 bg-slate-50 relative overflow-hidden">
           <div className="container-custom px-6 md:px-12 relative z-10">
              <div className="bg-white p-12 md:p-24 rounded-[4rem] border border-slate-200 shadow-2xl shadow-slate-900/5 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="space-y-10">
                    <div className="space-y-6">
                       <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-none tracking-tighter">Бидэнтэй <br /> <span className="text-emerald-700">холбогдох</span></h2>
                       <p className="text-slate-500 font-medium leading-relaxed max-w-sm">Та үнийн санал авах, эсвэл зөвлөгөө авахыг хүсвэл доорх формоор бидэнд мэдэгдэнэ үү.</p>
                    </div>

                    <div className="space-y-8 border-l-4 border-emerald-700 pl-10">
                       <div className="space-y-6">
                          <div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Утас</p>
                             <a href="tel:96461919" className="text-3xl font-black text-slate-900 tracking-widest hover:text-emerald-700 transition-colors">96461919</a>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-4">
                             <a href="tel:96461919" className="btn-primary py-4 px-8 text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20">
                                Утсаар захиалах
                             </a>
                             <a 
                                href="https://www.facebook.com/odhiits/posts/948170711133231:1448460110106681" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn-secondary py-4 px-8 text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-2 border-slate-900 text-slate-900"
                             >
                                Chat-ээр захиалах
                             </a>
                          </div>
                       </div>
                       <div className="pt-4">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">И-мэйл</p>
                          <p className="text-lg font-black text-slate-900">info@odhiits.mn</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <input type="text" placeholder="Таны нэр" className="input-light" />
                       <input type="text" placeholder="Утасны дугаар" className="input-light" />
                    </div>
                    <textarea placeholder="Таны зурвас" className="input-light h-32 py-6 resize-none" />
                    <button className="btn-primary w-full py-6 text-sm shadow-xl shadow-emerald-950/10">
                       Зурвас илгээх <ArrowRight size={18} />
                    </button>
                    <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-black pt-4">© 2024 ODHIITS Industrial System LLC</p>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <ZoomModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <Footer />
    </div>
  );
};

export default Home;