
import React, { useState, useEffect } from 'react';
import { courseData } from './data';
import { QuizState } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import CyberMenu from './components/CyberMenu';
import PresentationScreen from './components/PresentationScreen';
import AuditScreen from './components/AuditScreen';

// Define possible views for the app
type View = 'login' | 'dashboard' | 'cyber_menu' | 'quizzes' | 'presentations' | 'practical_exercises' | 'quiz' | 'result';

// Helper component for Grid Beams
const GridBeams: React.FC = () => {
  const [beams, setBeams] = useState<{ id: number; type: 'h' | 'v'; pos: number; delay: number; duration: number; color: string }[]>([]);

  useEffect(() => {
    // Generate static random beams on mount to avoid hydration mismatch or re-renders
    const newBeams = [];
    const GRID_SIZE = 40; // Pixels, matching CSS
    const colors = ['emerald', 'purple', 'rose'];
    
    // Horizontal beams (moving along rows)
    for (let i = 0; i < 8; i++) {
      newBeams.push({
        id: i,
        type: 'h' as const,
        pos: Math.floor(Math.random() * 20) * GRID_SIZE, // Random row
        delay: Math.random() * 10,
        duration: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Vertical beams (moving along columns)
    for (let i = 0; i < 8; i++) {
      newBeams.push({
        id: i + 100,
        type: 'v' as const,
        pos: Math.floor(Math.random() * 40) * GRID_SIZE, // Random col
        delay: Math.random() * 10,
        duration: 3 + Math.random() * 5,
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

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  const handleDashboardNavigate = (module: 'cyber' | 'ai') => {
    if (module === 'cyber') {
      setCurrentView('cyber_menu');
    }
    // AI module is handled visually in Dashboard as locked
  };

  const handleCyberMenuNavigate = (subView: 'quizzes' | 'presentations' | 'practical_exercises') => {
    if (subView === 'quizzes') {
      setCurrentView('quizzes');
    } else if (subView === 'presentations') {
      setCurrentView('presentations');
    } else {
      setCurrentView('practical_exercises');
    }
  };

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
    const currentBlock = courseData.find(b => b.id === quizState.currentBlockId);
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
    const currentBlock = courseData.find(b => b.id === quizState.currentBlockId);
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

  // Content Selection Logic
  let content;
  
  switch (currentView) {
    case 'login':
      content = <LoginScreen onLogin={handleLogin} />;
      break;
    case 'dashboard':
      content = <Dashboard onNavigate={handleDashboardNavigate} />;
      break;
    case 'cyber_menu':
      content = <CyberMenu onNavigate={handleCyberMenuNavigate} onBack={() => setCurrentView('dashboard')} />;
      break;
    case 'quizzes':
      content = (
        <WelcomeScreen 
          blocks={courseData} 
          onStartBlock={startBlock} 
          onBack={() => setCurrentView('cyber_menu')} 
        />
      );
      break;
    case 'presentations':
      content = (
        <PresentationScreen 
          blocks={courseData}
          onBack={() => setCurrentView('cyber_menu')} 
        />
      );
      break;
    case 'practical_exercises':
      content = (
        <AuditScreen 
          onBack={() => setCurrentView('cyber_menu')}
        />
      );
      break;
    case 'quiz':
      const currentBlock = courseData.find(b => b.id === quizState.currentBlockId);
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
      const finishedBlock = courseData.find(b => b.id === quizState.currentBlockId);
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
      content = <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="relative min-h-screen w-full bg-[#050505] overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200 font-inter">
      {/* Global Dynamic Background Elements - Persistent across screens */}
      
      {/* Static Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none fixed"></div>
      
      {/* Dynamic Grid Beams */}
      <GridBeams />

      {/* Glowing Orbs - Made subtler and slower */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-float opacity-30 pointer-events-none fixed"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[100px] animate-float opacity-20 pointer-events-none fixed" style={{ animationDelay: '4s' }}></div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full">
        {content}
      </div>
    </div>
  );
};

export default App;
