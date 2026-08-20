'use client';
import React, { useState } from 'react';
import { Send, Plus, Search, FileText, CheckCircle, Clock, X, AlertCircle } from 'lucide-react';

export default function SuratTugasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [riwayat, setRiwayat] = useState([
    {
      id: "ST-0826-001",
      tujuan: "Rapat Koordinasi dengan Kemendes PDTT",
      lokasi: "Luar Kota (Jakarta)",
      tanggal: "15 - 17 Agustus 2026",
      status: "Selesai (TTE Kapus)",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      id: "ST-0826-002",
      tujuan: "Survei Lapangan Indeks Desa Membangun",
      lokasi: "Luar Kota (Bandung)",
      tanggal: "20 - 24 Agustus 2026",
      status: "Menunggu Review KTU",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newST = {
      id: `ST-0826-00${riwayat.length + 1}`,
      tujuan: (document.getElementById('maksud') as HTMLInputElement).value,
      lokasi: (document.getElementById('lokasi') as HTMLSelectElement).value,
      tanggal: "Jadwal Baru",
      status: "Menunggu Review KTU",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200"
    };
    setRiwayat([newST, ...riwayat]);
    setIsModalOpen(false);
    alert('Draf Surat Tugas berhasil diajukan dan masuk ke antrean verifikasi KTU.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Pengajuan Surat Tugas</h2>
          <p className="text-slate-600 mt-1">Buat draf surat tugas baru untuk penugasan tim dan staf.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Buat Surat Tugas
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Riwayat Pengajuan Anda</h3>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Cari ID atau Tujuan..."
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID & Tujuan Penugasan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Lokasi & Jadwal</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Workflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {riwayat.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm">{st.tujuan}</div>
                    <div className="text-xs text-slate-500 mt-1 font-mono">{st.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-800">{st.lokasi}</div>
                    <div className="text-xs text-slate-500 mt-1">{st.tanggal}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border ${st.statusColor}`}>
                      {st.status.includes('Selesai') ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                      {st.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Pengajuan Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Form Pengajuan Surat Tugas (ST)
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                
                {/* Info Dasar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Dasar Pelaksanaan (Referensi)</label>
                    <input type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Contoh: Surat Undangan No. 123/Bappenas/2026 atau Nota Dinas No. 45" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Maksud / Tujuan Penugasan</label>
                    <input id="maksud" type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Contoh: Menghadiri Rapat Koordinasi Penyusunan Kebijakan..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Lokasi Tujuan</label>
                    <select id="lokasi" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                      <option value="">-- Pilih Kategori --</option>
                      <option value="Dalam Kota">Dalam Kota</option>
                      <option value="Luar Kota">Luar Kota</option>
                      <option value="Luar Negeri">Luar Negeri</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Sumber Pembiayaan</label>
                    <select required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                      <option value="DIPA Pusbangjak">DIPA Pusbangjak</option>
                      <option value="Eksternal (Pengundang)">Eksternal (Pengundang)</option>
                      <option value="Non-Anggaran">Non-Anggaran</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal Berangkat</label>
                    <input type="date" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal Pulang</label>
                    <input type="date" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Angkutan / Transportasi</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 text-sm"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> <span>Pesawat Udara</span></label>
                      <label className="flex items-center space-x-2 text-sm"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> <span>Kereta Api</span></label>
                      <label className="flex items-center space-x-2 text-sm"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> <span>Kendaraan Dinas</span></label>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 my-2"></div>

                {/* Daftar Pegawai */}
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <label className="block text-sm font-semibold text-slate-700">Daftar Pegawai yang Ditugaskan</label>
                    <button type="button" className="text-sm text-blue-600 font-medium hover:text-blue-800">+ Tambah Baris</button>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                    <div className="flex space-x-3 items-center">
                      <select className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Rina Yulianti, M.Si.</option>
                        <option>Andi Jaya, S.Kom.</option>
                      </select>
                      <select className="w-48 px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Penanggung Jawab</option>
                        <option>Anggota</option>
                        <option>Pendamping</option>
                      </select>
                      <button type="button" className="text-rose-500 hover:text-rose-700"><X className="w-5 h-5"/></button>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="w-5 h-5 text-amber-500 mr-3 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Setelah draf diajukan, permohonan ini akan masuk ke dalam antrean **Verifikasi KTU**. Mohon pastikan seluruh data telah valid sebelum Kepala Pusat melakukan Tanda Tangan Elektronik (TTE).
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center shadow-sm">
                  <Send className="w-4 h-4 mr-2" />
                  Ajukan Surat Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
