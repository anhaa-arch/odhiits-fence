import React, { useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fences } from '../data/fences';

const FencesCarousel = ({ onProductClick }) => {
  const scrollRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    const scrollSpeed = 0.4; // Slightly different speed for variation

    const step = () => {
      if (!isPaused.current) {
        scrollContainer.scrollLeft += scrollSpeed;
        
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
    <section id="fences" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-emerald-700 font-black uppercase tracking-[0.3em] text-xs mb-2 block">Шийдэл</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Хашааны төрөл</h2>
            <div className="h-1.5 w-24 bg-emerald-600 rounded-full"></div>
          </div>
          <p className="mt-4 md:mt-0 text-slate-500 max-w-md font-medium">
            Бат бөх байдал, гоо зүйн төгс хослол. Байгальд ээлтэй будгийн системээр будсан.
          </p>
        </div>
        
        <div 
          ref={scrollRef}
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
          className="flex overflow-x-auto pb-12 gap-6 snap-x no-scrollbar"
          style={{ scrollBehavior: 'auto' }}
        >
          {fences.map((fence) => (
            <div key={fence.id} className="min-w-[300px] md:min-w-[350px] snap-start">
              <ProductCard 
                name={fence.name}
                image={fence.image}
                description={fence.description}
                onZoom={() => onProductClick(fence)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FencesCarousel;

