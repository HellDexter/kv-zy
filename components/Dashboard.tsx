
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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24 relative z-10 flex flex-col items-center justify-center min-h-screen">
      
      {/* Top User Bar */}
      <div className="absolute top-8 right-8 flex items-center gap-6 animate-fade-in-up">
         <div className="flex items-center gap-4 text-right">
             <div className="flex flex-col">
                 <span className="text-white text-sm font-bold font-display uppercase tracking-wide">{userProfile?.email}</span>
                 <span className="text-gray-500 text-xs font-mono tracking-widest uppercase mt-1">
                    {userProfile?.is_admin ? "CENTRAL ADMINISTRATOR" : "AUTHORIZED STUDENT"}
                 </span>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shadow-lg">
                 <UserCircle className="w-6 h-6 text-gray-300" />
             </div>
         </div>
         <button 
           onClick={onLogout}
           className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-all shadow-lg hover:scale-105 active:scale-95"
           title="Odhlásit se"
         >
             <LogOut className="w-5 h-5" />
         </button>
      </div>

      <header className="text-center mb-16 md:mb-24 animate-fade-in-up w-full">
        <h1 className="text-5xl md:text-9xl font-display text-white mb-8 tracking-tighter uppercase leading-none">
          Hlavní <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-500">rozcestník</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto text-xl md:text-3xl font-light px-4 leading-relaxed">
          Zvolte oblast svého vzdělávání. Přístup je řízen vaší digitální identitou.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-6xl pb-20">
        
        {/* Cybersecurity Module */}
        <button
          onClick={handleCyberClick}
          className={`group relative min-h-[400px] animate-fade-in-up text-left ${!hasCyberAccess ? 'cursor-not-allowed opacity-70 ' + (shakeCyber ? 'animate-shake' : '') : ''}`}
          style={{ animationDelay: '100ms' }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${hasCyberAccess ? 'from-cyan-500/0 via-cyan-500/40 to-blue-600/0' : 'from-gray-500/0 via-gray-500/10 to-transparent'} rounded-[3rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700`}></div>
          
          <div className={`relative h-full bg-[#0a0a0a]/80 backdrop-blur-2xl border ${hasCyberAccess ? 'border-white/10 group-hover:border-cyan-500/40' : 'border-white/5'} rounded-[2.5rem] p-10 md:p-14 overflow-hidden hover:bg-[#0a0a0a]/95 transition-all duration-500 flex flex-col justify-between shadow-2xl`}>
            {hasCyberAccess && <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>}
            
            {hasCyberAccess && <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-colors"></div>}
            
            {!hasCyberAccess && (
                 <div className="absolute inset-0 bg-black/70 z-20 flex items-center justify-center backdrop-blur-[3px]">
                   <div className="bg-black/90 border border-white/20 px-6 py-3 rounded-full flex items-center gap-3 text-sm font-mono text-gray-400 uppercase tracking-widest shadow-2xl">
                     <Lock className="w-4 h-4" /> Přístup odepřen
                   </div>
                </div>
            )}

            <div className="relative z-10">
              <div className={`w-16 h-16 md:w-24 md:h-24 rounded-3xl flex items-center justify-center border mb-8 md:mb-10 transition-all duration-500 ${hasCyberAccess ? 'bg-cyan-950/40 border-cyan-500/30 group-hover:scale-110 group-hover:rotate-3 shadow-[0_0_30px_rgba(6,182,212,0.2)]' : 'bg-white/5 border-white/10'}`}>
                <Shield className={`w-8 h-8 md:w-12 md:h-12 ${hasCyberAccess ? 'text-cyan-400' : 'text-gray-500'}`} />
              </div>
              <h2 className={`text-4xl md:text-5xl font-display mb-4 md:mb-6 uppercase tracking-tight ${hasCyberAccess ? 'text-white' : 'text-gray-500'}`}>Kyberbezpečnost</h2>
              <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed">
                Komplexní průvodce digitální obranou. Kvízy, ochrana dat a prevence moderních útoků.
              </p>
            </div>
            
            <div className={`relative z-10 flex items-center gap-4 text-sm md:text-lg font-bold tracking-[0.3em] uppercase mt-10 font-mono ${hasCyberAccess ? 'text-cyan-400' : 'text-gray-600'}`}>
              {hasCyberAccess ? (
                  <>Spustit modul <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" /></>
              ) : (
                  <>Vyžaduje aktivaci</>
              )}
            </div>
          </div>
        </button>

        {/* AI Module */}
        <button
          onClick={handleAiClick}
          className={`group relative min-h-[400px] animate-fade-in-up text-left ${!hasAiAccess ? 'cursor-not-allowed opacity-70 ' + (shakeAi ? 'animate-shake' : '') : ''}`}
          style={{ animationDelay: '200ms' }}
        >
           <div className={`absolute inset-0 bg-gradient-to-r ${hasAiAccess ? 'from-purple-500/0 via-purple-500/40 to-pink-600/0' : 'from-red-500/0 via-red-500/10 to-transparent'} rounded-[3rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700`}></div>

          <div className={`relative h-full bg-[#0a0a0a]/70 backdrop-blur-2xl border rounded-[2.5rem] p-10 md:p-14 overflow-hidden transition-all duration-500 flex flex-col justify-between shadow-2xl ${!hasAiAccess ? 'border-white/5 grayscale group-hover:grayscale-0' : 'border-white/10 group-hover:border-purple-500/40'}`}>
            
            {!hasAiAccess && (
                <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center backdrop-blur-[2px]">
                   <div className="bg-black/90 border border-white/20 px-6 py-3 rounded-full flex items-center gap-3 text-sm font-mono text-gray-400 uppercase tracking-widest shadow-2xl">
                     <Lock className="w-4 h-4" /> Vyžaduje oprávnění
                   </div>
                </div>
            )}

            {hasAiAccess && <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-colors"></div>}

            <div className={`relative z-10 transition-opacity ${hasAiAccess ? 'opacity-100' : 'opacity-50 group-hover:opacity-70'}`}>
              <div className={`w-16 h-16 md:w-24 md:h-24 rounded-3xl flex items-center justify-center border mb-8 md:mb-10 transition-all duration-500 ${hasAiAccess ? 'bg-purple-950/40 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'bg-white/5 border-white/10'}`}>
                <Bot className={`w-8 h-8 md:w-12 md:h-12 ${hasAiAccess ? 'text-purple-400' : 'text-white'}`} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display text-white mb-4 md:mb-6 uppercase tracking-tight">Umělá Inteligence</h2>
              <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed">
                Pokročilé moduly pro práci s AI nástroji. Automatizace, LLM modely a praktické promptování.
              </p>
            </div>
            
            <div className={`relative z-10 flex items-center gap-4 text-sm md:text-lg font-bold tracking-[0.3em] uppercase mt-10 font-mono ${hasAiAccess ? 'text-purple-400' : 'text-gray-500'}`}>
               {hasAiAccess ? (
                  <>Spustit modul <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" /></>
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
