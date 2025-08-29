import React from 'react';
import type { Category } from '../types';
import { BackIcon } from './icons/BackIcon';

interface CategorySelectorProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  onBack: () => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelectCategory, onBack }) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200 animate-slide-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-600 transition-colors mb-4">
          <BackIcon />
          Back to Style Selection
      </button>
      <h3 className="text-xl font-bold mb-1">Choose a Category</h3>
      <p className="text-gray-500 mb-6">What are you looking to try on today?</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className="group aspect-square flex flex-col items-center justify-center p-2 rounded-lg border-2 border-gray-200 bg-white text-center transition-all duration-300 hover:border-pink-500 hover:shadow-lg hover:-translate-y-1"
          >
            <img src={category.imageUrl} alt={category.name} className="w-16 h-16 object-contain mb-2 transition-transform group-hover:scale-110" />
            <span className="text-sm font-semibold text-gray-700">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};