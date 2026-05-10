import React from 'react';
import { getContentBySlug } from '@/lib/content';
import Navbar from '@/components/Navbar';
import Quiz from '@/components/Quiz';
import Flashcard from '@/components/Flashcard';
import ReadingProgressTracker from '@/components/ReadingProgressTracker';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { ChevronLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getAllContent } from '@/lib/content';

export async function generateStaticParams() {
  const allContent = getAllContent();
  return allContent.map((content) => ({
    type: content.type,
    slug: content.slug,
  }));
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { type, slug } = await params;

  const data = getContentBySlug((type === 'book' ? 'book' : 'article'), slug);

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      <Navbar />
      
      {/* Progress Bar (Client Side) */}
      <ReadingProgressTracker 
        id={data.id} 
        title={data.title} 
        url={`/content/${type}/${slug}`} 
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link href="/library" className="hover:text-blue-600">Library</Link>
          <span>/</span>
          <span className="text-blue-600">{data.category}</span>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-[200px]">{data.title}</span>
        </div>

        <header className="mb-10">
          <h1 className="mb-4 text-3xl font-black tracking-tight text-gray-900 md:text-5xl leading-[1.1]">
            {data.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 border-y border-gray-100 py-5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center text-white">
                {data.author.charAt(0)}
              </div>
              <span className="text-gray-900">{data.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} />
              {new Date(data.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} />
              {data.readingTime}
            </div>
            <div className="flex items-center gap-1.5 text-green-600">
               ● {data.difficulty} Friendly
            </div>
            <div className="ml-auto flex gap-4">
               <button className="hover:text-blue-600 transition-colors">
                 <Share2 size={16} />
               </button>
               <button className="hover:text-blue-600 transition-colors">
                 <Bookmark size={16} />
               </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-10 overflow-hidden rounded-2xl bg-gray-50 border border-gray-200">
           <img 
            src={`https://picsum.photos/seed/${data.id}/1200/800`}
            alt={data.title}
            className="w-full h-auto aspect-video object-cover opacity-90"
           />
        </div>

        {/* Content Body */}
        <article className="prose prose-sm max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-gray-700 prose-p:leading-relaxed prose-img:rounded-xl prose-blue">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              // @ts-ignore
              flashcard: ({ node, ...props }) => <Flashcard {...props} />,
            }}
          >
            {data.content}
          </ReactMarkdown>
        </article>

        {/* Interactive Part */}
        {data.quiz && data.quiz.length > 0 && (
          <section className="mt-20 border-t-4 border-blue-600 pt-12">
            <Quiz questions={data.quiz} />
          </section>
        )}
      </div>
    </main>
  );
}