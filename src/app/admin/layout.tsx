'use client';

import { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block z-20`}>
        <Sidebar setSidebarOpen={setSidebarOpen} />
      </div>
      
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-10 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

      <div className="flex-1 flex flex-col overflow-y-auto">
        <button 
          className="md:hidden p-4 sticky top:0 bg-gray-100 z-10"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 