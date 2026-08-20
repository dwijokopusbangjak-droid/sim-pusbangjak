import React from 'react';
import { Target, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function KinerjaPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Capaian Kinerja (IKU)</h2>
          <p className="text-slate-600 mt-1">Pemantauan progres Indikator Kinerja Utama organisasi.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-emerald-600 mb-2">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Tercapai</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">14</p>
          <p className="text-sm text-slate-500 mt-1">Indikator</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-blue-600 mb-2">
            <Clock className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">On Track</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">8</p>
          <p className="text-sm text-slate-500 mt-1">Indikator</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-amber-500 mb-2">
            <AlertCircle className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">At Risk</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">3</p>
          <p className="text-sm text-slate-500 mt-1">Indikator</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 bg-slate-800 text-white">
          <div className="flex items-center mb-2 text-slate-300">
            <Target className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Total IKU</h3>
          </div>
          <p className="text-3xl font-bold text-white">25</p>
          <p className="text-sm text-slate-400 mt-1">Indikator Kinerja Utama</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-800">Daftar Indikator Kinerja Utama</h3>
          <select className="border border-slate-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-700">
            <option>Semua Status</option>
            <option>Tercapai</option>
            <option>On Track</option>
            <option>At Risk</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/2">Nama Indikator</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Target</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Capaian</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Persentase Desa Tertinggal yang dientaskan menjadi Desa Berkembang</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">80%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">82.5%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                    Tercapai
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Jumlah Kebijakan Pembangunan Daerah Tertinggal yang Diterbitkan</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">5 Kebijakan</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">3 Kebijakan</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    On Track
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Indeks Keterpaduan Rencana Pembangunan Pusat dan Daerah</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Nilai 3.5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Nilai 2.9</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                    At Risk
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

