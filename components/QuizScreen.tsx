import React from 'react';
import { Block, Question } from '../types';
import { ArrowLeft, HelpCircle, AlertCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

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
    <div className="max-w-2xl mx-auto p-4 min-h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={onBackToMenu}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na menu
        </button>
        <span className="text-sm font-medium text-gray-500">
          Otázka {currentQuestionIndex + 1} z {block.questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex-grow">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            let baseClasses = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 font-medium flex items-center justify-between ";
            
            if (isAnswered) {
              if (index === question.correctAnswer) {
                baseClasses += "border-green-500 bg-green-50 text-green-800";
              } else if (index === selectedAnswer) {
                baseClasses += "border-red-500 bg-red-50 text-red-800";
              } else {
                baseClasses += "border-gray-100 text-gray-400 opacity-50";
              }
            } else {
              baseClasses += "border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700";
            }

            return (
              <button
                key={index}
                onClick={() => !isAnswered && onSelectAnswer(index)}
                disabled={isAnswered}
                className={baseClasses}
              >
                <span>{option}</span>
                {isAnswered && index === question.correctAnswer && <CheckCircle className="w-5 h-5 text-green-600" />}
                {isAnswered && index === selectedAnswer && index !== question.correctAnswer && <XCircle className="w-5 h-5 text-red-600" />}
              </button>
            );
          })}
        </div>

        {/* Hint Section */}
        <div className="mt-8">
          {!isAnswered && (
            <button
              onClick={onToggleHint}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              {showHint ? "Skrýt nápovědu" : "Potřebuji nápovědu"}
            </button>
          )}
          
          {showHint && !isAnswered && (
            <div className="mt-3 p-4 bg-blue-50 rounded-lg text-blue-800 text-sm flex gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{question.hint}</p>
            </div>
          )}

          {isAnswered && (
            <div className="mt-6 animate-fade-in">
              <div className={`p-4 rounded-lg mb-4 ${selectedAnswer === question.correctAnswer ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                <p className="font-semibold mb-1">
                  {selectedAnswer === question.correctAnswer ? "Správně!" : "To není správně."}
                </p>
                <p className="text-sm opacity-90">{question.hint}</p>
              </div>
              
              <button
                onClick={onNextQuestion}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-md transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Další otázka <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
