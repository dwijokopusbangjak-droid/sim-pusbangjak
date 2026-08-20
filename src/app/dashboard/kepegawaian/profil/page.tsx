'use client';
import React, { useState } from 'react';
import { Users, Edit, Save, Upload, Shield, Briefcase, Mail, Phone, MapPin } from 'lucide-react';

export default function ProfilPage() {
  const [isEditing, setIsEditing] = useState(false);

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
            <button onClick={() => setIsEditing(false)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 font-medium transition-colors">
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
              <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                <Users className="w-16 h-16 text-slate-400" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 shadow-md">
                  <Upload className="w-4 h-4" />
                </button>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-800">Andi Jaya, S.Kom.</h3>
            <p className="text-sm font-medium text-blue-600 mb-4">Analis Sistem Informasi</p>
            
            <div className="w-full pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center text-sm text-slate-600">
                <Shield className="w-4 h-4 mr-3 text-slate-400" />
                <span className="text-left font-medium">NIP. 19850101 201012 1 001</span>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Mail className="w-4 h-4 mr-3 text-slate-400" />
                <span className="text-left">andi.jaya@pusbangjak.go.id</span>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Phone className="w-4 h-4 mr-3 text-slate-400" />
                <span className="text-left">+62 812-3456-7890</span>
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
                <input type="text" disabled={!isEditing} defaultValue="Andi Jaya, S.Kom." className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">NIP (Nomor Induk Pegawai)</label>
                <input type="text" disabled={!isEditing} defaultValue="19850101 201012 1 001" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Pangkat / Golongan Ruang</label>
                <select disabled={!isEditing} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500">
                  <option>Penata Muda Tk. I (III/b)</option>
                  <option>Penata (III/c)</option>
                  <option>Penata Tk. I (III/d)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Jabatan Fungsional/Pelaksana</label>
                <input type="text" disabled={!isEditing} defaultValue="Analis Sistem Informasi" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Unit Kerja / Tim Kerja Aktif</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                    Tim Kebijakan Pembangunan Desa
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                    Tim Satgas SPBE
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-200 pt-6 mt-6">
              <h4 className="text-base font-bold text-slate-800 mb-4">Informasi Kontak & Alamat</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Alamat Domisili</label>
                  <textarea disabled={!isEditing} rows={2} defaultValue="Jl. Merdeka Selatan No. 45, Komplek Perumahan Pegawai Blok C, Jakarta Selatan" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
