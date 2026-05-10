'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlashcardProps {
  question: string;
  answer: string;
}

export default function Flashcard({ question, answer }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="my-6 p-5 bg-orange-50 border border-orange-100 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 transition-all hover:shadow-sm">
      <div className="flex-1">
        <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest block mb-1">Flashcard Challenge</span>
        <p className="text-[15px] font-bold text-orange-900 leading-snug">
          {isFlipped ? answer : question}
        </p>
      </div>
      <button 
        onClick={() => setIsFlipped(!isFlipped)}
        className="bg-white text-orange-600 text-[11px] font-black uppercase tracking-widest py-2 px-6 rounded-lg border border-orange-200 shadow-sm transition-all hover:bg-orange-50 active:scale-95"
      >
        {isFlipped ? 'Hide Answer' : 'Reveal Answer'}
      </button>
    </div>
  );
}
