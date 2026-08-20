'use client';
import React from 'react';
import { BarChart2, TrendingUp, DollarSign } from 'lucide-react';

export default function AnggaranPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard Anggaran</h2>
          <p className="text-slate-600 mt-1">Pemantauan penyerapan anggaran Pusbangjak per Tim Kerja.</p>
        </div>
        <button  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          Unduh Laporan PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Pagu</h3>
            <div className="p-2 bg-slate-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-slate-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800 mt-4">Rp 15.000.000.000</p>
          <p className="text-sm text-emerald-600 mt-2 font-medium">Tahun Anggaran 2026</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Realisasi</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800 mt-4">Rp 11.310.000.000</p>
          <div className="flex items-center mt-2">
            <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded mr-2">75.4%</span>
            <span className="text-sm text-slate-500">terserap</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Sisa Anggaran</h3>
            <div className="p-2 bg-amber-50 rounded-lg">
              <BarChart2 className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800 mt-4">Rp 3.690.000.000</p>
          <div className="flex items-center mt-2">
            <span className="text-sm text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded mr-2">24.6%</span>
            <span className="text-sm text-slate-500">tersisa</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-800">Rincian Penyerapan per Tim Kerja</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tim Kerja</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Pagu Anggaran</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Realisasi</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Persentase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Tim Kerja Kebijakan Desa</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Rp 5.000.000.000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Rp 4.100.000.000</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-slate-700 w-12">82%</span>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Tim Kerja Daerah Tertinggal</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Rp 4.500.000.000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Rp 3.150.000.000</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-slate-700 w-12">70%</span>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Bagian Tata Usaha</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Rp 5.500.000.000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Rp 4.060.000.000</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-slate-700 w-12">73.8%</span>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '73.8%' }}></div>
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

