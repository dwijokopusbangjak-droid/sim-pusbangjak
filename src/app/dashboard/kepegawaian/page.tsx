'use client';
import React from 'react';
import { Users, UserPlus, CalendarDays, Award } from 'lucide-react';

export default function KepegawaianPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Kepegawaian</h2>
          <p className="text-slate-600 mt-1">Pengelolaan data SDM, kehadiran, dan pengajuan cuti pegawai.</p>
        </div>
        <button  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <UserPlus className="w-5 h-5 mr-2" />
          Tambah Pegawai
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-blue-600 mb-2">
            <Users className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Total Pegawai</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">124</p>
          <p className="text-sm text-slate-500 mt-1">Aktif bekerja</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-emerald-600 mb-2">
            <CalendarDays className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Hadir Hari Ini</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">118</p>
          <p className="text-sm text-slate-500 mt-1">95.1% Kehadiran</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-amber-500 mb-2">
            <CalendarDays className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Sedang Cuti</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">4</p>
          <p className="text-sm text-slate-500 mt-1">Pegawai</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-purple-600 mb-2">
            <Award className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Naik Pangkat</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">2</p>
          <p className="text-sm text-slate-500 mt-1">Dalam proses pengajuan</p>
        </div>
      </div>
    </div>
  );
}

