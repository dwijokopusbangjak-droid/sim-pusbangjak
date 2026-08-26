'use client';
import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, Edit, Trash2, X, Save, Layers } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function KegiatanTimPage() {
  const [dataKegiatan, setDataKegiatan] = useState<any[]>([]);
  const [dataIKU, setDataIKU] = useState<any[]>([]);
  const [teamsData, setTeamsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('pegawai');
  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);
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
      const ikus = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDataIKU(ikus);
    });

    // Fetch Teams
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

    // Fetch Kegiatan
    const qKegiatan = query(collection(db, 'kegiatans'), orderBy('createdAt', 'desc'));
    const unsubscribeKegiatan = onSnapshot(qKegiatan, (snapshot) => {
      const kegs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDataKegiatan(kegs);
      setIsLoading(false);
    });

    return () => {
      unsubscribeIku();
      unsubscribeTeams();
      unsubscribeKegiatan();
      unsubscribeAuth();
    };
  }, []);

  const isAdmin = userRole === 'admin';

  // Daftar tim di mana user bertindak sebagai KETUA
  const myLeaderTeams = teamsData.filter(t => t.ketua_uid === currentUserUid);
  const isKetua = myLeaderTeams.length > 0 || isAdmin;

  // Daftar tim di mana user terlibat (Ketua/Anggota)
  const myInvolvedTeams = teamsData.filter(t => t.ketua_uid === currentUserUid || t.anggota_uids.includes(currentUserUid)).map(t => t.id);

  // Filter Kegiatan yang bisa DILIHAT
  // Hanya melihat kegiatan dari tim-tim tempat user terlibat
  const displayedKegiatan = isAdmin ? dataKegiatan : dataKegiatan.filter(keg => myInvolvedTeams.includes(keg.team_id));

  const handleAdd = () => {
    setEditingData({
      isNew: true,
      deskripsi: '',
      iku_id: '',
      team_id: isAdmin ? '' : (myLeaderTeams.length > 0 ? myLeaderTeams[0].id : '')
    });
    setIsModalOpen(true);
  };

  const handleEdit = (keg: any) => {
    setEditingData({ ...keg, isNew: false });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kegiatan ini? Matriks Peran Hasil yang terhubung mungkin akan kehilangan referensi!')) {
      try {
        await deleteDoc(doc(db, 'kegiatans', id));
        alert('Kegiatan berhasil dihapus.');
      } catch (error) {
        console.error("Error deleting:", error);
        alert('Gagal menghapus kegiatan.');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        deskripsi: editingData.deskripsi,
        iku_id: editingData.iku_id,
        team_id: editingData.team_id,
      };

      if (editingData.isNew) {
        await addDoc(collection(db, 'kegiatans'), {
          ...payload,
          createdAt: serverTimestamp()
        });
        alert('Kegiatan baru berhasil ditambahkan.');
      } else {
        await updateDoc(doc(db, 'kegiatans', editingData.id), {
          ...payload,
          updatedAt: serverTimestamp()
        });
        alert('Perubahan kegiatan berhasil disimpan.');
      }
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error saving:", error);
      alert('Gagal menyimpan data: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper untuk mendapatkan nama IKU
  const getIkuName = (id: string) => {
    const iku = dataIKU.find(i => i.id === id);
    return iku ? `${iku.kode} - ${iku.indikator}` : 'IKU tidak ditemukan';
  };

  // Helper untuk mendapatkan nama Tim
  const getTeamName = (id: string) => {
    const team = teamsData.find(t => t.id === id);
    return team ? team.nama : 'Tim tidak ditemukan';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Rencana Kegiatan Tim</h2>
          <p className="text-slate-600 mt-1">Penjabaran IKU Kepala Pusat menjadi kegiatan-kegiatan level Ketua Tim Kerja.</p>
        </div>
        {isKetua && (
          <button onClick={handleAdd} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors shrink-0">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Kegiatan Baru
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800 flex items-center">
            <CheckSquare className="w-5 h-5 mr-2 text-blue-600" />
            Daftar Kegiatan Terdokumentasi
          </h3>
        </div>
        
        <div className="divide-y divide-slate-200">
          {isLoading ? (
            <div className="p-8 text-center text-slate-500">Memuat data kegiatan...</div>
          ) : displayedKegiatan.length === 0 ? (
            <div className="p-8 text-center text-slate-500">Belum ada kegiatan yang didaftarkan oleh Ketua Tim Anda.</div>
          ) : (
            displayedKegiatan.map((keg) => {
              // Cek apakah user berhak edit (Admin atau Ketua dari tim kegiatan ini)
              const canEdit = isAdmin || myLeaderTeams.some(t => t.id === keg.team_id);
              
              return (
                <div key={keg.id} className="p-6 hover:bg-slate-50 transition-colors relative group">
                  {canEdit && (
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                      <button onClick={() => handleEdit(keg)} className="p-2 bg-white border border-slate-200 rounded-md text-blue-600 hover:bg-blue-50 shadow-sm" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(keg.id)} className="p-2 bg-white border border-slate-200 rounded-md text-rose-600 hover:bg-rose-50 shadow-sm" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  <div className="pr-16">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="px-2.5 py-1 text-xs font-bold bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200 flex items-center">
                        <Layers className="w-3 h-3 mr-1" />
                        {getTeamName(keg.team_id)}
                      </span>
                    </div>
                    <h4 className="text-base font-semibold text-slate-900 leading-snug">{keg.deskripsi}</h4>
                    <div className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Mendukung IKU Kapus:</p>
                      <p className="text-sm font-medium text-slate-700">{getIkuName(keg.iku_id)}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && editingData && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-lg font-bold text-slate-800">
                {editingData.isNew ? 'Tambah Rencana Kegiatan Baru' : 'Edit Rencana Kegiatan'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-5">
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Rencana Kegiatan</label>
                  <textarea 
                    required 
                    rows={3} 
                    value={editingData.deskripsi} 
                    onChange={e => setEditingData({...editingData, deskripsi: e.target.value})} 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
                    placeholder="Deskripsikan rencana kegiatan yang akan dieksekusi oleh tim Anda..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Pilih IKU Kapus yang Didukung</label>
                  <select 
                    required 
                    value={editingData.iku_id} 
                    onChange={e => setEditingData({...editingData, iku_id: e.target.value})} 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                  >
                    <option value="">-- Pilih IKU --</option>
                    {dataIKU.map(iku => (
                      <option key={iku.id} value={iku.id}>{iku.kode} - {iku.indikator}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Pelaksana (Tim Kerja Anda)</label>
                  <select 
                    required 
                    value={editingData.team_id} 
                    onChange={e => setEditingData({...editingData, team_id: e.target.value})} 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                  >
                    <option value="">-- Pilih Tim --</option>
                    {/* Jika admin, bisa pilih semua tim. Jika ketua, hanya tim yang dia ketuai */}
                    {(isAdmin ? teamsData : myLeaderTeams).map(team => (
                      <option key={team.id} value={team.id}>{team.nama}</option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end space-x-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                  Batal
                </button>
                <button disabled={isSubmitting} type="submit" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50">
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Kegiatan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
