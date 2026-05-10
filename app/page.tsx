import React from 'react';
import { getAllContent } from '@/lib/content';
import Navbar from '@/components/Navbar';
import ContentCard from '@/components/ContentCard';
import ContinueReadingSection from '@/components/ContinueReadingSection';
import { Search, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const allContent = getAllContent();
  const featured = allContent[0];
  const others = allContent.slice(1);

  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Hero Section */}
        <div className="mb-10 overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="relative grid md:grid-cols-2">
            <div className="z-10 flex flex-col justify-center p-8 md:p-14">
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-blue-600 border border-blue-100">
                  <TrendingUp size={12} />
                  Top Educational Resource
                </span>
              </div>
              <h1 className="mb-4 text-3xl font-black tracking-tighter text-[#1A1A1A] md:text-5xl leading-tight uppercase">
                မြန်မာ <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Digital</span> Library
              </h1>
              <p className="mb-8 text-[15px] text-gray-500 max-w-sm font-medium">
                Transforming learning with interactive lessons, quizzes, and real-time tracking. Fully static, fully offline compatible.
              </p>
              <div className="flex gap-3">
                <Link 
                  href="/library"
                  className="rounded-lg bg-blue-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
                >
                  Start Reading
                </Link>
                <Link 
                  href="/dashboard"
                  className="rounded-lg bg-white border border-gray-200 px-6 py-3 text-xs font-black uppercase tracking-widest text-gray-900 transition-all hover:bg-gray-50 active:scale-95"
                >
                  My Progress
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-full overflow-hidden">
               <img
                src="https://picsum.photos/seed/library/1200/800"
                alt="Modern Library"
                className="absolute inset-0 h-full w-full object-cover grayscale opacity-20"
              />
              <div className="absolute inset-0 bg-blue-50/50" />
            </div>
          </div>
        </div>

        {/* Continue Reading (Client Side) */}
        <ContinueReadingSection />

    <section className="py-8">
          <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={18} />
              <h2 className="text-sm font-black uppercase tracking-widest text-[#1A1A1A]">Curated Articles</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
             {atLeastOne(allContent) ? (
                allContent.map((item, idx) => (
                  <ContentCard key={item.id} item={item} index={idx} />
                ))
             ) : (
                <div className="col-span-full rounded-2xl border-2 border-dashed border-gray-200 py-12 text-center">
                  <BookOpen className="mx-auto mb-4 text-gray-300" size={48} />
                  <p className="text-gray-500 font-medium">No content found yet.</p>
                </div>
             )}
          </div>
        </section>

        {/* Category Blocks */}
        <section className="py-12">
           <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Categories</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Science', count: 12, color: 'bg-blue-500' },
                { name: 'Technology', count: 8, color: 'bg-purple-500' },
                { name: 'Language', count: 15, color: 'bg-green-500' },
                { name: 'History', count: 5, color: 'bg-orange-500' },
              ].map((cat) => (
                <Link 
                  key={cat.name}
                  href={`/library?cat=${cat.name}`}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-gray-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`mb-4 h-10 w-10 rounded-xl ${cat.color} flex items-center justify-center text-white`}>
                    <BookOpen size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900">{cat.name}</h3>
                  <p className="text-xs text-gray-500">{cat.count} resources</p>
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles size={16} className="text-orange-500" />
                  </div>
                </Link>
              ))}
           </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12 px-4">
         <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white font-bold">T</div>
              <span className="text-lg font-bold text-gray-900">Thuta Library</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-gray-500">
               <Link href="/" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
               <Link href="/" className="hover:text-orange-500 transition-colors">Terms of Service</Link>
               <Link href="/" className="hover:text-orange-500 transition-colors">Contact Us</Link>
            </div>
            <p className="text-sm text-gray-400">© 2026 Thuta Library. All rights reserved.</p>
         </div>
      </footer>
    </main>
  );
}

function atLeastOne(arr: any[]) {
  return arr && arr.length > 0;
}
