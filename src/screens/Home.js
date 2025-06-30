// Home page screen

import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import FenceCard from '../components/FenceCard';
import FeatureSection from '../components/FeatureSection';
import Testimonial from '../components/Testimonial';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Home.css'; // We'll create this file for custom styles
import PublicReview from '../components/PublicReview';
import PriceCard from '../components/PriceCard';
import API_URL from '../api/config';

function Home() {
  const [fences, setFences] = useState([]);
  const [gates, setGates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gatesLoading, setGatesLoading] = useState(true);
  const [gatesError, setGatesError] = useState(null);
  const [selectedPriceCard, setSelectedPriceCard] = useState(null);

  const getCarouselConfig = (isMobile) => ({
    showArrows: true,
    showStatus: false,
    showThumbs: false,
    infiniteLoop: true,
    autoPlay: true,
    interval: 5000,
    stopOnHover: true,
    swipeable: true,
    emulateTouch: true,
    centerMode: !isMobile,
    centerSlidePercentage: isMobile ? 80 : 33.33,
    selectedItem: 0
  });
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [carouselOptions, setCarouselOptions] = useState(getCarouselConfig(isMobile));

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        setCarouselOptions(getCarouselConfig(mobile));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/fences`).then(res => res.json()),
      fetch(`${API_URL}/gates`).then(res => res.json())
    ])
    .then(([fencesData, gatesData]) => {
      setFences(fencesData);
      setGates(gatesData);
      setLoading(false);
    })
    .catch(error => {
      console.error("Failed to fetch products:", error);
      setError('Бүтээгдэхүүнүүдийг татахад алдаа гарлаа.');
      setLoading(false);
    });
  }, []);

  const handlePriceCardSelect = (title) => {
    setSelectedPriceCard(selectedPriceCard === title ? null : title);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Video */}
      <section className="relative h-screen md:h-[85vh] overflow-hidden">
        {/* Video Background */}
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
          poster="/images/fence1.jpg"
        >
          <source src="/videos/header.mp4" type="video/mp4" />
          Таны хөтөч видео тоглуулах боломжгүй байна.
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight animate-fade-in">
              Таны хэрэгцээнд нийцсэн
              <span className="block mt-2 text-green-400">чанартай төмөр хашаа</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Таны үл хөдлөхөд зориулсан бат бөх, урт удаан эдэлгээтэй шийдэл.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/fences"
                className="bg-green-600 text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-lg hover:bg-green-500 transition duration-300 text-base md:text-lg w-full sm:w-auto"
              >
                Сонголтуудыг үзэх
              </Link>
              <Link 
                to="/contact"
                className="bg-white/10 backdrop-blur-sm text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-lg hover:bg-white/20 transition duration-300 text-base md:text-lg border border-white/30 w-full sm:w-auto"
              >
                Холбоо барих
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-[30px] h-[50px] rounded-full border-2 border-white/50 flex items-center justify-center">
            <div className="w-[2px] h-[20px] bg-white/50 rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main>
        {/* Fence Options */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Хашааны төрөл</h2>
            {loading ? (
              <div className="text-center text-gray-600">Уншиж байна...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <Carousel {...carouselOptions}>
                {fences.map(fence => (
                  <div key={fence._id} className="p-4 h-full">
                    <FenceCard product={{...fence, productType: 'fence'}} />
                  </div>
                ))}
              </Carousel>
            )}
          </div>
        </section>

        {/* Gate Options */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Хаалганы төрөл</h2>
            {gatesLoading ? (
              <div className="text-center text-gray-600">Уншиж байна...</div>
            ) : gatesError ? (
              <div className="text-center text-red-500">{gatesError}</div>
            ) : (
              <Carousel {...carouselOptions}>
                {gates.map(gate => (
                  <div key={gate._id} className="p-4 h-full">
                    <FenceCard product={{...gate, productType: 'gate'}} />
                  </div>
                ))}
              </Carousel>
            )}
          </div>
        </section>

        {/* Price Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Манай үнийн санал</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PriceCard 
                title="Энгийн"
                price="100,000₮"
                features={[
                  "Энгийн хашаа",
                  "Суурь суулгах",
                  "Угсралт"
                ]}
                isSelected={selectedPriceCard === "Энгийн"}
                onSelect={() => handlePriceCardSelect("Энгийн")}
              />
              <PriceCard 
                title="Дунд"
                price="200,000₮"
                features={[
                  "Чанартай хашаа",
                  "Суурь суулгах",
                  "Угсралт",
                  "1 жилийн баталгаа"
                ]}
                isSelected={selectedPriceCard === "Дунд"}
                onSelect={() => handlePriceCardSelect("Дунд")}
              />
              <PriceCard 
                title="Премиум"
                price="300,000₮"
                features={[
                  "Өндөр чанартай хашаа",
                  "Суурь суулгах",
                  "Мэргэжлийн угсралт",
                  "2 жилийн баталгаа",
                  "Үнэгүй засвар үйлчилгээ"
                ]}
                isSelected={selectedPriceCard === "Премиум"}
                onSelect={() => handlePriceCardSelect("Премиум")}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeatureSection />

        {/* Testimonials */}
        <Testimonial />

        {/* Public Reviews */}
        <PublicReview />
      </main>

      <Footer />
    </div>
  );
}

export default Home;