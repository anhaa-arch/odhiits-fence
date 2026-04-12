import React from 'react';
import { Shield, Ruler, Wrench, Award } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: <Ruler size={32} />,
      title: 'Хэмжилт & Зөвлөгөө',
      text: 'Бид таны талбайд очиж нарийн хэмжилт хийж, хамгийн тохиромжтой шийдлийг зөвлөнө.'
    },
    {
      icon: <Wrench size={32} />,
      title: 'Чанартай Суурилуулалт',
      text: 'Мэргэжлийн баг хамт олон таны хашаа, хаалгыг стандарт горимын дагуу найдвартай угсарна.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Бидний Баталгаа',
      text: 'Хийсэн бүх ажилдаа 12-24 сарын чанарын баталгааг бид албан ёсоор олгодог.'
    },
    {
      icon: <Award size={32} />,
      title: 'Өндөр Чанарын Материал',
      text: 'Зэвэрдэггүй, бат бөт металл хийцүүдийг зөвхөн итгэмжлэгдсэн үйлдвэрээс нийлүүлдэг.'
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container-custom px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
           <span className="text-emerald-700 font-black uppercase tracking-[0.4em] text-[10px] block">Бидний үйлчилгээ</span>
           <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Яагаад <span className="text-emerald-700 italic">ODHIITS</span>-ийг сонгох вэ?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div key={i} className="card-light p-10 flex flex-col items-center text-center space-y-6 bg-slate-50/50 hover:bg-white border-transparent hover:border-emerald-700/20 group">
              <div className="w-20 h-20 rounded-[2rem] bg-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-900/10 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">{service.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed leading-relaxed">{service.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact Strip */}
        <div className="mt-24 p-8 md:p-12 rounded-[2.5rem] bg-emerald-950 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-700 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none opacity-20" />
           <div className="space-y-4 relative z-10 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-wider leading-none">Танд асуух зүйл байна уу?</h3>
              <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Мэргэжлийн инженерүүд танд зөвлөхөд бэлэн байна.</p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
              <a href="tel:88056490" className="flex-1 text-center bg-white text-emerald-950 font-black py-4 px-10 rounded-xl uppercase tracking-widest text-[11px] hover:bg-emerald-100 transition-all shadow-xl shadow-emerald-950/40">
                 Яг одоо залгах
              </a>
              <button className="flex-1 text-center bg-emerald-800 text-white font-black py-4 px-10 rounded-xl uppercase tracking-widest text-[11px] border border-emerald-700 hover:bg-emerald-700 transition-all">
                 Зурвас илгээх
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
