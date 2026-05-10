'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen, ChevronRight, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ContentMetadata } from '@/lib/content';
import { isBookmarked, toggleBookmark } from '@/lib/storage';

interface ContentCardProps {
  item: ContentMetadata;
  index?: number;
}

export default function ContentCard({ item, index = 0 }: ContentCardProps) {
  const [bookmarked, setBookmarked] = React.useState(false);

  React.useEffect(() => {
    setBookmarked(isBookmarked(item.id));
  }, [item.id]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleBookmark({
      id: item.id,
      title: item.title,
      category: item.category,
      url: `/content/${item.slug}?type=${item.type}`
    });
    setBookmarked(!bookmarked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <Link href={`/content/${item.slug}?type=${item.type}`} className="flex flex-col">
        <div className="relative h-40 w-full overflow-hidden bg-gray-100 border-b border-gray-100">
          <img
            src={`https://picsum.photos/seed/${item.id}/600/400`}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="rounded bg-white/95 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-blue-600 border border-blue-100 shadow-sm">
              {item.category}
            </span>
          </div>
          <button 
            onClick={handleBookmark}
            className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm text-gray-400 shadow-sm transition-colors hover:text-blue-600"
          >
            <Bookmark size={14} fill={bookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              {item.readingTime}
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1">
              <BookOpen size={12} />
              {item.difficulty}
            </div>
          </div>

          <h3 className="mb-2 text-sm font-bold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          
          <p className="mb-4 flex-1 text-[12px] leading-relaxed text-gray-500 line-clamp-2">
            {item.summary}
          </p>

          <div className="flex items-center justify-between border-t border-gray-50 pt-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.author}</span>
            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-600">
              Explore
              <ChevronRight size={10} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
