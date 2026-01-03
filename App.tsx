
import React, { useState, useEffect, useCallback } from 'react';
import { courseData, aiCourseData } from './data';
import { QuizState, UserProfile } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import CyberMenu from './components/CyberMenu';
import AiMenu from './components/AiMenu';
import PresentationScreen from './components/PresentationScreen';
import AuditScreen from './components/AuditScreen';
import { supabase } from './supabaseClient';

type View = 'login' | 'dashboard' | 'cyber_menu' | 'ai_menu' | 'quizzes' | 'presentations' | 'practical_exercises' | 'quiz' | 'result';
type Module = 'cyber' | 'ai';

const GridBeams: React.FC = () => {
  const [beams, setBeams] = useState<{ id: number; type: 'h' | 'v'; pos: number; delay: number; duration: number; color: string }[]>([]);

  useEffect(() => {
    const newBeams = [];
    const GRID_SIZE = 60;
    const colors = ['emerald', 'purple', 'rose'];
    for (let i = 0; i < 3; i++) {
      newBeams.push({
        id: i, type: 'h' as const, pos: Math.floor(Math.random() * 15) * GRID_SIZE,
        delay: Math.random() * 15, duration: 8 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    for (let i = 0; i < 3; i++) {
      newBeams.push({
        id: i + 100, type: 'v' as const, pos: Math.floor(Math.random() * 30) * GRID_SIZE,
        delay: Math.random() * 15, duration: 8 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setBeams(newBeams);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {beams.map((beam) => (
        <div
          key={beam.id}
          className={`grid-beam ${beam.type === 'h' ? 'grid-beam-h' : 'grid-beam-v'} grid-beam-${beam.color}`}
          style={{
            [beam.type === 'h' ? 'top' : 'left']: `${beam.pos}px`,
            animationDelay: `${beam.delay}s`,
            animationDuration: `${beam.duration}s`
          }}
        ></div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('login');
  const [activeModule, setActiveModule] = useState<Module>('cyber');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  
  const [quizState, setQuizState] = useState<QuizState>({
    currentBlockId: null,
    currentQuestionIndex: 0,
    score: 0,
    showHint: false,
    selectedAnswer: null,
    isFinished: false,
    answersHistory: []
  });

  // Memoized profile fetcher to avoid recreation
  const fetchProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      return data as UserProfile;
    } catch (error) {
      console.error('Fetch profile error:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    // Failsafe: Always disable loading after 8 seconds
    const globalTimeout = setTimeout(() => {
      if (mounted && sessionLoading) {
        console.warn("Auth failsafe triggered.");
        setSessionLoading(false);
      }
    }, 8000);

    // Single source of truth for Auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log(`Auth Event: ${event}`);

      try {
        if (session?.user) {
          // If we have a session but no profile, or it's a new sign in
          if (!userProfile || event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            const profile = await fetchProfile(session.user.id);
            if (mounted) {
              if (profile) {
                setUserProfile(profile);
                setCurrentView('dashboard');
              } else {
                console.error("Profile not found for session.");
                await supabase.auth.signOut();
                setCurrentView('login');
              }
            }
          }
        } else {
          // No session
          if (mounted) {
            setUserProfile(null);
            setCurrentView('login');
          }
        }
      } catch (err) {
        console.error("Auth transition error:", err);
      } finally {
        if (mounted) {
          setSessionLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(globalTimeout);
    };
  }, [fetchProfile, userProfile, sessionLoading]);

  const handleDashboardNavigate = (module: Module) => {
    if (module === 'cyber') {
      if (userProfile?.access_cyber || userProfile?.is_admin) {
        setActiveModule('cyber');
        setCurrentView('cyber_menu');
      } else {
        alert("Nemáte přístup k modulu Kyberbezpečnost.");
      }
    } else if (module === 'ai') {
      if (userProfile?.access_ai || userProfile?.is_admin) {
        setActiveModule('ai');
        setCurrentView('ai_menu');
      } else {
         alert("Nemáte přístup k modulu AI.");
      }
    }
  };

  const currentModuleData = activeModule === 'cyber' ? courseData : aiCourseData;

  const startBlock = (blockId: number) => {
    setQuizState({
      currentBlockId: blockId,
      currentQuestionIndex: 0,
      score: 0,
      showHint: false,
      selectedAnswer: null,
      isFinished: false,
      answersHistory: []
    });
    setCurrentView('quiz');
  };

  const handleSelectAnswer = (index: number) => {
    const currentBlock = currentModuleData.find(b => b.id === quizState.currentBlockId);
    if (!currentBlock) return;
    const currentQuestion = currentBlock.questions[quizState.currentQuestionIndex];
    const isCorrect = index === currentQuestion.correctAnswer;
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: index,
      score: isCorrect ? prev.score + 1 : prev.score,
      answersHistory: [...prev.answersHistory, isCorrect]
    }));
  };

  const handleNextQuestion = () => {
    const currentBlock = currentModuleData.find(b => b.id === quizState.currentBlockId);
    if (!currentBlock) return;
    if (quizState.currentQuestionIndex + 1 < currentBlock.questions.length) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        showHint: false
      }));
    } else {
      setQuizState(prev => ({ ...prev, isFinished: true }));
      setCurrentView('result');
    }
  };

  const handleLogout = async () => {
    setSessionLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
      // Force UI to login if signout fails
      setCurrentView('login');
      setSessionLoading(false);
    }
  };

  if (sessionLoading) {
    return (
       <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div className="flex flex-col items-center gap-6 relative z-10">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-2 border-cyan-500/10 rounded-full"></div>
              <div className="absolute inset-0 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-cyan-500 font-mono text-sm tracking-[0.3em] font-bold animate-pulse uppercase">Inicializace systému</div>
              <div className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">Verifying Encrypted Session</div>
            </div>
          </div>
       </div>
    );
  }

  let content;
  switch (currentView) {
    case 'login': content = <LoginScreen onLoginSuccess={() => {}} />; break;
    case 'dashboard': content = <Dashboard onNavigate={handleDashboardNavigate} userProfile={userProfile} onLogout={handleLogout} />; break;
    case 'cyber_menu': content = <CyberMenu onNavigate={(v) => setCurrentView(v)} onBack={() => setCurrentView('dashboard')} />; break;
    case 'ai_menu': content = <AiMenu onNavigate={(v) => setCurrentView(v)} onBack={() => setCurrentView('dashboard')} />; break;
    case 'quizzes': content = <WelcomeScreen blocks={currentModuleData} onStartBlock={startBlock} onBack={() => setCurrentView(activeModule === 'cyber' ? 'cyber_menu' : 'ai_menu')} theme={activeModule === 'cyber' ? 'emerald' : 'purple'} />; break;
    case 'presentations': content = <PresentationScreen blocks={currentModuleData} onBack={() => setCurrentView(activeModule === 'cyber' ? 'cyber_menu' : 'ai_menu')} theme={activeModule === 'cyber' ? 'cyan' : 'purple'} />; break;
    case 'practical_exercises': content = <AuditScreen onBack={() => setCurrentView(activeModule === 'cyber' ? 'cyber_menu' : 'ai_menu')} />; break;
    case 'quiz':
      const qBlock = currentModuleData.find(b => b.id === quizState.currentBlockId);
      if (qBlock) {
        content = <QuizScreen block={qBlock} currentQuestionIndex={quizState.currentQuestionIndex} question={qBlock.questions[quizState.currentQuestionIndex]} selectedAnswer={quizState.selectedAnswer} showHint={quizState.showHint} onSelectAnswer={handleSelectAnswer} onToggleHint={() => setQuizState(prev => ({ ...prev, showHint: !prev.showHint }))} onNextQuestion={handleNextQuestion} onBackToMenu={() => setCurrentView('quizzes')} />;
      }
      break;
    case 'result':
      const rBlock = currentModuleData.find(b => b.id === quizState.currentBlockId);
      if (rBlock) {
        content = <ResultScreen score={quizState.score} totalQuestions={rBlock.questions.length} onRestart={() => startBlock(quizState.currentBlockId!)} onBackToMenu={() => setCurrentView('quizzes')} />;
      }
      break;
    default: content = <LoginScreen onLoginSuccess={() => {}} />;
  }

  return (
    <div className="relative min-h-screen w-full bg-[#050505] overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200 font-inter">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none fixed"></div>
      <GridBeams />
      <div className="relative z-10 w-full h-full">{content}</div>
    </div>
  );
};

export default App;
