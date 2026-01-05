
import React, { useState } from 'react';
import { Video } from '../types';
import { ArrowLeft, Play, X, Video as VideoIcon, ChevronRight, ChevronLeft } from 'lucide-react';

interface Props {
  videos: Video[];
  onBack: () => void;
  theme?: 'emerald' | 'purple';
}

const VideoScreen: React.FC<Props> = ({ videos, onBack, theme = 'emerald' }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const isPurple = theme === 'purple';
  const colorClass = isPurple ? 'purple' : 'emerald';
  const glowColor = isPurple ? 'rgba(168, 85, 247, 0.4)' : 'rgba(16, 185, 129, 0.4)';

  return (
    <div className="w-full min-h-screen relative z-10 bg-[#050505]">
      
      {/* Dynamic Background */}
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
          <h1 className="text-3xl md:text-5xl font-display text-white mb-4 tracking-tight uppercase">
            Video <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isPurple ? 'from-purple-400 to-pink-500' : 'from-emerald-400 to-cyan-500'}`}>Lekce</span>
          </h1>
          <p className="text-gray-500 max-w-2xl text-base md:text-lg font-light">
            Vyberte si ze seznamu záznamů a prohlubte své znalosti.
          </p>
        </header>
      </div>

      {/* Netflix Row */}
      <div className="w-full py-10 relative group/row overflow-visible">
        <div className="flex gap-4 md:gap-6 overflow-x-auto px-6 md:px-20 no-scrollbar snap-x pb-20 pt-10">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-[280px] md:w-[400px] snap-center perspective-1000 group/item"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setSelectedVideo(video)}
                className="relative w-full aspect-video rounded-2xl overflow-hidden transition-all duration-500 ease-out transform group-hover/item:scale-110 group-hover/item:z-50 group-hover/item:-translate-y-4 border border-white/5 group-hover/item:border-white/30 shadow-2xl"
              >
                {/* Image */}
                <div className="absolute inset-0 bg-black">
                  <img 
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                    alt={video.title} 
                    className="w-full h-full object-cover opacity-60 group-hover/item:opacity-90 transition-opacity"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`; }}
                  />
                </div>

                {/* Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
                
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div className="translate-y-4 group-hover/item:translate-y-0 transition-transform duration-300">
                        <div className={`text-[9px] font-bold font-mono text-${colorClass}-400 mb-1 uppercase tracking-widest`}>Kapitola {index + 1}</div>
                        <h3 className="text-base md:text-lg font-bold text-white mb-2 font-display uppercase leading-tight line-clamp-1">{video.title}</h3>
                        <p className="text-[11px] text-gray-400 font-light line-clamp-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                          {video.description}
                        </p>
                        
                        <div className="flex items-center gap-3 mt-4 opacity-0 group-hover/item:opacity-100 transition-all duration-300 translate-y-2 group-hover/item:translate-y-0">
                           <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                           </div>
                           <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Přehrát nyní</span>
                        </div>
                    </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none`}
                     style={{ boxShadow: `inset 0 0 40px ${glowColor}` }}></div>
              </button>
            </div>
          ))}
        </div>
        
        {/* Navigation Hints */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-row:opacity-100 transition-opacity hidden md:block">
           <ChevronLeft className="w-6 h-6 text-white" />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-row:opacity-100 transition-opacity hidden md:block">
           <ChevronRight className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-fade-in" onClick={() => setSelectedVideo(null)}></div>
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-none md:rounded-3xl overflow-hidden border border-white/10 shadow-3xl animate-fade-in-up">
                <button 
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
                >
                    <X className="w-5 h-5" />
                </button>
                <iframe 
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
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
