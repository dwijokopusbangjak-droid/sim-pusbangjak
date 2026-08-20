'use client';
import React from 'react';
import { BarChart2, Plus, Download, FileText } from 'lucide-react';

export default function KeuanganPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Keuangan & Anggaran</h2>
          <p className="text-slate-600 mt-1">Pencatatan alokasi pagu, pencairan, dan pelaporan realisasi.</p>
        </div>
        <div className="flex space-x-3">
          <button  className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 font-medium transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Input Realisasi
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-800">Log Transaksi & Pencairan Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tanggal</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Uraian Pekerjaan</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tim Pengusul</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nominal</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Pencairan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">18 Agu 2026</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Honorarium Narasumber Rakor</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Tim Kerja Kebijakan Desa</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-700">Rp 4.500.000</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                    Selesai
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">16 Agu 2026</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Pembayaran Perjalanan Dinas Luar Kota</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Bagian Tata Usaha</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-700">Rp 12.350.000</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    Proses KPPN
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

