
import React, { useState } from 'react';
import { Shield, Bot, Lock, ArrowRight } from 'lucide-react';

interface Props {
  onNavigate: (module: 'cyber' | 'ai') => void;
}

const Dashboard: React.FC<Props> = ({ onNavigate }) => {
  const [shakeAi, setShakeAi] = useState(false);

  const handleAiClick = () => {
    setShakeAi(true);
    setTimeout(() => setShakeAi(false), 500);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
      
      <header className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-display text-white mb-6 tracking-tight uppercase">
          Vyberte <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400">modul</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg font-light">
          Přístup k centrálním vzdělávacím okruhům. Zvolte aktivní sektor pro pokračování.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* Cybersecurity Module - Active */}
        <button
          onClick={() => onNavigate('cyber')}
          className="group relative h-80 animate-fade-in-up text-left"
          style={{ animationDelay: '100ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-blue-600/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
          
          <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 overflow-hidden hover:bg-[#0a0a0a]/90 transition-all duration-500 group-hover:border-cyan-500/30">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] group-hover:bg-cyan-500/20 transition-colors"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="bg-cyan-950/30 w-16 h-16 rounded-2xl flex items-center justify-center border border-cyan-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Shield className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-3xl font-display text-white mb-3 uppercase">Kyberbezpečnost</h2>
                <p className="text-gray-400 font-light leading-relaxed">
                  Komplexní průvodce digitální obranou. Kvízy, ochrana dat a prevence útoků.
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold tracking-widest uppercase mt-4 font-mono">
                Vstoupit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </button>

        {/* AI Module - Locked */}
        <button
          onClick={handleAiClick}
          className={`group relative h-80 animate-fade-in-up text-left cursor-not-allowed ${shakeAi ? 'animate-shake' : ''}`}
          style={{ animationDelay: '200ms' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>

          <div className="relative h-full bg-[#0a0a0a]/60 backdrop-blur-sm border border-white/5 rounded-3xl p-10 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:border-red-500/20">
            {/* Locked Overlay */}
            <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center backdrop-blur-[1px]">
               <div className="bg-black/60 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-widest">
                 <Lock className="w-3 h-3" /> Locked
               </div>
            </div>

            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-red-500/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative z-10 flex flex-col h-full justify-between opacity-50 group-hover:opacity-70 transition-opacity">
              <div>
                <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 mb-6">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-display text-white mb-3 uppercase">AI</h2>
                <p className="text-gray-400 font-light leading-relaxed">
                  Pokročilé moduly umělé inteligence. Automatizace, LLM a neuronové sítě.
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-gray-500 text-sm font-bold tracking-widest uppercase mt-4 font-mono">
                Nedostupné
              </div>
            </div>
          </div>
        </button>

      </div>
    </div>
  );
};

export default Dashboard;
