
import React, { useState } from 'react';
import { Video } from '../types';
import { ArrowLeft, Play, X, Video as VideoIcon, Info } from 'lucide-react';

interface Props {
  videos: Video[];
  onBack: () => void;
  theme?: 'emerald' | 'purple';
}

const VideoScreen: React.FC<Props> = ({ videos, onBack, theme = 'emerald' }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const isPurple = theme === 'purple';
  const colorClass = isPurple ? 'purple' : 'emerald';
  const gradientText = isPurple ? 'from-purple-300 to-pink-400' : 'from-emerald-300 to-teal-400';

  return (
    <div className="w-full min-h-screen relative z-10 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className={`fixed inset-0 bg-gradient-to-b from-${colorClass}-950/20 via-black to-black pointer-events-none -z-10`}></div>

      <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-20">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="mb-12 text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-4 text-sm font-bold tracking-widest uppercase group animate-fade-in-up font-mono"
        >
          <div className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-${colorClass}-500/30 group-hover:bg-${colorClass}-500/10 transition-all`}>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Zpět do menu</span>
        </button>

        <header className="mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-${colorClass}-500/30 bg-${colorClass}-500/5 text-${colorClass}-400 text-xs uppercase tracking-widest mb-8 backdrop-blur-sm font-mono`}>
            <VideoIcon className="w-4 h-4" />
            Video tutoriály
          </div>
          <h1 className="text-4xl md:text-7xl font-display text-white mb-6 tracking-tight uppercase leading-tight">
            Výuková <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientText}`}>knihovna</span>
          </h1>
          <p className="text-gray-400 max-w-3xl text-lg md:text-2xl font-light leading-relaxed">
            Názorné ukázky a odborné výklady. Vyberte si záznam lekce a začněte studovat hned teď.
          </p>
        </header>
      </div>

      {/* Netflix-style Horizontal Container */}
      <div className="w-full relative py-20 overflow-visible group/list">
        <div className="max-w-7xl mx-auto px-6 mb-4">
           <h2 className="text-xl md:text-2xl font-display text-white uppercase tracking-wider mb-8">Záznamy lekcí</h2>
        </div>
        
        <div className="flex gap-6 md:gap-8 px-6 md:px-20 overflow-x-auto pb-12 scrollbar-hide no-scrollbar snap-x">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-[300px] md:w-[450px] group/item snap-center perspective-1000"
              style={{ animationDelay: `${200 + (index * 50)}ms` }}
            >
              <button
                onClick={() => setSelectedVideo(video)}
                className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 ease-out transform group-hover/item:scale-110 group-hover/item:z-50 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 group-hover/item:border-white/30"
              >
                {/* Thumbnail */}
                <div className="absolute inset-0 bg-black">
                  <img 
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                    alt={video.title} 
                    className="w-full h-full object-cover opacity-80 group-hover/item:opacity-100 transition-opacity duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-60 group-hover/item:opacity-40 transition-opacity"></div>
                
                {/* Content Overlay (Visible on Hover) */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 opacity-0 group-hover/item:opacity-100 transition-all duration-300 translate-y-4 group-hover/item:translate-y-0 bg-black/60 backdrop-blur-sm">
                    <div className={`text-[10px] md:text-xs font-bold font-mono text-${colorClass}-400 mb-2 uppercase tracking-[0.2em]`}>Lekce {index + 1}</div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-display uppercase leading-tight">{video.title}</h3>
                    <p className="text-sm text-gray-300 font-light line-clamp-2 mb-6">
                      {video.description}
                    </p>
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform`}>
                           <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all">
                           <Info className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Always visible small title for mobile/unhovered */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent group-hover/item:opacity-0 transition-opacity">
                    <h3 className="text-xs md:text-sm font-bold text-white uppercase truncate font-display">{video.title}</h3>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 mb-20">
          <div className="bg-[#0a0a0a]/50 border border-white/5 rounded-3xl p-8 md:p-12 animate-fade-in-up">
              <h3 className="text-2xl md:text-3xl font-display text-white mb-6 uppercase tracking-wider">O kurzu</h3>
              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-4xl">
                 Tato sekce obsahuje video-záznamy lekcí zaměřené na praktickou obranu v kyberprostoru. Každé video je doplněno o interaktivní kvíz, který najdete v sekci testů. Doporučujeme sledovat videa v pořadí lekcí pro nejlepší pochopení souvislostí.
              </p>
          </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-12">
            <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl animate-fade-in" onClick={() => setSelectedVideo(null)}></div>
            <div className="relative w-full max-w-6xl aspect-video bg-black rounded-none md:rounded-[2.5rem] overflow-hidden border-y md:border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-fade-in-up">
                <button 
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-4 right-4 md:top-8 md:right-8 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-md border border-white/10"
                >
                    <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <iframe 
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedVideo.title}
                ></iframe>
            </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}} />
    </div>
  );
};

export default VideoScreen;
