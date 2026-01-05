
import React, { useState, useRef, useEffect } from 'react';
import { Video } from '../types';
import { ArrowLeft, Play, X, Video as VideoIcon, ChevronRight, ChevronLeft, Info } from 'lucide-react';

interface Props {
  videos: Video[];
  onBack: () => void;
  theme?: 'emerald' | 'purple';
}

const VideoScreen: React.FC<Props> = ({ videos, onBack, theme = 'emerald' }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isPurple = theme === 'purple';
  const colorClass = isPurple ? 'purple' : 'emerald';
  const glowColor = isPurple ? 'rgba(168, 85, 247, 0.4)' : 'rgba(16, 185, 129, 0.4)';

  // Handle horizontal scroll with mouse wheel
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 2,
          behavior: 'smooth'
        });
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.8;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full min-h-screen relative z-10 bg-[#050505]">
      
      {/* Dynamic Background Ambience */}
      <div className={`fixed inset-0 bg-gradient-to-b from-${colorClass}-950/10 via-black to-black pointer-events-none -z-10`}></div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <button 
          onClick={onBack}
          className="mb-10 text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group font-mono"
        >
          <div className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-${colorClass}-500/30 transition-all`}>
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span>Zpět</span>
        </button>

        <header className="mb-12 animate-fade-in-up">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-${colorClass}-500/30 bg-${colorClass}-500/5 text-${colorClass}-400 text-[10px] uppercase tracking-widest mb-6 backdrop-blur-sm font-mono`}>
            <VideoIcon className="w-3 h-3" />
            Video tutoriály
          </div>
          <h1 className="text-3xl md:text-5xl font-display text-white mb-4 tracking-tight uppercase leading-tight">
            Výuková <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isPurple ? 'from-purple-400 to-pink-500' : 'from-emerald-400 to-cyan-500'}`}>Knihovna</span>
          </h1>
          <p className="text-gray-500 max-w-2xl text-base md:text-lg font-light leading-relaxed">
            Vyberte si ze seznamu záznamů lekcí a prohlubte své znalosti v digitální bezpečnosti.
          </p>
        </header>
      </div>

      {/* Netflix-style horizontal row */}
      <div className="w-full py-10 relative group/row overflow-visible">
        
        {/* Navigation arrows for larger viewports */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:block group-hover/row:opacity-100 opacity-0 transition-opacity">
           <button 
             onClick={() => scroll('left')}
             className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-black/80 transition-all hover:scale-110 active:scale-95"
           >
              <ChevronLeft className="w-6 h-6" />
           </button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:block group-hover/row:opacity-100 opacity-0 transition-opacity">
           <button 
             onClick={() => scroll('right')}
             className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-black/80 transition-all hover:scale-110 active:scale-95"
           >
              <ChevronRight className="w-6 h-6" />
           </button>
        </div>

        {/* Horizontal Scroll Area */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-5 md:gap-8 overflow-x-auto px-6 md:px-20 no-scrollbar snap-x pb-24 pt-10 scroll-smooth relative"
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-[280px] md:w-[400px] snap-center perspective-1000 group/item"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <button
                onClick={() => setSelectedVideo(video)}
                className="relative w-full aspect-video rounded-2xl overflow-hidden transition-all duration-500 ease-out transform group-hover/item:scale-110 group-hover/item:z-50 group-hover/item:-translate-y-4 border border-white/5 group-hover/item:border-white/40 shadow-2xl bg-black"
              >
                {/* Thumbnail Image */}
                <img 
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                  alt={video.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/item:opacity-100 transition-opacity"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`; }}
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 opacity-80 transition-opacity group-hover/item:opacity-60"></div>
                
                {/* Content info visible on hover */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end translate-y-6 group-hover/item:translate-y-0 transition-all duration-300">
                    <div className={`text-[9px] font-bold font-mono text-${colorClass}-400 mb-1 uppercase tracking-[0.2em]`}>Kapitola {(index + 1).toString().padStart(2, '0')}</div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2 font-display uppercase leading-tight line-clamp-1 group-hover/item:line-clamp-none">{video.title}</h3>
                    
                    <p className="text-[11px] text-gray-300 font-light line-clamp-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 mb-4">
                      {video.description}
                    </p>
                    
                    <div className="flex items-center gap-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform translate-y-4 group-hover/item:translate-y-0">
                       <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                       </div>
                       <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all">
                          <Info className="w-4 h-4" />
                       </div>
                    </div>
                </div>

                {/* Constant small label for unhovered state */}
                <div className="absolute bottom-4 left-4 right-4 group-hover/item:opacity-0 transition-opacity">
                    <h3 className="text-[10px] md:text-xs font-bold text-white uppercase truncate font-display tracking-wider border-l-2 border-white/30 pl-2">{video.title}</h3>
                </div>

                {/* Glow ring around hovered item */}
                <div className={`absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`}
                     style={{ boxShadow: `inset 0 0 30px ${glowColor}` }}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 mb-20">
          <div className="bg-[#0a0a0a]/40 border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm animate-fade-in-up">
              <h3 className="text-xl md:text-2xl font-display text-white mb-4 uppercase tracking-wider">O vzdělávací řadě</h3>
              <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-3xl">
                 Tato série videí pokrývá nejdůležitější aspekty bezpečnosti běžného občana v digitálním světě. Doporučujeme sledovat videa postupně. Po každém videu si můžete ověřit své znalosti v příslušném testovacím bloku.
              </p>
          </div>
      </div>

      {/* Video Fullscreen Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl animate-fade-in" onClick={() => setSelectedVideo(null)}></div>
            <div className="relative w-full max-w-6xl aspect-video bg-black rounded-none md:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] animate-fade-in-up">
                <button 
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 backdrop-blur-md"
                >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <iframe 
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .perspective-1000 { perspective: 1000px; }
      `}} />
    </div>
  );
};

export default VideoScreen;
