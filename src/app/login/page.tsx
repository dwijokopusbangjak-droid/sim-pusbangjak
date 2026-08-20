'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Lock, Mail, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // PROSES LOGIN FIREBASE
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Ambil role dari Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      let userRole = 'admin'; // Fallback
      let userName = userCredential.user.displayName || 'Pegawai';
      if (userDoc.exists()) {
        userRole = userDoc.data().role;
        if (userDoc.data().nama) {
          userName = userDoc.data().nama;
        }
      }

      // Simpan role & nama di cookie agar Layout Next.js bisa membaca menu yang diizinkan
      document.cookie = `userRole=${userRole}; path=/`;
      document.cookie = `userName=${encodeURIComponent(userName)}; path=/`;
      router.push('/dashboard');
      
    } catch (err: any) {
      console.error(err);
      // Terjemahkan error Firebase ke Bahasa Indonesia
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Email atau kata sandi yang Anda masukkan salah.');
      } else {
        setError(err.message || 'Terjadi kesalahan pada server. Coba lagi nanti.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <span className="text-white text-2xl font-bold -rotate-3">PB</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          SIM Pusbangjak
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sistem Informasi Manajemen Kinerja & Layanan Internal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100">
          
          {error && (
            <div className="mb-6 bg-rose-50 border-l-4 border-rose-500 p-4 rounded-md flex items-start">
              <ShieldAlert className="w-5 h-5 text-rose-500 mr-3 shrink-0" />
              <p className="text-sm text-rose-700 font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-slate-50 focus:bg-white transition-colors" placeholder="email@pusbangjak.go.id" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-semibold text-slate-700">Kata Sandi</label>
                <button type="button" onClick={() => alert('Silahkan hubungi admin untuk melakukan reset password')} className="text-xs font-semibold text-blue-600 hover:text-blue-500 bg-transparent border-none cursor-pointer">Lupa sandi?</button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-slate-50 focus:bg-white transition-colors" placeholder="••••••••" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Masuk ke Sistem
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
        
        <div className="mt-8 text-center text-xs text-slate-500 space-y-2">
          <p>
            Belum memiliki akun? <br className="sm:hidden" />
            <a href="mailto:admin@pusbangjak.go.id" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Hubungi Administrator
            </a> untuk pengajuan pembuatan akun baru.
          </p>
          <p>&copy; 2026 Pusat Kebijakan Pembangunan.</p>
        </div>
      </div>
    </div>
  );
}
