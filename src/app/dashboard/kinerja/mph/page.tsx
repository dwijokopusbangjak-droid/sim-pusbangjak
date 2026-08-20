'use client';
import React, { useState } from 'react';
import { Layers, Search, Briefcase, CheckCircle2, AlertCircle, Target } from 'lucide-react';

export default function MPHPage() {
  const [activeTab, setActiveTab] = useState('Tim Kebijakan Pembangunan Desa');

  const teams = [
    'Tim Kebijakan Pembangunan Desa',
    'Tim Pengembangan Daerah Tertinggal',
    'Tim Data dan Informasi Spasial'
  ];

  const mphData = [
    {
      id: 1,
      namaPegawai: 'Rina Yulianti, M.Si.',
      peran: 'Ketua Tim',
      hasilDiharapkan: 'Tersusunnya dokumen draf naskah akademik kebijakan pembangunan desa berkelanjutan',
      indikator: 'Dokumen disetujui Kapus (1 Dokumen)',
      progress: 'Drafting Bab II (40%)',
      status: 'On Progress'
    },
    {
      id: 2,
      namaPegawai: 'Budi Utama',
      peran: 'Anggota Tim (Analis Kebijakan)',
      hasilDiharapkan: 'Terkumpulnya data sekunder statistik desa dari BPS dan Kemendes',
      indikator: 'Dataset lengkap (100%)',
      progress: 'Data terkumpul 80%',
      status: 'On Progress'
    },
    {
      id: 3,
      namaPegawai: 'Andi Jaya',
      peran: 'Anggota Tim (Analis Data)',
      hasilDiharapkan: 'Selesainya pengolahan data geospasial sebaran desa',
      indikator: 'Peta digital selesai dan tervalidasi',
      progress: 'Selesai dan diserahkan',
      status: 'Selesai'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Matriks Peran dan Hasil (MPH)</h2>
          <p className="text-slate-600 mt-1">Distribusi tugas dan ekspektasi hasil dari Ketua Tim ke setiap Anggota Tim.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Tabs Tim Kerja */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 scrollbar-hide">
          {teams.map(team => (
            <button
              key={team}
              onClick={() => setActiveTab(team)}
              className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 
                ${activeTab === team 
                  ? 'border-blue-600 text-blue-700 bg-white' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
            >
              {team}
            </button>
          ))}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              MPH: {activeTab}
            </h3>
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Cari Nama Pegawai..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider border-r border-slate-200 w-1/4">Nama Pegawai & Peran</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider border-r border-slate-200 w-1/3">Hasil yang Diharapkan (Outcome)</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider border-r border-slate-200">Indikator Kinerja</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-1/4">Status Progres</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {mphData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 border-r border-slate-200">
                      <div className="font-bold text-slate-900 text-sm">{row.namaPegawai}</div>
                      <div className="text-xs text-blue-600 font-medium mt-1 bg-blue-50 inline-block px-2 py-0.5 rounded">{row.peran}</div>
                    </td>
                    <td className="px-4 py-4 border-r border-slate-200 text-sm text-slate-700 leading-relaxed">
                      {row.hasilDiharapkan}
                    </td>
                    <td className="px-4 py-4 border-r border-slate-200 text-sm text-slate-700">
                      <div className="flex items-start">
                        <Target className="w-4 h-4 mr-2 text-slate-400 mt-0.5 shrink-0" />
                        <span>{row.indikator}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center mb-1">
                        {row.status === 'Selesai' ? (
                          <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Selesai
                          </span>
                        ) : (
                          <span className="flex items-center text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                            <AlertCircle className="w-3.5 h-3.5 mr-1" /> {row.status}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-2 font-medium">Catatan Terakhir:</p>
                      <p className="text-sm text-slate-800">{row.progress}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
  );
}

