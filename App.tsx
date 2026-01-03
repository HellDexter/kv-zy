
import React, { useState, useEffect } from 'react';
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

// Define possible views for the app
type View = 'login' | 'dashboard' | 'cyber_menu' | 'ai_menu' | 'quizzes' | 'presentations' | 'practical_exercises' | 'quiz' | 'result';
type Module = 'cyber' | 'ai';

// Helper component for Grid Beams
const GridBeams: React.FC = () => {
  const [beams, setBeams] = useState<{ id: number; type: 'h' | 'v'; pos: number; delay: number; duration: number; color: string }[]>([]);

  useEffect(() => {
    const newBeams = [];
    const GRID_SIZE = 60;
    const colors = ['emerald', 'purple', 'rose'];
    
    for (let i = 0; i < 3; i++) {
      newBeams.push({
        id: i,
        type: 'h' as const,
        pos: Math.floor(Math.random() * 15) * GRID_SIZE,
        delay: Math.random() * 15,
        duration: 8 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    for (let i = 0; i < 3; i++) {
      newBeams.push({
        id: i + 100,
        type: 'v' as const,
        pos: Math.floor(Math.random() * 30) * GRID_SIZE,
        delay: Math.random() * 15,
        duration: 8 + Math.random() * 10,
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
  
  // Quiz State
  const [quizState, setQuizState] = useState<QuizState>({
    currentBlockId: null,
    currentQuestionIndex: 0,
    score: 0,
    showHint: false,
    selectedAnswer: null,
    isFinished: false,
    answersHistory: []
  });

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (session) {
          await fetchProfile(session.user.id);
          if (mounted) setCurrentView('dashboard');
        }
      } catch (err) {
        console.error("Chyba při inicializaci relace:", err);
        await supabase.auth.signOut();
        if (mounted) {
           setUserProfile(null);
           setCurrentView('login');
        }
      } finally {
        if (mounted) setSessionLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        await fetchProfile(session.user.id);
        if (mounted) setCurrentView('dashboard');
      } else {
        if (mounted) {
           setUserProfile(null);
           setCurrentView('login');
        }
      }
      if (mounted) setSessionLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      if (data) {
        setUserProfile(data as UserProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleDashboardNavigate = (module: Module) => {
    if (module === 'cyber') {
      if (userProfile?.access_cyber || userProfile?.is_admin) {
        setActiveModule('cyber');
        setCurrentView('cyber_menu');
      } else {
        alert("Nemáte přístup k tomuto modulu.");
      }
    } else if (module === 'ai') {
      if (userProfile?.access_ai || userProfile?.is_admin) {
        setActiveModule('ai');
        setCurrentView('ai_menu');
      } else {
         alert("Nemáte přístup k tomuto modulu.");
      }
    }
  };

  const handleMenuNavigate = (subView: 'quizzes' | 'presentations' | 'practical_exercises') => {
    setCurrentView(subView);
  };

  // Get current data based on active module
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
      setQuizState(prev => ({
        ...prev,
        isFinished: true
      }));
      setCurrentView('result');
    }
  };

  const handleBackToQuizMenu = () => {
    setQuizState({
      currentBlockId: null,
      currentQuestionIndex: 0,
      score: 0,
      showHint: false,
      selectedAnswer: null,
      isFinished: false,
      answersHistory: []
    });
    setCurrentView('quizzes');
  };

  const restartQuiz = () => {
    if (quizState.currentBlockId !== null) {
      startBlock(quizState.currentBlockId);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentView('login');
  };

  if (sessionLoading) {
    return (
       <div className="min-h-screen bg-[#050505] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="text-cyan-500 font-mono text-sm tracking-widest animate-pulse">NAČÍTÁNÍ SYSTÉMU...</div>
          </div>
       </div>
    );
  }

  let content;
  
  switch (currentView) {
    case 'login':
      content = <LoginScreen onLoginSuccess={() => {}} />;
      break;
    case 'dashboard':
      content = <Dashboard onNavigate={handleDashboardNavigate} userProfile={userProfile} onLogout={handleLogout} />;
      break;
    case 'cyber_menu':
      content = <CyberMenu onNavigate={handleMenuNavigate} onBack={() => setCurrentView('dashboard')} />;
      break;
    case 'ai_menu':
      content = <AiMenu onNavigate={handleMenuNavigate} onBack={() => setCurrentView('dashboard')} />;
      break;
    case 'quizzes':
      content = (
        <WelcomeScreen 
          blocks={currentModuleData} 
          onStartBlock={startBlock} 
          onBack={() => setCurrentView(activeModule === 'cyber' ? 'cyber_menu' : 'ai_menu')}
          theme={activeModule === 'cyber' ? 'emerald' : 'purple'}
        />
      );
      break;
    case 'presentations':
      content = (
        <PresentationScreen 
          blocks={currentModuleData}
          onBack={() => setCurrentView(activeModule === 'cyber' ? 'cyber_menu' : 'ai_menu')}
          theme={activeModule === 'cyber' ? 'cyan' : 'purple'}
        />
      );
      break;
    case 'practical_exercises':
      content = (
        <AuditScreen 
          onBack={() => setCurrentView(activeModule === 'cyber' ? 'cyber_menu' : 'ai_menu')}
        />
      );
      break;
    case 'quiz':
      const currentBlock = currentModuleData.find(b => b.id === quizState.currentBlockId);
      if (currentBlock) {
        content = (
          <QuizScreen
            block={currentBlock}
            currentQuestionIndex={quizState.currentQuestionIndex}
            question={currentBlock.questions[quizState.currentQuestionIndex]}
            selectedAnswer={quizState.selectedAnswer}
            showHint={quizState.showHint}
            onSelectAnswer={handleSelectAnswer}
            onToggleHint={() => setQuizState(prev => ({ ...prev, showHint: !prev.showHint }))}
            onNextQuestion={handleNextQuestion}
            onBackToMenu={handleBackToQuizMenu}
          />
        );
      }
      break;
    case 'result':
      const finishedBlock = currentModuleData.find(b => b.id === quizState.currentBlockId);
      if (finishedBlock) {
        content = (
          <ResultScreen 
            score={quizState.score} 
            totalQuestions={finishedBlock.questions.length}
            onRestart={restartQuiz}
            onBackToMenu={handleBackToQuizMenu}
          />
        );
      }
      break;
    default:
      content = <LoginScreen onLoginSuccess={() => {}} />;
  }

  return (
    <div className="relative min-h-screen w-full bg-[#050505] overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200 font-inter">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none fixed"></div>
      <GridBeams />
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-float opacity-30 pointer-events-none fixed"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[100px] animate-float opacity-20 pointer-events-none fixed" style={{ animationDelay: '4s' }}></div>
      <div className="relative z-10 w-full h-full">
        {content}
      </div>
    </div>
  );
};

export default App;
