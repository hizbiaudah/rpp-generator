
export type Kurikulum = 'Kurikulum Merdeka' | 'Kurikulum 2013' | 'Kurikulum Darurat';
export type Jenjang = 'SD' | 'SMP' | 'SMA/SMK';

export interface RppFormData {
  kurikulum: Kurikulum;
  jenjang: Jenjang;
  fase: string;
  kelas: string;
  mapel: string;
  materi: string;
  namaSekolah: string;
  penyusun: string;
}
