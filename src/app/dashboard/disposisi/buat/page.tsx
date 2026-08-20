'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UploadCloud, Users, Send, File as FileIcon, X } from 'lucide-react';

export default function BuatDisposisiPage() {
  const [selectedPenerima, setSelectedPenerima] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // Dummy data untuk simulasi dropdown multi-select
  const daftarPenerima = [
    { id: 'ktu', nama: 'Siti Aminah', jabatan: 'Kepala Tata Usaha', tipe: 'Pegawai' },
    { id: 'tim-1', nama: 'Tim Kebijakan Pembangunan', jabatan: 'Tim Kerja', tipe: 'Tim Kerja' },
    { id: 'tim-2', nama: 'Tim Pengembangan Daerah', jabatan: 'Tim Kerja', tipe: 'Tim Kerja' },
    { id: 'peg-1', nama: 'Budi Utama', jabatan: 'Analis Kebijakan', tipe: 'Pegawai' },
    { id: 'peg-2', nama: 'Andi Jaya', jabatan: 'Analis Data', tipe: 'Pegawai' },
  ];

  const handleTogglePenerima = (id: string) => {
    if (selectedPenerima.includes(id)) {
      setSelectedPenerima(selectedPenerima.filter(item => item !== id));
    } else {
      setSelectedPenerima([...selectedPenerima, id]);
    }
  };

  const router = useRouter();
  
  const handleKirimDisposisi = () => {
    if (!uploadedFile) {
      alert('Mohon unggah dokumen surat terlebih dahulu.');
      return;
    }
    if (selectedPenerima.length === 0) {
      alert('Mohon pilih minimal 1 penerima disposisi.');
      return;
    }
    
    // Simpan ke localStorage untuk mensimulasikan update list
    const existingStr = localStorage.getItem('disposisiList');
    const existingList = existingStr ? JSON.parse(existingStr) : [];
    
    // Mendapatkan nama-nama penerima dari ID
    const penerimaNames = selectedPenerima.map(id => {
      const p = daftarPenerima.find(x => x.id === id);
      return p ? p.nama : id;
    });

    const newDisposisi = {
      id: `SIM/${Math.floor(Math.random() * 1000)}/08/2026`,
      perihal: uploadedFile.name.replace(/\.[^/.]+$/, ""), // nama file tanpa ekstensi sebagai default perihal
      penerima: penerimaNames,
      tanggal: new Date().toISOString().split('T')[0],
      status: 'Baru'
    };

    localStorage.setItem('disposisiList', JSON.stringify([newDisposisi, ...existingList]));

    alert(`Berhasil! Disposisi telah dikirim ke ${selectedPenerima.length} penerima.`);
    router.push('/dashboard/disposisi');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/dashboard/disposisi" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Form Disposisi Surat</h2>
          <p className="text-slate-600 mt-1">Unggah dokumen dan teruskan instruksi ke tim atau pegawai.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <form className="p-6 sm:p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          {/* Bagian 1: Dokumen */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center border-b pb-2">
              <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">1</span> 
              Dokumen Surat
            </h3>
            
            <div className="grid grid-cols-1 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul / Perihal Surat</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Contoh: Undangan Rapat Koordinasi Kementerian" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Unggah Dokumen (PDF, Word, JPG)</label>
                
                {!uploadedFile ? (
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="space-y-1 text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                      <div className="flex text-sm text-slate-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2 py-1 border border-slate-200">
                          <span>Pilih File</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setUploadedFile(e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                        <p className="pl-2 pt-1">atau tarik dan lepas file ke sini</p>
                      </div>
                      <p className="text-xs text-slate-500">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1 p-4 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <FileIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{uploadedFile.name}</p>
                        <p className="text-xs text-slate-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setUploadedFile(null)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bagian 2: Instruksi & Tujuan */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center border-b pb-2 mt-8">
              <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">2</span> 
              Tujuan & Instruksi Disposisi
            </h3>
            
            <div className="grid grid-cols-1 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex justify-between">
                  <span>Pilih Penerima Disposisi <span className="text-rose-500">*</span></span>
                  <span className="text-xs text-slate-500 font-normal">Bisa memilih lebih dari 1</span>
                </label>
                
                <div className="border border-slate-200 rounded-lg p-1 bg-slate-50 max-h-60 overflow-y-auto">
                  {daftarPenerima.map((penerima) => (
                    <label key={penerima.id} className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${selectedPenerima.includes(penerima.id) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-100 border border-transparent'}`}>
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                        checked={selectedPenerima.includes(penerima.id)}
                        onChange={() => handleTogglePenerima(penerima.id)}
                      />
                      <div className="ml-3 flex-1 flex justify-between items-center">
                        <div>
                          <p className={`text-sm font-semibold ${selectedPenerima.includes(penerima.id) ? 'text-blue-800' : 'text-slate-800'}`}>{penerima.nama}</p>
                          <p className="text-xs text-slate-500">{penerima.jabatan}</p>
                        </div>
                        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${penerima.tipe === 'Tim Kerja' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>
                          {penerima.tipe}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Catatan / Instruksi Disposisi</label>
                <textarea 
                  rows={4} 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none" 
                  placeholder="Ketik instruksi atau arahan spesifik untuk penerima..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Batas Waktu (Deadline) Tindak Lanjut</label>
                <input type="date" className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex justify-end space-x-3">
            <Link href="/dashboard/disposisi" className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
              Batal
            </Link>
            <button 
              type="button" 
              onClick={handleKirimDisposisi}
              className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg flex items-center hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4 mr-2" />
              Kirim Disposisi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

