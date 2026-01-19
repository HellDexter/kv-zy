
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Newspaper, ExternalLink, Loader2, AlertTriangle, RefreshCw, Languages, Calendar, Globe } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  onBack: () => void;
}

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  translatedTitle?: string;
  translatedDescription?: string;
}

const NEWS_API_KEY = 'c13df6842d144e2289e1d60c2d49a9d0';

const CyberNews: React.FC<Props> = ({ onBack }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch news related to cybersecurity
      const response = await fetch(`https://newsapi.org/v2/everything?q=cybersecurity+OR+hacking+OR+ransomware&language=en&sortBy=publishedAt&pageSize=6&apiKey=${NEWS_API_KEY}`);
      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message || 'Nepodařilo se načíst zprávy.');
      }

      setArticles(data.articles);
      // Automatically trigger translation once we have articles
      if (data.articles && data.articles.length > 0) {
        translateArticles(data.articles);
      }
    } catch (err: any) {
      setError(err.message || 'Chyba při komunikaci s NewsAPI.');
    } finally {
      setIsLoading(false);
    }
  };

  const translateArticles = async (rawArticles: Article[]) => {
    setIsTranslating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // We send all titles and descriptions in one batch to save tokens and time
      const translationPrompt = rawArticles.map((a, i) => `[${i}] TITLE: ${a.title}\nDESC: ${a.description}`).join('\n\n');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: `Translate the following cybersecurity news articles into Czech. Keep the tone professional. Use this JSON structure for output: [{"id": 0, "title": "...", "desc": "..."}, ...]. 
        
        Articles:
        ${translationPrompt}` }] }],
        config: { 
          responseMimeType: "application/json"
        }
      });

      const translatedData = JSON.parse(response.text);
      
      setArticles(prev => prev.map((art, idx) => {
        const trans = translatedData.find((t: any) => t.id === idx);
        return {
          ...art,
          translatedTitle: trans?.title || art.title,
          translatedDescription: trans?.desc || art.description
        };
      }));
    } catch (err) {
      console.error("Translation error:", err);
      // We don't set a global error here, users can still read the original English
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative z-10 min-h-screen">
      <button onClick={onBack} className="mb-10 text-gray-500 hover:text-white transition-all flex items-center gap-3 text-xs font-bold tracking-widest uppercase font-mono group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Zpět do menu
      </button>

      <header className="mb-12 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-[10px] uppercase tracking-widest font-mono">
            <Globe className="w-3 h-3" /> World News Feed
          </div>
          <button 
            onClick={fetchNews}
            disabled={isLoading}
            className="text-gray-500 hover:text-white transition-colors"
            title="Aktualizovat feed"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-display text-white mb-4 uppercase tracking-tighter leading-none">
           Kyber <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Zprávy</span>
        </h1>
        <p className="text-gray-400 font-light max-w-2xl leading-relaxed">
           Sledujte nejnovější dění v kyberprostoru. Zprávy z celého světa jsou v reálném čase analyzovány a překládány pomocí <strong>Gemini 3 Flash</strong>.
        </p>
      </header>

      {/* STATUS BAR */}
      <div className="flex items-center justify-between mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
         <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest">
            <div className="flex items-center gap-2 text-gray-500">
               <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
               Status: {isLoading ? 'Načítání' : 'Synchronizováno'}
            </div>
            {isTranslating && (
              <div className="flex items-center gap-2 text-amber-500">
                 <Languages className="w-3 h-3 animate-pulse" /> AI Překlad...
              </div>
            )}
         </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[1,2,3,4,5,6].map(i => (
             <div key={i} className="bg-white/5 border border-white/5 rounded-3xl h-[400px] animate-pulse"></div>
           ))}
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-[2.5rem] p-12 text-center">
           <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-6" />
           <h2 className="text-xl font-display text-white mb-2 uppercase tracking-wide">Chyba načítání</h2>
           <p className="text-gray-500 text-sm mb-8">{error}</p>
           <button onClick={fetchNews} className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest">Zkusit znovu</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {articles.map((article, idx) => (
             <div 
               key={idx} 
               className="group relative flex flex-col bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-amber-500/30 transition-all duration-500 animate-fade-in-up"
               style={{ animationDelay: `${idx * 100}ms` }}
             >
                <div className="relative aspect-video overflow-hidden">
                   <img 
                     src={article.urlToImage || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'} 
                     alt="" 
                     className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                   <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[8px] font-mono text-gray-300 uppercase tracking-widest">
                      {article.source.name}
                   </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                   <div className="flex items-center gap-2 text-[8px] text-gray-600 font-mono uppercase mb-4 tracking-tighter">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.publishedAt).toLocaleDateString('cs-CZ')}
                   </div>

                   <h3 className="text-lg font-bold text-white mb-3 font-display uppercase tracking-tight leading-tight group-hover:text-amber-400 transition-colors">
                      {article.translatedTitle || article.title}
                   </h3>

                   <p className="text-xs text-gray-500 leading-relaxed font-light mb-6 line-clamp-4">
                      {article.translatedDescription || article.description}
                   </p>

                   <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-all group/link"
                      >
                         Číst originál <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                      {article.translatedTitle && (
                        <div className="flex items-center gap-1.5 text-[8px] text-amber-500/60 font-mono uppercase">
                           <Languages className="w-3 h-3" /> AI Přeloženo
                        </div>
                      )}
                   </div>
                </div>
             </div>
           ))}
        </div>
      )}

      {/* FOOTER INFO */}
      <div className="mt-20 border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
         <div>
            <h4 className="text-white font-display text-sm mb-2 uppercase tracking-wider">Zdrojování dat</h4>
            <p className="text-xs text-gray-600 leading-relaxed max-w-sm">
               Data jsou čerpána z NewsAPI.org. Překlad je generován automaticky a může obsahovat drobné nepřesnosti v technických termínech.
            </p>
         </div>
         <div className="flex gap-4">
            <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
               <div className="text-[9px] text-gray-500 uppercase font-mono mb-1">Dnešní zprávy</div>
               <div className="text-white text-xl font-bold font-mono">150+</div>
            </div>
            <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
               <div className="text-[9px] text-gray-500 uppercase font-mono mb-1">Rychlost překladu</div>
               <div className="text-white text-xl font-bold font-mono">&lt;2s</div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CyberNews;
