
import React from 'react';
import { ArrowLeft, BrainCircuit, Presentation, ArrowRight, ClipboardList } from 'lucide-react';

interface Props {
  onNavigate: (view: 'quizzes' | 'presentations' | 'practical_exercises') => void;
  onBack: () => void;
}

const CyberMenu: React.FC<Props> = ({ onNavigate, onBack }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-12 text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group animate-fade-in-up"
      >
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span>Zpět na přehled modulů</span>
      </button>

      <header className="mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <h1 className="text-4xl md:text-5xl font-serif-display text-white mb-4">
          Kyberbezpečnost
        </h1>
        <p className="text-gray-400 text-lg font-light max-w-2xl">
          Zvolte metodu výuky. Otestujte své znalosti, studujte materiály nebo si vyzkoušejte bezpečnostní audit v praxi.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        
        {/* Quizzes Option */}
        <button
          onClick={() => onNavigate('quizzes')}
          className="group relative p-1 rounded-3xl text-left transition-all duration-500 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-teal-600/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
          
          <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden hover:bg-[#0a0a0a]/90 transition-colors">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-start justify-between mb-8">
              <div className="bg-emerald-950/30 p-4 rounded-2xl border border-emerald-500/20 group-hover:bg-emerald-900/30 transition-colors">
                <BrainCircuit className="w-8 h-8 text-emerald-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-emerald-400 transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-100">Kvízy a Testy</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Interaktivní testování znalostí z 9 tematických bloků.
            </p>
            <div className="text-emerald-500 text-[10px] font-mono uppercase tracking-widest mt-auto">Dostupné</div>
          </div>
        </button>

        {/* Presentations Option */}
        <button
          onClick={() => onNavigate('presentations')}
          className="group relative p-1 rounded-3xl text-left transition-all duration-500 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-pink-600/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
          
          <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden hover:bg-[#0a0a0a]/90 transition-colors">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-start justify-between mb-8">
              <div className="bg-purple-950/30 p-4 rounded-2xl border border-purple-500/20 group-hover:bg-purple-900/30 transition-colors">
                <Presentation className="w-8 h-8 text-purple-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-100">Prezentace</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Studijní materiály a detailní výklad problematiky.
            </p>
            <div className="text-purple-500 text-[10px] font-mono uppercase tracking-widest mt-auto">Dostupné</div>
          </div>
        </button>

        {/* Practical Exercises Option - NEW */}
        <button
          onClick={() => onNavigate('practical_exercises')}
          className="group relative p-1 rounded-3xl text-left transition-all duration-500 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/30 to-rose-600/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
          
          <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden hover:bg-[#0a0a0a]/90 transition-colors">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-start justify-between mb-8">
              <div className="bg-pink-950/30 p-4 rounded-2xl border border-pink-500/20 group-hover:bg-pink-900/30 transition-colors">
                <ClipboardList className="w-8 h-8 text-pink-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-pink-400 transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-100">Praktická cvičení</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Audity, checklisty a AI asistent pro zabezpečení vašich zařízení v reálném čase.
            </p>
            <div className="text-pink-500 text-[10px] font-mono uppercase tracking-widest mt-auto">Nové</div>
          </div>
        </button>

      </div>
    </div>
  );
};

export default CyberMenu;
