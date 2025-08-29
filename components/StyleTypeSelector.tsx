import React from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface StyleTypeSelectorProps {
  onSelect: (type: 'predefined' | 'custom') => void;
}

export const StyleTypeSelector: React.FC<StyleTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200 animate-slide-in">
      <h3 className="text-xl font-bold mb-1">How would you like to style?</h3>
      <p className="text-gray-500 mb-6">Choose from our curated styles or upload your own item.</p>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => onSelect('predefined')}
          className="group w-full p-6 rounded-xl border-2 border-gray-200 bg-white text-left transition-all duration-300 hover:border-pink-500 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center">
            <div className="p-3 bg-pink-100 rounded-lg">
                <SparklesIcon />
            </div>
            <div className="ml-4">
                <h4 className="font-bold text-gray-800 text-lg">Browse Our Styles</h4>
                <p className="text-gray-500 text-sm">Try on jackets, accessories, and more.</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => onSelect('custom')}
          className="group w-full p-6 rounded-xl border-2 border-dashed border-gray-300 text-left transition-all duration-300 hover:border-pink-600 hover:bg-pink-50 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center">
             <div className="p-3 bg-gray-100 group-hover:bg-pink-100 transition-colors rounded-lg">
                <PlusIcon />
            </div>
             <div className="ml-4">
                <h4 className="font-bold text-gray-800 text-lg">Upload Your Garment</h4>
                <p className="text-gray-500 text-sm">See how your own clothing items look.</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};