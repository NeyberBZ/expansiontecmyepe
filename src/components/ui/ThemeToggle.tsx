// src/components/ui/ThemeToggle.tsx
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    const html = document.documentElement;

    if (newTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) {
    // Placeholder para evitar layout shift
    return <div className="w-8 h-8" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-conic from-gray-900 to-gray-600 to-50% rounded-full bg-surface-offset hover:bg-surface-offset-2 transition-colors dark:from-yellow-200 dark:to-yellow-500 dark:to-50%"
      aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
    >
      {theme === 'light' ? (
        // Luna (modo oscuro)
        <svg fill="none" stroke="currentColor" className="w-5 h-5 text-white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9 9 0 0 0 8.354-5.646" strokeWidth={2}/></svg>
      ) : (
        // Sol (modo claro)
        <svg fill="none" stroke="currentColor" className="w-5 h-5 text-black dark:text-black" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0" strokeWidth={2}/></svg>
      )}
    </button>
  );
}