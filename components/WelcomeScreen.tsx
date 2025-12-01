import React from 'react';
import { Block } from '../types';
import * as Icons from 'lucide-react';

interface Props {
  blocks: Block[];
  onStartBlock: (blockId: number) => void;
}

const WelcomeScreen: React.FC<Props> = ({ blocks, onStartBlock }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Kyberbezpečnost</h1>
        <h2 className="text-xl text-blue-600 font-semibold mb-2">Bezpečný občan online</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Vítejte v interaktivním kurzu. Vyberte si jeden z 9 bloků a otestujte své znalosti v krátkém kvízu.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blocks.map((block) => {
          // Dynamic icon rendering
          // @ts-ignore
          const IconComponent = Icons[block.icon] || Icons.HelpCircle;

          return (
            <button
              key={block.id}
              onClick={() => onStartBlock(block.id)}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 text-left group hover:border-blue-200"
            >
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <IconComponent className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                {block.title}
              </h3>
              <p className="text-sm text-gray-500">
                {block.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WelcomeScreen;
