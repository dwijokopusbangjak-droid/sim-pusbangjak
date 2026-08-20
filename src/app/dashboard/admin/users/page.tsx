'use client';
import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Search, Shield, Trash2, Mail, Lock, X, Edit } from 'lucide-react';
import { app, db } from '@/lib/firebase';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states (Create)
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('anggota');

  // Form states (Edit)
  const [editingUserId, setEditingUserId] = useState('');
  const [editNama, setEditNama] = useState('');
  const [editRole, setEditRole] = useState('');
  const [userEmailForReset, setUserEmailForReset] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(data);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching users:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Menggunakan Secondary App agar Admin tidak ter-logout saat membuat user baru
      const secondaryApp = initializeApp(app.options, "Secondary");
      const secondaryAuth = getAuth(secondaryApp);
      
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: nama
      });

      // Simpan data profil & role ke Firestore menggunakan instance database utama
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        nama: nama,
        email: email,
        role: role,
        createdAt: new Date()
      });

      // Hapus sesi secondary app
      await secondaryAuth.signOut();
      
      setIsModalOpen(false);
      setNama(''); setEmail(''); setPassword(''); setRole('anggota');
      alert('Akun pengguna baru berhasil didaftarkan ke sistem!');
    } catch (error: any) {
      console.error("Error creating user: ", error);
      alert('Gagal membuat user: ' + (error.message || 'Terjadi kesalahan'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (user: any) => {
    setEditingUserId(user.id);
    setEditNama(user.nama || '');
    setEditRole(user.role || 'anggota');
    setUserEmailForReset(user.email || '');
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const userRef = doc(db, 'users', editingUserId);
      await updateDoc(userRef, {
        nama: editNama,
        role: editRole,
        updatedAt: new Date()
      });
      
      setIsEditModalOpen(false);
      alert('Data pengguna berhasil diperbarui!');
    } catch (error: any) {
      console.error("Error updating user: ", error);
      alert('Gagal memperbarui user: ' + (error.message || 'Terjadi kesalahan'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus akses untuk ${userName}? (Perhatian: Ini hanya menghapus data dari Firestore, untuk menghapus Autentikasi sepenuhnya harus dari Firebase Console)`)) {
      try {
        await deleteDoc(doc(db, "users", userId));
        alert('Data user berhasil dihapus dari tabel.');
      } catch (error) {
        console.error("Error deleting user: ", error);
        alert('Gagal menghapus user.');
      }
    }
  };

  const handleResetPassword = async (userEmail: string) => {
    if (!userEmail) return;
    if (confirm(`Kirim tautan reset password ke ${userEmail}?`)) {
      try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, userEmail);
        alert(`Tautan reset password berhasil dikirim ke ${userEmail}! User dapat mengklik tautan di email mereka untuk membuat password baru.`);
      } catch (error: any) {
        console.error("Error sending reset password email: ", error);
        alert('Gagal mengirim email reset password: ' + error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Master Data User</h2>
          <p className="text-slate-600 mt-1">Kelola informasi pegawai, pendaftaran akun baru, dan pengaturan role akses.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
          <UserPlus className="w-5 h-5 mr-2" />
          Daftarkan Akun Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Daftar Akun Terdaftar</h3>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Cari Nama atau Email..."
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Pegawai</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Kontak (Email)</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Hak Akses (Role)</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Memuat data user dari Firestore...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Belum ada data user.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3 shrink-0">
                          {user.nama ? user.nama.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{user.nama}</div>
                          <div className="text-xs text-slate-500 mt-0.5 font-mono">UID: {user.uid?.substring(0,8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-800 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-slate-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border ${
                        user.role === 'admin' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        user.role === 'kapus' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        user.role === 'ktu' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        user.role === 'ketua' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        <Shield className="w-3 h-3 mr-1" />
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => handleEditClick(user)} className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors" title="Edit Pengguna">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteUser(user.id, user.nama)} className="text-rose-500 hover:text-rose-700 p-2 rounded-full hover:bg-rose-50 transition-colors" title="Cabut Akses">
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

      {/* Modal Edit User */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <Edit className="w-5 h-5 mr-2 text-blue-600" />
                Edit Data Pengguna
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateUser} className="p-6 space-y-5">
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap (dengan gelar)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-4 w-4 text-slate-400" />
                  </div>
                  <input type="text" required value={editNama} onChange={(e)=>setEditNama(e.target.value)} className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Hak Akses (Role)</label>
                <select required value={editRole} onChange={(e)=>setEditRole(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-slate-50">
                  <option value="admin">Administrator (Akses Penuh)</option>
                  <option value="kapus">Kepala Pusat</option>
                  <option value="ktu">Kepala Tata Usaha</option>
                  <option value="ketua">Ketua Tim Kerja</option>
                  <option value="anggota">Anggota Tim Kerja</option>
                </select>
                <p className="text-xs text-slate-500 mt-2">
                  Catatan: Demi alasan keamanan sistem (enkripsi Firebase), Admin tidak dapat melihat atau mengetikkan password baru untuk user secara langsung.
                </p>
              </div>
              
              <div className="pt-2 border-t border-slate-100">
                <button type="button" onClick={() => handleResetPassword(userEmailForReset)} className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                  <Lock className="w-4 h-4 mr-2" />
                  Kirim Email Reset Password ke User Ini
                </button>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                  Batal
                </button>
                <button disabled={isSubmitting} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center shadow-sm disabled:opacity-50">
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Pendaftaran User Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-lg font-bold text-slate-800 flex items-center">
                <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
                Registrasi Akun Pegawai
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateUser} className="p-6 space-y-5">
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap (dengan gelar)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-4 w-4 text-slate-400" />
                  </div>
                  <input type="text" required value={nama} onChange={(e)=>setNama(e.target.value)} className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Cth: Dr. Budi Santoso, M.Si." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email Kedinasan</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="budi@pusbangjak.go.id" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Kata Sandi Sementara</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="Minimal 6 karakter" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Hak Akses (Role)</label>
                <select required value={role} onChange={(e)=>setRole(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-slate-50">
                  <option value="admin">Administrator (Akses Penuh)</option>
                  <option value="kapus">Kepala Pusat</option>
                  <option value="ktu">Kepala Tata Usaha</option>
                  <option value="ketua">Ketua Tim Kerja</option>
                  <option value="anggota">Anggota Tim Kerja</option>
                </select>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                  Batal
                </button>
                <button disabled={isSubmitting} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center shadow-sm disabled:opacity-50">
                  {isSubmitting ? 'Memproses...' : 'Daftarkan User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
