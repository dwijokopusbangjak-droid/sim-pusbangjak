import React from 'react';
import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userNameCookie = cookieStore.get('userName')?.value;
  const userName = userNameCookie ? decodeURIComponent(userNameCookie) : 'Sistem Administrator';

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">Halo, {userName}!</h2>
        <p className="text-slate-600 mt-2">
          Anda berada di Sistem Informasi Manajemen Pusat Pengembangan Kebijakan dan Keterpaduan Rencana Pembangunan Desa dan Daerah Tertinggal (Pusbangjak).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Total Penyerapan Anggaran</h3>
          <p className="text-3xl font-bold text-blue-600">75.4%</p>
          <div className="w-full bg-slate-100 rounded-full h-2.5 mt-4">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75.4%' }}></div>
          </div>
          <p className="text-sm text-slate-500 mt-3">Update terakhir: Hari ini</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Capaian IKU</h3>
          <p className="text-3xl font-bold text-emerald-600">82.1%</p>
          <div className="w-full bg-slate-100 rounded-full h-2.5 mt-4">
            <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '82.1%' }}></div>
          </div>
          <p className="text-sm text-slate-500 mt-3">Target Tahunan: 95%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Tugas / Disposisi Aktif</h3>
          <p className="text-3xl font-bold text-amber-600">12</p>
          <div className="mt-4 flex space-x-2">
             <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
               Menunggu Tindak Lanjut
             </span>
          </div>
          <p className="text-sm text-slate-500 mt-3">Dari total 45 disposisi bulan ini</p>
        </div>
      </div>
    </div>
  );
}

