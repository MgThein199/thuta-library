'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Home, Library, User, Search, Bookmark } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Library', icon: Library, href: '/library' },
    { label: 'Dashboard', icon: User, href: '/dashboard' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold text-lg shadow-sm">
            M
          </div>
          <span className="text-lg font-bold tracking-tight uppercase text-[#1A1A1A]">
            မြန်မာ <span className="text-blue-600">Digital Library</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[13px] font-bold uppercase tracking-wide transition-colors hover:text-blue-600",
                pathname === item.href ? "text-blue-600 border-b-2 border-blue-600 pb-0.5" : "text-gray-500"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="h-6 w-[1px] bg-gray-200" />
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors">
            <Search size={18} />
          </button>
        </div>

        {/* Mobile Nav */}
        <div className="flex items-center gap-4 md:hidden">
           <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
            <Search size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
