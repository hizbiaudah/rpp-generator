import React from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}


const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm dark:border-b dark:border-slate-700 shadow-md sticky top-0 z-10 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 md:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
              <div className="p-3 bg-brand-blue-100 dark:bg-brand-blue-900/50 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-blue-600 dark:text-brand-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
              </div>
              <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-brand-blue-900 dark:text-brand-blue-200">
                      Generator RPP Cerdas
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                      Buat Rencana Pelaksanaan Pembelajaran (RPP) lengkap dalam hitungan detik.
                  </p>
              </div>
          </div>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
};

export default Header;