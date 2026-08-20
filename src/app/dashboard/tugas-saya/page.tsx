'use client';
import React from 'react';
import { CheckSquare, Clock, FileEdit, Plus } from 'lucide-react';

export default function TugasSayaPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Tugas & Progres Saya</h2>
          <p className="text-slate-600 mt-1">Daftar peran hasil yang dibebankan dan laporan progres pekerjaan.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-blue-600 mb-2">
            <CheckSquare className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Total Tugas</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">5</p>
          <p className="text-sm text-slate-500 mt-1">Target peran hasil aktif</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-emerald-600 mb-2">
            <Clock className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Selesai</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">2</p>
          <p className="text-sm text-slate-500 mt-1">Target mencapai 100%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-800">Daftar Pekerjaan Saat Ini</h3>
        </div>
        <ul className="divide-y divide-slate-200">
          <li className="p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-slate-800">Pengumpulan Data Primer dari 5 Provinsi</h4>
                <p className="text-sm text-slate-500 mt-1">Induk: Tersusunnya Laporan Evaluasi Kebijakan Pembangunan Desa Tertinggal</p>
                
                <div className="mt-4 max-w-xl">
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-slate-700">Progres Keseluruhan</span>
                    <span className="text-emerald-600">100%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button  className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center">
                  <FileEdit className="w-4 h-4 mr-2" />
                  Lihat Log Progres
                </button>
              </div>
            </div>
          </li>

          <li className="p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-slate-800">Penyusunan Kuesioner Evaluasi</h4>
                <p className="text-sm text-slate-500 mt-1">Induk: Pelaksanaan Survei Dampak Kebijakan</p>
                
                <div className="mt-4 max-w-xl">
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-slate-700">Progres Keseluruhan</span>
                    <span className="text-blue-600">60%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Update Progres Baru
                </button>
                <button  className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center">
                  <FileEdit className="w-4 h-4 mr-2" />
                  Lihat Log Progres
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

