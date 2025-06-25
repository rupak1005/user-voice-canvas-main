import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    // Always sync DOM class with state
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
  const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';

  // Disable transitions briefly
  document.documentElement.classList.add('theme-toggling');

  // Instantly switch theme class
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(newTheme);

  // Remove transition blocker right after DOM update
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('theme-toggling');
  });

  localStorage.setItem('theme', newTheme);
  setTheme(newTheme);
};



  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
