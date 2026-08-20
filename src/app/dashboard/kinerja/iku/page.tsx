'use client';
import React from 'react';
import { Target, TrendingUp, Filter, Download, Plus } from 'lucide-react';

export default function CapaianIKUPage() {
  const dataIKU = [
    {
      id: "IKU-01",
      indikator: "Persentase kebijakan dan keterpaduan rencana pembangunan desa yang diimplementasikan",
      target: "85%",
      realisasi: "65%",
      progressValue: 76.4, // 65/85 * 100
      status: "On Track",
      pic: "Tim Kebijakan Pembangunan Desa"
    },
    {
      id: "IKU-02",
      indikator: "Jumlah rekomendasi kebijakan daerah tertinggal yang ditindaklanjuti oleh Kementerian/Lembaga",
      target: "12 Rekomendasi",
      realisasi: "14 Rekomendasi",
      progressValue: 100,
      status: "Tercapai",
      pic: "Tim Pengembangan Daerah Tertinggal"
    },
    {
      id: "IKU-03",
      indikator: "Indeks kepuasan layanan internal ketatausahaan dan fasilitasi pimpinan",
      target: "Nilai 3.50 (Skala 4)",
      realisasi: "Nilai 3.10",
      progressValue: 88.5,
      status: "Needs Attention",
      pic: "Kepala Bagian Tata Usaha"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Capaian Indikator Kinerja Utama (IKU)</h2>
          <p className="text-slate-600 mt-1">Pemantauan target strategis tahunan tingkat Eselon II (Pusbangjak).</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 font-medium transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Ekspor Data
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Penetapan IKU Baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-blue-600 mb-2">
            <Target className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Total IKU Tahunan</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">3</p>
          <p className="text-sm text-slate-500 mt-1">Target Eselon II Tahun 2026</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-emerald-600 mb-2">
            <TrendingUp className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Rata-Rata Capaian</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">88.3%</p>
          <p className="text-sm text-slate-500 mt-1">Berdasarkan realisasi Triwulan III</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800">Rincian Cascading IKU</h3>
          <button className="flex items-center px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
            <Filter className="h-4 w-4 mr-2 text-slate-500" />
            Filter Status
          </button>
        </div>
        
        <div className="divide-y divide-slate-200">
          {dataIKU.map((iku) => (
            <div key={iku.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2.5 py-1 text-xs font-bold bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                      {iku.id}
                    </span>
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md border 
                      ${iku.status === 'Tercapai' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        iku.status === 'On Track' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                        'bg-amber-50 text-amber-700 border-amber-200'}`}
                    >
                      {iku.status}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 leading-snug">{iku.indikator}</h4>
                  <p className="text-sm text-slate-500 mt-2">Cascading / PIC: <span className="font-medium text-slate-700">{iku.pic}</span></p>
                </div>
                
                <div className="w-full md:w-64 shrink-0 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500 font-medium">Realisasi:</span>
                    <span className="font-bold text-slate-800">{iku.realisasi}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-500 font-medium">Target:</span>
                    <span className="font-bold text-slate-800">{iku.target}</span>
                  </div>
                  
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${iku.progressValue >= 100 ? 'bg-emerald-500' : iku.progressValue >= 75 ? 'bg-blue-500' : 'bg-amber-500'}`} 
                      style={{ width: `${Math.min(iku.progressValue, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right mt-1.5 font-semibold text-slate-600">{iku.progressValue.toFixed(1)}% Tercapai</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

