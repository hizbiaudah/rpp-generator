import React from 'react';
import { RppFormData, Kurikulum, Jenjang } from '../types';

interface RppFormProps {
  formData: RppFormData;
  setFormData: React.Dispatch<React.SetStateAction<RppFormData>>;
  onSubmit: () => void;
  onReset: () => void;
  isLoading: boolean;
}

const kurikulumOptions: Kurikulum[] = ['Kurikulum Merdeka', 'Kurikulum 2013', 'Kurikulum Darurat'];
const jenjangOptions: Jenjang[] = ['SD', 'SMP', 'SMA/SMK'];

const RppForm: React.FC<RppFormProps> = ({ formData, setFormData, onSubmit, onReset, isLoading }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    // Reset fase/kelas when curriculum changes to avoid invalid state
    if (name === 'kurikulum') {
      if (value === 'Kurikulum Merdeka') {
        newFormData.fase = 'A';
        newFormData.kelas = '1'; // Default, though not shown
      } else {
        newFormData.fase = 'A'; // Default, though not shown
        newFormData.kelas = '1';
      }
    }
    
    setFormData(newFormData);
  };
  
  const faseOptions = [
      { label: 'Fase A (Kelas 1-2 SD)', value: 'A' },
      { label: 'Fase B (Kelas 3-4 SD)', value: 'B' },
      { label: 'Fase C (Kelas 5-6 SD)', value: 'C' },
      { label: 'Fase D (Kelas 7-9 SMP)', value: 'D' },
      { label: 'Fase E (Kelas 10 SMA/SMK)', value: 'E' },
      { label: 'Fase F (Kelas 11-12 SMA/SMK)', value: 'F' },
  ];
  const kelasOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg sticky top-28 transition-colors duration-300">
      <h2 className="text-xl font-bold text-brand-blue-800 dark:text-brand-blue-300 mb-6 border-b border-slate-200 dark:border-slate-600 pb-3">Parameter RPP</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
        <div>
          <label htmlFor="kurikulum" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kurikulum</label>
          <select id="kurikulum" name="kurikulum" value={formData.kurikulum} onChange={handleInputChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-colors duration-300">
            {kurikulumOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="jenjang" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Jenjang Pendidikan</label>
          <select id="jenjang" name="jenjang" value={formData.jenjang} onChange={handleInputChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-colors duration-300">
            {jenjangOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {formData.kurikulum === 'Kurikulum Merdeka' ? (
          <div>
            <label htmlFor="fase" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fase</label>
            <select id="fase" name="fase" value={formData.fase} onChange={handleInputChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-colors duration-300">
              {faseOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        ) : (
          <div>
            <label htmlFor="kelas" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kelas</label>
            <select id="kelas" name="kelas" value={formData.kelas} onChange={handleInputChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-colors duration-300">
              {kelasOptions.map(opt => <option key={opt} value={opt}>{`Kelas ${opt}`}</option>)}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="mapel" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mata Pelajaran</label>
          <input type="text" id="mapel" name="mapel" value={formData.mapel} onChange={handleInputChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-colors duration-300" placeholder="Contoh: Matematika" required />
        </div>

        <div>
          <label htmlFor="materi" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Materi Pembelajaran</label>
          <input type="text" id="materi" name="materi" value={formData.materi} onChange={handleInputChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-colors duration-300" placeholder="Contoh: Teks Prosedur" required />
        </div>

        <div>
          <label htmlFor="namaSekolah" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Sekolah</label>
          <input type="text" id="namaSekolah" name="namaSekolah" value={formData.namaSekolah} onChange={handleInputChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-colors duration-300" placeholder="Contoh: SMPN 1 Jakarta" required />
        </div>

        <div>
          <label htmlFor="penyusun" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Disusun Oleh</label>
          <input type="text" id="penyusun" name="penyusun" value={formData.penyusun} onChange={handleInputChange} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-colors duration-300" placeholder="Nama Anda atau Tim" required />
        </div>
      
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-600 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-blue-600 hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 disabled:bg-brand-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </>
            ) : (
              'Generate RPP'
            )}
          </button>
          <button
            type="button"
            onClick={onReset}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2 border border-slate-300 dark:border-slate-500 text-base font-medium rounded-md shadow-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 dark:focus:ring-slate-500 disabled:opacity-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default RppForm;