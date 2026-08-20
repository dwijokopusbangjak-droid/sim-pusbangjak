'use client';
import React from 'react';
import { Box, Wrench, Search, Plus } from 'lucide-react';

export default function KerumahtanggaanPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Kerumahtanggaan</h2>
          <p className="text-slate-600 mt-1">Pengelolaan inventaris, aset, dan operasional kantor.</p>
        </div>
        <button  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Inventaris
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Status Inventaris Kantor</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Box className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Total Aset</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">452</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Kondisi Baik</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">418</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Pemeliharaan & Perbaikan</h3>
            <div className="p-2 bg-amber-50 rounded-lg">
              <Wrench className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Sedang Diperbaiki</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">12</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Rusak Berat</p>
              <p className="text-2xl font-bold text-rose-600 mt-1">22</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-800">Daftar Aset & Inventaris</h3>
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Cari nama barang / kode..."
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Kode Barang</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Barang</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Kategori</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Kondisi</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">INV/2026/001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Laptop Lenovo ThinkPad T14</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Elektronik</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                    Baik
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer font-medium">Detail</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">INV/2026/045</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Printer Epson L3210</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Elektronik</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                    Perbaikan
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer font-medium">Detail</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

