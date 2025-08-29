import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const renderIcon = () => {
    // Shows the icon for the CURRENT theme.
    if (theme === 'light') return <SunIcon />;
    return <MoonIcon />;
  };

  return (
    <button
      onClick={handleThemeChange}
      className="p-2 rounded-full bg-[var(--bg-accent)] text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--border-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)] focus:ring-offset-[var(--bg-secondary)] transition-all"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {renderIcon()}
    </button>
  );
};