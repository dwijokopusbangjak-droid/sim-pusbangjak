'use client';
import React from 'react';
import { FolderOpen, FileText, Send, Archive } from 'lucide-react';

export default function KearsipanPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Persuratan & Kearsipan</h2>
          <p className="text-slate-600 mt-1">Sistem loket surat masuk/keluar, pemberian nomor, dan pengarsipan digital.</p>
        </div>
        <div className="flex space-x-3">
          <button  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
            <FileText className="w-5 h-5 mr-2" />
            Input Surat Masuk
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-blue-600 mb-2">
            <FolderOpen className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Surat Masuk</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">1,245</p>
          <p className="text-sm text-slate-500 mt-1">Total tahun ini</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-emerald-600 mb-2">
            <Send className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Surat Keluar</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">892</p>
          <p className="text-sm text-slate-500 mt-1">Nomor diterbitkan</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-amber-500 mb-2">
            <Archive className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Arsip Digital</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">2,137</p>
          <p className="text-sm text-slate-500 mt-1">Dokumen tersimpan</p>
        </div>
      </div>
    </div>
  );
}

