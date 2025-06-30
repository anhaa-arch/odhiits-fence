import React from 'react';

// Footer component

function Footer() {
  return (
    <footer className="bg-green-900 text-white py-8 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
        <div className="font-bold text-lg">Батхонгор Хийц © {new Date().getFullYear()}</div>
        <div className="flex gap-4 items-center">
          <a href="tel:99999999" className="hover:text-green-300 transition-colors">Утас: 9999-9999</a>
          <a href="mailto:info@bathongor.mn" className="hover:text-green-300 transition-colors">И-мэйл</a>
          <a href="#" className="hover:text-green-300 transition-colors" aria-label="Facebook">
            <svg className="w-5 h-5 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 