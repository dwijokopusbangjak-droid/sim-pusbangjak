'use client';
import React from 'react';
import { UsersRound, UserPlus, Mail, Phone } from 'lucide-react';

export default function TimPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Anggota Tim</h2>
          <p className="text-slate-600 mt-1">Pengaturan susunan anggota tim kerja dan peran masing-masing.</p>
        </div>
        <button  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <UserPlus className="w-5 h-5 mr-2" />
          Tambah Anggota
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col items-center p-6 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mb-4">
            Dr
          </div>
          <h3 className="text-lg font-bold text-slate-800">Dr. Budi Santoso</h3>
          <p className="text-sm font-semibold text-blue-600 mb-4">Ketua Tim Kerja</p>
          <div className="w-full pt-4 border-t border-slate-100 flex justify-center space-x-4">
            <button  className="text-slate-400 hover:text-slate-600"><Mail className="w-5 h-5" /></button>
            <button  className="text-slate-400 hover:text-slate-600"><Phone className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col items-center p-6 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-2xl font-bold mb-4">
            AJ
          </div>
          <h3 className="text-lg font-bold text-slate-800">Andi Jaya, S.Kom</h3>
          <p className="text-sm font-medium text-slate-500 mb-4">Anggota Tim (Analis Data)</p>
          <div className="w-full pt-4 border-t border-slate-100 flex justify-center space-x-4">
            <button  className="text-slate-400 hover:text-slate-600"><Mail className="w-5 h-5" /></button>
            <button  className="text-slate-400 hover:text-slate-600"><Phone className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col items-center p-6 text-center border-dashed border-2 hover:bg-slate-50 cursor-pointer transition-colors justify-center min-h-[260px]">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
            <UserPlus className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-600">Tambah Anggota Baru</h3>
        </div>
      </div>
    </div>
  );
}

