'use client';
import React, { useState } from 'react';
import { UsersRound, UserPlus, Search, CheckCircle2, Clock, AlertCircle, BarChart3 } from 'lucide-react';

export default function WorkspaceTimPage() {
  const [anggota] = useState([
    { nama: 'Siti Aminah, S.E.', peran: 'PIC Data Spasial', beban: 'Tinggi', tugasAktif: 4, selesai: 12 },
    { nama: 'Andi Jaya, S.Kom.', peran: 'Analis Sistem', beban: 'Sedang', tugasAktif: 2, selesai: 15 },
    { nama: 'Rina Yulianti, M.Si.', peran: 'Peneliti Ahli Muda', beban: 'Normal', tugasAktif: 3, selesai: 8 }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Workspace Tim: Kebijakan Desa</h2>
          <p className="text-slate-600 mt-1">Area pemantauan beban kerja anggota dan verifikasi output harian.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <UserPlus className="w-5 h-5 mr-2" />
          Assign Tugas Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <UsersRound className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Anggota Aktif</p>
            <h4 className="text-2xl font-bold text-slate-800">3 Orang</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Tugas Diselesaikan (Bulan ini)</p>
            <h4 className="text-2xl font-bold text-slate-800">35 Tugas</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Menunggu Verifikasi (Pending)</p>
            <h4 className="text-2xl font-bold text-slate-800">4 Laporan</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Daftar Anggota & Beban Kerja</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama & Peran Spesifik</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Beban Kerja</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Tugas Aktif</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Selesai</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {anggota.map((a, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm">{a.nama}</div>
                    <div className="text-xs text-slate-500">{a.peran}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-bold rounded ${a.beban === 'Tinggi' ? 'bg-rose-100 text-rose-700' : a.beban === 'Sedang' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {a.beban}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-700">{a.tugasAktif}</td>
                  <td className="px-6 py-4 text-center font-bold text-slate-700">{a.selesai}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">Lihat Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
