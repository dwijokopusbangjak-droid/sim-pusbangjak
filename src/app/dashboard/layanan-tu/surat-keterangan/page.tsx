'use client';
import React, { useState, useEffect } from 'react';
import { FileText, Plus, Search, CheckCircle, Clock, X, Upload } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';

export default function SuratKeteranganPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [riwayat, setRiwayat] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'suratKeterangan'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRiwayat(data);
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
      const newSKet = {
        jenis: (document.getElementById('jenis') as HTMLSelectElement).value,
        tujuan: (document.getElementById('tujuan') as HTMLInputElement).value,
        tanggal: new Date().toLocaleDateString('id-ID'),
        status: "Menunggu Verifikasi KTU",
        statusColor: "bg-amber-50 text-amber-700 border-amber-200",
        createdAt: Timestamp.now()
      };
      
      await addDoc(collection(db, 'suratKeterangan'), newSKet);
      setIsModalOpen(false);
      alert('Permohonan Surat Keterangan berhasil diajukan ke Firebase!');
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
          <h2 className="text-2xl font-bold text-slate-800">Pengajuan Surat Keterangan</h2>
          <p className="text-slate-600 mt-1">Layanan permohonan surat keterangan untuk keperluan personal/kepegawaian.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Buat Pengajuan Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Riwayat Pengajuan</h3>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Cari ID atau Jenis..."
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Jenis Keperluan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tujuan Pembuatan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Workflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                    Memuat data dari Firestore...
                  </td>
                </tr>
              ) : riwayat.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                    Belum ada riwayat pengajuan surat keterangan.
                  </td>
                </tr>
              ) : (
                riwayat.map((sket) => (
                  <tr key={sket.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-sm">{sket.jenis}</div>
                      <div className="text-xs text-slate-500 mt-1 font-mono">{sket.id} • {sket.tanggal}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-800">{sket.tujuan}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border ${sket.statusColor}`}>
                        {sket.status?.includes('Selesai') ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        {sket.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Pengajuan */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Form Permohonan Surat Keterangan
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Jenis Keperluan Surat Keterangan</label>
                <select id="jenis" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                  <option value="">-- Pilih Jenis --</option>
                  <option value="Keterangan Aktif Bekerja">Keterangan Aktif Bekerja</option>
                  <option value="Pengalaman Kerja / Rekomendasi">Pengalaman Kerja / Rekomendasi</option>
                  <option value="Keterangan Selesai Tugas/Proyek">Keterangan Selesai Tugas/Proyek</option>
                  <option value="Lainnya">Lainnya...</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Pegawai Terkait</label>
                <input type="text" readOnly defaultValue="Andi Jaya, S.Kom. (Anda)" className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-sm text-slate-500" />
                <p className="text-xs text-slate-400 mt-1">Surat keterangan akan dicetak atas nama profil Anda saat ini.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Tujuan Pembuatan Surat</label>
                <input id="tujuan" type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Contoh: Persyaratan administrasi KPR Bank BCA, Pengajuan Beasiswa LPDP..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Upload Berkas Pendukung (Opsional)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-blue-500 hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-slate-400" />
                    <div className="flex text-sm text-slate-600 justify-center">
                      <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        Upload a file
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">
                      PDF, PNG, JPG up to 5MB (misal: formulir bank/syarat beasiswa)
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                  Batal
                </button>
                <button disabled={isSubmitting} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center shadow-sm disabled:opacity-50">
                  {isSubmitting ? 'Mengirim...' : 'Ajukan Permohonan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
