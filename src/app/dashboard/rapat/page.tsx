'use client';
import React from 'react';
import { Calendar, Clock, MapPin, UsersRound, Plus } from 'lucide-react';

export default function RapatPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Rapat Tim</h2>
          <p className="text-slate-600 mt-1">Penjadwalan, absensi, dan notulensi rapat tim kerja.</p>
        </div>
        <button  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Jadwalkan Rapat
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Rapat Mendatang</h3>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-lg p-4 min-w-[100px]">
              <span className="text-sm font-semibold uppercase">Agustus</span>
              <span className="text-3xl font-bold">20</span>
              <span className="text-xs mt-1">Kamis</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-bold text-slate-800">Rapat Koordinasi Penyusunan Draft Laporan</h4>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  Besok
                </span>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-slate-400" />
                  09:00 - 11:30 WIB
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                  Ruang Rapat Utama Lt.3
                </div>
                <div className="flex items-center">
                  <UsersRound className="w-4 h-4 mr-2 text-slate-400" />
                  Seluruh Anggota Tim
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button  className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Isi Notulensi
                </button>
                <button  className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Daftar Hadir
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Riwayat Rapat</h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <ul className="divide-y divide-slate-200">
              <li className="p-4 hover:bg-slate-50 transition-colors">
                <p className="text-sm font-semibold text-slate-800">Kick-off Meeting Evaluasi Kebijakan</p>
                <p className="text-xs text-slate-500 mt-1">12 Agustus 2026 • Selesai</p>
              </li>
              <li className="p-4 hover:bg-slate-50 transition-colors">
                <p className="text-sm font-semibold text-slate-800">Rapat Pleno Tim Kerja</p>
                <p className="text-xs text-slate-500 mt-1">5 Agustus 2026 • Selesai</p>
              </li>
              <li className="p-4 hover:bg-slate-50 transition-colors">
                <p className="text-sm font-semibold text-slate-800">Pembahasan Metodologi</p>
                <p className="text-xs text-slate-500 mt-1">28 Juli 2026 • Selesai</p>
              </li>
            </ul>
            <div className="p-3 border-t border-slate-200 bg-slate-50 text-center">
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">Lihat Semua Riwayat</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

