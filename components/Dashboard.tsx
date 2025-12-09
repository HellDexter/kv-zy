
import React, { useState } from 'react';
import { Shield, Bot, Lock, ArrowRight, LogOut, UserCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface Props {
  onNavigate: (module: 'cyber' | 'ai') => void;
  userProfile: UserProfile | null;
  onLogout: () => void;
}

const Dashboard: React.FC<Props> = ({ onNavigate, userProfile, onLogout }) => {
  const [shakeAi, setShakeAi] = useState(false);
  const [shakeCyber, setShakeCyber] = useState(false);

  const hasCyberAccess = userProfile?.access_cyber || userProfile?.is_admin;
  const hasAiAccess = userProfile?.access_ai || userProfile?.is_admin;

  const handleCyberClick = () => {
    if (hasCyberAccess) {
      onNavigate('cyber');
    } else {
      setShakeCyber(true);
      setTimeout(() => setShakeCyber(false), 500);
    }
  };

  const handleAiClick = () => {
    if (hasAiAccess) {
      onNavigate('ai');
    } else {
      setShakeAi(true);
      setTimeout(() => setShakeAi(false), 500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10 flex flex-col items-center justify-center min-h-screen">
      
      {/* Top User Bar */}
      <div className="absolute top-6 right-6 flex items-center gap-4 animate-fade-in-up">
         <div className="flex items-center gap-2 text-right">
             <div className="flex flex-col">
                 <span className="text-white text-xs font-bold font-display uppercase">{userProfile?.email}</span>
                 <span className="text-gray-500 text-[10px] font-mono tracking-widest uppercase">
                    {userProfile?.is_admin ? "ADMINISTRATOR" : "STUDENT"}
                 </span>
             </div>
             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                 <UserCircle className="w-5 h-5 text-gray-300" />
             </div>
         </div>
         <button 
           onClick={onLogout}
           className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
           title="Odhlásit se"
         >
             <LogOut className="w-4 h-4" />
         </button>
      </div>

      <header className="text-center mb-10 md:mb-16 animate-fade-in-up w-full">
        <h1 className="text-3xl md:text-6xl font-display text-white mb-4 md:mb-6 tracking-tight uppercase leading-tight">
          Vyberte <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400">modul</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-lg font-light px-4">
          Přístup k centrálním vzdělávacím okruhům je řízen vaším oprávněním.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl pb-10">
        
        {/* Cybersecurity Module */}
        <button
          onClick={handleCyberClick}
          className={`group relative min-h-[280px] md:h-80 animate-fade-in-up text-left ${!hasCyberAccess ? 'cursor-not-allowed opacity-70 ' + (shakeCyber ? 'animate-shake' : '') : ''}`}
          style={{ animationDelay: '100ms' }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${hasCyberAccess ? 'from-cyan-500/0 via-cyan-500/30 to-blue-600/0' : 'from-gray-500/0 via-gray-500/10 to-transparent'} rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`}></div>
          
          <div className={`relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border ${hasCyberAccess ? 'border-white/10 group-hover:border-cyan-500/30' : 'border-white/5'} rounded-3xl p-6 md:p-10 overflow-hidden hover:bg-[#0a0a0a]/90 transition-all duration-500 flex flex-col justify-between`}>
            {hasCyberAccess && <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>}
            
            {hasCyberAccess && <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] group-hover:bg-cyan-500/20 transition-colors"></div>}
            
            {!hasCyberAccess && (
                 <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center backdrop-blur-[2px]">
                   <div className="bg-black/80 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-widest">
                     <Lock className="w-3 h-3" /> Přístup odepřen
                   </div>
                </div>
            )}

            <div className="relative z-10">
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border mb-4 md:mb-6 transition-transform duration-500 ${hasCyberAccess ? 'bg-cyan-950/30 border-cyan-500/20 group-hover:scale-110' : 'bg-white/5 border-white/10'}`}>
                <Shield className={`w-6 h-6 md:w-8 md:h-8 ${hasCyberAccess ? 'text-cyan-400' : 'text-gray-500'}`} />
              </div>
              <h2 className={`text-2xl md:text-3xl font-display mb-2 md:mb-3 uppercase ${hasCyberAccess ? 'text-white' : 'text-gray-500'}`}>Kyberbezpečnost</h2>
              <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
                Komplexní průvodce digitální obranou. Kvízy, ochrana dat a prevence útoků.
              </p>
            </div>
            
            <div className={`relative z-10 flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase mt-4 font-mono ${hasCyberAccess ? 'text-cyan-400' : 'text-gray-600'}`}>
              {hasCyberAccess ? (
                  <>Vstoupit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              ) : (
                  <>Nedostupné</>
              )}
            </div>
          </div>
        </button>

        {/* AI Module */}
        <button
          onClick={handleAiClick}
          className={`group relative min-h-[280px] md:h-80 animate-fade-in-up text-left ${!hasAiAccess ? 'cursor-not-allowed opacity-70 ' + (shakeAi ? 'animate-shake' : '') : ''}`}
          style={{ animationDelay: '200ms' }}
        >
           {/* Dynamic Background based on access */}
           <div className={`absolute inset-0 bg-gradient-to-r ${hasAiAccess ? 'from-purple-500/0 via-purple-500/30 to-pink-600/0' : 'from-red-500/0 via-red-500/10 to-transparent'} rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300`}></div>

          <div className={`relative h-full bg-[#0a0a0a]/60 backdrop-blur-sm border rounded-3xl p-6 md:p-10 overflow-hidden transition-all duration-300 flex flex-col justify-between ${!hasAiAccess ? 'border-white/5 grayscale group-hover:grayscale-0' : 'border-white/10 group-hover:border-purple-500/30'}`}>
            
            {/* Locked Overlay if no access */}
            {!hasAiAccess && (
                <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center backdrop-blur-[1px]">
                   <div className="bg-black/60 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-widest">
                     <Lock className="w-3 h-3" /> Vyžaduje oprávnění
                   </div>
                </div>
            )}

            {hasAiAccess && <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/20 transition-colors"></div>}

            <div className={`relative z-10 transition-opacity ${hasAiAccess ? 'opacity-100' : 'opacity-50 group-hover:opacity-70'}`}>
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border mb-4 md:mb-6 ${hasAiAccess ? 'bg-purple-950/30 border-purple-500/20' : 'bg-white/5 border-white/10'}`}>
                <Bot className={`w-6 h-6 md:w-8 md:h-8 ${hasAiAccess ? 'text-purple-400' : 'text-white'}`} />
              </div>
              <h2 className="text-2xl md:text-3xl font-display text-white mb-2 md:mb-3 uppercase">AI</h2>
              <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
                Pokročilé moduly umělé inteligence. Automatizace, LLM a neuronové sítě.
              </p>
            </div>
            
            <div className={`relative z-10 flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase mt-4 font-mono ${hasAiAccess ? 'text-purple-400' : 'text-gray-500'}`}>
               {hasAiAccess ? (
                  <>Vstoupit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
               ) : (
                  <>Nedostupné</>
               )}
            </div>
          </div>
        </button>

      </div>
    </div>
  );
};

export default Dashboard;
