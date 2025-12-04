
import React, { useState } from 'react';
import { Block } from '../types';
import * as Icons from 'lucide-react';
import { ArrowLeft, FileText, ExternalLink, Download, Ban, MonitorPlay } from 'lucide-react';

interface Props {
  blocks: Block[];
  onBack: () => void;
}

const PresentationScreen: React.FC<Props> = ({ blocks, onBack }) => {
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);

  // If a block is selected, show the viewer
  if (selectedBlockId !== null) {
    const selectedBlock = blocks.find(b => b.id === selectedBlockId);
    
    const isGamma = !!selectedBlock?.gammaUrl;
    const resourceUrl = isGamma ? selectedBlock!.gammaUrl : `pdfs/blok${selectedBlockId}.pdf`;

    return (
      <div className="max-w-7xl mx-auto px-4 py-6 h-screen flex flex-col relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in-up">
          <button 
            onClick={() => setSelectedBlockId(null)}
            className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:border-white/30"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Zpět na seznam</span>
          </button>
          
          <h2 className="text-white font-serif-display text-xl hidden md:block">
            {selectedBlock?.title}
          </h2>

          <div className="flex gap-2">
              {isGamma ? (
                <a 
                  href={resourceUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-purple-950/50 hover:bg-purple-900/50 text-purple-400 px-4 py-2 rounded-full border border-purple-500/30 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Otevřít v novém okně</span>
                </a>
              ) : (
                <a 
                  href={resourceUrl} 
                  download 
                  className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-cyan-950/50 hover:bg-cyan-900/50 text-cyan-400 px-4 py-2 rounded-full border border-cyan-500/30 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Stáhnout PDF</span>
                </a>
              )}
          </div>
        </div>

        {/* Viewer Container */}
        <div className="flex-grow relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
           {/* Glow Border based on type */}
           <div className={`absolute inset-0 bg-gradient-to-b ${isGamma ? 'from-purple-500/20 to-pink-600/10' : 'from-cyan-500/20 to-blue-600/10'} rounded-xl blur-sm opacity-50`}></div>
           
           {/* Iframe Wrapper */}
           <div className="absolute inset-0 bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Top Line */}
              <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent ${isGamma ? 'via-purple-500/50' : 'via-cyan-500/50'} to-transparent z-20`}></div>
              
              <iframe 
                src={isGamma ? resourceUrl : `${resourceUrl}#toolbar=0&view=FitH`}
                className="w-full h-full border-0"
                title={selectedBlock?.title || "Presentation Viewer"}
                allow="fullscreen"
              >
                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                    <Ban className="w-12 h-12 mb-4 opacity-50" />
                    <p>Váš prohlížeč nepodporuje zobrazení tohoto obsahu.</p>
                    <a href={resourceUrl} className="text-purple-400 underline mt-2 hover:text-purple-300" target="_blank" rel="noreferrer">
                        Otevřít prezentaci ručně
                    </a>
                </div>
              </iframe>
           </div>
        </div>
      </div>
    );
  }

  // List View (Block Selection)
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-12 text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group animate-fade-in-up"
      >
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span>Zpět do menu</span>
      </button>

      <header className="mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-[10px] uppercase tracking-widest mb-6 backdrop-blur-sm">
          <FileText className="w-3 h-3" />
          Knihovna materiálů
        </div>
        <h1 className="text-4xl md:text-6xl font-serif-display text-white mb-6 tracking-tight">
          Prezentace <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">kurzu</span>
        </h1>
        <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
          Prostudujte si detailní materiály k jednotlivým blokům. Interaktivní prezentace a PDF dokumenty s kompletní teorií.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blocks.map((block, index) => {
           // @ts-ignore
           const IconComponent = Icons[block.icon] || Icons.FileText;
           const isGamma = !!block.gammaUrl;

           return (
            <button
              key={block.id}
              onClick={() => setSelectedBlockId(block.id)}
              className="group relative h-full animate-fade-in-up text-left"
              style={{ animationDelay: `${200 + (index * 50)}ms` }}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-pink-600/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>

              <div className="relative h-full bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-8 overflow-hidden hover:bg-[#0a0a0a]/80 transition-all duration-300 group-hover:border-purple-500/30 hover:-translate-y-1">
                
                {/* Decorative Line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-30 group-hover:opacity-80 transition-opacity"></div>

                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-950/20 border border-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                         <IconComponent className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className={`text-xs font-bold font-mono border border-white/5 px-3 py-1 rounded bg-black/40 transition-colors ${isGamma ? 'text-pink-400 border-pink-500/20' : 'text-gray-500 group-hover:text-purple-300'}`}>
                        BLOK {block.id}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-100 font-serif-display transition-colors">
                  {block.title.replace(/^Blok \d+: /, "")}
                </h3>
                
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-8 group-hover:text-gray-400 transition-colors">
                  {block.description}
                </p>

                <div className="mt-auto flex items-center gap-2 text-[11px] font-bold text-purple-500/70 group-hover:text-purple-400 uppercase tracking-widest transition-colors">
                   {isGamma ? (
                     <>Spustit prezentaci <MonitorPlay className="w-3 h-3" /></>
                   ) : (
                     <>Otevřít dokument <ExternalLink className="w-3 h-3" /></>
                   )}
                </div>
              </div>
            </button>
           );
        })}
      </div>
    </div>
  );
};

export default PresentationScreen;
