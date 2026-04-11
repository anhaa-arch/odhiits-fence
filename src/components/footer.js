import React from 'react';
import { Phone, Mail } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-950 text-slate-400 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">Б</div>
              <div>
                <span className="text-xl font-black text-white block leading-none">БАТХӨНГОР</span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest leading-none mt-1">ХИЙЦ</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              10+ жилийн туршлагатай төмөр хийцийн тэргүүлэгч үйлдвэр. Бид чанар, бат бөх байдал, гоо зүйн төгс зохицлыг эрхэмлэдэг.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Холбоос</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#hero" className="hover:text-emerald-400 transition-colors">Нүүр</a></li>
              <li><a href="#gates" className="hover:text-emerald-400 transition-colors">Хаалганы төрөл</a></li>
              <li><a href="#fences" className="hover:text-emerald-400 transition-colors">Хашааны төрөл</a></li>
              <li><a href="#videos" className="hover:text-emerald-400 transition-colors">Видео галерей</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Холбоо барих</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-emerald-500" />
                <a href="tel:88056490" className="hover:text-emerald-400 transition-colors">88056490</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-emerald-500" />
                <a href="mailto:info@bathongorhiits.mn" className="hover:text-emerald-400 transition-colors">info@bathongorhiits.mn</a>
              </li>
              <li className="text-xs leading-relaxed">
                Батхөнгор хийц – төмөр хашаа, хаалганы үйлдвэр, Улаанбаатар хот
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-[0.2em]">
          <p>© {currentYear} БАТХӨНГОР ХИЙЦ ХХК. БҮХ ЭРХ ХУУЛИАР ХАМГААЛАГДСАН.</p>
          <div className="flex gap-8">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

 