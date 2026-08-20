'use client';
import React from 'react';
import { FileText, AlertCircle, Plus, Send } from 'lucide-react';

export default function PelaporanPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Pelaporan Progres & Mitigasi Kendala</h2>
          <p className="text-slate-600 mt-1">Laporan berkala ke Kepala Pusat dan pencatatan isu/kendala operasional.</p>
        </div>
        <button  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Buat Laporan Baru
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center">
            <FileText className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-slate-800">Laporan Progres Rutin</h3>
          </div>
          <ul className="divide-y divide-slate-200">
            <li className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-bold text-slate-800">Laporan Progres Mingguan (Minggu 2)</h4>
                  <p className="text-sm text-slate-500 mt-1">Dilaporkan pada: 14 Agustus 2026</p>
                </div>
                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  Terkirim
                </span>
              </div>
              <div className="mt-4 flex space-x-3">
                <button  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                  Lihat Detail
                </button>
              </div>
            </li>
            <li className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-bold text-slate-800">Laporan Progres Mingguan (Minggu 3)</h4>
                  <p className="text-sm text-slate-500 mt-1">Tenggat waktu: 21 Agustus 2026</p>
                </div>
                <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-500/20">
                  Draft
                </span>
              </div>
              <div className="mt-4 flex space-x-3">
                <button  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                  Edit Draft
                </button>
                <button  className="text-sm font-medium text-emerald-600 hover:text-emerald-800 flex items-center">
                  <Send className="w-4 h-4 mr-1" /> Kirim
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-semibold text-slate-800">Log Kendala & Mitigasi (Issue Tracker)</h3>
            </div>
            <button  className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Catat Isu
            </button>
          </div>
          <ul className="divide-y divide-slate-200">
            <li className="p-6 hover:bg-slate-50 transition-colors">
              <h4 className="text-base font-bold text-slate-800">Keterlambatan Data dari Provinsi X</h4>
              <div className="mt-3 space-y-2">
                <div className="flex">
                  <span className="w-24 text-xs font-semibold text-slate-500 uppercase">Penyebab:</span>
                  <span className="flex-1 text-sm text-slate-700">Pergantian PIC di tingkat daerah.</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-xs font-semibold text-slate-500 uppercase">Dampak:</span>
                  <span className="flex-1 text-sm text-slate-700">Analisis tertunda 1 minggu.</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-xs font-semibold text-slate-500 uppercase">Mitigasi:</span>
                  <span className="flex-1 text-sm text-slate-700">Penugasan anggota tim cadangan untuk menjemput bola.</span>
                </div>
                <div className="flex pt-2">
                  <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                    Dalam Penanganan
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

