'use client';
import React from 'react';
import { ShieldAlert, AlertTriangle, CheckSquare, BarChart } from 'lucide-react';

export default function ManajemenRisikoPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Risiko & Reformasi Birokrasi</h2>
          <p className="text-slate-600 mt-1">Pemantauan indikator risiko organisasi dan pemenuhan dokumen RB.</p>
        </div>
        <button  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          Buat Laporan Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-rose-600 mb-2">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Risiko Tinggi</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">2</p>
          <p className="text-sm text-slate-500 mt-1">Membutuhkan mitigasi segera</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-amber-500 mb-2">
            <ShieldAlert className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Risiko Sedang</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">5</p>
          <p className="text-sm text-slate-500 mt-1">Dalam pemantauan rutin</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-blue-600 mb-2">
            <CheckSquare className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Pemenuhan LKE RB</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">85%</p>
          <div className="w-full bg-slate-100 rounded-full h-2.5 mt-3">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

