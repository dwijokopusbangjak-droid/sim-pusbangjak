'use client';
import React, { useState } from 'react';
import { CheckSquare, Upload, Plus, MoreHorizontal, Clock, CheckCircle } from 'lucide-react';

export default function TugasProgresPage() {
  const [tasks] = useState({
    todo: [
      { id: 'T-102', title: 'Review Dokumen RKP', deadline: 'Besok, 15:00' },
      { id: 'T-103', title: 'Kompilasi Data Spasial', deadline: '24 Agu 2026' }
    ],
    inProgress: [
      { id: 'T-101', title: 'Menyusun Bab 2 Naskah Akademik', deadline: 'Hari Ini' }
    ],
    done: [
      { id: 'T-098', title: 'Rapat Persiapan Kuartal III', date: 'Kemarin' },
      { id: 'T-095', title: 'Pengajuan Surat Tugas Tim', date: '14 Agu 2026' }
    ]
  });

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Tugas & Progres Pribadi</h2>
          <p className="text-slate-600 mt-1">Kelola tugas harian Anda dan laporkan bukti dukung penyelesaiannya.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Inisiatif Tugas Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-start">
        
        {/* Kolom To-Do */}
        <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
          <h3 className="font-bold text-slate-700 mb-4 flex items-center justify-between">
            <span className="flex items-center"><CheckSquare className="w-4 h-4 mr-2" /> Menunggu Dikerjakan</span>
            <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-xs">{tasks.todo.length}</span>
          </h3>
          <div className="space-y-3">
            {tasks.todo.map(t => (
              <div key={t.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-slate-400">{t.id}</span>
                  <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
                <h4 className="font-semibold text-slate-800 text-sm leading-tight mb-3">{t.title}</h4>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-medium text-amber-600 flex items-center"><Clock className="w-3 h-3 mr-1" /> {t.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom In Progress */}
        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-4 flex items-center justify-between">
            <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> Sedang Dikerjakan</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{tasks.inProgress.length}</span>
          </h3>
          <div className="space-y-3">
            {tasks.inProgress.map(t => (
              <div key={t.id} className="bg-white p-4 rounded-lg shadow-sm border border-blue-200 cursor-pointer hover:border-blue-400 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-slate-400">{t.id}</span>
                </div>
                <h4 className="font-semibold text-slate-800 text-sm leading-tight mb-3">{t.title}</h4>
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-medium text-rose-600 flex items-center"><Clock className="w-3 h-3 mr-1" /> Deadline: {t.deadline}</span>
                  <button className="w-full mt-1 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded text-xs font-bold flex items-center justify-center transition-colors">
                    <Upload className="w-3 h-3 mr-1.5" /> Lapor Selesai (Upload Bukti)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Done */}
        <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
          <h3 className="font-bold text-emerald-800 mb-4 flex items-center justify-between">
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Selesai Terverifikasi</span>
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs">{tasks.done.length}</span>
          </h3>
          <div className="space-y-3">
            {tasks.done.map(t => (
              <div key={t.id} className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100 opacity-75">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-mono text-slate-400">{t.id}</span>
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                </div>
                <h4 className="font-semibold text-slate-600 text-sm leading-tight mb-2 line-through decoration-slate-300">{t.title}</h4>
                <div className="text-xs font-medium text-slate-400">{t.date}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
