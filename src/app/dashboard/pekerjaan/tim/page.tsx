'use client';
import React from 'react';
import { UsersRound, UserPlus, CheckSquare, Search } from 'lucide-react';

export default function WorkspaceTimPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Workspace Tim Kerja</h2>
          <p className="text-slate-600 mt-1">Area khusus Ketua Tim untuk mengelola anggota dan memantau tugas.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <UserPlus className="w-5 h-5 mr-2" />
          Tambah Anggota
        </button>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <UsersRound className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-800">Ruang Kerja Tim: Tim Kebijakan Pembangunan Desa</h3>
        <p className="text-slate-500 mt-2 max-w-lg mx-auto">
          Halaman ini digunakan oleh Ketua Tim untuk melakukan verifikasi bukti dukung harian dari anggota, mengatur ulang penugasan (re-assign), serta melihat rekap beban kerja internal tim.
        </p>
      </div>
    </div>
  );
}

