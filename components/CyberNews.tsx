
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Newspaper, ExternalLink, RefreshCw, Globe, Sparkles, MapPin, Flag, Key, Info, CheckCircle, ShieldAlert, Settings, CreditCard, AlertCircle, Languages } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  onBack: () => void;
}

interface Article {
  region: 'domestic' | 'world';
  title: string;
  description: string;
  url: string;
  source: string;
  date: string;
  category: string;
}

const CyberNews: React.FC<Props> = ({ onBack }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groundingUrls, setGroundingUrls] = useState<{title: string, uri: string}[]>([]);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const fetchNewsWithAI = async () => {
    setIsLoading(true);
    setError(null);
    setDebugInfo(null);
    setArticles([]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ 
          role: 'user', 
          parts: [{ 
            text: "Najdi 6 nejvýznamnějších aktuálních zpráv o kybernetické bezpečnosti (ransomware, úniky dat, nové zákony) za posledních 48 hodin. " +
                  "Rozděl je na 'domestic' (Česká republika) a 'world' (svět). " +
                  "Pro každou zprávu uveď: region, název, krátké shrnutí, zdroj, URL a kategorii. " +
                  "Odpověz POUZE ve formátu JSON pole objektů. Vše česky."
          }] 
        }],
        config: { 
          tools: [{ googleSearch: {} }],
        }
      });

      const text = response.text || "";
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const urls = chunks
          .filter((chunk: any) => chunk.web)
          .map((chunk: any) => ({
            title: chunk.web.title,
            uri: chunk.web.uri
          }));
        setGroundingUrls(urls);
      }

      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsedArticles = JSON.parse(jsonMatch[0]);
        setArticles(parsedArticles);
      } else {
        throw new Error("Invalid format from model");
      }

    } catch (err: any) {
      console.error("News AI Error:", err);
      const msg = err.message || "";
      if (msg.includes("403") || msg.includes("permission") || msg.includes("not found")) {
        setError("Vyhledávání vyžaduje aktivní Billing");
        setDebugInfo("Váš API klíč musí patřit k projektu se zapnutou platební kartou (Pay-as-you-go). V bezplatném tarifu Google funkci Search blokuje.");
      } else {
        setError("Chyba při propojování s internetem");
        setDebugInfo(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsWithAI();
  }, []);

  const domesticArticles = articles.filter(a => a.region === 'domestic');
  const worldArticles = articles.filter(a => a.region === 'world');

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative z-10 min-h-screen">
      <button onClick={onBack} className="mb-10 text-gray-500 hover:text-white transition-all flex items-center gap-3 text-xs font-bold tracking-widest uppercase font-mono group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Zpět do menu
      </button>

      <header className="mb-12 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-[10px] uppercase tracking-widest font-mono">
            <Sparkles className="w-3 h-3" /> Live Analysis Active
          </div>
          <button 
            onClick={fetchNewsWithAI}
            disabled={isLoading}
            className="text-gray-500 hover:text-white transition-colors p-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-display text-white mb-4 uppercase tracking-tighter leading-none">
           Kyber <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Zpravodaj</span>
        </h1>
        <p className="text-gray-400 font-light max-w-2xl leading-relaxed">
           Prohledáváme světové databáze incidentů pomocí <strong>Gemini AI</strong>. Monitorujeme hrozby v reálném čase.
        </p>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
           <div className="relative w-24 h-24 mb-10">
              <div className="absolute inset-0 border-2 border-amber-500/10 rounded-full"></div>
              <div className="absolute inset-0 border-t-2 border-amber-500 rounded-full animate-spin"></div>
              <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-amber-500/40 animate-pulse" />
           </div>
           <p className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse text-center">
              Skenuji globální incidenty...
           </p>
        </div>
      ) : error ? (
        <div className="animate-fade-in-up space-y-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-[2.5rem] p-12 text-center max-w-2xl mx-auto shadow-2xl">
             <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-6" />
             <h2 className="text-xl font-display text-white mb-2 uppercase">{error}</h2>
             <p className="text-gray-500 text-sm mb-10 max-w-md mx-auto leading-relaxed">{debugInfo}</p>
             <div className="flex flex-wrap justify-center gap-4">
                <button onClick={fetchNewsWithAI} className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg">Zkusit znovu</button>
             </div>
          </div>

          <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 max-w-2xl mx-auto">
             <h3 className="text-white font-display text-xs mb-8 uppercase tracking-widest flex items-center gap-2">
                <Settings className="w-4 h-4 text-amber-500" /> Kontrolní seznam pro zprovoznění
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CheckItem icon={<CheckCircle className="text-emerald-500" />} label="Gemini API" sub="Povolené v Google Cloud" />
                <CheckItem icon={<CreditCard className="text-amber-500" />} label="Billing Active" sub="Nutné pro Google Search" />
             </div>
          </div>
        </div>
      ) : (
        <div className="space-y-20 pb-20">
          <section className="animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><MapPin className="w-6 h-6 text-amber-500" /></div>
               <h2 className="text-2xl font-display text-white uppercase tracking-tight">Incidenty v ČR</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {domesticArticles.length > 0 ? domesticArticles.map((a, i) => <ArticleCard key={i} article={a} idx={i} />) : <div className="col-span-full p-16 border border-dashed border-white/5 rounded-3xl text-center text-gray-600 font-mono text-xs uppercase tracking-widest">Žádné zásadní lokální incidenty nebyly detekovány.</div>}
            </div>
          </section>

          <section className="animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center"><Globe className="w-6 h-6 text-orange-500" /></div>
               <h2 className="text-2xl font-display text-white uppercase tracking-tight">Světová scéna</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {worldArticles.map((a, i) => <ArticleCard key={i} article={a} idx={i+10} />)}
            </div>
          </section>

          {groundingUrls.length > 0 && (
            <div className="mt-16 animate-fade-in-up border-t border-white/5 pt-12">
               <h3 className="text-white font-display text-[10px] mb-6 uppercase tracking-widest flex items-center gap-2 text-gray-500">
                  <Languages className="w-3 h-3" /> Zdroje informací (Google Search Grounding)
               </h3>
               <div className="flex flex-wrap gap-2">
                  {groundingUrls.map((url, i) => (
                    <a key={i} href={url.uri} target="_blank" rel="noreferrer" className="text-[9px] bg-white/5 hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/20 px-3 py-1.5 rounded-full text-gray-500 hover:text-amber-400 transition-all font-mono truncate max-w-[200px]">
                      {url.title}
                    </a>
                  ))}
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CheckItem: React.FC<{ icon: React.ReactNode, label: string, sub: string }> = ({ icon, label, sub }) => (
  <div className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
     <div className="mt-1">{icon}</div>
     <div>
        <div className="text-white text-xs font-bold uppercase tracking-tight">{label}</div>
        <div className="text-[10px] text-gray-500 font-mono uppercase">{sub}</div>
     </div>
  </div>
);

const ArticleCard: React.FC<{ article: Article, idx: number }> = ({ article, idx }) => (
  <div 
    className="group relative flex flex-col bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-all duration-500 shadow-2xl"
    style={{ animationDelay: `${idx * 100}ms` }}
  >
     <div className="p-8 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
           <span className="text-[8px] text-gray-500 font-mono uppercase tracking-widest">{article.date}</span>
           <span className="text-[8px] bg-amber-500/10 text-amber-400 px-2 py-1 rounded border border-amber-500/20 font-mono uppercase font-bold tracking-tighter">{article.category}</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-4 font-display uppercase tracking-tight leading-tight group-hover:text-amber-400 transition-colors line-clamp-3">{article.title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed font-light mb-8 line-clamp-4">{article.description}</p>
        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
           <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 truncate max-w-[150px]"><Flag className="w-3 h-3 text-amber-500" /> {article.source}</div>
           <a href={article.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-amber-500/40 transition-all shadow-inner"><ExternalLink className="w-4 h-4" /></a>
        </div>
     </div>
  </div>
);

export default CyberNews;
