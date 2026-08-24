import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { 
  Home, 
  BarChart2, 
  FileText, 
  Users, 
  LogOut,
  Target,
  Briefcase,
  FolderOpen,
  Box,
  ShieldAlert,
  Calendar,
  UsersRound,
  CheckSquare,
  Shield,
  UserCog,
  PenTool,
  Send,
  Layers,
  Settings,
  Landmark
} from 'lucide-react';
import GlobalAlert from '@/components/GlobalAlert';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('userRole')?.value || 'admin';
  const userNameCookie = cookieStore.get('userName')?.value;
  const userName = userNameCookie ? decodeURIComponent(userNameCookie) : 'Sistem Administrator';

  // Sesuai dengan spesifikasi peran yang baru:
  const isAdmin = userRole === 'admin';
  const isKapus = userRole === 'kapus' || isAdmin;
  const isKtu = userRole === 'ktu' || isAdmin;
  const isPegawai = userRole === 'pegawai' || userRole === 'anggota' || userRole === 'ketua' || isAdmin;

  const roleNameMap: Record<string, string> = {
    admin: 'Administrator',
    kapus: 'Kepala Pusat',
    ktu: 'Kepala Tata Usaha',
    pegawai: 'Pegawai Fungsional/Pelaksana',
    ketua: 'Pegawai Fungsional/Pelaksana',
    anggota: 'Pegawai Fungsional/Pelaksana'
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center mr-3 shadow-md border border-blue-400/30">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">SIM Pusbangjak</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700">
          <nav className="px-3 space-y-1">
            <Link href="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-slate-800 text-white transition-colors">
              <Home className="mr-3 h-5 w-5 text-slate-300" />
              Dashboard Utama
            </Link>

            {/* Modul Kinerja & Perencanaan */}
            <div className="pt-4 pb-1">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Kinerja & Perencanaan
              </p>
            </div>
            {(isKapus || isPegawai) && (
              <Link href="/dashboard/kinerja/iku" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                <Target className="mr-3 h-5 w-5 text-slate-400" />
                Capaian IKU
              </Link>
            )}
            <Link href="/dashboard/kinerja/mph" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <Layers className="mr-3 h-5 w-5 text-slate-400" />
              Matriks Peran Hasil
            </Link>
            {(isPegawai || isKapus || isKtu) && (
              <Link href="/dashboard/kinerja/laporan" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                <BarChart2 className="mr-3 h-5 w-5 text-slate-400" />
                Laporan & Mitigasi Risiko
              </Link>
            )}

            {/* Modul Pekerjaan & Penugasan */}
            <div className="pt-4 pb-1">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Manajemen Pekerjaan
              </p>
            </div>
            {isPegawai && (
              <Link href="/dashboard/pekerjaan/tim" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                <UsersRound className="mr-3 h-5 w-5 text-slate-400" />
                Workspace Tim
              </Link>
            )}
            <Link href="/dashboard/pekerjaan/tugas" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <CheckSquare className="mr-3 h-5 w-5 text-slate-400" />
              Tugas & Progres
            </Link>

            {/* Modul Layanan TU */}
            <div className="pt-4 pb-1">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Layanan Administrasi
              </p>
            </div>
            <Link href="/dashboard/layanan-tu/surat-tugas" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <Send className="mr-3 h-5 w-5 text-slate-400" />
              Pengajuan Surat Tugas
            </Link>
            <Link href="/dashboard/layanan-tu/surat-keterangan" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <FileText className="mr-3 h-5 w-5 text-slate-400" />
              Pengajuan S. Keterangan
            </Link>
            <Link href="/dashboard/layanan-tu/desain" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <PenTool className="mr-3 h-5 w-5 text-slate-400" />
              Pengajuan Desain
            </Link>
            <Link href="/dashboard/layanan-tu/rapat" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <Calendar className="mr-3 h-5 w-5 text-slate-400" />
              Booking & Rapat
            </Link>

            {/* Kepegawaian */}
            <div className="pt-4 pb-1">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Kepegawaian
              </p>
            </div>
            <Link href="/dashboard/kepegawaian/profil" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <Users className="mr-3 h-5 w-5 text-slate-400" />
              Profil & Riwayat
            </Link>

            {/* Menu Administrator */}
            {isAdmin && (
              <>
                <div className="pt-4 pb-1">
                  <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Administrator
                  </p>
                </div>
                <Link href="/dashboard/admin/users" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <UserCog className="mr-3 h-5 w-5 text-slate-400" />
                  Master Data User
                </Link>
                <Link href="/dashboard/admin/teams" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <Briefcase className="mr-3 h-5 w-5 text-slate-400" />
                  Master Data Tim
                </Link>
                <Link href="/dashboard/admin/roles" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <Shield className="mr-3 h-5 w-5 text-slate-400" />
                  Konfigurasi Sistem
                </Link>
              </>
            )}

          </nav>
        </div>
        
        {/* Tombol Keluar */}
        <div className="p-4 border-t border-slate-800 shrink-0">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10 shrink-0">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-slate-800">Sistem Informasi Manajemen</h1>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">
                  {userName}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  {userRole === 'admin' ? 'Administrator' : 
                   userRole === 'kapus' ? 'Kepala Pusat' :
                   userRole === 'ktu' ? 'Kepala TU' :
                   userRole === 'ketua' ? 'Ketua Tim Kerja' :
                   'Anggota Tim'}
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                <span className="text-blue-700 font-bold text-sm">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50 relative">
          {children}
        </main>
      </div>
      <GlobalAlert />
    </div>
  );
}

