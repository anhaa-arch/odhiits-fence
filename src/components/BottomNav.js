import React, { useState, useEffect } from 'react';
import { Home, Calculator, Package, Phone } from 'lucide-react';

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('hero');

  const tabs = [
    { id: 'hero', name: 'Нүүр', icon: Home },
    { id: 'pricing-calc', name: 'Үнэ', icon: Calculator },
    { id: 'products', name: 'Бүтээгдэхүүн', icon: Package },
    { id: 'contact', name: 'Холбоо', icon: Phone },
  ];

  const handleScroll = () => {
    const sections = tabs.map(tab => document.getElementById(tab.id));
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
        setActiveTab(section.id);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-[60] md:hidden bg-slate-950/90 backdrop-blur-md border-t border-slate-800 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            className="flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all duration-300 relative py-1"
          >
            <div className={`transition-transform duration-300 ${activeTab === tab.id ? '-translate-y-1' : ''}`}>
              <tab.icon 
                size={22} 
                className={activeTab === tab.id ? 'text-primary' : 'text-slate-500'} 
              />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
              activeTab === tab.id ? 'text-primary' : 'text-slate-500'
            }`}>
              {tab.name}
            </span>
            {activeTab === tab.id && (
              <span className="absolute -top-1 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
