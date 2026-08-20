'use client';
import React, { useState, useEffect } from 'react';
import { Users, Edit, Save, Upload, Shield, Briefcase, Mail, Phone, MapPin } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Profile State
  const [profil, setProfil] = useState({
    nama: 'Memuat...',
    email: 'Memuat...',
    nip: '',
    pangkat: 'Penata Muda Tk. I (III/b)',
    jabatan: 'Analis Sistem Informasi',
    alamat: '',
    nomorHp: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setProfil(prev => ({
              ...prev,
              nama: data.nama || user.displayName || 'Pegawai',
              email: data.email || user.email || '',
              nip: data.nip || 'Belum diisi',
              pangkat: data.pangkat || 'Belum diisi',
              jabatan: data.jabatan || 'Belum diisi',
              alamat: data.alamat || '',
              nomorHp: data.nomorHp || '+62 '
            }));
          }
        } catch (error) {
          console.error("Error fetching profile", error);
        }
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfil(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!userId) return;
    try {
      setIsEditing(false); // Optimistic UI update
      await updateDoc(doc(db, 'users', userId), {
        nama: profil.nama,
        nip: profil.nip,
        pangkat: profil.pangkat,
        jabatan: profil.jabatan,
        alamat: profil.alamat,
        nomorHp: profil.nomorHp
      });
      alert('Profil berhasil diperbarui dan disimpan ke database!');
    } catch (error) {
      console.error("Error updating profile", error);
      alert('Gagal menyimpan profil.');
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Memuat profil pengguna...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Profil & Riwayat Pegawai</h2>
          <p className="text-slate-600 mt-1">Kelola data diri, portofolio tugas, dan informasi kepegawaian Anda.</p>
        </div>
        {isEditing ? (
          <div className="flex space-x-3">
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors">Batal</button>
            <button onClick={handleSave} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
              <Save className="w-5 h-5 mr-2" /> Simpan Profil
            </button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 font-medium transition-colors">
            <Edit className="w-5 h-5 mr-2" /> Edit Profil
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Avatar & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                <span className="text-5xl font-bold text-blue-600">
                  {profil.nama.charAt(0).toUpperCase()}
                </span>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 shadow-md">
                  <Upload className="w-4 h-4" />
                </button>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-800">{profil.nama}</h3>
            <p className="text-sm font-medium text-blue-600 mb-4">{profil.jabatan}</p>
            
            <div className="w-full pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center text-sm text-slate-600">
                <Shield className="w-4 h-4 mr-3 text-slate-400 shrink-0" />
                <span className="text-left font-medium line-clamp-1">{profil.nip || 'NIP Belum diset'}</span>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Mail className="w-4 h-4 mr-3 text-slate-400 shrink-0" />
                <span className="text-left line-clamp-1">{profil.email}</span>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Phone className="w-4 h-4 mr-3 text-slate-400 shrink-0" />
                <span className="text-left line-clamp-1">{profil.nomorHp || 'Nomor HP Belum diset'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info Form */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800">Informasi Kepegawaian</h3>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap (dengan gelar)</label>
                <input name="nama" type="text" disabled={!isEditing} value={profil.nama} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">NIP (Nomor Induk Pegawai)</label>
                <input name="nip" type="text" disabled={!isEditing} value={profil.nip} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Pangkat / Golongan Ruang</label>
                <select name="pangkat" disabled={!isEditing} value={profil.pangkat} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500">
                  <option value="Belum diisi">-- Pilih Golongan --</option>
                  <option value="Pengatur (II/c)">Pengatur (II/c)</option>
                  <option value="Pengatur Tk. I (II/d)">Pengatur Tk. I (II/d)</option>
                  <option value="Penata Muda (III/a)">Penata Muda (III/a)</option>
                  <option value="Penata Muda Tk. I (III/b)">Penata Muda Tk. I (III/b)</option>
                  <option value="Penata (III/c)">Penata (III/c)</option>
                  <option value="Penata Tk. I (III/d)">Penata Tk. I (III/d)</option>
                  <option value="Pembina (IV/a)">Pembina (IV/a)</option>
                  <option value="Pembina Tk. I (IV/b)">Pembina Tk. I (IV/b)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Jabatan Fungsional/Pelaksana</label>
                <input name="jabatan" type="text" disabled={!isEditing} value={profil.jabatan} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500" />
              </div>
            </div>
            
            <div className="border-t border-slate-200 pt-6 mt-6">
              <h4 className="text-base font-bold text-slate-800 mb-4">Informasi Kontak & Alamat</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nomor HP / WhatsApp Aktif</label>
                  <input name="nomorHp" type="text" disabled={!isEditing} value={profil.nomorHp} onChange={handleChange} placeholder="Contoh: +62 812-3456-7890" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Alamat Domisili Lengkap</label>
                  <textarea name="alamat" disabled={!isEditing} rows={2} value={profil.alamat} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500" placeholder="Masukkan alamat lengkap RT/RW, Kec, Kota..."></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
