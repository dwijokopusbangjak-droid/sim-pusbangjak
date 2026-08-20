'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Hapus cookies
      document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      router.refresh();
      router.push('/login');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-400 hover:bg-rose-500 hover:text-white transition-colors w-full"
    >
      <LogOut className="mr-3 h-5 w-5" />
      Keluar Sistem
    </button>
  );
}
