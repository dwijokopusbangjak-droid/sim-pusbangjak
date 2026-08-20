'use client';
import React, { useEffect, useState } from 'react';
import { Info, X } from 'lucide-react';

export default function GlobalAlert() {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);

  useEffect(() => {
    // Monkey-patch window.alert
    const originalAlert = window.alert;
    window.alert = (message: string) => {
      const id = Date.now();
      setMessages(prev => [...prev, { id, text: message }]);
      
      // Auto hapus setelah 4 detik
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== id));
      }, 4000);
    };

    return () => {
      window.alert = originalAlert; // Restore on unmount
    };
  }, []);

  if (messages.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col space-y-3">
      {messages.map((msg) => (
        <div key={msg.id} className="bg-white border-l-4 border-blue-500 rounded-r-lg shadow-xl p-4 flex items-start max-w-sm w-full transform transition-all duration-300 translate-y-0 opacity-100">
          <div className="flex-shrink-0 mt-0.5">
            <Info className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-slate-800">Notifikasi Sistem</p>
            <p className="mt-1 text-sm text-slate-600">{msg.text}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => setMessages(prev => prev.filter(m => m.id !== msg.id))}
              className="bg-white rounded-md inline-flex text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
