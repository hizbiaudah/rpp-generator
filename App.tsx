import React, { useState, useCallback, useEffect } from 'react';
import { RppFormData } from './types';
import Header from './components/Header';
import RppForm from './components/RppForm';
import RppDisplay from './components/RppDisplay';
import { generateRpp } from './services/geminiService';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const initialFormData: RppFormData = {
    kurikulum: 'Kurikulum Merdeka',
    jenjang: 'SMP',
    fase: 'D',
    kelas: '7',
    mapel: 'Informatika',
    materi: 'Sistem Komputer dan Komponennya',
    namaSekolah: 'SMP Negeri 1 Indonesia',
    penyusun: 'Tim Guru Cerdas',
  };

  const [formData, setFormData] = useState<RppFormData>(initialFormData);
  const [generatedRpp, setGeneratedRpp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (userPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedRpp('');
    try {
      const result = await generateRpp(formData);
      setGeneratedRpp(result);
    } catch (err) {
      setError('Gagal menghasilkan RPP. Silakan coba lagi nanti.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const handleReset = useCallback(() => {
    setFormData(initialFormData);
    setGeneratedRpp('');
    setError(null);
  }, [initialFormData]);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <RppForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onReset={handleReset}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-8">
            <RppDisplay
              rppContent={generatedRpp}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-slate-500 dark:text-slate-400">
        <p>Ditenagai oleh AI untuk Pendidikan Indonesia yang Lebih Baik</p>
      </footer>
    </div>
  );
};

export default App;