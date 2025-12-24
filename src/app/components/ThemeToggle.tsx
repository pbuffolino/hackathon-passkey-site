'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show theme-dependent content after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a placeholder with the same dimensions during SSR
  if (!mounted) {
    return (
      <button
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-sm transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {/* Placeholder space for icon */}
        <span className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-sm hover:scale-110 hover:shadow-xl active:scale-95 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon for light mode */}
      <svg
        className={`w-5 h-5 text-amber-500 transition-all duration-300 absolute ${theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      
      {/* Moon icon for dark mode */}
      <svg
        className={`w-5 h-5 text-blue-400 transition-all duration-300 absolute ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}
