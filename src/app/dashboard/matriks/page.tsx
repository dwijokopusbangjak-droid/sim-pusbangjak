'use client';
import React from 'react';
import { Briefcase, Target, Plus, UsersRound } from 'lucide-react';

export default function MatriksPeranHasilPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Matriks Peran Hasil</h2>
          <p className="text-slate-600 mt-1">Distribusi target kinerja dari Ketua Tim ke Anggota Tim Kerja.</p>
        </div>
        <button  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Target
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="flex items-center">
            <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-slate-800">Daftar Distribusi Target (Agustus 2026)</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3">Target Kinerja Ketua Tim</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3">Target Anggota (Peran Hasil)</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Pelaksana</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Progres</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-900 align-top" rowSpan={2}>
                  Tersusunnya Laporan Evaluasi Kebijakan Pembangunan Desa Tertinggal
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 border-l border-slate-100">
                  Pengumpulan Data Primer dari 5 Provinsi
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 mr-2">AJ</div>
                    Andi Jaya
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-slate-700 w-12">100%</span>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 border-l border-slate-100">
                  Penyusunan Draft Laporan Analisis
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 mr-2">BU</div>
                    Budi Utama
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-slate-700 w-12">45%</span>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

