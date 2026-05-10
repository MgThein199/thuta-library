'use client';

export interface ReadingProgress {
  id: string;
  title: string;
  url: string;
  progress: number;
  lastRead: string;
}

export interface Bookmark {
  id: string;
  title: string;
  category: string;
  url: string;
}

const STORAGE_KEYS = {
  PROGRESS: 'thuta_reading_progress',
  BOOKMARKS: 'thuta_bookmarks',
};

export function getReadingProgress(): Record<string, ReadingProgress> {
  if (typeof window === 'undefined') return {};
  const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  return data ? JSON.parse(data) : {};
}

export function saveReadingProgress(id: string, item: ReadingProgress) {
  if (typeof window === 'undefined') return;
  const current = getReadingProgress();
  current[id] = item;
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(current));
}

export function removeReadingProgress(id: string) {
  if (typeof window === 'undefined') return;
  const current = getReadingProgress();
  delete current[id];
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(current));
}

export function getBookmarks(): Bookmark[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
  return data ? JSON.parse(data) : [];
}

export function toggleBookmark(bookmark: Bookmark) {
  if (typeof window === 'undefined') return;
  const current = getBookmarks();
  const index = current.findIndex((b) => b.id === bookmark.id);
  
  if (index > -1) {
    current.splice(index, 1);
  } else {
    current.push(bookmark);
  }
  
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(current));
}

export function isBookmarked(id: string): boolean {
  if (typeof window === 'undefined') return false;
  const current = getBookmarks();
  return current.some((b) => b.id === id);
}
