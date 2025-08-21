import React, { useState, useEffect, useMemo } from 'react';

interface RppDisplayProps {
  rppContent: string;
  isLoading: boolean;
  error: string | null;
}

const RppDisplay: React.FC<RppDisplayProps> = ({ rppContent, isLoading, error }) => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const handleCopy = () => {
    if (!rppContent) return;
    navigator.clipboard.writeText(rppContent).then(() => {
      setCopySuccess(true);
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const formattedContent = useMemo(() => {
    if (!rppContent) return '';
    return rppContent
      // 1. Format Judul Utama (# Judul)
      .replace(/^# (.*)$/gm, '<h1 class="text-2xl font-extrabold text-brand-blue-900 dark:text-brand-blue-200 mb-4">$1</h1>')
      // 2. Format Judul Bagian (**I. Judul**)
      .replace(/^\*\*(.*)\*\*$/gm, '<h2 class="text-xl font-bold text-brand-blue-800 dark:text-brand-blue-300 mt-8 mb-4 border-b border-slate-200 dark:border-slate-600 pb-2">$1</h2>')
      // 3. Format Garis Pemisah (---)
      .replace(/^---$/gm, '<hr class="my-8 border-slate-200 dark:border-slate-700" />')
      // 4. Format semua teks tebal lainnya (**teks tebal**) menjadi <strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-slate-100">$1</strong>');
  }, [rppContent]);
  

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-6">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-blue-500"></div>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">AI sedang meracik RPP terbaik untuk Anda...</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Mohon tunggu sebentar, ini mungkin memakan waktu beberapa detik.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-xl font-semibold text-red-800 dark:text-red-200">Oops, terjadi kesalahan!</h3>
          <p className="mt-1 text-red-600 dark:text-red-300">{error}</p>
        </div>
      );
    }

    if (!rppContent) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] bg-slate-100 dark:bg-slate-800/50 p-6 rounded-b-lg">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
           </svg>
           <h3 className="mt-2 text-xl font-semibold text-slate-700 dark:text-slate-300">RPP Anda akan muncul di sini</h3>
           <p className="mt-1 text-slate-500 dark:text-slate-400">Isi formulir di samping dan klik "Generate RPP" untuk memulai.</p>
        </div>
      );
    }

    return (
      <div className="relative">
         <div 
            className="p-8 whitespace-pre-wrap break-words font-sans text-base leading-7 text-slate-800 dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
         />
      </div>
    );
  };
  
  const getTitle = () => {
    if (rppContent) {
      const mapelMatch = rppContent.match(/Mata Pelajaran\s*:\s*(.*)/);
      if (mapelMatch && mapelMatch[1]) {
        return `RPP ${mapelMatch[1].trim()}`;
      }
    }
    return "Hasil RPP";
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg transition-colors duration-300">
        <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-t-lg border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-brand-blue-800 dark:text-brand-blue-300">{isLoading ? 'Membuat RPP...' : getTitle()}</h2>
            {rppContent && !isLoading && (
              <button
                onClick={handleCopy}
                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-md text-sm transition-colors flex items-center space-x-2"
                aria-label="Salin RPP"
              >
                 {copySuccess ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                 ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                 )}
                <span>{copySuccess ? 'Disalin!' : 'Salin'}</span>
              </button>
            )}
        </div>
        <div>
            {renderContent()}
        </div>
        {copySuccess && (
          <div aria-live="polite" className="fixed bottom-5 right-5 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 py-2 px-4 rounded-lg shadow-lg text-sm transition-opacity duration-300">
            Teks RPP berhasil disalin ke clipboard!
          </div>
        )}
    </div>
  );
};

export default RppDisplay;