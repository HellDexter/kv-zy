
import React from 'react';
import { Block } from '../types';
import * as Icons from 'lucide-react';
import { ArrowLeft, BrainCircuit, ArrowRight } from 'lucide-react';

interface Props {
  blocks: Block[];
  onStartBlock: (blockId: number) => void;
  onBack: () => void;
  theme?: 'emerald' | 'purple';
}

const WelcomeScreen: React.FC<Props> = ({ blocks, onStartBlock, onBack, theme = 'emerald' }) => {
  const isPurple = theme === 'purple';
  const colorClass = isPurple ? 'purple' : 'emerald';
  const gradientText = isPurple ? 'from-purple-300 to-pink-400' : 'from-emerald-300 to-teal-400';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-20 relative z-10">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-8 md:mb-12 text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-4 text-sm font-bold tracking-widest uppercase group animate-fade-in-up font-mono"
      >
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-${colorClass}-500/30 group-hover:bg-${colorClass}-500/10 transition-all`}>
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span>Zpět do menu</span>
      </button>

      <header className="mb-12 md:mb-20 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-${colorClass}-500/30 bg-${colorClass}-500/5 text-${colorClass}-400 text-xs uppercase tracking-widest mb-6 md:mb-8 backdrop-blur-sm font-mono`}>
          <BrainCircuit className="w-4 h-4" />
          Centrum testování
        </div>
        <h1 className="text-4xl md:text-7xl font-display text-white mb-6 md:mb-8 tracking-tight uppercase leading-tight">
          Kvízy a <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientText}`}>testy</span>
        </h1>
        <p className="text-gray-300 max-w-3xl text-lg md:text-2xl font-light leading-relaxed">
          Ověřte své znalosti v interaktivních simulacích. Každý blok obsahuje sadu 10 otázek zaměřených na konkrétní problematiku kurzu.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {blocks.map((block, index) => {
           // @ts-ignore
           const IconComponent = Icons[block.icon] || Icons.HelpCircle;

           return (
            <button
              key={block.id}
              onClick={() => onStartBlock(block.id)}
              className="group relative h-full animate-fade-in-up text-left min-h-[320px]"
              style={{ animationDelay: `${200 + (index * 50)}ms` }}
            >
              {/* Hover Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r from-${colorClass}-500/0 via-${colorClass}-500/20 to-blue-600/0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}></div>

              <div className={`relative h-full bg-[#0a0a0a]/70 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 overflow-hidden hover:bg-[#0a0a0a]/90 transition-all duration-300 group-hover:border-${colorClass}-500/40 hover:-translate-y-2`}>
                
                {/* Decorative Line */}
                <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${colorClass}-500/40 to-transparent opacity-40 group-hover:opacity-100 transition-opacity`}></div>

                <div className="flex justify-between items-start mb-8 md:mb-10">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-${colorClass}-950/30 border border-${colorClass}-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                         <IconComponent className={`w-7 h-7 md:w-8 md:h-8 text-${colorClass}-400`} />
                    </div>
                    <div className={`text-xs font-mono text-gray-500 border border-white/10 px-3 py-1.5 rounded-lg bg-black/60 group-hover:text-${colorClass}-300 transition-colors uppercase tracking-widest`}>
                        BLOK {block.id.toString().padStart(2, '0')}
                    </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-white font-display uppercase transition-colors leading-tight">
                  {block.title.replace(/Blok \d+: /, "")}
                </h3>
                
                <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed mb-10 group-hover:text-gray-200 transition-colors">
                  {block.description}
                </p>

                <div className={`mt-auto flex items-center gap-3 text-xs md:text-sm font-bold text-${colorClass}-500/80 group-hover:text-${colorClass}-400 uppercase tracking-widest transition-all font-mono`}>
                   Spustit test <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
