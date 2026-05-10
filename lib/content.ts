import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface ContentMetadata {
  id: string;
  title: string;
  author: string;
  category: string;
  difficulty: string;
  readingTime: string;
  tags: string[];
  date: string;
  summary: string;
  quiz?: {
    question: string;
    options: string[];
    answer: string;
  }[];
  slug: string;
  type: 'book' | 'article';
}

export interface ContentData extends ContentMetadata {
  content: string;
}

export function getAllContent(): ContentMetadata[] {
  const types = ['books', 'articles'];
  let allContent: ContentMetadata[] = [];

  types.forEach((type) => {
    const dir = path.join(CONTENT_DIR, type);
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    
    files.forEach((file) => {
      if (file.endsWith('.md')) {
        const filePath = path.join(dir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        
        allContent.push({
          ...data,
          slug: file.replace('.md', ''),
          type: type === 'books' ? 'book' : 'article',
        } as ContentMetadata);
      }
    });
  });

  return allContent.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getContentBySlug(type: 'book' | 'article', slug: string): ContentData | null {
  const dir = path.join(CONTENT_DIR, type === 'book' ? 'books' : 'articles');
  const filePath = path.join(dir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    ...data,
    slug,
    type,
    content,
  } as ContentData;
}
