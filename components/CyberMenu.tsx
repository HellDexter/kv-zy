
import React from 'react';
import { ArrowLeft, BrainCircuit, Presentation, ArrowRight, ClipboardList, PlayCircle } from 'lucide-react';

interface Props {
  onNavigate: (view: 'quizzes' | 'presentations' | 'practical_exercises' | 'videos') => void;
  onBack: () => void;
}

const CyberMenu: React.FC<Props> = ({ onNavigate, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-16 text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-4 text-sm font-bold tracking-widest uppercase group animate-fade-in-up font-mono"
      >
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span>Zpět na přehled modulů</span>
      </button>

      <header className="mb-20 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display text-white mb-8 uppercase tracking-tighter leading-none">
          Kyberbezpečnost
        </h1>
        <p className="text-gray-300 text-xl md:text-3xl font-light max-w-4xl leading-relaxed">
          Zvolte metodu výuky. Otestujte své znalosti, studujte materiály nebo sledujte video tutoriály pro lepší orientaci v digitálním světě.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        
        {/* Quizzes Option */}
        <button
          onClick={() => onNavigate('quizzes')}
          className="group relative p-1 rounded-[2.5rem] text-left transition-all duration-500 hover:-translate-y-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-teal-600/0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
          
          <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-14 overflow-hidden hover:bg-[#0a0a0a]/95 transition-colors flex flex-col min-h-[400px]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-start justify-between mb-12">
              <div className="bg-emerald-950/30 p-6 rounded-3xl border border-emerald-500/20 group-hover:bg-emerald-900/40 transition-all group-hover:scale-110">
                <BrainCircuit className="w-10 h-10 text-emerald-400" />
              </div>
              <ArrowRight className="w-6 h-6 text-gray-600 group-hover:text-emerald-400 transition-colors" />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-emerald-300 font-display uppercase tracking-tight">Kvízy</h3>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-6">
              Interaktivní testování znalostí ze všech 9 vzdělávacích bloků.
            </p>
            <div className="text-emerald-500 text-xs font-mono uppercase tracking-[0.3em] mt-auto font-bold">Status: Dostupné</div>
          </div>
        </button>

        {/* Presentations Option */}
        <button
          onClick={() => onNavigate('presentations')}
          className="group relative p-1 rounded-[2.5rem] text-left transition-all duration-500 hover:-translate-y-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-pink-600/0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
          
          <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-14 overflow-hidden hover:bg-[#0a0a0a]/95 transition-colors flex flex-col min-h-[400px]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-start justify-between mb-12">
              <div className="bg-purple-950/30 p-6 rounded-3xl border border-purple-500/20 group-hover:bg-purple-900/40 transition-all group-hover:scale-110">
                <Presentation className="w-10 h-10 text-purple-400" />
              </div>
              <ArrowRight className="w-6 h-6 text-gray-600 group-hover:text-purple-400 transition-colors" />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-purple-300 font-display uppercase tracking-tight">Prezentace</h3>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-6">
              Studijní materiály a výklad teorie s interaktivními prvky.
            </p>
            <div className="text-purple-500 text-xs font-mono uppercase tracking-[0.3em] mt-auto font-bold">Status: Dostupné</div>
          </div>
        </button>

        {/* Videos Option */}
        <button
          onClick={() => onNavigate('videos')}
          className="group relative p-1 rounded-[2.5rem] text-left transition-all duration-500 hover:-translate-y-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-blue-600/0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
          
          <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-14 overflow-hidden hover:bg-[#0a0a0a]/95 transition-colors flex flex-col min-h-[400px]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-start justify-between mb-12">
              <div className="bg-cyan-950/30 p-6 rounded-3xl border border-cyan-500/20 group-hover:bg-cyan-900/40 transition-all group-hover:scale-110">
                <PlayCircle className="w-10 h-10 text-cyan-400" />
              </div>
              <ArrowRight className="w-6 h-6 text-gray-600 group-hover:text-cyan-400 transition-colors" />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-cyan-300 font-display uppercase tracking-tight">Videa</h3>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-6">
              Video tutoriály a praktické ukázky řešení hrozeb.
            </p>
            <div className="text-cyan-500 text-xs font-mono uppercase tracking-[0.3em] mt-auto font-bold">Status: Nové záznamy</div>
          </div>
        </button>

        {/* Practical Exercises Option */}
        <button
          onClick={() => onNavigate('practical_exercises')}
          className="group relative p-1 rounded-[2.5rem] text-left transition-all duration-500 hover:-translate-y-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/30 to-rose-600/0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
          
          <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-14 overflow-hidden hover:bg-[#0a0a0a]/95 transition-colors flex flex-col min-h-[400px]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-start justify-between mb-12">
              <div className="bg-pink-950/30 p-6 rounded-3xl border border-pink-500/20 group-hover:bg-pink-900/40 transition-all group-hover:scale-110">
                <ClipboardList className="w-10 h-10 text-pink-400" />
              </div>
              <ArrowRight className="w-6 h-6 text-gray-600 group-hover:text-pink-400 transition-colors" />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-pink-300 font-display uppercase tracking-tight">Audit</h3>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-6">
              Zabezpečení vašich osobních zařízení v reálném čase.
            </p>
            <div className="text-pink-500 text-xs font-mono uppercase tracking-[0.3em] mt-auto font-bold">Status: Doporučeno</div>
          </div>
        </button>

      </div>
    </div>
  );
};

export default CyberMenu;
