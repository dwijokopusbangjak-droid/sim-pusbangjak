'use client';
import React from 'react';
import { Users, Edit } from 'lucide-react';

export default function ProfilPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Profil & Riwayat Pegawai</h2>
          <p className="text-slate-600 mt-1">Kelola data diri, portofolio tugas, dan keikutsertaan tim kerja.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 font-medium transition-colors">
          <Edit className="w-5 h-5 mr-2" />
          Edit Profil
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-10 text-center">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Data profil sedang dimuat dari sistem...</p>
        </div>
      </div>
    </div>
  );
}

