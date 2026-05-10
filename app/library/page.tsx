import React from 'react';
import Navbar from '@/components/Navbar';
import { getAllContent } from '@/lib/content';
import ContentCard from '@/components/ContentCard';
import { Search, Filter, SlidersHorizontal, BookOpen } from 'lucide-react';

export default async function LibraryPage() {
  const allContent = getAllContent();

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <header className="mb-10 text-center lg:text-left border-b border-gray-200 pb-8">
          <h1 className="text-3xl font-black tracking-tighter text-[#1A1A1A] mb-2 uppercase">မြန်မာ Digital Library</h1>
          <p className="text-sm font-medium text-gray-500 max-w-2xl">Access our full collection of educational books, articles, and interactive lessons.</p>
        </header>

        {/* Search and Filters */}
        <div className="mb-10 flex flex-col md:flex-row gap-3">
           <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search lessons, books, categories..."
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 transition-all"
              />
           </div>
           <button className="flex h-12 items-center gap-2 px-6 rounded-xl bg-white border border-gray-200 shadow-sm text-[12px] font-black uppercase tracking-widest text-[#1A1A1A] hover:bg-gray-50 transition-all">
              <SlidersHorizontal size={18} />
              Filters
           </button>
        </div>

        {/* Library Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
           {allContent.map((item, idx) => (
              <ContentCard key={item.id} item={item} index={idx} />
           ))}

           {allContent.length === 0 && (
              <div className="col-span-full py-20 text-center">
                 <BookOpen className="mx-auto mb-4 text-gray-200" size={64} />
                 <h3 className="text-xl font-bold text-gray-900 mb-2">The library is empty</h3>
                 <p className="text-gray-500">Check back later for new content.</p>
              </div>
           )}
        </div>
      </div>
    </main>
  );
}
