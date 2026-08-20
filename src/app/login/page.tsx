'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('admin');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simpan role di cookie agar bisa dibaca oleh layout
    document.cookie = `userRole=${role}; path=/`;
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">PB</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          SIM Pusbangjak
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Simulasi Login - Pilih Role Anda
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-700">
                Login Sebagai (Simulasi Role)
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-50"
                >
                  <option value="admin">Administrator (Akses Penuh)</option>
                  <option value="kapus">Kepala Pusat</option>
                  <option value="ktu">Kepala Tata Usaha</option>
                  <option value="ketua">Ketua Tim Kerja</option>
                  <option value="anggota">Anggota Tim Kerja</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email atau NIP
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-100 cursor-not-allowed"
                  placeholder="Tidak perlu diisi untuk simulasi"
                  disabled
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Masuk ke Sistem
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
