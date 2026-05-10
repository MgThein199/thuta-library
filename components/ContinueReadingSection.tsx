'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Play, Trash2, Clock, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { getReadingProgress, removeReadingProgress, ReadingProgress } from '@/lib/storage';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export default function ContinueReadingSection() {
  const [items, setItems] = useState<ReadingProgress[]>(() => {
    const data = getReadingProgress();
    return Object.values(data).sort((a, b) => 
      new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime()
    );
  });

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    removeReadingProgress(id);
    setItems(prev => prev.filter(item => item.id !== id));
  };

  if (items.length === 0) return null;

  return (
    <section className="py-8">
      <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400">Jump back in</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 3).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative flex items-center gap-4 border border-gray-200 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div className="h-14 w-10 flex-shrink-0 bg-gray-50 border border-gray-100 rounded shadow-inner flex items-center justify-center overflow-hidden">
               <img src={`https://picsum.photos/seed/${item.id}/100/140`} alt={item.title} className="h-full w-full object-cover opacity-50 grayscale" />
            </div>

            <div className="flex-1 min-w-0">
               <h3 className="text-[13px] font-bold text-gray-900 mb-1 truncate">{item.title}</h3>
               <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold mb-2">
                 <span>{Math.round(item.progress * 100)}% Complete</span>
                 <span className="text-gray-200">|</span>
                 <span>{formatDistanceToNow(new Date(item.lastRead), { addSuffix: true })}</span>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress * 100}%` }}
                    className={cn("h-full", item.progress > 0.8 ? "bg-green-500" : "bg-blue-600")}
                  />
               </div>
            </div>

            <Link 
              href={item.url}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white transition-all hover:bg-black active:scale-90"
            >
              <Play size={14} fill="currentColor" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
