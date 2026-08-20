'use client';
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus, Search, Video, MapPin, Users, FileText, X, Clock } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';

export default function RapatBookingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jadwalRapat, setJadwalRapat] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'jadwalRapat'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJadwalRapat(data);
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
      const isZoomChecked = (document.getElementById('isZoom') as HTMLInputElement).checked;
      const tanggal = (document.getElementById('tanggal') as HTMLInputElement).value;
      const jamMulai = (document.getElementById('jamMulai') as HTMLInputElement).value;
      const jamSelesai = (document.getElementById('jamSelesai') as HTMLInputElement).value;
      
      const newRapat = {
        judul: (document.getElementById('judul') as HTMLInputElement).value,
        ruang: (document.getElementById('ruang') as HTMLSelectElement).value,
        waktu: `${tanggal}, ${jamMulai} - ${jamSelesai}`,
        peserta: parseInt((document.getElementById('peserta') as HTMLInputElement).value || "0", 10),
        isZoom: isZoomChecked,
        status: "Menunggu Approval",
        statusColor: "bg-amber-50 text-amber-700 border-amber-200",
        createdAt: Timestamp.now()
      };
      
      await addDoc(collection(db, 'jadwalRapat'), newRapat);
      setIsModalOpen(false);
      alert('Jadwal Rapat berhasil diajukan dan disimpan di Firebase.');
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
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Rapat & Booking Ruangan</h2>
          <p className="text-slate-600 mt-1">Sistem penjadwalan terpadu untuk mencegah bentrok ruangan dan link virtual.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Booking Rapat Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800 flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
            Agenda Rapat Mendatang
          </h3>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Cari Judul atau Ruang..."
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Judul / Agenda Rapat</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Jadwal & Ruangan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Fasilitas</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Memuat data dari Firestore...
                  </td>
                </tr>
              ) : jadwalRapat.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Belum ada jadwal rapat terdaftar.
                  </td>
                </tr>
              ) : (
                jadwalRapat.map((rapat) => (
                  <tr key={rapat.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-sm">{rapat.judul}</div>
                      <div className="text-xs text-slate-500 mt-1 font-mono">{rapat.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-800 flex items-center">
                        <Clock className="w-4 h-4 mr-1.5 text-blue-600" />
                        {rapat.waktu}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1" /> {rapat.ruang}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3 text-sm text-slate-600">
                        <div className="flex items-center" title="Jumlah Peserta">
                          <Users className="w-4 h-4 mr-1" /> {rapat.peserta}
                        </div>
                        {rapat.isZoom && (
                          <div className="flex items-center text-blue-600" title="Menggunakan Zoom">
                            <Video className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border ${rapat.statusColor}`}>
                        {rapat.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Booking Rapat */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
                Form Pengajuan Rapat & Ruangan
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Judul / Agenda Rapat</label>
                  <input id="judul" type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Contoh: Rapat Pembahasan Draf Regulasi..." />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal Pelaksanaan</label>
                  <input id="tanggal" type="date" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Jam Mulai</label>
                    <input id="jamMulai" type="time" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Jam Selesai</label>
                    <input id="jamSelesai" type="time" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center justify-between">
                    Pilihan Ruang Rapat
                    <span className="text-xs text-blue-600 font-normal">*Validasi Anti-Bentrok Otomatis</span>
                  </label>
                  <select id="ruang" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                    <option value="">-- Pilih Ruangan --</option>
                    <option value="Ruang Rapat Utama (Lantai 3)">Ruang Rapat Utama (Lantai 3) - Kap: 50</option>
                    <option value="Ruang Rapat Kecil (Lantai 4)">Ruang Rapat Kecil (Lantai 4) - Kap: 15</option>
                    <option value="Ruang Auditorium">Ruang Auditorium - Kap: 100</option>
                    <option value="Luar Kantor / Tempat Lain">Luar Kantor / Tempat Lain...</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Estimasi Undangan</label>
                    <div className="relative">
                      <input id="peserta" type="number" min="1" required className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Jml Peserta" />
                      <Users className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-end pb-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input id="isZoom" type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
                      <Video className="w-4 h-4 text-blue-600" />
                      <span>Butuh Link Zoom?</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Daftar Peserta Internal (Notifikasi ke Kalender)</label>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 text-slate-500">
                    <option>-- Pilih Anggota / Ketik Nama --</option>
                    <option>Tim Kebijakan Pembangunan Desa (All)</option>
                    <option>Siti Aminah, S.E. (KTU)</option>
                  </select>
                  <p className="text-xs text-slate-400 mt-2">Peserta yang dipilih akan mendapat email dan notifikasi jadwal rapat.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Unggah Bahan / Notula Awal (Opsional)</label>
                <div className="flex items-center space-x-3">
                  <button type="button" className="px-3 py-2 border border-slate-300 text-slate-600 rounded text-sm bg-white hover:bg-slate-50 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Pilih File PDF/PPT
                  </button>
                  <span className="text-xs text-slate-400">Belum ada file yang dipilih.</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                  Batal
                </button>
                <button disabled={isSubmitting} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center shadow-sm disabled:opacity-50">
                  {isSubmitting ? 'Memproses...' : 'Ajukan Jadwal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
