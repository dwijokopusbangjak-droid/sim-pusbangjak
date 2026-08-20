'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Search, Filter, Clock, CheckCircle2, FilePlus, Send, X, Edit3 } from 'lucide-react';

interface DisposisiItem {
  id: string;
  perihal: string;
  penerima: string[];
  tanggal: string;
  status: string;
}

export default function DisposisiPage() {
  const [canCreateDisposisi, setCanCreateDisposisi] = useState(false);
  const [disposisiList, setDisposisiList] = useState<DisposisiItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<DisposisiItem | null>(null);
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    // Cek Role dari cookie (simulasi)
    const cookies = document.cookie.split(';');
    const roleCookie = cookies.find(c => c.trim().startsWith('userRole='));
    const role = roleCookie ? roleCookie.split('=')[1] : 'admin';
    
    if (role === 'kapus' || role === 'admin') {
      setCanCreateDisposisi(true);
    }

    // Ambil data disposisi dari localStorage
    const savedDisposisi = localStorage.getItem('disposisiList');
    if (savedDisposisi) {
      setDisposisiList(JSON.parse(savedDisposisi));
    } else {
      // Data dummy awal jika kosong
      const initialData = [
        {
          id: '123/B/Pusbangjak/08/2026',
          perihal: 'Undangan Rapat Koordinasi Nasional',
          penerima: ['Siti Aminah (KTU)'],
          tanggal: '2026-08-18',
          status: 'Diproses'
        },
        {
          id: '098/E/Pusbangjak/08/2026',
          perihal: 'Permohonan Data Evaluasi Kebijakan',
          penerima: ['Tim Kebijakan Pembangunan'],
          tanggal: '2026-08-15',
          status: 'Selesai'
        }
      ];
      setDisposisiList(initialData);
      localStorage.setItem('disposisiList', JSON.stringify(initialData));
    }
  }, []);

  const totalDibuat = disposisiList.length;
  const totalDiproses = disposisiList.filter(d => d.status === 'Baru' || d.status === 'Diproses').length;
  const totalSelesai = disposisiList.filter(d => d.status === 'Selesai').length;

  const handleOpenModal = (item: DisposisiItem) => {
    setSelectedItem(item);
    setUpdateStatus(item.status);
  };

  const handleUpdateStatus = () => {
    if (!selectedItem) return;

    const updatedList = disposisiList.map(d => 
      d.id === selectedItem.id ? { ...d, status: updateStatus } : d
    );
    
    setDisposisiList(updatedList);
    localStorage.setItem('disposisiList', JSON.stringify(updatedList));
    setSelectedItem(null);
    alert('Status disposisi berhasil diperbarui!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Disposisi Surat</h2>
          <p className="text-slate-600 mt-1">Pelacakan riwayat instruksi dan surat yang didisposisikan.</p>
        </div>
        {canCreateDisposisi && (
          <Link href="/dashboard/disposisi/buat" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
            <FilePlus className="w-5 h-5 mr-2" />
            Buat Disposisi Surat
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-blue-600 mb-2">
            <Send className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Total Disposisi</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">{totalDibuat}</p>
          <p className="text-sm text-slate-500 mt-1">Sejak awal bulan</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-amber-500 mb-2">
            <Clock className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Menunggu Tindak Lanjut</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">{totalDiproses}</p>
          <p className="text-sm text-slate-500 mt-1">Dalam proses pengerjaan tim</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-emerald-600 mb-2">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Selesai Ditindaklanjuti</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">{totalSelesai}</p>
          <p className="text-sm text-slate-500 mt-1">Telah diselesaikan</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Cari No. Surat atau Perihal..."
            />
          </div>
          <button  className="flex items-center px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
            <Filter className="h-4 w-4 mr-2 text-slate-500" />
            Filter
          </button>
        </div>

        <ul className="divide-y divide-slate-200">
          {disposisiList.length === 0 ? (
            <li className="p-8 text-center text-slate-500">Belum ada data disposisi.</li>
          ) : (
            disposisiList.map((item) => (
              <li key={item.id} className="hover:bg-slate-50 transition-colors">
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-semibold truncate ${item.status === 'Baru' ? 'text-blue-600' : 'text-slate-900'}`}>
                        {item.perihal}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border 
                          ${item.status === 'Baru' ? 'bg-blue-100 text-blue-800 border-blue-200' : 
                            item.status === 'Diproses' ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                            'bg-emerald-100 text-emerald-800 border-emerald-200'}`}
                        >
                          {item.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center">
                      <div className="flex items-center text-sm text-slate-500">
                        <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-400" />
                        <p>No: {item.id}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:ml-6 flex items-center text-sm text-slate-500">
                        <p>Disposisi ke: {item.penerima.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex-shrink-0">
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className={`px-3 py-1.5 border rounded-md text-sm font-medium shadow-sm flex items-center transition-colors
                        ${!canCreateDisposisi && item.status !== 'Selesai' 
                          ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' 
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}
                    >
                      {(!canCreateDisposisi && item.status !== 'Selesai') ? (
                        <>
                          <Edit3 className="mr-1.5 h-4 w-4" /> Tindak Lanjut
                        </>
                      ) : (
                        'Lihat Detail'
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Modal Detail / Tindak Lanjut */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">
                {!canCreateDisposisi ? 'Tindak Lanjut Disposisi' : 'Detail Disposisi Surat'}
              </h3>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">No Surat / Referensi</p>
                <p className="text-sm text-slate-800 font-medium mt-1">{selectedItem.id}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Perihal</p>
                <p className="text-sm text-slate-800 font-medium mt-1">{selectedItem.perihal}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Penerima Tujuan</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedItem.penerima.map(p => (
                    <span key={p} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium border border-slate-200">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {!canCreateDisposisi && (
                <div className="pt-4 border-t border-slate-200 mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Update Status Tindak Lanjut
                  </label>
                  <select 
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Baru">Baru (Belum Dikerjakan)</option>
                    <option value="Diproses">Diproses (Sedang Dikerjakan)</option>
                    <option value="Selesai">Selesai (Sudah Ditindaklanjuti)</option>
                  </select>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100"
              >
                Tutup
              </button>
              {!canCreateDisposisi && (
                <button 
                  onClick={handleUpdateStatus}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Simpan Status
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

