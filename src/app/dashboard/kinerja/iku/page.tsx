'use client';
import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Filter, Download, Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function CapaianIKUPage() {
  const [dataIKU, setDataIKU] = useState<any[]>([]);
  const [teamsData, setTeamsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('pegawai');
  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIku, setEditingIku] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check role from cookie for UI logic
    const match = document.cookie.match(new RegExp('(^| )userRole=([^;]+)'));
    const roleFromCookie = match ? match[2] : 'pegawai';
    setUserRole(roleFromCookie);

    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUserUid(user.uid);
      else setCurrentUserUid(null);
    });

    // Fetch IKUs
    const qIku = query(collection(db, 'ikus'), orderBy('createdAt', 'desc'));
    const unsubscribeIku = onSnapshot(qIku, (snapshot) => {
      const ikus = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDataIKU(ikus);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching IKU:", error);
      setIsLoading(false);
    });

    // Fetch Teams for PIC selection and filtering
    const qTeams = query(collection(db, 'teams'), orderBy('createdAt', 'desc'));
    const unsubscribeTeams = onSnapshot(qTeams, (snapshot) => {
      const teams = snapshot.docs.map(doc => ({
        id: doc.id,
        nama: doc.data().nama,
        ketua_uid: doc.data().ketua_uid,
        anggota_uids: doc.data().anggota_uids || []
      }));
      setTeamsData(teams);
    });

    return () => {
      unsubscribeIku();
      unsubscribeTeams();
      unsubscribeAuth();
    };
  }, []);

  const isAdminOrKapus = userRole === 'admin' || userRole === 'kapus';

  // Logika Filter IKU berdasarkan Tim
  const myTeamIds = teamsData
    .filter(t => t.ketua_uid === currentUserUid || t.anggota_uids.includes(currentUserUid))
    .map(t => t.id);

  const displayedIKU = isAdminOrKapus 
    ? dataIKU 
    : dataIKU.filter(iku => {
        const pic = iku.pic_teams || [];
        return pic.some((teamId: string) => myTeamIds.includes(teamId));
      });

  const handleExportCSV = () => {
    if (dataIKU.length === 0) {
      alert("Tidak ada data untuk diekspor.");
      return;
    }
    
    const headers = ["Kode IKU", "Indikator", "Target", "Realisasi", "Progress (%)", "Status", "PIC"];
    const rows = dataIKU.map(iku => {
      // Map team IDs to team names for CSV
      const picNames = (iku.pic_teams || []).map((teamId: string) => {
        const team = teamsData.find(t => t.id === teamId);
        return team ? team.nama : teamId;
      }).join(", ");

      return [
        iku.kode || '',
        `"${iku.indikator || ''}"`,
        `"${iku.target || ''}"`,
        `"${iku.realisasi || ''}"`,
        iku.progressValue || 0,
        iku.status || '',
        `"${picNames}"`
      ];
    });
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Laporan_Capaian_IKU.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };

  const handleAdd = () => {
    setEditingIku({
      isNew: true,
      kode: 'IKU-0X',
      indikator: '',
      target: '',
      realisasi: 'Belum dievaluasi',
      progressValue: 0,
      status: 'On Track',
      pic_teams: [] // Array of team IDs
    });
    setIsModalOpen(true);
  };

  const handleEdit = (iku: any) => {
    setEditingIku({
      ...iku,
      isNew: false,
      pic_teams: iku.pic_teams || []
    });
    setIsModalOpen(true);
  };

  const toggleTeam = (teamId: string) => {
    setEditingIku((prev: any) => {
      const current = prev.pic_teams || [];
      if (current.includes(teamId)) {
        return { ...prev, pic_teams: current.filter((id: string) => id !== teamId) };
      } else {
        return { ...prev, pic_teams: [...current, teamId] };
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus penetapan IKU ini?')) {
      try {
        await deleteDoc(doc(db, 'ikus', id));
        alert('Data IKU berhasil dihapus.');
      } catch (error) {
        console.error("Error deleting IKU:", error);
        alert('Gagal menghapus IKU.');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        kode: editingIku.kode,
        indikator: editingIku.indikator,
        target: editingIku.target,
        status: editingIku.status,
        pic_teams: editingIku.pic_teams
      };

      if (editingIku.isNew) {
        // Saat buat baru, realisasi dikosongkan secara logis
        await addDoc(collection(db, 'ikus'), {
          ...payload,
          realisasi: 'Belum dievaluasi',
          progressValue: 0,
          createdAt: serverTimestamp()
        });
        alert('Penetapan IKU baru berhasil ditambahkan.');
      } else {
        // Saat edit, simpan realisasi yang diubah
        await updateDoc(doc(db, 'ikus', editingIku.id), {
          ...payload,
          realisasi: editingIku.realisasi,
          progressValue: Number(editingIku.progressValue),
          updatedAt: serverTimestamp()
        });
        alert('Perubahan capaian IKU berhasil disimpan.');
      }
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error saving IKU:", error);
      alert('Gagal menyimpan data: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const rataRataCapaian = displayedIKU.length > 0 
    ? (displayedIKU.reduce((acc, curr) => acc + (Number(curr.progressValue) || 0), 0) / displayedIKU.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Capaian Indikator Kinerja Utama (IKU)</h2>
          <p className="text-slate-600 mt-1">Pemantauan target strategis tahunan tingkat Eselon II (Pusbangjak).</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={handleExportCSV} className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 font-medium transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Ekspor Data
          </button>
          {isAdminOrKapus && (
            <button onClick={handleAdd} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Penetapan IKU Baru
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-blue-600 mb-2">
            <Target className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Total IKU Tahunan</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">{displayedIKU.length}</p>
          <p className="text-sm text-slate-500 mt-1">Target Eselon II Aktif</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center text-emerald-600 mb-2">
            <TrendingUp className="w-5 h-5 mr-2" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Rata-Rata Capaian</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">{rataRataCapaian}%</p>
          <p className="text-sm text-slate-500 mt-1">Dari seluruh IKU berjalan</p>
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
          {isLoading ? (
            <div className="p-8 text-center text-slate-500">Memuat data kinerja...</div>
          ) : displayedIKU.length === 0 ? (
            <div className="p-8 text-center text-slate-500">Tidak ada penetapan IKU. Silakan tambah IKU baru.</div>
          ) : (
            displayedIKU.map((iku) => (
              <div key={iku.id} className="p-6 hover:bg-slate-50 transition-colors relative group">
                {isAdminOrKapus && (
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button onClick={() => handleEdit(iku)} className="p-2 bg-white border border-slate-200 rounded-md text-blue-600 hover:bg-blue-50 shadow-sm" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(iku.id)} className="p-2 bg-white border border-slate-200 rounded-md text-rose-600 hover:bg-rose-50 shadow-sm" title="Hapus">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1 pr-16">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-2.5 py-1 text-xs font-bold bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                        {iku.kode}
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
                    <div className="mt-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Penanggung Jawab (Tim Cascading):</p>
                      <div className="flex flex-wrap gap-2">
                        {(!iku.pic_teams || iku.pic_teams.length === 0) ? (
                          <span className="text-sm text-slate-400 italic">Belum ada tim yang ditugaskan</span>
                        ) : (
                          iku.pic_teams.map((teamId: string) => {
                            const team = teamsData.find(t => t.id === teamId);
                            return (
                              <span key={teamId} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                {team ? team.nama : 'Tim tidak ditemukan'}
                              </span>
                            );
                          })
                        )}
                      </div>
                    </div>
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
                    <p className="text-xs text-right mt-1.5 font-semibold text-slate-600">{Number(iku.progressValue).toFixed(1)}% Tercapai</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal IKU */}
      {isModalOpen && editingIku && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-lg font-bold text-slate-800">
                {editingIku.isNew ? 'Penetapan IKU Baru' : 'Edit Capaian IKU'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Kode IKU</label>
                    <input type="text" required value={editingIku.kode} onChange={e => setEditingIku({...editingIku, kode: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Cth: IKU-01" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Status Kinerja</label>
                    <select required value={editingIku.status} onChange={e => setEditingIku({...editingIku, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50">
                      <option value="On Track">On Track (Sesuai Jalur)</option>
                      <option value="Tercapai">Tercapai</option>
                      <option value="Needs Attention">Needs Attention (Butuh Perhatian)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Indikator Kinerja</label>
                  <textarea required rows={3} value={editingIku.indikator} onChange={e => setEditingIku({...editingIku, indikator: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Masukkan deskripsi indikator..."></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Target</label>
                  <input type="text" required value={editingIku.target} onChange={e => setEditingIku({...editingIku, target: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Cth: 85%" />
                </div>

                <div className="border-t border-slate-200 pt-4 mt-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tim Kerja Pengampu (Cascading)</label>
                  <p className="text-xs text-slate-500 mb-3">Pilih satu atau lebih tim kerja yang bertanggung jawab untuk mengeksekusi IKU ini.</p>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 max-h-40 overflow-y-auto">
                    {teamsData.length === 0 ? (
                      <p className="text-sm text-slate-500 text-center py-2">Belum ada tim kerja yang terdaftar di sistem.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {teamsData.map((team) => {
                          const isSelected = editingIku.pic_teams?.includes(team.id);
                          return (
                            <label key={team.id} className={`flex items-start p-2 rounded-md border cursor-pointer transition-colors ${isSelected ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200 hover:bg-slate-100'}`}>
                              <div className="flex items-center h-5">
                                <input 
                                  type="checkbox" 
                                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" 
                                  checked={isSelected}
                                  onChange={() => toggleTeam(team.id)}
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <span className={`font-medium ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>{team.nama}</span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {!editingIku.isNew && (
                  <div className="border-t border-slate-200 pt-4 mt-4">
                    <p className="text-sm font-semibold text-slate-800 mb-3">Evaluasi & Capaian (Monitoring Tim)</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Nilai Realisasi</label>
                        <input type="text" required value={editingIku.realisasi} onChange={e => setEditingIku({...editingIku, realisasi: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Cth: 65%" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Persentase Capaian (%)</label>
                        <input type="number" required min="0" max="100" step="0.1" value={editingIku.progressValue} onChange={e => setEditingIku({...editingIku, progressValue: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Cth: 76.4" />
                      </div>
                    </div>
                  </div>
                )}
                {editingIku.isNew && (
                  <div className="p-3 bg-blue-50 text-blue-800 text-sm rounded-lg flex">
                    <TrendingUp className="w-5 h-5 mr-2 shrink-0 text-blue-600" />
                    <p>Karena ini adalah IKU Baru, nilai Realisasi dan Capaian Persentase akan diisi nanti pada saat proses evaluasi (Monitoring) oleh tim kerja yang bersangkutan.</p>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end space-x-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                  Batal
                </button>
                <button disabled={isSubmitting} type="submit" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50">
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Menyimpan...' : 'Simpan IKU'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
