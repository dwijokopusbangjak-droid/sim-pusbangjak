'use client';
import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit, Trash2, X, Save, UserCheck, AlertCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function MatriksPeranHasilPage() {
  const [dataMatriks, setDataMatriks] = useState<any[]>([]);
  const [dataKegiatan, setDataKegiatan] = useState<any[]>([]);
  const [teamsData, setTeamsData] = useState<any[]>([]);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [userRole, setUserRole] = useState('pegawai');
  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(new RegExp('(^| )userRole=([^;]+)'));
    const roleFromCookie = match ? match[2] : 'pegawai';
    setUserRole(roleFromCookie);

    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUserUid(user.uid);
      else setCurrentUserUid(null);
    });

    const qMatriks = query(collection(db, 'matriks'), orderBy('createdAt', 'desc'));
    const unsubMatriks = onSnapshot(qMatriks, (snapshot) => {
      setDataMatriks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const qKegiatan = query(collection(db, 'kegiatans'), orderBy('createdAt', 'desc'));
    const unsubKegiatan = onSnapshot(qKegiatan, (snapshot) => {
      setDataKegiatan(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const qTeams = query(collection(db, 'teams'), orderBy('createdAt', 'desc'));
    const unsubTeams = onSnapshot(qTeams, (snapshot) => {
      setTeamsData(snapshot.docs.map(doc => ({
        id: doc.id,
        nama: doc.data().nama,
        ketua_uid: doc.data().ketua_uid,
        anggota_uids: doc.data().anggota_uids || []
      })));
    });

    const qUsers = query(collection(db, 'users'));
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
      setUsersData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false);
    });

    return () => {
      unsubMatriks();
      unsubKegiatan();
      unsubTeams();
      unsubUsers();
      unsubscribeAuth();
    };
  }, []);

  const isAdmin = userRole === 'admin';
  const myLeaderTeams = teamsData.filter(t => t.ketua_uid === currentUserUid);
  const isKetua = myLeaderTeams.length > 0 || isAdmin;
  const myInvolvedTeams = teamsData.filter(t => t.ketua_uid === currentUserUid || t.anggota_uids.includes(currentUserUid)).map(t => t.id);

  // Matriks yang relevan:
  // 1. Admin melihat semua
  // 2. User biasa melihat matriks yang bernaung di bawah tim mereka (anggota) ATAU yang ditugaskan kepada mereka
  const displayedMatriks = isAdmin 
    ? dataMatriks 
    : dataMatriks.filter(m => myInvolvedTeams.includes(m.team_id) || m.anggota_uid === currentUserUid);

  const handleAdd = () => {
    setEditingData({
      isNew: true,
      kegiatan_id: '',
      team_id: isAdmin ? '' : (myLeaderTeams.length > 0 ? myLeaderTeams[0].id : ''),
      anggota_uid: '',
      peran: '',
      hasil: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (m: any) => {
    setEditingData({ ...m, isNew: false });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Hapus penugasan ini?')) {
      try {
        await deleteDoc(doc(db, 'matriks', id));
      } catch (error) {
        alert('Gagal menghapus');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Auto-detect team_id based on kegiatan
    const selectedKegiatan = dataKegiatan.find(k => k.id === editingData.kegiatan_id);
    const resolvedTeamId = selectedKegiatan ? selectedKegiatan.team_id : editingData.team_id;

    try {
      const payload = {
        kegiatan_id: editingData.kegiatan_id,
        team_id: resolvedTeamId,
        anggota_uid: editingData.anggota_uid,
        peran: editingData.peran,
        hasil: editingData.hasil,
      };

      if (editingData.isNew) {
        await addDoc(collection(db, 'matriks'), {
          ...payload,
          createdAt: serverTimestamp()
        });
      } else {
        await updateDoc(doc(db, 'matriks', editingData.id), {
          ...payload,
          updatedAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
    } catch (error: any) {
      alert('Gagal menyimpan: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserName = (uid: string) => {
    const u = usersData.find(x => x.uid === uid || x.id === uid);
    return u ? u.nama : 'Unknown';
  };

  const getKegiatanDesc = (id: string) => {
    const k = dataKegiatan.find(x => x.id === id);
    return k ? k.deskripsi : 'Unknown';
  };
  
  const getTeamName = (id: string) => {
    const t = teamsData.find(x => x.id === id);
    return t ? t.nama : 'Unknown';
  };

  // List anggota yang bisa dipilih di dropdown (Berdasarkan tim dari kegiatan yang dipilih)
  const availableMembers = () => {
    if (!editingData?.kegiatan_id) return [];
    const k = dataKegiatan.find(x => x.id === editingData.kegiatan_id);
    if (!k) return [];
    
    const t = teamsData.find(x => x.id === k.team_id);
    if (!t) return [];
    
    // Gabungkan ketua dan anggota
    const uids = [t.ketua_uid, ...(t.anggota_uids || [])];
    return usersData.filter(u => uids.includes(u.uid || u.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Matriks Peran Hasil (MPH)</h2>
          <p className="text-slate-600 mt-1">Pembagian tugas (Peran dan Ekspektasi Hasil) ke setiap anggota tim kerja.</p>
        </div>
        {isKetua && (
          <button onClick={handleAdd} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors shrink-0">
            <Plus className="w-4 h-4 mr-2" />
            Delegasikan Tugas Baru
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800 flex items-center">
            <Layers className="w-5 h-5 mr-2 text-blue-600" />
            Daftar Penugasan Anggota
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Anggota Pelaksana</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Mendukung Kegiatan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Peran & Ekspektasi Hasil</th>
                {isKetua && <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">Memuat data...</td>
                </tr>
              ) : displayedMatriks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">Belum ada delegasi tugas matriks peran hasil.</td>
                </tr>
              ) : (
                displayedMatriks.map((m) => {
                  const canEdit = isAdmin || myLeaderTeams.some(t => t.id === m.team_id);
                  const isMyTask = m.anggota_uid === currentUserUid;

                  return (
                    <tr key={m.id} className={`hover:bg-slate-50 transition-colors ${isMyTask ? 'bg-indigo-50/30' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs border border-indigo-200">
                              {getUserName(m.anggota_uid).charAt(0)}
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-semibold text-slate-900">{getUserName(m.anggota_uid)}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{getTeamName(m.team_id)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700 line-clamp-2">{getKegiatanDesc(m.kegiatan_id)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="mb-2">
                          <span className="text-xs font-bold text-slate-500 uppercase">Peran:</span>
                          <p className="text-sm font-medium text-slate-800">{m.peran}</p>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase">Hasil:</span>
                          <p className="text-sm text-emerald-700 font-medium">{m.hasil}</p>
                        </div>
                      </td>
                      {isKetua && (
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          {canEdit ? (
                            <div className="flex justify-center space-x-2">
                              <button onClick={() => handleEdit(m)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(m.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">-</span>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && editingData && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-lg font-bold text-slate-800">
                {editingData.isNew ? 'Delegasi Tugas Baru' : 'Edit Matriks Peran Hasil'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-5">
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 shrink-0" />
                  <p className="text-sm text-blue-800">
                    Pilih Kegiatan Ketua Tim terlebih dahulu, sistem akan otomatis memfilter daftar pegawai yang berhak menerima penugasan (anggota tim terkait).
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Rencana Kegiatan Induk</label>
                  <select 
                    required 
                    value={editingData.kegiatan_id} 
                    onChange={e => setEditingData({...editingData, kegiatan_id: e.target.value, anggota_uid: ''})} 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                  >
                    <option value="">-- Pilih Kegiatan --</option>
                    {dataKegiatan.filter(k => isAdmin || myLeaderTeams.some(t => t.id === k.team_id)).map(keg => (
                      <option key={keg.id} value={keg.id}>{keg.deskripsi}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Pilih Anggota Pelaksana</label>
                  <select 
                    required 
                    value={editingData.anggota_uid} 
                    onChange={e => setEditingData({...editingData, anggota_uid: e.target.value})} 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 disabled:opacity-50"
                    disabled={!editingData.kegiatan_id}
                  >
                    <option value="">-- Pilih Anggota Tim --</option>
                    {availableMembers().map(u => (
                      <option key={u.id} value={u.uid || u.id}>{u.nama} ({u.role})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Peran</label>
                    <textarea 
                      required 
                      rows={3} 
                      value={editingData.peran} 
                      onChange={e => setEditingData({...editingData, peran: e.target.value})} 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
                      placeholder="Apa peran pegawai ini dalam eksekusi kegiatan?"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Ekspektasi Hasil</label>
                    <textarea 
                      required 
                      rows={3} 
                      value={editingData.hasil} 
                      onChange={e => setEditingData({...editingData, hasil: e.target.value})} 
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
                      placeholder="Apa output atau hasil nyata yang diharapkan?"
                    ></textarea>
                  </div>
                </div>

              </div>

              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end space-x-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                  Batal
                </button>
                <button disabled={isSubmitting} type="submit" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50">
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Delegasi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
