import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full p-3 sm:p-4 text-center">
      <p className="text-xs sm:text-sm text-[var(--text-secondary)] transition-colors duration-300 px-2">
        Powered by smart technology. Created for Illustrative purposes.
      </p>
    </footer>
  );
};