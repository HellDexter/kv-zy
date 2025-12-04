
import React from 'react';
import { Block, Question } from '../types';
import { ArrowLeft, HelpCircle, AlertCircle, CheckCircle2, XCircle, ArrowRight, Zap } from 'lucide-react';

interface Props {
  block: Block;
  currentQuestionIndex: number;
  question: Question;
  selectedAnswer: number | null;
  showHint: boolean;
  onSelectAnswer: (index: number) => void;
  onToggleHint: () => void;
  onNextQuestion: () => void;
  onBackToMenu: () => void;
}

const QuizScreen: React.FC<Props> = ({
  block,
  currentQuestionIndex,
  question,
  selectedAnswer,
  showHint,
  onSelectAnswer,
  onToggleHint,
  onNextQuestion,
  onBackToMenu,
}) => {
  const isAnswered = selectedAnswer !== null;
  const progress = ((currentQuestionIndex) / block.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen flex flex-col justify-center relative z-10">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8 md:mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <button 
          onClick={onBackToMenu}
          className="text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold tracking-widest uppercase group font-mono"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all">
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Ukončit</span>
        </button>
        <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-500 font-mono hidden sm:inline-block tracking-wider">SYSTEM STATUS</span>
            <div className="text-xs font-mono text-cyan-400 bg-cyan-950/30 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            {currentQuestionIndex + 1} <span className="text-gray-600 mx-1">/</span> {block.questions.length}
            </div>
        </div>
      </div>

      {/* Main Card Wrapper */}
      <div className="relative w-full transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        
        {/* Animated Border Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-blue-600/0 rounded-[1.5rem] md:rounded-[2rem] opacity-50 blur-sm"></div>

        {/* Main Glass Card */}
        <div className="glass-panel p-5 md:p-14 rounded-[1.5rem] md:rounded-[2rem] relative overflow-hidden border border-white/10 bg-[#050505]/80 backdrop-blur-2xl shadow-2xl">
          
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

          {/* Decorative Grid inside card */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          
          {/* Subtle Scan Line */}
          <div className="absolute inset-x-0 h-full bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none animate-scan-line opacity-30"></div>

          {/* Progress Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-50"></div>
            </div>
          </div>

          {/* Question Container */}
          <div key={currentQuestionIndex} className="relative z-10 animate-fade-in-up">
            <div className="mb-6 md:mb-10">
               <span className="text-cyan-500 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4 block opacity-80 font-mono">Otázka {currentQuestionIndex + 1}</span>
               <h2 className="text-xl md:text-3xl font-display text-white leading-snug drop-shadow-lg uppercase tracking-wide">
                  {question.question}
               </h2>
            </div>

            <div className="space-y-3 md:space-y-4">
              {question.options.map((option, index) => {
                let containerClass = "relative w-full p-4 md:p-6 text-left rounded-xl border transition-all duration-300 group overflow-hidden ";
                let iconClass = "w-5 h-5 transition-colors duration-300 flex-shrink-0 ml-2 ";
                
                if (isAnswered) {
                  if (index === question.correctAnswer) {
                    containerClass += "bg-green-500/10 border-green-500/50 text-green-100 shadow-[0_0_30px_rgba(34,197,94,0.15)] translate-x-2";
                    iconClass += "text-green-400";
                  } else if (index === selectedAnswer) {
                    containerClass += "bg-red-500/10 border-red-500/50 text-red-100 opacity-80";
                    iconClass += "text-red-400";
                  } else {
                    containerClass += "bg-transparent border-white/5 text-gray-600 opacity-40 blur-[1px] scale-95";
                    iconClass += "text-gray-700";
                  }
                } else {
                  containerClass += "bg-white/[0.02] border-white/10 text-gray-300 hover:bg-white/[0.06] hover:border-cyan-500/30 hover:text-white hover:scale-[1.01] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] active:scale-95";
                  iconClass += "text-gray-600 group-hover:text-cyan-400 group-hover:scale-110";
                }

                return (
                  <button
                    key={index}
                    onClick={() => !isAnswered && onSelectAnswer(index)}
                    disabled={isAnswered}
                    className={containerClass}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-sm md:text-lg font-light tracking-wide leading-relaxed">{option}</span>
                      {isAnswered && index === question.correctAnswer && <CheckCircle2 className={iconClass} />}
                      {isAnswered && index === selectedAnswer && index !== question.correctAnswer && <XCircle className={iconClass} />}
                      {!isAnswered && <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border border-white/20 group-hover:border-cyan-400/50 transition-all ${iconClass} md:block hidden`}></div>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hint & Feedback Area */}
            <div className="mt-6 md:mt-10 min-h-[80px] md:min-h-[100px]">
              {!isAnswered && (
                <button
                  onClick={onToggleHint}
                  className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors text-[10px] md:text-xs font-bold tracking-widest uppercase mx-auto md:mx-0 group font-mono p-2"
                >
                  <div className="p-1 rounded-full bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                      <HelpCircle className="w-4 h-4" />
                  </div>
                  {showHint ? "Skrýt nápovědu" : "Potřebuji nápovědu"}
                </button>
              )}
              
              {showHint && !isAnswered && (
                <div className="mt-4 md:mt-6 p-4 md:p-5 bg-blue-950/30 border border-blue-500/20 rounded-xl text-blue-200 text-xs md:text-sm flex gap-3 md:gap-4 animate-fade-in-up shadow-lg">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-400 mt-0.5" />
                  <p className="leading-relaxed opacity-90">{question.hint}</p>
                </div>
              )}

              {isAnswered && (
                <div className="animate-fade-in-up flex flex-col items-center justify-between gap-6 mt-6 pt-6 border-t border-white/5 md:flex-row">
                  <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
                     <div className={`p-2 md:p-3 rounded-full flex-shrink-0 ${selectedAnswer === question.correctAnswer ? 'bg-green-500/10 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-red-500/10 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]'}`}>
                        <Zap className="w-5 h-5 md:w-6 md:h-6" />
                     </div>
                     <div>
                        <p className={`text-sm md:text-base font-bold mb-1 uppercase font-display ${selectedAnswer === question.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                          {selectedAnswer === question.correctAnswer ? "Správná analýza" : "Chybné vyhodnocení"}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed max-w-lg">{question.hint}</p>
                     </div>
                  </div>
                  
                  <button
                    onClick={onNextQuestion}
                    className="w-full md:w-auto bg-white text-black hover:bg-cyan-50 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-xs tracking-widest uppercase shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95 font-display"
                  >
                    Další krok <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
