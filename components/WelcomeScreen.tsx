
import React from 'react';
import { Block } from '../types';
import * as Icons from 'lucide-react';
import { ArrowLeft, BrainCircuit, ArrowRight } from 'lucide-react';

interface Props {
  blocks: Block[];
  onStartBlock: (blockId: number) => void;
  onBack: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ blocks, onStartBlock, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-20 relative z-10">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-8 md:mb-12 text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group animate-fade-in-up font-mono"
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all">
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span>Zpět do menu</span>
      </button>

      <header className="mb-10 md:mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-[10px] uppercase tracking-widest mb-4 md:mb-6 backdrop-blur-sm font-mono">
          <BrainCircuit className="w-3 h-3" />
          Centrum testování
        </div>
        <h1 className="text-3xl md:text-6xl font-display text-white mb-4 md:mb-6 tracking-tight uppercase leading-tight">
          Kvízy a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">testy</span>
        </h1>
        <p className="text-gray-400 max-w-2xl text-sm md:text-lg font-light leading-relaxed">
          Ověřte své znalosti v interaktivních simulacích. Každý blok obsahuje sadu otázek zaměřených na konkrétní oblast bezpečnosti.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {blocks.map((block, index) => {
           // @ts-ignore
           const IconComponent = Icons[block.icon] || Icons.HelpCircle;

           return (
            <button
              key={block.id}
              onClick={() => onStartBlock(block.id)}
              className="group relative h-full animate-fade-in-up text-left"
              style={{ animationDelay: `${200 + (index * 50)}ms` }}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-teal-600/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>

              <div className="relative h-full bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 overflow-hidden hover:bg-[#0a0a0a]/80 transition-all duration-300 group-hover:border-emerald-500/30 hover:-translate-y-1">
                
                {/* Decorative Line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-30 group-hover:opacity-80 transition-opacity"></div>

                <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-950/20 border border-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                         <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                    </div>
                    <div className="text-[10px] font-mono text-gray-600 border border-white/5 px-2 py-1 rounded bg-black/40 group-hover:text-emerald-300 transition-colors">
                        QUIZ {block.id.toString().padStart(2, '0')}
                    </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-emerald-100 font-display uppercase transition-colors">
                  {block.title.replace(/Blok \d+: /, "")}
                </h3>
                
                <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed mb-6 md:mb-8 group-hover:text-gray-400 transition-colors">
                  {block.description}
                </p>

                <div className="mt-auto flex items-center gap-2 text-[10px] md:text-[11px] font-bold text-emerald-500/70 group-hover:text-emerald-400 uppercase tracking-widest transition-colors font-mono">
                   Spustit test <ArrowRight className="w-3 h-3" />
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
