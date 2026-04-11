import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Нүүр', href: '/#hero' },
    { name: 'Хаалга', href: '/#gates' },
    { name: 'Хашаа', href: '/#fences' },
    { name: 'Видео', href: '/#videos' },
    { name: 'Холбоо барих', href: '/#contact' },
  ];

  const handleLinkClick = (e, href) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = href.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-emerald-900/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-emerald-500 transition-colors shadow-lg">
            Б
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-white tracking-tighter leading-none">БАТХӨНГОР</span>
            <span className="text-[10px] font-bold text-emerald-400 tracking-[0.2em] leading-none mt-1 uppercase">ХИЙЦ</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-semibold text-white/90 hover:text-white transition-colors relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <Link 
            to="/admin/login" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-emerald-500/20"
          >
            Нэвтрэх
          </Link>
        </nav>

        {/* Hamburger */}
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2" 
          onClick={() => setOpen(!open)} 
          aria-label="Цэс"
        >
          <span className={`w-6 h-0.5 bg-white rounded-full transition-all ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white rounded-full transition-all ${open ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white rounded-full transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-emerald-950/95 z-40 md:hidden transition-all duration-500 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.href}
              onClick={(e) => {
                handleLinkClick(e, link.href);
                setOpen(false);
              }}
              className="text-2xl font-bold text-white hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/admin/login" 
            onClick={() => setOpen(false)}
            className="mt-4 bg-emerald-600 text-white text-lg font-bold px-10 py-4 rounded-full"
          >
            Нэвтрэх
          </Link>
          
          <button 
            className="absolute top-8 right-8 text-white text-3xl"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
 