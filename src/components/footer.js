import React from 'react';
import { Mail, Phone, MapPin, ChevronRight, Calculator, Image as ImageIcon, Shield, Globe, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 pt-32 pb-16 overflow-hidden relative">
      <div className="container-custom px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-32">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-emerald-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/10">
                  <span className="font-black text-2xl italic leading-none">O</span>
               </div>
               <div className="flex flex-col">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-1">ODHIITS</h2>
                  <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.3em] leading-none">Industrial Systems</span>
               </div>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs">
              Манай компани 10 гаруй жил төмөр хийц, хашааны чиглэлээр амжилттай ажиллаж байна. Бидний зорилго бол таны аюулгүй байдал, гоо зүйг дээд зэргээр хангах явдал юм.
            </p>
            <div className="flex gap-4">
              {[Globe, ExternalLink, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-emerald-700 hover:text-white text-slate-500 flex items-center justify-center transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">Хэрэгтэй холбоосууд</h4>
            <div className="flex flex-col gap-6">
              {[
                { name: 'Нүүр хуудас', href: '#home', icon: <ChevronRight size={14} /> },
                { name: 'Загварын галерей', href: '#gallery', icon: <ImageIcon size={14} /> },
                { name: 'Үнийн тооцоолуур', href: '#calculator', icon: <Calculator size={14} /> },
                { name: 'Бидний үйлчилгээ', href: '#services', icon: <Shield size={14} /> }
              ].map(link => (
                <a key={link.name} href={link.href} className="flex items-center gap-3 text-[11px] font-black text-slate-600 uppercase tracking-widest hover:text-emerald-700 transition-colors group">
                  <span className="text-slate-300 group-hover:text-emerald-700 transition-colors">{link.icon}</span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">Холбоо барих</h4>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-emerald-700 flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Утас</p>
                   <p className="text-sm font-black text-slate-900 tracking-widest">88056490</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-emerald-700 flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">И-мэйл</p>
                   <p className="text-sm font-black text-slate-900">info@odhiits.mn</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-emerald-700 flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Хаяг</p>
                   <p className="text-sm font-black text-slate-900">Улаанбаатар хот, БЗД, 1-р хороо</p>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer Column */}
          <div className="space-y-8">
             <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-200 space-y-4">
                <h5 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                   <Shield size={14} /> Мэдэгдэл
                </h5>
                <p className="text-[10px] text-slate-500 font-bold leading-relaxed italic">
                   Сайт дээрх тооцоолуурын дүн нь урьдчилсан бөгөөд инженерийн нарийвчилсан хэмжилтийн дараа өөрчлөгдөх боломжтой.
                </p>
             </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            © {currentYear} ODHIITS Industrial System LLC. БҮХ ЭРХ ХУУЛИАР ХАМГААЛАГДСАН.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-emerald-700 transition-colors">Privacy Policy</a>
            <a href="#" className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-emerald-700 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;