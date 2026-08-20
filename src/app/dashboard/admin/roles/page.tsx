'use client';
import React from 'react';
import { Shield, Check, Plus, Edit } from 'lucide-react';

export default function ManajemenRolePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Role (Peran)</h2>
          <p className="text-slate-600 mt-1">Konfigurasi hak akses dan batasan fitur untuk masing-masing peran.</p>
        </div>
        <button 
          onClick={() => alert("Fitur pembuatan role kustom akan tersedia setelah pengaturan skema database tabel hak akses selesai.")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Buat Role Baru
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Kepala Pusat */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-purple-600 mr-2" />
              <h3 className="text-lg font-bold text-slate-800">Kepala Pusat (Kapusbangjak)</h3>
            </div>
            <button onClick={() => alert("Fitur edit izin akses akan diaktifkan setelah tabel Role tersambung dengan API.")} className="text-blue-600 hover:text-blue-800 p-1"><Edit className="w-4 h-4"/></button>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-600 mb-4">Akses level eksekutif untuk memantau indikator makro dan mendisposisikan tugas.</p>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Hak Akses Modul:</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 mr-2" /> Dashboard Penyerapan Anggaran (Melihat Semua)
              </li>
              <li className="flex items-center text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 mr-2" /> Dashboard Capaian IKU (Melihat Semua)
              </li>
              <li className="flex items-center text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 mr-2" /> Modul Disposisi Surat (Menerima & Meneruskan)
              </li>
            </ul>
            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between text-sm">
              <span className="text-slate-500">Jumlah User Terdaftar:</span>
              <span className="font-semibold text-slate-800">1 Orang</span>
            </div>
          </div>
        </div>

        {/* Kepala Tata Usaha */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-slate-800">Kepala Tata Usaha (KTU)</h3>
            </div>
            <button onClick={() => alert("Fitur edit izin akses akan diaktifkan setelah tabel Role tersambung dengan API.")} className="text-blue-600 hover:text-blue-800 p-1"><Edit className="w-4 h-4"/></button>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-600 mb-4">Akses manajerial operasional untuk keuangan, kepegawaian, dan urusan umum.</p>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Hak Akses Modul:</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 mr-2" /> Manajemen Keuangan & Anggaran (CRUD)
              </li>
              <li className="flex items-center text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 mr-2" /> Manajemen SDM & Kepegawaian (CRUD)
              </li>
              <li className="flex items-center text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 mr-2" /> Kearsipan & Manajemen Risiko
              </li>
            </ul>
            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between text-sm">
              <span className="text-slate-500">Jumlah User Terdaftar:</span>
              <span className="font-semibold text-slate-800">2 Orang</span>
            </div>
          </div>
        </div>

        {/* Ketua Tim Kerja */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-bold text-slate-800">Ketua Tim Kerja</h3>
            </div>
            <button onClick={() => alert("Fitur edit izin akses akan diaktifkan setelah tabel Role tersambung dengan API.")} className="text-blue-600 hover:text-blue-800 p-1"><Edit className="w-4 h-4"/></button>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-600 mb-4">Akses memimpin tim teknis, memecah target, dan mengevaluasi laporan bawahan.</p>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Hak Akses Modul:</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 mr-2" /> Pengisian Matriks Peran Hasil
              </li>
              <li className="flex items-center text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 mr-2" /> Manajemen Rapat & Anggota Tim
              </li>
              <li className="flex items-center text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 mr-2" /> Pelaporan Kinerja ke Atasan
              </li>
            </ul>
            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between text-sm">
              <span className="text-slate-500">Jumlah User Terdaftar:</span>
              <span className="font-semibold text-slate-800">5 Orang</span>
            </div>
          </div>
        </div>

        {/* Anggota Tim Kerja */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-slate-600 mr-2" />
              <h3 className="text-lg font-bold text-slate-800">Anggota Tim Kerja</h3>
            </div>
            <button onClick={() => alert("Fitur edit izin akses akan diaktifkan setelah tabel Role tersambung dengan API.")} className="text-blue-600 hover:text-blue-800 p-1"><Edit className="w-4 h-4"/></button>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-600 mb-4">Akses pelaksanaan tugas spesifik dan pelaporan progres pekerjaan secara rutin.</p>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Hak Akses Modul:</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 mr-2" /> Melihat Matriks Peran Sendiri
              </li>
              <li className="flex items-center text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 mr-2" /> Input/Update Progres Pekerjaan
              </li>
            </ul>
            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between text-sm">
              <span className="text-slate-500">Jumlah User Terdaftar:</span>
              <span className="font-semibold text-slate-800">115 Orang</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

