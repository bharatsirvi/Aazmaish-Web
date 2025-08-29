import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header: React.FC = () => {
  return (
    <header className="w-full p-6 bg-[var(--bg-secondary)]/60 backdrop-blur-md border-b border-[var(--border-primary)]/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
            <LogoIcon />
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] ml-3">
                Aazmaish
            </h1>
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  );
};