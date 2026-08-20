'use client';
import React from 'react';
import { CheckSquare, Upload, CheckCircle2 } from 'lucide-react';

export default function TugasProgresPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Tugas & Progres Pribadi</h2>
          <p className="text-slate-600 mt-1">Daftar tugas yang di-assign ke Anda beserta input bukti dukung harian.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <CheckSquare className="w-16 h-16 text-blue-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-800">Belum Ada Tugas Baru</h3>
        <p className="text-slate-500 mt-2 max-w-lg mx-auto">
          Saat ini tidak ada tugas *To-Do* atau *In-Progress* yang perlu Anda selesaikan. Jika Anda sudah mengerjakan sesuatu, Anda bisa mengajukan progres baru.
        </p>
        <div className="mt-6">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Unggah Bukti Dukung Mandiri
          </button>
        </div>
      </div>
    </div>
  );
}

