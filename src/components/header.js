import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calculator, Image as ImageIcon, Shield } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Нүүр', href: '#home', icon: null },
    { name: 'Загварууд', href: '#gallery', icon: <ImageIcon size={14} /> },
    { name: 'Тооцоолуур', href: '#calculator', icon: <Calculator size={14} /> },
    { name: 'Бидний тухай', href: '#services', icon: <Shield size={14} /> }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/10">
              <span className="font-black text-xl italic leading-none">O</span>
           </div>
           <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter leading-none mb-0.5">ODHIITS</h1>
              <span className="text-[8px] font-black text-emerald-700 uppercase tracking-[0.3em] leading-none">Industrial Systems</span>
           </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className="group flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-emerald-700 transition-colors"
            >
              {link.icon && <span className="text-emerald-700/60 group-hover:text-emerald-700 transition-colors">{link.icon}</span>}
              {link.name}
            </a>
          ))}
          
          <a 
            href="tel:88056490"
            className="flex items-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-900/10 active:scale-95 text-[10px] uppercase tracking-widest"
          >
            <Phone size={14} />
            88056490
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button 
          className="lg:hidden p-3 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 active:scale-90 transition-transform"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 py-10 px-6 transition-all duration-500 origin-top overflow-hidden ${
        mobileMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible h-0'
      }`}>
        <div className="flex flex-col gap-6">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-4 text-xs font-black text-slate-900 uppercase tracking-widest p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-emerald-700/20 active:bg-emerald-50 transition-all"
            >
              <div className="p-2 bg-emerald-700 text-white rounded-lg">
                {link.icon || <Calculator size={14} />}
              </div>
              {link.name}
            </a>
          ))}
          <a 
             href="tel:88056490"
             className="flex items-center justify-center gap-4 bg-emerald-700 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-xs mt-4 shadow-xl shadow-emerald-900/20"
          >
             <Phone size={18} />
             Холбоо барих
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;