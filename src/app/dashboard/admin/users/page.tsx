'use client';
import React, { useState } from 'react';
import { UserPlus, Search, Edit, Trash2, Filter, X } from 'lucide-react';

export default function ManajemenUserPage() {
  const initialUsers = [
    {
      id: 1,
      nama: 'Budi Santoso',
      email: 'budi.santoso@pusbangjak.go.id',
      inisial: 'B',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      role: 'Kepala Pusat',
      roleColor: 'bg-purple-50 text-purple-700 ring-purple-600/20',
      status: 'Aktif'
    },
    {
      id: 2,
      nama: 'Siti Aminah',
      email: 'siti.aminah@pusbangjak.go.id',
      inisial: 'S',
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-700',
      role: 'Kepala Tata Usaha',
      roleColor: 'bg-blue-50 text-blue-700 ring-blue-700/10',
      status: 'Aktif'
    },
    {
      id: 3,
      nama: 'Andi Jaya',
      email: 'andi.jaya@pusbangjak.go.id',
      inisial: 'A',
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-700',
      role: 'Ketua Tim Kerja',
      roleColor: 'bg-slate-100 text-slate-700 ring-slate-600/20',
      status: 'Aktif'
    }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleDelete = (id: number, nama: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus user ${nama}?`)) {
      setUsers(users.filter(user => user.id !== id));
      alert(`User ${nama} berhasil dihapus.`);
    }
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUser({
      id: Date.now(),
      nama: '',
      email: '',
      inisial: 'N',
      bgColor: 'bg-slate-100',
      textColor: 'text-slate-700',
      role: 'Anggota Tim Kerja',
      roleColor: 'bg-slate-100 text-slate-700 ring-slate-600/20',
      status: 'Aktif'
    });
    setIsModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (users.some(u => u.id === editingUser.id)) {
      setUsers(users.map(u => (u.id === editingUser.id ? editingUser : u)));
      alert(`Data user ${editingUser.nama} berhasil diperbarui.`);
    } else {
      // Auto-generate inisial
      const inisial = editingUser.nama.charAt(0).toUpperCase() || 'U';
      const newUser = { ...editingUser, inisial };
      setUsers([...users, newUser]);
      alert(`User ${editingUser.nama} berhasil ditambahkan.`);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen User</h2>
          <p className="text-slate-600 mt-1">Kelola data pengguna, akses login, dan penugasan peran (Role).</p>
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Tambah User Baru
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
              placeholder="Cari nama, email, atau NIP..."
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
            <Filter className="h-4 w-4 mr-2 text-slate-500" />
            Filter Role
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Informasi User</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role Akses</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada data user yang ditemukan.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className={`h-10 w-10 rounded-full ${user.bgColor} flex items-center justify-center ${user.textColor} font-bold`}>
                            {user.inisial}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{user.nama}</div>
                          <div className="text-sm text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${user.roleColor}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${user.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 'bg-rose-50 text-rose-700 ring-rose-600/20'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id, user.nama)}
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

      {/* Modal Edit User */}
      {isModalOpen && editingUser && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">Edit Data User</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    value={editingUser.nama}
                    onChange={(e) => setEditingUser({...editingUser, nama: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role Akses</label>
                  <select 
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="Kepala Pusat">Kepala Pusat</option>
                    <option value="Kepala Tata Usaha">Kepala Tata Usaha</option>
                    <option value="Ketua Tim Kerja">Ketua Tim Kerja</option>
                    <option value="Anggota Tim Kerja">Anggota Tim Kerja</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status Akun</label>
                  <select 
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Non-Aktif">Non-Aktif</option>
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
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

