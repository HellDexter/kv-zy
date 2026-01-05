
import React, { useState } from 'react';
import { Video } from '../types';
import { ArrowLeft, Play, X, Video as VideoIcon, Youtube } from 'lucide-react';

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
        className="mb-12 text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group animate-fade-in-up font-mono"
      >
        <div className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-${colorClass}-500/30 group-hover:bg-${colorClass}-500/10 transition-all`}>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span>Zpět do menu</span>
      </button>

      <header className="mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-${colorClass}-500/30 bg-${colorClass}-500/5 text-${colorClass}-400 text-[10px] uppercase tracking-widest mb-6 backdrop-blur-sm font-mono`}>
          <VideoIcon className="w-3 h-3" />
          Video tutoriály
        </div>
        <h1 className="text-4xl md:text-6xl font-display text-white mb-6 tracking-tight uppercase">
          Výuková <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientText}`}>videa</span>
        </h1>
        <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
          Názorné ukázky a odborné výklady ve videoformátu pro lepší pochopení probírané látky.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="group relative h-full animate-fade-in-up text-left"
            style={{ animationDelay: `${200 + (index * 50)}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-${colorClass}-500/0 via-${colorClass}-500/20 to-blue-600/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`}></div>
            <div className={`relative h-full bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:bg-[#0a0a0a]/90 transition-all duration-300 group-hover:border-${colorClass}-500/30 hover:-translate-y-1`}>
              
              {/* Thumbnail Placeholder with Icon */}
              <div className="aspect-video bg-black/50 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <img 
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                  alt={video.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-14 h-14 rounded-full bg-${colorClass}-500/20 border border-${colorClass}-500/50 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Play className={`w-6 h-6 text-${colorClass}-400 fill-${colorClass}-400`} />
                    </div>
                </div>
              </div>

              <div className="p-6">
                <div className={`text-[10px] font-bold font-mono text-${colorClass}-500 mb-2 uppercase tracking-[0.2em]`}>Video {index + 1}</div>
                <h3 className="text-xl font-bold text-white mb-3 font-display uppercase group-hover:text-${colorClass}-300 transition-colors">{video.title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed group-hover:text-gray-400 transition-colors">
                  {video.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Video Modal / Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedVideo(null)}></div>
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in-up">
                <button 
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                    <X className="w-5 h-5" />
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
