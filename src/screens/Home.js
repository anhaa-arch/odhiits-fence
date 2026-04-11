// Home page screen

import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import GatesCarousel from '../components/GatesCarousel';
import FencesCarousel from '../components/FencesCarousel';
import VideoGallery from '../components/VideoGallery';
import ProductModal from '../components/ProductModal';
import { Phone, Mail, MapPin, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Animation/Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-emerald-900/40 z-10" />
          <img 
            src="/images/fences/fence-1.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 animate-in fade-in slide-in-from-left duration-700">
              Батхөнгор хийц – <span className="text-emerald-400">Таны талбайг хамгаалсан,</span> байгальд ээлтэй төмөр хийцийн шийдэл
            </h1>
            <p className="text-lg md:text-xl text-emerald-50/80 mb-10 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-left duration-1000">
              10+ жилийн туршлагатай Батхөнгор хийц компани нь хашаа, хаалга, төмөр хийцийн бүтээцүүдийг чанартай материал, мэргэжлийн гүйцэтгэлээр үйлдвэрлэн суурилуулдаг.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 animate-in fade-in slide-in-from-bottom duration-1000">
              {[
                "10+ жилийн туршлага",
                "Суулгахад бэлэн 4м, 5м хаалга",
                "Хүссэн загвараар захиалгын үйлчилгээ",
                "Байгальд ээлтэй будгийн систем"
              ].map((bullet, i) => (
                <div key={i} className="flex items-center gap-3 text-white font-semibold">
                  <CheckCircle2 className="text-emerald-400 w-6 h-6 flex-shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 animate-in fade-in zoom-in duration-1000">
              <a 
                href="#gates" 
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-xl shadow-emerald-900/20 transform hover:-translate-y-1"
              >
                Бүтээгдэхүүн үзэх
              </a>
              <a 
                href="tel:88056490" 
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:-translate-y-1"
              >
                Зөвлөгөө авах
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-2xl -z-10" />
              <img 
                src="/images/gates/gate-5.jpg" 
                alt="About us" 
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-8 right-8 bg-emerald-700 text-white p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-black">10+</p>
                <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Жилийн туршлага</p>
              </div>
            </div>
            
            <div>
              <span className="text-emerald-700 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Бидний тухай</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                Мэргэжлийн түвшинд <br /> <span className="text-emerald-600">Төмөр хийцийг</span> урлана
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Батхөнгор хийц ХХК нь төмөр хашаа, граж, цутгамал болон угсармал хаалга, төмөр хийцийн бүтээцийг мэргэшсэн баг, стандартын дагуу үйлдвэрлэн суурилуулдаг.
                </p>
              </div>
              
              <ul className="mt-10 space-y-4">
                {[
                  "Таны хүссэн хэмжээ, загвар, өнгөөр хаалга, хашааг бүрэн захиалгаар хийнэ.",
                  "Хөдөө орон нутаг, Улаанбаатар хотод тээвэр, суурилуулалтын цогц үйлчилгээ үзүүлнэ."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-700 font-medium">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Products with Auto-scroll */}
      <GatesCarousel onProductClick={handleProductClick} />
      <FencesCarousel onProductClick={handleProductClick} />

      {/* Video Gallery */}
      <VideoGallery />

      {/* Custom Quote Section */}
      <section id="custom-quote" className="py-24 bg-emerald-900 text-white">
        <div className="container mx-auto px-6">
          <div className="bg-emerald-800 rounded-[3rem] p-10 md:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/50 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-700/50 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <span className="text-emerald-300 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Захиалгат үйлчилгээ</span>
                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                  Таны төсөөлсөн <br /> <span className="text-emerald-400">Загвар, хэмжээгээр</span> хийж гүйцэтгэнэ
                </h2>
                <p className="text-emerald-50/80 text-lg mb-10 leading-relaxed">
                  Манайд байгаа бэлэн загваруудаас гадна та өөрийн хүссэн хэмжээ, өнгө, хээний шийдлээр хашаа хаалгаа захиалах боломжтой. Бид таны талбайн хэмжилтээс эхлээд зураг төсөл, үйлдвэрлэл, суурилуулалт хүртэл бүх шатны үйлчилгээг мэргэжлийн түвшинд үзүүлнэ.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="tel:88056490"
                    className="flex items-center justify-center gap-3 bg-white text-emerald-900 font-black py-5 px-10 rounded-2xl hover:bg-emerald-50 transition-all duration-300"
                  >
                    <MessageSquare size={20} />
                    <span>Үнийн санал авах</span>
                  </a>
                  <a 
                    href="#contact"
                    className="flex items-center justify-center gap-2 border-2 border-emerald-600 font-bold py-5 px-10 rounded-2xl hover:bg-emerald-700 transition-all duration-300"
                  >
                    <span>Холбоо барих</span>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3">
                    <img src="/images/gates/gate-3.jpg" alt="Custom sample" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl -rotate-2">
                    <img src="/images/fences/fence-10.jpg" alt="Custom sample" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl -rotate-3">
                    <img src="/images/gates/gate-8.jpg" alt="Custom sample" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-2">
                    <img src="/images/fences/fence-15.jpg" alt="Custom sample" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Холбоо барих</h2>
            <p className="text-lg text-slate-600">
              Зөвлөгөө, үнийн санал авах бол доорх сувгуудаар холбогдоорой.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="tel:88056490" className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center border-b-8 border-b-emerald-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Phone size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Утас</h3>
              <p className="text-2xl font-black text-emerald-700">88056490</p>
            </a>

            <a href="mailto:info@bathongorhiits.mn" className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center border-b-8 border-b-blue-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Имэйл</h3>
              <p className="text-lg font-black text-blue-700">info@bathongorhiits.mn</p>
            </a>

            <div className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center border-b-8 border-b-slate-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-800 mb-6 group-hover:bg-slate-800 group-hover:text-white transition-all">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Байршил</h3>
              <p className="text-base font-bold text-slate-800 text-center">Батхөнгор хийц – Улаанбаатар хот</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
      />
    </div>
  );
};

export default Home;
