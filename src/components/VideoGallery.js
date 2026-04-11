import React, { useState, useEffect } from 'react';
import { videos } from '../data/videos';

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredVideos, setFilteredVideos] = useState(videos);

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
    { id: 'gate', name: 'Хаалга' },
    { id: 'fence', name: 'Хашаа' },
    { id: 'other', name: 'Бусад' }
  ];

  return (
    <section id="videos" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Видео галерей</h2>
          <div className="h-1.5 w-24 bg-emerald-500 rounded-full mx-auto mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
              <video 
                key={selectedVideo.url}
                src={selectedVideo.url} 
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
              />
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-emerald-400 mb-2">{selectedVideo.title}</h3>
              <p className="text-slate-400 leading-relaxed">{selectedVideo.description}</p>
            </div>
          </div>

          {/* Thumbnail List */}
          <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredVideos.map((video) => (
              <div 
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`flex gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                  selectedVideo.id === video.id 
                    ? 'bg-emerald-900/20 border-emerald-500/50' 
                    : 'bg-slate-800/50 border-transparent hover:bg-slate-800'
                }`}
              >
                <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-6 h-6 bg-white/30 rounded-full backdrop-blur-sm flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
                    </div>
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-sm line-clamp-2 leading-tight">{video.title}</h4>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 mt-1 inline-block">
                    {video.category === 'gate' ? 'Хаалга' : video.category === 'fence' ? 'Хашаа' : 'Төмөр хийц'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
