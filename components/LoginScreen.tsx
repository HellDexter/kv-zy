
import React, { useState } from 'react';
import { Lock, User, ArrowRight, ScanEye, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface Props {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<Props> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        setIsSuccess(true);
        // Short delay for animation before callback
        setTimeout(() => {
          onLoginSuccess();
        }, 800);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message === "Invalid login credentials" 
        ? "Neplatný e-mail nebo heslo." 
        : "Chyba přihlášení. Zkontrolujte připojení.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center relative z-20">
      
      {/* Central Glow Effect for the "Void" look */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

      <div className={`w-full max-w-md p-1 relative transition-all duration-500 ${isSuccess ? 'animate-unlock' : 'animate-fade-in-up'}`}>
        
        {/* Animated Scanning Line Effect - Only active when not success */}
        {!isSuccess && (
          <div className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none z-0 animate-scan-line blur-md"></div>
        )}

        {/* Animated Border Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-blue-600/0 rounded-2xl opacity-50 blur-sm"></div>
        
        {/* Main Glass Card */}
        <div className="relative bg-[#050505]/90 backdrop-blur-2xl border border-white/10 rounded-xl p-8 md:p-12 shadow-2xl overflow-hidden z-10">
          
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          
          {/* Status Indicators */}
          <div className="absolute top-6 right-6 flex gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-rose-500 animate-ping' : 'bg-rose-500'}`}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
          </div>

          <div className="text-center mb-10 relative">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-[0_0_40px_rgba(6,182,212,0.1)] group relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <ScanEye className={`w-10 h-10 text-cyan-400 transition-all duration-500 ${loading ? 'scale-110 text-white' : 'group-hover:scale-110'}`} />
            </div>
            <h1 className="text-3xl font-display text-white mb-2 tracking-wide uppercase">
              Vstup do systému
            </h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-mono">
              Identity Verification Required
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
            <div className="space-y-2 group">
              <label className="text-[10px] text-gray-500 font-mono ml-1 group-focus-within:text-cyan-400 transition-colors uppercase">E-mailová adresa</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`h-4 w-4 transition-colors duration-300 ${error ? 'text-red-400' : 'text-gray-600 group-focus-within:text-cyan-400'}`} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-11 pr-4 py-4 bg-white/[0.03] border rounded-lg text-white font-mono placeholder-gray-700 focus:outline-none focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 text-sm ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan-500/50 focus:bg-cyan-500/[0.02]'}`}
                  placeholder="student@skola.cz"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] text-gray-500 font-mono ml-1 group-focus-within:text-cyan-400 transition-colors uppercase">Heslo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`h-4 w-4 transition-colors duration-300 ${error ? 'text-red-400' : 'text-gray-600 group-focus-within:text-cyan-400'}`} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-11 pr-4 py-4 bg-white/[0.03] border rounded-lg text-white font-mono placeholder-gray-700 focus:outline-none focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 text-sm ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan-500/50 focus:bg-cyan-500/[0.02]'}`}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-3 rounded border border-red-500/20 animate-pulse">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-white text-black py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-cyan-50 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:opacity-80 disabled:cursor-not-allowed mt-10 font-display"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
              <div className="flex items-center justify-center gap-3 relative z-10">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-600" />
                    <span className="animate-pulse">Ověřování...</span>
                  </>
                ) : (
                  <>
                    <span>Přihlásit se</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col gap-3">
             <div className="flex justify-between items-center text-[10px] text-gray-600 font-mono">
                <span className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSuccess ? 'bg-green-500' : (error ? 'bg-red-500' : 'bg-green-900')} transition-colors`}></span>
                  SECURE DB CONNECTION
                </span>
                <span>SUPABASE CONNECTED</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
