'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { getReadingProgress, getBookmarks, ReadingProgress, Bookmark, removeReadingProgress } from '@/lib/storage';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Bookmark as BookmarkIcon, History, Trash2, Play, LayoutDashboard, Settings, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function DashboardPage() {
  const [readingHistory, setReadingHistory] = useState<ReadingProgress[]>(() => {
    const history = getReadingProgress();
    return Object.values(history).sort((a, b) => new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime());
  });
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => getBookmarks());
  const [activeTab, setActiveTab] = useState<'history' | 'bookmarks'>('history');

  const handleRemoveHistory = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    removeReadingProgress(id);
    setReadingHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex flex-col gap-2">
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm mb-6 text-center lg:text-left">
               <div className="mx-auto lg:mx-0 h-16 w-16 rounded bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-md shadow-blue-100">
                  U
               </div>
               <h2 className="text-xl font-bold text-gray-900 leading-tight">Student User</h2>
               <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Standard Learner</p>
            </div>

            <nav className="flex flex-col gap-1">
               <button 
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-xl text-[13px] font-bold uppercase tracking-wider transition-all ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'}`}
               >
                  <History size={18} />
                  Reading History
               </button>
               <button 
                onClick={() => setActiveTab('bookmarks')}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-xl text-[13px] font-bold uppercase tracking-wider transition-all ${activeTab === 'bookmarks' ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'}`}
               >
                  <BookmarkIcon size={18} />
                  My Bookmarks
               </button>
               <div className="h-4" />
               <button className="flex items-center gap-3 px-6 py-3.5 rounded-xl text-[13px] font-bold uppercase tracking-wider text-gray-400 hover:text-gray-900 transition-all">
                  <Settings size={18} />
                  Settings
               </button>
               <button className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-gray-400 hover:text-red-500 transition-all">
                  <LogOut size={20} />
                  Sign Out
               </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <header className="mb-8 flex items-center justify-between">
               <h1 className="text-3xl font-black tracking-tight text-gray-900">
                  {activeTab === 'history' ? 'Reading History' : 'Saved Bookmarks'}
               </h1>
            </header>

            <AnimatePresence mode="wait">
              {activeTab === 'history' ? (
                <motion.div 
                  key="history"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid gap-4"
                >
                  {readingHistory.length > 0 ? (
                    readingHistory.map((item) => (
                      <div key={item.id} className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6">
                         <div className="h-20 w-20 rounded-2xl bg-gray-100 flex-shrink-0 overflow-hidden">
                            <img src={`https://picsum.photos/seed/${item.id}/200`} alt={item.title} className="h-full w-full object-cover" />
                         </div>
                         <div className="flex-1 min-w-0 text-center md:text-left">
                            <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight line-clamp-1">{item.title}</h3>
                            <p className="text-xs text-gray-400 mb-4 flex items-center justify-center md:justify-start gap-1">
                               <History size={12} />
                               Last read {formatDistanceToNow(new Date(item.lastRead), { addSuffix: true })}
                            </p>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-sm mx-auto md:mx-0">
                               <div className="h-full bg-orange-500" style={{ width: `${item.progress * 100}%` }} />
                            </div>
                         </div>
                         <div className="flex items-center gap-2">
                             <Link href={item.url} className="flex h-12 px-6 items-center justify-center rounded-xl bg-orange-500 text-white font-bold text-sm transition-all hover:bg-orange-600 active:scale-95">
                                Resume
                             </Link>
                             <button 
                              onClick={(e) => handleRemoveHistory(item.id, e)}
                              className="h-12 w-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-400 hover:text-red-500 transition-all"
                             >
                                <Trash2 size={20} />
                             </button>
                         </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                       <History size={48} className="mx-auto mb-4 text-gray-300" />
                       <h3 className="text-lg font-bold text-gray-900 mb-1">No history yet</h3>
                       <p className="text-gray-500 mb-6">Start reading to track your progress.</p>
                       <Link href="/library" className="inline-flex h-12 px-8 items-center justify-center rounded-xl bg-black text-white font-bold transition-all hover:bg-zinc-800">
                          Browse Library
                       </Link>
                    </div>
                  )}
                </motion.div>
              ) : (
                 <motion.div 
                  key="bookmarks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  {bookmarks.length > 0 ? (
                    bookmarks.map((item) => (
                      <Link key={item.id} href={item.url} className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                         <div className="h-12 w-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                            <BookmarkIcon size={24} fill="currentColor" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500 mb-1 block opacity-70">{item.category}</span>
                            <h3 className="font-bold text-gray-900 leading-tight line-clamp-1">{item.title}</h3>
                         </div>
                         <ChevronRight size={20} className="text-gray-300 group-hover:text-orange-500 transition-colors" />
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                       <BookmarkIcon size={48} className="mx-auto mb-4 text-gray-300" />
                       <h3 className="text-lg font-bold text-gray-900 mb-1">No bookmarks</h3>
                       <p className="text-gray-500">Save articles to read them later.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
