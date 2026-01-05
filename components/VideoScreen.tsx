
import React, { useState } from 'react';
import { Video } from '../types';
import { ArrowLeft, Play, X, Video as VideoIcon } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10 min-h-screen">
      
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
        <h1 className="text-5xl md:text-7xl font-display text-white mb-8 tracking-tight uppercase leading-tight">
          Výuková <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientText}`}>videa</span>
        </h1>
        <p className="text-gray-300 max-w-3xl text-xl md:text-2xl font-light leading-relaxed">
          Názorné ukázky a odborné výklady ve videoformátu pro lepší pochopení probírané látky.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="group relative h-full animate-fade-in-up text-left"
            style={{ animationDelay: `${200 + (index * 50)}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-${colorClass}-500/0 via-${colorClass}-500/20 to-blue-600/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}></div>
            <div className={`relative h-full bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:bg-[#0a0a0a]/90 transition-all duration-300 group-hover:border-${colorClass}-500/40 hover:-translate-y-2`}>
              
              {/* Thumbnail with Enhanced Play Overlay */}
              <div className="aspect-video bg-black/50 relative flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                  alt={video.title} 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-20 h-20 rounded-full bg-${colorClass}-500/30 border-2 border-${colorClass}-500/50 backdrop-blur-md flex items-center justify-center group-hover:scale-125 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]`}>
                        <Play className={`w-10 h-10 text-${colorClass}-300 fill-${colorClass}-300 ml-1`} />
                    </div>
                </div>
              </div>

              <div className="p-8 md:p-10">
                <div className={`text-xs font-bold font-mono text-${colorClass}-500 mb-4 uppercase tracking-[0.3em]`}>Záznam lekce {index + 1}</div>
                <h3 className="text-3xl font-bold text-white mb-4 font-display uppercase group-hover:text-${colorClass}-300 transition-colors leading-tight">{video.title}</h3>
                <p className="text-lg text-gray-400 font-light leading-relaxed group-hover:text-gray-200 transition-colors">
                  {video.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Video Modal / Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={() => setSelectedVideo(null)}></div>
            <div className="relative w-full max-w-6xl aspect-video bg-black rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-fade-in-up">
                <button 
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-6 right-6 z-10 w-14 h-14 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-md border border-white/10"
                >
                    <X className="w-8 h-8" />
                </button>
                <iframe 
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedVideo.title}
                ></iframe>
            </div>
        </div>
      )}
    </div>
  );
};

export default VideoScreen;
