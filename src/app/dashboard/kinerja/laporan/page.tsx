'use client';
import React, { useState } from 'react';
import { FileText, Save, Send, AlertTriangle, CheckCircle2, History, Target, X, Download, Eye } from 'lucide-react';

export default function LaporanKinerjaPage() {
  const [bulan, setBulan] = useState('Agustus 2026');
  const [isRiwayatOpen, setIsRiwayatOpen] = useState(false);

  const riwayatLaporan = [
    {
      id: "LAP-2026-07",
      periode: "Juli 2026",
      tanggalKirim: "31 Jul 2026, 14:30 WIB",
      status: "Disetujui KTU",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      id: "LAP-2026-06",
      periode: "Juni 2026",
      tanggalKirim: "30 Jun 2026, 16:45 WIB",
      status: "Disetujui KTU",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      id: "LAP-2026-05",
      periode: "Mei 2026",
      tanggalKirim: "31 Mei 2026, 09:15 WIB",
      status: "Selesai (Diarsipkan)",
      statusColor: "bg-slate-100 text-slate-700 border-slate-200"
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Laporan Bulanan & Mitigasi Risiko</h2>
          <p className="text-slate-600 mt-1">Formulir pelaporan berkala capaian tim kerja ke pimpinan.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsRiwayatOpen(true)}
            className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 font-medium transition-colors"
          >
            <History className="w-4 h-4 mr-2" />
            Riwayat Laporan
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-800">Draf Laporan Kinerja Tim</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500 font-medium">Periode Pelaporan:</span>
            <select 
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className="border border-slate-300 rounded-md text-sm font-bold text-slate-700 px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Juli 2026">Juli 2026</option>
              <option value="Agustus 2026">Agustus 2026</option>
              <option value="September 2026">September 2026</option>
            </select>
          </div>
        </div>

        <form className="p-6 space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Draf Laporan Bulanan Berhasil Disimpan & Dikirim ke KTU (Simulasi).'); }}>
          
          {/* Section 1: Realisasi Kegiatan */}
          <section>
            <h4 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
              1. Realisasi Kegiatan Bulan Berjalan
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Pencapaian Fisik & Output Utama</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-800"
                  placeholder="Jelaskan output konkrit yang telah diselesaikan oleh tim di bulan ini (misal: Selesainya draf Naskah Akademik bab 1-3)..."
                  defaultValue="1. Penyelesaian pengumpulan data sekunder indeks desa membangun 33 Provinsi.&#13;&#10;2. Pelaksanaan Rapat Koordinasi dengan Bappenas pada 15 Agustus 2026."
                ></textarea>
              </div>
            </div>
          </section>

          {/* Section 2: Kendala & Solusi */}
          <section>
            <h4 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
              2. Kendala, Solusi & Mitigasi Risiko
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Kendala yang Dihadapi</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-800"
                  placeholder="Hambatan operasional atau strategis..."
                  defaultValue="Terdapat keterlambatan pengiriman data spasial dari Kemendes."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Solusi yang Telah Dijalankan</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-800"
                  placeholder="Langkah penyelesaian yang sudah dilakukan..."
                  defaultValue="Melakukan jemput bola ke Dirjen terkait pada tanggal 20 Agustus."
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Rencana Tindak Pengendalian (Mitigasi Risiko Ke Depan)</label>
                <textarea 
                  rows={2}
                  className="w-full px-4 py-3 border border-slate-300 bg-amber-50 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm text-amber-900 placeholder-amber-700/50"
                  placeholder="Upaya agar kendala serupa tidak terjadi lagi..."
                  defaultValue="Membangun MoA untuk integrasi API data secara langsung agar tidak perlu proses manual."
                ></textarea>
              </div>
            </div>
          </section>

          {/* Section 3: Rencana Bulan Depan */}
          <section>
            <h4 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center">
              <Target className="w-4 h-4 mr-2 text-blue-500" />
              3. Rencana Kerja Bulan Berikutnya
            </h4>
            <div>
              <textarea 
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-800"
                placeholder="Target dan rencana kerja utama untuk bulan depan..."
                defaultValue="Fokus pada pengolahan data menggunakan SPSS dan penyusunan draf awal Laporan Kajian."
              ></textarea>
            </div>
          </section>

          {/* Actions */}
          <div className="pt-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Status draf: <span className="font-semibold text-amber-600">Belum Dikirim</span><br/>
              Terakhir disimpan: Hari ini, 09:45 WIB
            </p>
            <div className="flex space-x-3 w-full sm:w-auto">
              <button 
                type="button"
                onClick={() => alert('Draf laporan berhasil disimpan secara lokal (Simulasi Mockup).')}
                className="flex-1 sm:flex-none justify-center flex items-center px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Simpan Draf
              </button>
              <button 
                type="submit"
                className="flex-1 sm:flex-none justify-center flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4 mr-2" />
                Kirim Laporan
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal Riwayat Laporan */}
      {isRiwayatOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <History className="w-5 h-5 mr-2 text-blue-600" />
                Riwayat Laporan Tim
              </h3>
              <button onClick={() => setIsRiwayatOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ID & Periode</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Waktu Submit</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {riwayatLaporan.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="font-bold text-slate-900 text-sm">{item.periode}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{item.id}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          {item.tanggalKirim}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center text-xs font-bold px-2 py-1 rounded border ${item.statusColor}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button onClick={() => alert('Pratinjau dokumen sedang disiapkan.')} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Lihat">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => alert('Mengunduh dokumen PDF Laporan...')} className="p-1.5 text-slate-600 hover:bg-slate-100 rounded" title="Download PDF">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setIsRiwayatOpen(false)}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

