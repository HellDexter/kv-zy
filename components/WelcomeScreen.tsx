
import React from 'react';
import { Block } from '../types';
import * as Icons from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  blocks: Block[];
  onStartBlock: (blockId: number) => void;
  onBack: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ blocks, onStartBlock, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-8 text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group animate-fade-in-up"
      >
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span>Zpět na výběr</span>
      </button>

      <header className="text-center mb-20 relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] uppercase tracking-widest mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          System Operational
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif-display text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
          Výběr <br />
          <span className="italic bg-gradient-to-r from-cyan-200 to-blue-400 bg-clip-text text-transparent">simulace</span>
        </h1>
        
        <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Zvolte tematický blok pro zahájení testování znalostí.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blocks.map((block, index) => {
          // @ts-ignore
          const IconComponent = Icons[block.icon] || Icons.HelpCircle;

          return (
            <button
              key={block.id}
              onClick={() => onStartBlock(block.id)}
              className="group relative p-1 rounded-2xl text-left transition-all duration-500 hover:-translate-y-2 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${300 + (index * 100)}ms`, animationFillMode: 'forwards' }}
            >
              {/* Animated Border Gradient - Visible on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/40 to-blue-600/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>

              {/* Main Card Content */}
              <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-xl p-8 overflow-hidden hover:bg-[#0a0a0a]/90 transition-colors shadow-lg">
                
                {/* Top Decorative Line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Hover Gradient Bloom inside */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-xl"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:bg-cyan-500/10 transition-all duration-500">
                      <IconComponent className="text-gray-300 w-6 h-6 group-hover:text-cyan-400 transition-colors duration-300" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-600 group-hover:text-cyan-500 transition-colors border border-white/5 px-2 py-1 rounded bg-black/40">
                      MODUL {block.id.toString().padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-50 transition-colors duration-300 font-serif-display tracking-wide">
                    {block.title.replace(/Blok \d+: /, "")}
                  </h3>
                  
                  <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow group-hover:text-gray-300 transition-colors duration-300 font-light">
                    {block.description}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] font-bold text-gray-500 group-hover:text-cyan-400 transition-colors uppercase tracking-widest mt-auto">
                    Spustit simulaci 
                    <Icons.ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WelcomeScreen;
