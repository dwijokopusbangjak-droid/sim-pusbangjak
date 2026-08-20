'use client';
import React, { useState } from 'react';
import { Briefcase, Search, Edit, Trash2, Plus, X, Users } from 'lucide-react';

export default function ManajemenTimKerjaPage() {
  const initialTeams = [
    {
      id: 1,
      nama: 'Tim Kebijakan Pembangunan Desa',
      deskripsi: 'Merumuskan kebijakan terkait pembangunan desa berkelanjutan.',
      ketua: 'Rina Yulianti, M.Si.',
      jumlahAnggota: 12,
      status: 'Aktif'
    },
    {
      id: 2,
      nama: 'Tim Pengembangan Daerah Tertinggal',
      deskripsi: 'Evaluasi dan intervensi khusus untuk daerah tertinggal.',
      ketua: 'Agus Setiawan, S.T.',
      jumlahAnggota: 8,
      status: 'Aktif'
    },
    {
      id: 3,
      nama: 'Tim Data dan Informasi Spasial',
      deskripsi: 'Pengumpulan dan pengolahan data geospasial kawasan perdesaan.',
      ketua: 'Dr. Hendra Gunawan',
      jumlahAnggota: 5,
      status: 'Aktif'
    }
  ];

  const [teams, setTeams] = useState(initialTeams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<any>(null);

  const handleDelete = (id: number, nama: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus tim ${nama}?`)) {
      setTeams(teams.filter(team => team.id !== id));
      alert(`Tim ${nama} berhasil dihapus.`);
    }
  };

  const handleEdit = (team: any) => {
    setEditingTeam(team);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTeam({
      id: Date.now(),
      nama: '',
      deskripsi: '',
      ketua: '',
      jumlahAnggota: 0,
      status: 'Aktif'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (teams.some(t => t.id === editingTeam.id)) {
      setTeams(teams.map(t => (t.id === editingTeam.id ? editingTeam : t)));
      alert(`Data tim ${editingTeam.nama} berhasil diperbarui.`);
    } else {
      setTeams([...teams, editingTeam]);
      alert(`Tim ${editingTeam.nama} berhasil ditambahkan.`);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Tim Kerja</h2>
          <p className="text-slate-600 mt-1">Buat tim kerja baru, tentukan ketua tim, dan kelola status tim.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah Tim Kerja
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Cari nama tim kerja..."
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
              {teams.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada data tim kerja yang ditemukan.
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
                            {team.jumlahAnggota} Anggota
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
                      <button 
                        onClick={() => handleEdit(team)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(team.id, team.nama)}
                        className="text-rose-600 hover:text-rose-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">
                {teams.some(t => t.id === editingTeam.id) ? 'Edit Tim Kerja' : 'Tambah Tim Kerja Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave}>
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Ketua Tim (Dropdown Simulasi)</label>
                  <select 
                    value={editingTeam.ketua}
                    onChange={(e) => setEditingTeam({...editingTeam, ketua: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">-- Pilih Pegawai --</option>
                    <option value="Rina Yulianti, M.Si.">Rina Yulianti, M.Si.</option>
                    <option value="Agus Setiawan, S.T.">Agus Setiawan, S.T.</option>
                    <option value="Dr. Hendra Gunawan">Dr. Hendra Gunawan</option>
                    <option value="Siti Aminah, S.E.">Siti Aminah, S.E.</option>
                  </select>
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

              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100"
                >
                  Batal
                </button>
                <button type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
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

