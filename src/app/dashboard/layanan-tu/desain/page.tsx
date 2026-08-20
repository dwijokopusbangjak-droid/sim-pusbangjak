'use client';
import React, { useState, useEffect } from 'react';
import { PenTool, Plus, Search, Image as ImageIcon, Calendar, X, Upload } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';

export default function PengajuanDesainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [antrean, setAntrean] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'antreanDesain'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAntrean(data);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newDesain = {
        judul: (document.getElementById('judul') as HTMLInputElement).value,
        jenis: (document.getElementById('jenis') as HTMLSelectElement).value,
        deadline: (document.getElementById('deadline') as HTMLInputElement).value,
        status: "Pending Review KTU (Antrean Baru)",
        statusColor: "bg-amber-50 text-amber-700 border-amber-200",
        pic: "Menunggu Assign",
        createdAt: Timestamp.now()
      };
      
      await addDoc(collection(db, 'antreanDesain'), newDesain);
      setIsModalOpen(false);
      alert('Brief pengajuan desain berhasil dikirim ke antrean Firebase.');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Gagal mengirim data. Pastikan Firestore rules Anda mengizinkan penulisan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Antrean & Pengajuan Desain</h2>
          <p className="text-slate-600 mt-1">Layanan perancangan grafis untuk kebutuhan publikasi kegiatan.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Ajukan Desain Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Status Antrean Pengajuan</h3>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Cari ID atau Judul Kegiatan..."
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Judul & Jenis Desain</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tenggat Waktu (Deadline)</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Workflow & PIC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                    Memuat data dari Firestore...
                  </td>
                </tr>
              ) : antrean.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                    Belum ada antrean desain.
                  </td>
                </tr>
              ) : (
                antrean.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-sm">{item.judul}</div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center">
                        <ImageIcon className="w-3.5 h-3.5 mr-1" /> {item.jenis} • {item.id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-rose-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {item.deadline}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border ${item.statusColor}`}>
                        {item.status}
                      </span>
                      <div className="text-xs text-slate-500 mt-2 font-medium">{item.pic}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Pengajuan Desain */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <PenTool className="w-5 h-5 mr-2 text-blue-600" />
                Form Brief Pengajuan Desain
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Kegiatan / Acara</label>
                  <input id="judul" type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Contoh: Bimbingan Teknis Pengolahan Data Desa Terpadu 2026..." />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Jenis Desain Utama</label>
                  <select id="jenis" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                    <option value="">-- Pilih Jenis Desain --</option>
                    <option value="Spanduk / Backdrop">Spanduk / Backdrop</option>
                    <option value="Banner Roll">Banner Roll</option>
                    <option value="E-Flyer / Poster Medsos">E-Flyer / Poster Medsos</option>
                    <option value="Sertifikat">Sertifikat</option>
                    <option value="Template PPT">Template Presentasi (PPT)</option>
                    <option value="Virtual Background Zoom">Virtual Background Zoom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Batas Waktu (Deadline) Penggunaan</label>
                  <input id="deadline" type="date" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi / Konsep Visual Acara</label>
                  <textarea rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Jelaskan nuansa/konsep desain yang diinginkan (misal: formal kementerian, modern, dominan warna biru)..."></textarea>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Teks / Wording (Wajib Masuk Desain)</label>
                  <textarea rows={3} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono" placeholder="Ketikkan teks persis seperti yang harus tercetak di desain (termasuk tanggal acara, narasumber, dll)..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Ukuran / Dimensi (Opsional)</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Contoh: 3x1 meter, atau 1080x1080 pixel" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Upload Referensi / Aset Logo (Zip/PNG/PDF)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-blue-500 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-slate-400" />
                    <div className="flex text-sm text-slate-600 justify-center">
                      <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        Pilih File
                      </span>
                      <p className="pl-1">atau tarik lepas ke sini</p>
                    </div>
                    <p className="text-xs text-slate-500">
                      Lampirkan referensi desain, logo instansi mitra, dsb. (Max 20MB)
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                  Batal
                </button>
                <button disabled={isSubmitting} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center shadow-sm disabled:opacity-50">
                  {isSubmitting ? 'Mengirim...' : 'Kirim Brief ke TU'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
