
import { GoogleGenAI } from "@google/genai";
import { RppFormData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const buildPrompt = (formData: RppFormData): string => {
  const { kurikulum, jenjang, fase, kelas, mapel, materi, namaSekolah, penyusun } = formData;

  const contextSpecificField = kurikulum === 'Kurikulum Merdeka' 
    ? `- Fase          : ${fase}\n- Kelas         : (Sesuai Fase ${fase})`
    : `- Kelas         : ${kelas}`;
    
  const competenceTitle = kurikulum === 'Kurikulum Merdeka' 
    ? 'I. Capaian Pembelajaran (CP)' 
    : 'I. Kompetensi Inti (KI) dan Kompetensi Dasar (KD)';

  return `
Kamu adalah asisten pendidikan berbasis deep learning yang ahli dalam kurikulum Indonesia.
Tugasmu: membuat dokumen Rencana Pelaksanaan Pembelajaran (RPP) yang lengkap, rapih, elegan, dan siap pakai.
Gunakan format resmi RPP Indonesia yang umum ditemukan di internet.

Input dari pengguna adalah sebagai berikut:
- Kurikulum: ${kurikulum}
- Jenjang: ${jenjang}
- Fase: ${fase} (Hanya berlaku untuk Kurikulum Merdeka)
- Kelas: ${kelas} (Terutama untuk Kurikulum 2013/Darurat)
- Mata Pelajaran: ${mapel}
- Materi: ${materi}
- Nama Sekolah: ${namaSekolah}
- Disusun oleh: ${penyusun}

**Instruksi Output:**
- Susun RPP dengan heading tebal, bullet point, dan penomoran yang jelas agar mudah dibaca.
- Gunakan istilah sesuai kurikulum yang dipilih:
  • Jika Kurikulum Merdeka → gunakan "Capaian Pembelajaran (CP)".
  • Jika Kurikulum 2013 → gunakan "Kompetensi Inti (KI)" dan "Kompetensi Dasar (KD)".
- Tulis dengan bahasa Indonesia formal dan konsisten seperti dokumen resmi.
- Jangan membuat konten yang terlalu ringkas. Buat detail agar bisa langsung dipakai guru.
- Tampilkan dengan rapih, elegan, dan jarak antar bagian yang cukup.
- Output harus berbentuk **teks terstruktur, bukan tabel**.

---

### Format RPP yang Harus Dihasilkan:

# RENCANA PELAKSANAAN PEMBELAJARAN (RPP)

**Identitas RPP**
- Nama Sekolah  : ${namaSekolah}
- Kurikulum     : ${kurikulum}
- Jenjang       : ${jenjang}
${contextSpecificField}
- Mata Pelajaran: ${mapel}
- Materi Pokok  : ${materi}
- Disusun oleh  : ${penyusun}

---

**${competenceTitle}**
(Tuliskan ${competenceTitle.split(' ').slice(1).join(' ')} yang relevan dan sesuai untuk jenjang, mata pelajaran, dan materi yang diberikan. Buat secara detail dan komprehensif.)

**II. Tujuan Pembelajaran**
(Berdasarkan ${competenceTitle.split(' ').slice(1).join(' ')} di atas, turunkan menjadi beberapa tujuan pembelajaran yang spesifik, terukur, dapat dicapai, relevan, dan berbatas waktu (SMART). Gunakan format daftar bernomor.)

**III. Indikator Pencapaian Kompetensi (IPK)**
(Rincikan indikator pencapaian yang lebih detail untuk setiap tujuan pembelajaran. Ini adalah tanda-tanda yang dapat diamati bahwa siswa telah mencapai tujuan tersebut.)

**IV. Materi Pembelajaran**
(Jelaskan poin-poin materi pokok yang akan diajarkan, relevan dengan topik "${materi}". Berikan ringkasan singkat untuk setiap poin.)

**V. Metode/Model/Strategi Pembelajaran**
- **Model Pembelajaran**: [Pilih model yang paling sesuai, contoh: Discovery Learning, Problem-Based Learning (PBL), Project-Based Learning (PjBL), Inquiry Learning]
- **Pendekatan**: [Contoh: Saintifik, STEAM, Kontekstual]
- **Metode**: [Contoh: Diskusi kelompok, Tanya jawab, Ceramah interaktif, Demonstrasi, Simulasi]

**VI. Langkah-Langkah Pembelajaran**
(Alokasikan waktu secara proporsional, misal total 2 x 45 menit)
1.  **Kegiatan Pendahuluan (sekitar 15 Menit)**
    - **Orientasi**: Guru membuka pelajaran dengan salam, doa, dan memeriksa kehadiran.
    - **Apersepsi**: Guru mengaitkan materi "${materi}" dengan pengetahuan awal siswa atau materi sebelumnya.
    - **Motivasi**: Guru memberikan gambaran manfaat mempelajari materi dan menyampaikan tujuan pembelajaran.
    - **Pemberian Acuan**: Guru menjelaskan alur kegiatan pembelajaran yang akan dilakukan.

2.  **Kegiatan Inti (sekitar 60 Menit)**
    - [Uraikan aktivitas guru dan siswa secara rinci sesuai sintaks model pembelajaran yang dipilih. Misalnya, jika menggunakan PBL:
        - **Fase 1: Orientasi siswa pada masalah**: Guru menyajikan masalah nyata terkait ${materi}.
        - **Fase 2: Mengorganisasi siswa untuk belajar**: Siswa dibagi dalam kelompok untuk mendiskusikan masalah.
        - **Fase 3: Membimbing penyelidikan individu maupun kelompok**: Guru memfasilitasi diskusi dan pencarian informasi.
        - **Fase 4: Mengembangkan dan menyajikan hasil karya**: Kelompok mempersiapkan dan mempresentasikan solusi.
        - **Fase 5: Menganalisis dan mengevaluasi proses pemecahan masalah**: Guru dan siswa melakukan evaluasi terhadap presentasi dan proses.]

3.  **Kegiatan Penutup (sekitar 15 Menit)**
    - **Rangkuman**: Guru bersama siswa menyimpulkan poin-poin penting dari materi.
    - **Refleksi**: Siswa diminta memberikan umpan balik tentang apa yang dipelajari dan kesulitan yang dihadapi.
    - **Tindak Lanjut**: Guru memberikan tugas (PR) atau informasi materi untuk pertemuan berikutnya.
    - **Doa dan Salam**: Guru menutup pelajaran.

**VII. Media, Alat, dan Sumber Belajar**
- **Media**: [Contoh: Slide presentasi (PPT), Video pembelajaran dari YouTube, Papan tulis digital]
- **Alat**: [Contoh: Laptop, Proyektor, Spidol, Alat peraga (jika ada)]
- **Sumber Belajar**: [Contoh: Buku Siswa Kemdikbudristek ${mapel} Kelas ${kelas}, Modul Ajar, Artikel dari internet (sertakan link jika memungkinkan), Lingkungan sekitar]

**VIII. Penilaian (Asesmen)**
- **1. Penilaian Sikap (Profil Pelajar Pancasila)**
    - **Teknik**: Observasi selama proses pembelajaran.
    - **Instrumen**: Jurnal/lembar observasi sikap (misal: Bernalar Kritis, Gotong Royong).
- **2. Penilaian Pengetahuan**
    - **Teknik**: Tes tulis, lisan, atau penugasan.
    - **Instrumen**: Soal esai, pilihan ganda, atau kuis singkat.
- **3. Penilaian Keterampilan**
    - **Teknik**: Unjuk kerja, proyek, atau portofolio.
    - **Instrumen**: Rubrik penilaian (misal: rubrik presentasi, rubrik pembuatan produk).

**IX. Alokasi Waktu**
- [Tentukan alokasi waktu total, contoh: 2 JP (2 x 45 Menit) untuk satu pertemuan]

**X. Kegiatan Pengayaan dan Remedial**
- **Pengayaan**: Diberikan kepada siswa yang telah melampaui Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) untuk memperdalam materi.
- **Remedial**: Diberikan kepada siswa yang belum mencapai KKTP, melalui pembelajaran ulang atau tutor sebaya.

---
Pastikan output yang dihasilkan profesional, komprehensif, dan siap digunakan oleh guru di sekolah.
`;
};

export const generateRpp = async (formData: RppFormData): Promise<string> => {
  try {
    const prompt = buildPrompt(formData);
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate RPP from Gemini API.");
  }
};
