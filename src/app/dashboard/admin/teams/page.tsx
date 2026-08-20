'use client';
import React, { useState, useEffect } from 'react';
import { Briefcase, Search, Edit, Trash2, Plus, X, Users, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function ManajemenTimKerjaPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [usersFromDb, setUsersFromDb] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<any>(null);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mengambil daftar tim dari Firestore
  useEffect(() => {
    const qTeams = query(collection(db, 'teams'), orderBy('createdAt', 'desc'));
    const unsubscribeTeams = onSnapshot(qTeams, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTeams(data);
      setIsLoadingTeams(false);
    }, (error) => {
      console.error("Error fetching teams:", error);
      setIsLoadingTeams(false);
    });

    return () => unsubscribeTeams();
  }, []);

  // Mengambil daftar pegawai real dari Firestore untuk dropdown
  useEffect(() => {
    const qUsers = query(collection(db, 'users'), orderBy('nama', 'asc'));
    const unsubscribeUsers = onSnapshot(qUsers, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsersFromDb(data);
    });

    return () => unsubscribeUsers();
  }, []);

  const handleDelete = async (id: string, nama: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus tim ${nama}? Perhatian: Aksi ini permanen!`)) {
      try {
        await deleteDoc(doc(db, 'teams', id));
        alert(`Tim ${nama} berhasil dihapus dari database.`);
      } catch (error) {
        console.error("Error deleting team: ", error);
        alert('Gagal menghapus tim.');
      }
    }
  };

  const handleEdit = (team: any) => {
    setEditingTeam(team);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTeam({
      isNew: true, // flag marker
      nama: '',
      deskripsi: '',
      ketua: '',
      jumlahAnggota: 0,
      status: 'Aktif'
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (editingTeam.isNew) {
        // Add new team to Firestore
        await addDoc(collection(db, 'teams'), {
          nama: editingTeam.nama,
          deskripsi: editingTeam.deskripsi,
          ketua: editingTeam.ketua,
          jumlahAnggota: Number(editingTeam.jumlahAnggota),
          status: editingTeam.status,
          createdAt: serverTimestamp()
        });
        alert('Tim kerja baru berhasil ditambahkan ke database.');
      } else {
        // Update existing team
        const teamRef = doc(db, 'teams', editingTeam.id);
        await updateDoc(teamRef, {
          nama: editingTeam.nama,
          deskripsi: editingTeam.deskripsi,
          ketua: editingTeam.ketua,
          jumlahAnggota: Number(editingTeam.jumlahAnggota),
          status: editingTeam.status,
          updatedAt: serverTimestamp()
        });
        alert('Perubahan tim berhasil disimpan ke database.');
      }
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error saving team: ", error);
      alert('Gagal menyimpan tim: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Tim Kerja</h2>
          <p className="text-slate-600 mt-1">Pembentukan, restrukturisasi, dan penugasan ketua tim kerja secara real-time.</p>
        </div>
        <button onClick={handleAdd} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Tim Kerja
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Daftar Tim Aktif</h3>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Cari Nama Tim..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama & Deskripsi Tim</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Ketua Tim</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {isLoadingTeams ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
                    Menarik data tim dari database...
                  </td>
                </tr>
              ) : teams.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada data tim kerja di database. Silakan tambah tim baru.
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr key={team.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <Briefcase className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-slate-900">{team.nama}</div>
                          <div className="text-xs text-slate-500 mt-1">{team.deskripsi}</div>
                          <div className="flex items-center text-xs text-slate-500 mt-2 font-medium bg-slate-100 w-fit px-2 py-0.5 rounded">
                            <Users className="w-3 h-3 mr-1" />
                            {team.jumlahAnggota || 0} Anggota
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-800">{team.ketua || '-'}</div>
                      <div className="text-xs text-slate-500">Ketua Tim</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${team.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 'bg-rose-50 text-rose-700 ring-rose-600/20'}`}>
                        {team.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(team)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit Tim"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(team.id, team.nama)}
                          className="text-rose-600 hover:text-rose-900 p-2 hover:bg-rose-50 rounded-full transition-colors"
                          title="Hapus Tim"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tim Kerja */}
      {isModalOpen && editingTeam && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-lg font-bold text-slate-800">
                {editingTeam.isNew ? 'Tambah Tim Kerja Baru' : 'Edit Tim Kerja'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Tim Kerja</label>
                  <input 
                    type="text" 
                    required
                    value={editingTeam.nama}
                    onChange={(e) => setEditingTeam({...editingTeam, nama: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="Contoh: Tim Inovasi Pembangunan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi & Tugas Pokok</label>
                  <textarea 
                    required
                    rows={3}
                    value={editingTeam.deskripsi}
                    onChange={(e) => setEditingTeam({...editingTeam, deskripsi: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
                    placeholder="Penjelasan singkat mengenai ruang lingkup tim..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Pilih Ketua Tim <span className="text-xs text-blue-600 font-normal ml-1">(Database Real-time)</span>
                  </label>
                  <select 
                    required
                    value={editingTeam.ketua}
                    onChange={(e) => setEditingTeam({...editingTeam, ketua: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">-- Pilih Pegawai --</option>
                    {usersFromDb.map((user) => (
                      <option key={user.id} value={user.nama}>
                        {user.nama} ({user.role})
                      </option>
                    ))}
                    {usersFromDb.length === 0 && (
                      <option disabled>Memuat data dari database...</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Estimasi Jumlah Anggota</label>
                  <input 
                    type="number" 
                    min="0"
                    required
                    value={editingTeam.jumlahAnggota}
                    onChange={(e) => setEditingTeam({...editingTeam, jumlahAnggota: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status Tim</label>
                  <select 
                    value={editingTeam.status}
                    onChange={(e) => setEditingTeam({...editingTeam, status: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Non-Aktif">Non-Aktif (Dibekukan)</option>
                  </select>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end space-x-3 shrink-0">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100"
                >
                  Batal
                </button>
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Simpan Tim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
