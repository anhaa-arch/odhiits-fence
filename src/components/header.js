import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

// Header component

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full border-b mb-4 bg-green-600 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-xl font-bold text-white">Батхонгор Хийц</div>
        <nav className="hidden md:flex gap-6">
          <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold text-white' : 'text-white'} end>Нүүр</NavLink>
        
          <NavLink to="/fences" className={({ isActive }) => isActive ? 'font-bold text-white' : 'text-white'}>Хашаа</NavLink>
          <NavLink to="/gates" className={({ isActive }) => isActive ? 'font-bold text-white' : 'text-white'}>Хаалга</NavLink>
          <NavLink to="/pricing" className={({ isActive }) => isActive ? 'font-bold text-white' : 'text-white'}>Үнийн санал</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'font-bold text-white' : 'text-white'}>Бидний тухай</NavLink>
          <NavLink to="/blog" className={({ isActive }) => isActive ? 'font-bold text-white' : 'text-white'}>Блог</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'font-bold text-white' : 'text-white'}>Холбоо барих</NavLink>
          <NavLink to="/admin/login" className={({ isActive }) => isActive ? 'font-bold text-white' : 'text-white'}>Нэвтрэх </NavLink>
        </nav>
        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1" onClick={() => setOpen(!open)} aria-label="Цэс">
          <span className="w-7 h-1 bg-green-900 rounded"></span>
          <span className="w-7 h-1 bg-green-900 rounded"></span>
          <span className="w-7 h-1 bg-green-900 rounded"></span>
        </button>
      </div>
      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-30" onClick={() => setOpen(false)}>
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-6 z-40" onClick={e => e.stopPropagation()}>
            <button className="self-end mb-4" onClick={() => setOpen(false)} aria-label="Хаах">
              <span className="text-2xl">×</span>
            </button>
            <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'font-bold text-green-900' : ''} end>Нүүр</NavLink>
           
            <NavLink to="/fences" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'font-bold text-white' : ''}>Хашаа</NavLink>
            <NavLink to="/gates" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'font-bold text-white' : ''}>Хаалга</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'font-bold text-white' : ''}>Бидний тухай</NavLink>
            <NavLink to="/pricing" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'font-bold text-white' : ''}>Үнийн санал</NavLink>
            <NavLink to="/blog" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'font-bold text-white' : ''}>Блог</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'font-bold text-white' : ''}>Холбоо барих</NavLink>
            <NavLink to="/admin/login" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'font-bold text-blue-700' : 'text-green-900'}>Нэвтрэх</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header; 