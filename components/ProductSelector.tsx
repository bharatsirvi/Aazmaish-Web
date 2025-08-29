import React from 'react';
import type { Product } from '../types';
import { BackIcon } from './icons/BackIcon';

interface ProductSelectorProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
  disabled: boolean;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({ products, onSelectProduct, onBack, disabled }) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200 animate-slide-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-600 transition-colors mb-4">
          <BackIcon />
          Back to Categories
      </button>
      <h3 className="text-xl font-bold mb-1">Choose an Item</h3>
      <p className="text-gray-500 mb-6">Select a style to try on your photo.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelectProduct(product)}
            disabled={disabled}
            className="group aspect-square flex flex-col items-center justify-center p-2 rounded-lg border-2 border-gray-200 bg-white text-center transition-all duration-300 hover:border-pink-500 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-contain mb-2 transition-transform group-hover:scale-110" />
            <span className="text-sm font-semibold text-gray-700">{product.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};