import React, { useState } from 'react';
import { courseData } from './data';
import { QuizState } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentBlockId: null,
    currentQuestionIndex: 0,
    score: 0,
    showHint: false,
    selectedAnswer: null,
    isFinished: false,
    answersHistory: []
  });

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
    }
  };

  const handleBackToMenu = () => {
    setQuizState({
      currentBlockId: null,
      currentQuestionIndex: 0,
      score: 0,
      showHint: false,
      selectedAnswer: null,
      isFinished: false,
      answersHistory: []
    });
  };

  const restartQuiz = () => {
    if (quizState.currentBlockId !== null) {
      startBlock(quizState.currentBlockId);
    }
  };

  // View Routing Logic
  if (!quizState.currentBlockId) {
    return <WelcomeScreen blocks={courseData} onStartBlock={startBlock} />;
  }

  const currentBlock = courseData.find(b => b.id === quizState.currentBlockId);
  if (!currentBlock) return null;

  if (quizState.isFinished) {
    return (
      <ResultScreen 
        score={quizState.score} 
        totalQuestions={currentBlock.questions.length}
        onRestart={restartQuiz}
        onBackToMenu={handleBackToMenu}
      />
    );
  }

  return (
    <QuizScreen
      block={currentBlock}
      currentQuestionIndex={quizState.currentQuestionIndex}
      question={currentBlock.questions[quizState.currentQuestionIndex]}
      selectedAnswer={quizState.selectedAnswer}
      showHint={quizState.showHint}
      onSelectAnswer={handleSelectAnswer}
      onToggleHint={() => setQuizState(prev => ({ ...prev, showHint: !prev.showHint }))}
      onNextQuestion={handleNextQuestion}
      onBackToMenu={handleBackToMenu}
    />
  );
};

export default App;
