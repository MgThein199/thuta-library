'use client';

import React, { useEffect, useState } from 'react';
import { saveReadingProgress } from '@/lib/storage';
import { motion, useScroll, useSpring } from 'motion/react';

interface Props {
  id: string;
  title: string;
  url: string;
}

export default function ReadingProgressTracker({ id, title, url }: Props) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const calculatedProgress = currentScroll / scrollHeight;
      const p = Math.max(0, Math.min(1, calculatedProgress));
      
      setProgress(p);

      // Save every 2 seconds or on significant change to avoid excessive writes
      // But for simplicity in this demo, we can just save it.
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync to local storage every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress > 0.01) {
        saveReadingProgress(id, {
          id,
          title,
          url,
          progress,
          lastRead: new Date().toISOString(),
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [id, title, url, progress]);

  // Initial resume logic would be in the page itself or here
  useEffect(() => {
    const data = localStorage.getItem('thuta_reading_progress');
    if (data) {
      const allProgress = JSON.parse(data);
      const saved = allProgress[id];
      if (saved && saved.progress > 0) {
        // We could show a "Resume" button toast here
      }
    }
  }, [id]);

  return (
    <motion.div
      className="fixed top-[64px] left-0 right-0 h-1 bg-blue-600 origin-left z-50"
      style={{ scaleX }}
    />
  );
}
