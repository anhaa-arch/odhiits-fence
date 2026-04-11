import React, { useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import { gates } from '../data/gates';

const GatesCarousel = ({ onProductClick }) => {
  const scrollRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    const scrollSpeed = 0.5; // Adjust speed here (lower is slower)

    const step = () => {
      if (!isPaused.current) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        // Loop back to start smoothly
        if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth)) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section id="gates" className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-emerald-700 font-black uppercase tracking-[0.3em] text-xs mb-2 block">Сонголтууд</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Хаалганы төрөл</h2>
            <div className="h-1.5 w-24 bg-emerald-600 rounded-full"></div>
          </div>
          <p className="mt-4 md:mt-0 text-slate-500 max-w-md font-medium">
            Бид 4 болон 5 метрийн стандарт хаалгануудаас гадна таны хүссэн хэмжээгээр үйлдвэрлэнэ.
          </p>
        </div>
        
        <div 
          ref={scrollRef}
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
          className="flex overflow-x-auto pb-12 gap-6 snap-x no-scrollbar"
          style={{ scrollBehavior: 'auto' }}
        >
          {gates.map((gate) => (
            <div key={gate.id} className="min-w-[300px] md:min-w-[350px] snap-start">
              <ProductCard 
                name={gate.name}
                image={gate.image}
                description={gate.description}
                onZoom={() => onProductClick(gate)}
              />
            </div>
          ))}
          {/* Duplicate items for a continuous feel if needed, but simple loop is fine */}
        </div>
      </div>
    </section>
  );
};

export default GatesCarousel;

