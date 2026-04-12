import React, { useState, useEffect } from 'react';
import { videos } from '../data/videos';
import { Play, X, Maximize2, PlayCircle, ArrowRight } from 'lucide-react';

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const filtered = activeCategory === 'all' 
      ? videos 
      : videos.filter(v => v.category === activeCategory);
    setFilteredVideos(filtered);
    if (filtered.length > 0) {
      setSelectedVideo(filtered[0]);
    }
  }, [activeCategory]);

  const categories = [
    { id: 'all', name: 'Бүгд' },
    { id: 'fence', name: 'Хашаа' },
    { id: 'gate', name: 'Хаалга' },
    { id: 'installation', name: 'Суурилуулалт' }
  ];

  const openMobileVideo = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const renderMobileReels = () => (
    <div className="lg:hidden space-y-6">
      <div className="flex flex-col gap-6 overflow-y-auto max-h-[80vh] custom-scrollbar snap-y snap-mandatory px-2">
        {filteredVideos.map((video) => (
          <div 
            key={video.id} 
            onClick={() => openMobileVideo(video)}
            className="snap-start relative aspect-[9/16] w-full max-w-[320px] mx-auto rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl group active:scale-[0.98] transition-all"
          >
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center text-primary border border-primary/30 group-hover:scale-110 transition-transform">
                <Play size={32} fill="currentColor" />
              </div>
            </div>

            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
              <div className="flex gap-2">
                <span className="bg-primary text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">REEL</span>
                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter border border-white/10">
                  {video.category}
                </span>
              </div>
              <h4 className="text-white font-black text-lg leading-tight line-clamp-2">{video.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="videos" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-8 text-center lg:text-left">
          <div className="space-y-3">
             <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">SHOWCASE</span>
             <h2 className="text-4xl md:text-5xl lg:text-7xl font-black heading-industrial leading-none">
                Видео <span className="text-primary italic">студи</span>
             </h2>
             <p className="text-slate-400 max-w-xl mx-auto lg:mx-0">
                ODHIITS-ийн бодит суурилуулалт, бүтээгдэхүүний танилцуулга болон үйлдвэрлэлийн явц.
             </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 bg-slate-900/50 p-2 rounded-2xl border border-slate-800 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? 'bg-primary text-slate-950 shadow-lg shadow-primary/20' 
                    : 'text-slate-500 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
          {/* Main Cinematic Player */}
          <div className="space-y-8">
            <div className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden glass-metal neon-border p-2 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <video 
                key={selectedVideo.url}
                src={selectedVideo.url} 
                className="w-full h-full object-cover rounded-[2rem]"
                controls
                autoPlay
                muted
              />
            </div>
            
            <div className="glass-metal p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <PlayCircle size={120} strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] border border-primary/20">
                    Featured Project
                  </span>
                  <span className="text-slate-500 text-xs font-black uppercase tracking-[0.1em]">
                    {selectedVideo.category}
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-wider leading-tight">
                  {selectedVideo.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-xl max-w-3xl">
                  {selectedVideo.description}
                </p>
                <div className="mt-10 pt-8 border-t border-slate-800/50">
                   <a href="#products" className="inline-flex items-center gap-4 text-primary font-black uppercase tracking-[0.2em] text-xs hover:gap-6 transition-all group">
                      Эдгээр загваруудыг үзэх <ArrowRight size={16} />
                   </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Playlist */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Тоглуулах жагсаалт</span>
              <span className="text-[10px] font-black text-primary px-2 py-0.5 rounded bg-primary/10">{filteredVideos.length} бичлэг</span>
            </div>
            
            <div className="flex flex-col gap-4 max-h-[850px] overflow-y-auto custom-scrollbar pr-4">
              {filteredVideos.map((video) => (
                <button 
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`flex gap-5 p-5 rounded-3xl cursor-pointer transition-all duration-500 border text-left group ${
                    selectedVideo.id === video.id 
                      ? 'bg-primary/5 border-primary shadow-[0_0_20px_rgba(34,211,238,0.05)] border-l-[6px]' 
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="relative w-36 h-24 flex-shrink-0 rounded-2xl overflow-hidden border border-slate-800">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-10 h-10 bg-primary/10 rounded-full backdrop-blur-sm flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                        {selectedVideo.id === video.id ? (
                          <div className="flex gap-1 items-end h-3">
                            <div className="w-1 h-3 bg-primary animate-[bounce_1s_infinite]" />
                            <div className="w-1 h-2 bg-primary animate-[bounce_1.2s_infinite]" />
                            <div className="w-1 h-3 bg-primary animate-[bounce_0.8s_infinite]" />
                          </div>
                        ) : (
                          <Play size={16} fill="currentColor" className="translate-x-0.5" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow py-1 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                        {video.category}
                      </span>
                      {selectedVideo.id === video.id && (
                        <span className="text-[8px] font-black bg-primary text-slate-950 px-2 py-1 rounded-full animate-pulse tracking-tighter">PLAYING</span>
                      )}
                    </div>
                    <h4 className={`font-bold text-sm leading-tight transition-colors ${selectedVideo.id === video.id ? 'text-primary' : 'text-slate-300 group-hover:text-white'}`}>
                      {video.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View: TikTok Styled Reels */}
        {renderMobileReels()}

        {/* Mobile Modal Player */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center lg:hidden">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white border border-slate-800 active:scale-90 transition-transform"
            >
              <X size={24} />
            </button>
            <div className="w-full aspect-video bg-black relative">
              <video 
                src={selectedVideo.url} 
                className="w-full h-full object-contain"
                controls
                autoPlay
              />
            </div>
            <div className="p-8 w-full max-w-md space-y-4">
               <div className="flex gap-2">
                  <span className="bg-primary/20 text-primary text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider border border-primary/10">Project: {selectedVideo.category}</span>
               </div>
               <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-wider">{selectedVideo.title}</h3>
               <p className="text-slate-400 text-sm leading-relaxed">{selectedVideo.description}</p>
               <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-slate-900 text-white font-black py-4 rounded-xl border border-slate-800 mt-8"
               >
                  Жагсаалт руу буцах
               </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoGallery;
