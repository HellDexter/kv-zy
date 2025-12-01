import React from 'react';
import { ArrowLeft, RotateCcw, ShieldCheck, ShieldAlert, Award } from 'lucide-react';

interface Props {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onBackToMenu: () => void;
}

const ResultScreen: React.FC<Props> = ({ score, totalQuestions, onRestart, onBackToMenu }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let title = "";
  let message = "";
  let colorClass = "";
  let Icon = ShieldCheck;

  if (percentage === 100) {
    title = "Kybernetický Expert!";
    message = "Gratulujeme! Máte bezchybné znalosti. Jste skvěle připraveni čelit digitálním hrozbám. Udržujte si tento přehled!";
    colorClass = "text-green-600";
    Icon = Award;
  } else if (percentage >= 80) {
    title = "Velmi dobrá práce";
    message = "Máte silné základy, ale pár detailů vám uniklo. Projděte si znovu chyby, ať jste v bezpečí na 100 %.";
    colorClass = "text-blue-600";
    Icon = ShieldCheck;
  } else if (percentage >= 50) {
    title = "Dobrý začátek";
    message = "Rozumíte základům, ale v kritických situacích byste mohli zaváhat. Doporučujeme si blok zopakovat.";
    colorClass = "text-yellow-600";
    Icon = ShieldAlert;
  } else {
    title = "Pozor, vysoké riziko!";
    message = "Vaše znalosti v této oblasti mají mezery, které by útočník mohl snadno zneužít. Určitě si tento blok projděte znovu a pečlivě.";
    colorClass = "text-red-600";
    Icon = ShieldAlert;
  }

  return (
    <div className="max-w-xl mx-auto p-6 min-h-screen flex flex-col items-center justify-center text-center">
      <div className={`w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center mb-6 ${colorClass}`}>
        <Icon className="w-12 h-12" />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-8 leading-relaxed">
        {message}
      </p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full mb-8">
        <div className="text-sm text-gray-500 mb-1">Váš výsledek</div>
        <div className={`text-5xl font-bold ${colorClass} mb-2`}>
          {percentage}%
        </div>
        <div className="text-gray-400 font-medium">
          {score} z {totalQuestions} správně
        </div>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={onRestart}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Zkusit znovu
        </button>
        <button
          onClick={onBackToMenu}
          className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na seznam bloků
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
